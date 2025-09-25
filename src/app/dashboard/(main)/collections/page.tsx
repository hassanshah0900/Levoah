import CollectionsTable from "./components/CollectionsTable";
import { getCollections } from "./lib/queries";

export default async function CollectionsPage() {
  const { collections, count } = await getCollections();

  return (
    <div>
      <CollectionsTable collections={collections} rowCount={count} />
    </div>
  );
}
