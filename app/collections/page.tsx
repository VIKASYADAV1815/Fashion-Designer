import CollectionHero from "./components/CollectionHero";
import CollectionList from "./components/CollectionList";

export default function CollectionsPage() {
  return (
    <main className="bg-white">
      <CollectionHero />
      <CollectionList />
    </main>
  );
}
