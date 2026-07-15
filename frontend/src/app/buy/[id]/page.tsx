import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailPage from "../../__components/PropertyDetailPage";
import { getProperty } from "../../__data/properties";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getProperty("buy", id);

  if (!property) return { title: "Property not found" };

  return {
    title: `${property.location}, ${property.area} | For sale`,
    description: property.summary,
  };
}

export default async function BuyPropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = getProperty("buy", id);

  if (!property) notFound();

  return <PropertyDetailPage property={property} />;
}
