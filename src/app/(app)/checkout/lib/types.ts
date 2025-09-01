import { ReactElement } from "react";
import { AddressSchemaType, CheckoutFormSchemaType } from "./validation";

export interface MultistepFormStep {
  label: string;
  element: ReactElement;
  fields: (
    | keyof CheckoutFormSchemaType
    | `shipping_address.${keyof CheckoutFormSchemaType["shipping_address"]}`
  )[];
}
