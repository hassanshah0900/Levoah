"use server";

import { createClient } from "@/supabase/server";
import { CheckoutFormSchemaType } from "./validation";
import { ShoppingCartItem } from "@/contexts/ShoppingCartContext";
import { generateOrderTrackingCode } from "./utils";

interface Order extends CheckoutFormSchemaType {
  orderItems: ShoppingCartItem[];
  status: OrderStatus;
  payment_status: OrderPaymentStatus;
}
type OrderPaymentStatus = "Paid" | "Unpaid" | "Refunded";
type OrderStatus =
  | "Payment Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Failed Delivery";

export async function createOrder({
  payment_method,
  shipping_address,
  orderItems,
}: Order) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      shipping_address,
      status: "Processing",
      payment_status: "Unpaid",
      payment_method,
      tracking_code: generateOrderTrackingCode(),
    })
    .select("id, tracking_code")
    .single();

  if (error) throw error;

  const results = await Promise.all(
    orderItems.map(
      ({ productId, variantId, price, quantity, title, attributes }) => {
        return supabase.from("order_items").insert({
          product_info: {
            title,
            productId,
            variantId,
          },
          unit_price: price,
          quantity,
          attributes: attributes,
          order_id: data.id,
        });
      }
    )
  );

  results.some((result) => {
    if (result.error) throw error;
  });

  return { tracking_code: data.tracking_code };
}
