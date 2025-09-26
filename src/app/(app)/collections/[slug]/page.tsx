import { getCollectionBySlug } from "@/app/dashboard/(main)/collections/lib/queries";
import Container from "@/components/Container";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import poster from "../../../../../public/images/poster.jpg";
import CollectionProductsGrid from "../components/CollectionProductsGrid";
import { getProductsByCollection } from "../lib/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  return {
    title: collection.pageTitle,
    description: collection.metaDescription,
  };
}

const COLLECTION_PAGE_SIZE = 10;
export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products with variants", slug],
    queryFn: ({ pageParam }) =>
      getProductsByCollection(slug, {
        pageIndex: pageParam,
        pageSize: COLLECTION_PAGE_SIZE,
      }),
    initialPageParam: 0,
  });

  const collection = await getCollectionBySlug(slug);

  const state = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={state}>
        <Container>
          <div className="py-10">
            <div className="mb-10 md:mb-16">
              <Image
                src={poster}
                alt=""
                className="w-full aspect-video mb-2 xs:mb-4 object-center object-cover"
              />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-start">
                {collection.title}
              </h1>
            </div>
            <CollectionProductsGrid pageSize={COLLECTION_PAGE_SIZE} />
            <p className="text-muted-foreground overflow-ellipsis overflow-hidden mt-10">
              {collection.description}
            </p>
          </div>
        </Container>
      </HydrationBoundary>
    </div>
  );
}
