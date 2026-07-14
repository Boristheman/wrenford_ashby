import type { Metadata } from "next";
import { MarketingPage } from "../_components/MarketingPage";
import { pageContent } from "../_data/pageContent";

export const metadata: Metadata = {
  title: "Rent",
};

export default function Page() {
  return <MarketingPage content={pageContent.rent} />;
}
