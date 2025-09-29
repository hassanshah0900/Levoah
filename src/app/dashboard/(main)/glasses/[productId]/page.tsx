import GlassesVariantsTable from "../components/GlassesVariantsTable";

export default async function DashboardProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <GlassesVariantsTable productId={parseInt(productId)} />;
}
