import { getCollectionBySlug } from "@/app/dashboard/(main)/collections/lib/queries";
import Container from "@/components/Container";
import { getImagePublicUrl } from "@/lib/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
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

  if (!collection) {
    return {
      title: "Collection not found",
      description: "The collection you are looking for does not exist.",
    };
  }

  return {
    title: collection.pageTitle || collection.title || "Collection",
    description: collection.metaDescription || "Browse our collection.",
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

  const [collection] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: ["collections", slug],
      queryFn: () => getCollectionBySlug(slug),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["products with variants", slug],
      queryFn: ({ pageParam }) =>
        getProductsByCollection(slug, {
          pageIndex: pageParam,
          pageSize: COLLECTION_PAGE_SIZE,
        }),
      initialPageParam: 0,
    }),
  ]);

  if (!collection) notFound();

  const state = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={state}>
        <Container>
          <div className="py-10">
            <div className="mb-10 md:mb-16">
              {collection.bannerUrl && (
                <div className="w-full aspect-video mb-2 xs:mb-4 relative">
                  <Image
                    src={getImagePublicUrl(collection.bannerUrl, "Banners")}
                    alt=""
                    fill
                    className="object-center object-cover"
                  />
                </div>
              )}
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
