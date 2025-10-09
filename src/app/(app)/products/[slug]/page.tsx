import Container from "@/components/Container";
import SingleProduct from "../components/SingleProduct";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Container>
      <SingleProduct slug={slug} />
    </Container>
  );
}
