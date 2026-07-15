import ListingsRouteReveal from "../__components/ListingsRouteReveal";
import PropertyListingsPage from "../__components/PropertyListingsPage";

export default function BuyPage() {
  return (
    <ListingsRouteReveal>
      <PropertyListingsPage mode="buy" />
    </ListingsRouteReveal>
  );
}
