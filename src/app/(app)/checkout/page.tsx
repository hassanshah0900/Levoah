import Container from "@/components/Container";
import SinglePageCheckout from "./components/SinglePageCheckout";

export default function CheckoutPage() {
  return (
    <div className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold mb-5">Checkout</h1>
        <SinglePageCheckout />
      </Container>
    </div>
  );
}
