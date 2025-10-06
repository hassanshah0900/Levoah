"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrder } from "../lib/actions";
import { checkoutFormSchema } from "../lib/validation";
import CustomerAddressFields from "./CustomerAddressFields";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import ReviewOrder from "./ReviewOrder";

export default function SinglePageCheckout() {
  const { reset, cartItems } = useShoppingCart();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess({ orderTrackingCode }) {
      toast.success("Your order has been successfully placed.", {
        id: "create order",
      });
      router.push(`/order/confirmation/${orderTrackingCode}`);
      reset();
    },
    onError() {
      toast.error("Couldn't place order.", { id: "create order" });
    },
  });
  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onChange",
    defaultValues: {
      shippingAddress: {
        fullName: "",
        address: "",
        city: "",
        country: "Pakistan",
        email: "",
        phone: "",
        province: "",
        postalCode: "",
      },
      paymentMethod: "BANKTRANSFER",
    },
  });
  function onSubmit(data: any) {
    const order = { ...data, orderItems: cartItems };
    toast.loading("Creating order...", { id: "create order" });
    mutate(order);
    console.log(order);
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          <ReviewOrder />
          <Separator className="md:mb-0" />
          <CustomerAddressFields />
        </div>
        <div className="space-y-5">
          <Separator className="md:hidden" />
          <PaymentOptions />
          <Separator />
          <OrderSummary />
          <Button className="w-full" type="submit" disabled={isPending}>
            Complete Order
          </Button>
        </div>
      </form>
    </Form>
  );
}
