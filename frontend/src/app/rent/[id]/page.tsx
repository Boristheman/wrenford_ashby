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
  const property = getProperty("rent", id);

  if (!property) return { title: "Property not found" };

  return {
    title: `${property.location}, ${property.area} | To let`,
    description: property.summary,
  };
}

export default async function RentPropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = getProperty("rent", id);

  if (!property) notFound();

  return <PropertyDetailPage property={property} />;
}
