import React from "react";
import CheckoutForm from "./components/CheckoutForm";
import Container from "@/components/Container";

export default function CheckoutPage() {
  return (
    <div className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold mb-5">Checkout</h1>
        <CheckoutForm />
      </Container>
    </div>
  );
}
