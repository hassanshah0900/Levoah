"use server";

import { ShoppingCartItem } from "@/contexts/ShoppingCartContext";
import { createClient } from "@/supabase/server";
import { generateOrderTrackingCode } from "./utils";
import { CheckoutFormSchemaType } from "./validation";

interface Order extends CheckoutFormSchemaType {
  orderItems: ShoppingCartItem[];
  shippingAddress: CheckoutFormSchemaType["shippingAddress"];
}

export async function createOrder({
  paymentMethod,
  shippingAddress,
  orderItems,
}: Order) {
  const supabase = await createClient();

  const orderTrackingCode = generateOrderTrackingCode();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      shipping_address: shippingAddress,
      payment_status: "Unpaid",
      order_status: "pending",
      payment_method: paymentMethod,
      tracking_code: orderTrackingCode,
    })
    .select("id, tracking_code")
    .single();

  if (error) throw error;

  const results = await Promise.all(
    orderItems.map((orderItem) => {
      return supabase.from("order_items").insert({
        unit_price: orderItem.variant.price,
        quantity: orderItem.quantity,
        order_id: data.id,
        item: orderItem,
      });
    })
  );

  results.some((result) => {
    if (result.error) throw error;
  });

  return { orderTrackingCode };
}
