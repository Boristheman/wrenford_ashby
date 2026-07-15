export type NewHomeDevelopment = {
  slug: string;
  location: string;
  name: string;
  description: string;
  price: string;
  status: string;
  image: string;
  homes: string;
  completion: string;
  features: string[];
};

export const NEW_HOME_DEVELOPMENTS: NewHomeDevelopment[] = [
  {
    slug: "runwell-gardens",
    location: "Wickford",
    name: "Runwell Gardens",
    description:
      "A collection of two, three and four-bedroom homes close to local schools, Wickford station and everyday amenities.",
    price: "From £315,000",
    status: "Selected plots available",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1800&q=86",
    homes: "2, 3 and 4-bedroom homes",
    completion: "Phased completions through 2026",
    features: [
      "Contemporary kitchens and bathrooms",
      "Private gardens to family homes",
      "Allocated parking or driveway",
      "Energy-efficient construction",
      "New-home warranty",
      "Close to Wickford station and schools",
    ],
  },
  {
    slug: "wolsey-park",
    location: "Rayleigh",
    name: "Wolsey Park",
    description:
      "Modern family homes with landscaped streets, practical layouts and straightforward links into Rayleigh town centre.",
    price: "From £385,000",
    status: "Viewings available",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=86",
    homes: "3 and 4-bedroom family homes",
    completion: "Selected homes ready this year",
    features: [
      "Landscaped development setting",
      "Open-plan kitchen and dining spaces",
      "Principal bedrooms with en-suite options",
      "Driveway parking",
      "Low-maintenance finishes",
      "Useful links into Rayleigh town centre",
    ],
  },
  {
    slug: "crouch-view",
    location: "South Woodham Ferrers",
    name: "Crouch View",
    description:
      "Energy-efficient homes designed for buyers who want a quieter setting without losing useful commuter connections.",
    price: "Next phase coming soon",
    status: "Registering interest",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86",
    homes: "2, 3 and 4-bedroom homes",
    completion: "Next release expected shortly",
    features: [
      "Energy-conscious specification",
      "Flexible family layouts",
      "Private outside space",
      "Parking included on selected plots",
      "New-home warranty",
      "Access to local rail and road connections",
    ],
  },
];

export function getNewHomeDevelopment(slug: string) {
  return NEW_HOME_DEVELOPMENTS.find((development) => development.slug === slug);
}
