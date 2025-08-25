import z, { email } from "zod";

const REQUIRED_MESSAGE = "This field is required.";
export const addressSchema = z.object({
  firstName: z.string().min(1, { error: REQUIRED_MESSAGE }),
  lastName: z.string().min(1, { error: REQUIRED_MESSAGE }),
  country: z.string().min(1, { error: REQUIRED_MESSAGE }),
  city: z.string().min(1, { error: REQUIRED_MESSAGE }),
  address: z.string().min(1, { error: REQUIRED_MESSAGE }).max(250),
  email: z.email().min(1, { error: REQUIRED_MESSAGE }),
  phone: z.string().min(1, { error: REQUIRED_MESSAGE }),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
