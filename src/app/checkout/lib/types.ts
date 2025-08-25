import { ReactElement } from "react";
import { AddressSchemaType } from "./validation";

export interface MultistepFormStep {
  label: string;
  element: ReactElement;
  fields: (keyof AddressSchemaType)[];
}
