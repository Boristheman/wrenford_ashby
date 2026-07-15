import ListingsRouteReveal from "../__components/ListingsRouteReveal";
import PropertyListingsPage from "../__components/PropertyListingsPage";

export default function RentPage() {
  return (
    <ListingsRouteReveal>
      <PropertyListingsPage mode="rent" />
    </ListingsRouteReveal>
  );
}
