import z, { email } from "zod";

const REQUIRED_MESSAGE = "This field is required.";
export const addressSchema = z.object({
  full_name: z.string().min(1, { error: REQUIRED_MESSAGE }),
  country: z.string().min(1, { error: REQUIRED_MESSAGE }),
  city: z.string().min(1, { error: REQUIRED_MESSAGE }),
  province: z.string().min(1, { error: REQUIRED_MESSAGE }),
  address: z.string().min(1, { error: REQUIRED_MESSAGE }),
  email: z.email().min(1, { error: REQUIRED_MESSAGE }),
  phone: z.string().min(1, { error: REQUIRED_MESSAGE }),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
