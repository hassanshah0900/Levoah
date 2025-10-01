import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CollectionEditForm from "../../components/CollectionEditForm";
import { getCollectionBySlug } from "../../lib/queries";

export default async function CollectionEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["collections", slug],
    queryFn: () => getCollectionBySlug(slug),
  });

  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <div className="py-5">
        <CollectionEditForm slug={slug} />
      </div>
    </HydrationBoundary>
  );
}
