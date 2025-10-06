import z from "zod";

const REQUIRED_MESSAGE = "This field is required.";

export const checkoutFormSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(1, { error: REQUIRED_MESSAGE }),
    country: z.string().min(1, { error: REQUIRED_MESSAGE }),
    city: z.string().min(1, { error: REQUIRED_MESSAGE }),
    province: z.string().min(1, { error: REQUIRED_MESSAGE }),
    address: z.string().min(1, { error: REQUIRED_MESSAGE }),
    email: z.email().min(1, { error: REQUIRED_MESSAGE }),
    phone: z.string().min(1, { error: REQUIRED_MESSAGE }),
    postalCode: z.string().min(1, { error: REQUIRED_MESSAGE }),
  }),
  paymentMethod: z.coerce.string().min(1, "Select a payment method"),
});

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;
