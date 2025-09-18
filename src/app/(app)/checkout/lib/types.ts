import { ReactElement } from "react";
import { CheckoutFormSchemaType } from "./validation";

export interface MultistepFormStep {
  label: string;
  element: ReactElement;
  fields: (
    | keyof CheckoutFormSchemaType
    | `shipping_address.${keyof CheckoutFormSchemaType["shipping_address"]}`
  )[];
}

export type PaymentMethod = "CASHONDELIVERY" | "PAYFAST";

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Failed Delivery";

export type OrderPaymentStatus = "paid" | "unpaid" | "cancelled";
