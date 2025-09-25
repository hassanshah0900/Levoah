import CollectionEditForm from "../../components/CollectionEditForm";
import { getCollectionBySlug } from "../../lib/queries";
import { Collection } from "../../lib/types";

export default async function CollectionEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  console.log("collection: ", collection);

  return (
    <div className="py-5">
      <CollectionEditForm collection={{ ...collection } as Collection} />
    </div>
  );
}
