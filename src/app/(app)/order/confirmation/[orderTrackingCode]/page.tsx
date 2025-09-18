import Container from "@/components/Container";
import Link from "next/link";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderTrackingCode: string }>;
}) {
  const { orderTrackingCode } = await params;
  return (
    <Container>
      <div className="flex justify-center items-start pb-32 pt-24 md:pb-40 md:pt-28">
        <div className="max-w-lg text-center text-sm md:text-base px-1">
          <h1 className="text-2xl md:text-4xl font-semibold uppercase">
            Thank you
          </h1>
          <p className="text-muted-foreground my-3 md:my-5">
            Order Tracking Code:{" "}
            <span className="font-semibold text-foreground ms-1">
              {orderTrackingCode}
            </span>
          </p>
          <p>
            Thank you for your order! Your purchase means a lot to us. We’re
            preparing it right away. To view progress of your order go to{" "}
            <Link href={"/track-my-order"} className="text-highlight underline">
              track my order
            </Link>{" "}
            . You will find all details there.
          </p>
        </div>
      </div>
    </Container>
  );
}
