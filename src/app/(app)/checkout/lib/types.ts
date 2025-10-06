import { ReactElement } from "react";
import { CheckoutFormSchemaType } from "./validation";

export interface MultistepFormStep {
  label: string;
  element: ReactElement;
  fields: (
    | keyof CheckoutFormSchemaType
    | `shipping_address.${keyof CheckoutFormSchemaType["shippingAddress"]}`
  )[];
}

export type PaymentMethod = "CASHONDELIVERY" | "BANKTRANSFER";

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Failed Delivery";

export type OrderPaymentStatus = "paid" | "unpaid" | "cancelled";
