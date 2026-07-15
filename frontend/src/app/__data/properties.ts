export type ListingMode = "buy" | "rent";

export type Property = {
  id: number;
  mode: ListingMode;
  status: "For Sale" | "To Let";
  badge?: string;
  location: string;
  area: string;
  postcode: string;
  price: number;
  priceLabel: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  listedDate: string;
  summary: string;
  features: string[];
  tenureLabel: string;
  councilTaxOrDeposit: string;
  epc: string;
  reference: string;
  floorArea: string;
  parking: string;
  outsideSpace: string;
  heating: string;
  availability: string;
  localAuthority: string;
  descriptionParagraphs: string[];
  roomDetails: Array<{ name: string; description: string }>;
  importantInformation: string[];
  locationDescription: string;
};

const interiorImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=86",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=86",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=86",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=86",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=86",
];

type RawProperty = Pick<
  Property,
  | "id"
  | "mode"
  | "status"
  | "badge"
  | "location"
  | "area"
  | "postcode"
  | "price"
  | "priceLabel"
  | "propertyType"
  | "bedrooms"
  | "bathrooms"
  | "image"
  | "listedDate"
>;

const rawProperties: RawProperty[] = [
  {
    id: 1,
    mode: "buy",
    status: "For Sale",
    badge: "New instruction",
    location: "Nevendon Road",
    area: "Wickford, Essex",
    postcode: "SS12",
    price: 325000,
    priceLabel: "£325,000",
    propertyType: "Semi-detached house",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-07-14",
  },
  {
    id: 2,
    mode: "buy",
    status: "For Sale",
    location: "London Road",
    area: "Rayleigh, Essex",
    postcode: "SS6",
    price: 385000,
    priceLabel: "£385,000",
    propertyType: "End-terrace house",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-07-08",
  },
  {
    id: 3,
    mode: "buy",
    status: "For Sale",
    badge: "Chain free",
    location: "The Knares",
    area: "Basildon, Essex",
    postcode: "SS16",
    price: 265000,
    priceLabel: "£265,000",
    propertyType: "Terraced house",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-04-18",
  },
  {
    id: 4,
    mode: "buy",
    status: "For Sale",
    location: "Runwell Road",
    area: "Wickford, Essex",
    postcode: "SS11",
    price: 475000,
    priceLabel: "£475,000",
    propertyType: "Detached house",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-07-12",
  },
  {
    id: 5,
    mode: "buy",
    status: "For Sale",
    badge: "Reduced",
    location: "Hawk Hill",
    area: "Battlesbridge, Essex",
    postcode: "SS11",
    price: 425000,
    priceLabel: "£425,000",
    propertyType: "Detached bungalow",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-03-24",
  },
  {
    id: 6,
    mode: "buy",
    status: "For Sale",
    location: "High Street",
    area: "Billericay, Essex",
    postcode: "CM12",
    price: 295000,
    priceLabel: "£295,000",
    propertyType: "Character cottage",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-02-11",
  },
  {
    id: 7,
    mode: "buy",
    status: "For Sale",
    badge: "New instruction",
    location: "Downham Road",
    area: "Ramsden Heath, Essex",
    postcode: "CM11",
    price: 550000,
    priceLabel: "£550,000",
    propertyType: "Detached family home",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-06-29",
  },
  {
    id: 8,
    mode: "buy",
    status: "For Sale",
    location: "Wolsey Park",
    area: "Rayleigh, Essex",
    postcode: "SS6",
    price: 410000,
    priceLabel: "£410,000",
    propertyType: "Modern detached house",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-05-16",
  },
  {
    id: 9,
    mode: "buy",
    status: "For Sale",
    location: "Chapel Street",
    area: "Billericay, Essex",
    postcode: "CM12",
    price: 340000,
    priceLabel: "£340,000",
    propertyType: "Terraced house",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-01-22",
  },
  {
    id: 10,
    mode: "buy",
    status: "For Sale",
    badge: "Chain free",
    location: "Menzies Avenue",
    area: "Basildon, Essex",
    postcode: "SS14",
    price: 285000,
    priceLabel: "£285,000",
    propertyType: "End-terrace house",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2025-12-05",
  },
  {
    id: 11,
    mode: "buy",
    status: "For Sale",
    location: "Crouch View",
    area: "South Woodham Ferrers, Essex",
    postcode: "CM3",
    price: 445000,
    priceLabel: "£445,000",
    propertyType: "Detached house",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-04-02",
  },
  {
    id: 12,
    mode: "buy",
    status: "For Sale",
    location: "Maple Way",
    area: "Pitsea, Essex",
    postcode: "SS13",
    price: 315000,
    priceLabel: "£315,000",
    propertyType: "Semi-detached house",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2025-11-14",
  },
  {
    id: 101,
    mode: "rent",
    status: "To Let",
    badge: "Available now",
    location: "Southend Road",
    area: "Wickford, Essex",
    postcode: "SS11",
    price: 1350,
    priceLabel: "£1,350 pcm",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-07-13",
  },
  {
    id: 102,
    mode: "rent",
    status: "To Let",
    location: "Station Avenue",
    area: "Wickford, Essex",
    postcode: "SS12",
    price: 1650,
    priceLabel: "£1,650 pcm",
    propertyType: "Semi-detached house",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-07-04",
  },
  {
    id: 103,
    mode: "rent",
    status: "To Let",
    badge: "New instruction",
    location: "Crown Hill",
    area: "Rayleigh, Essex",
    postcode: "SS6",
    price: 1200,
    priceLabel: "£1,200 pcm",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-06-25",
  },
  {
    id: 104,
    mode: "rent",
    status: "To Let",
    location: "Church Road",
    area: "Basildon, Essex",
    postcode: "SS14",
    price: 1450,
    priceLabel: "£1,450 pcm",
    propertyType: "Terraced house",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-04-09",
  },
  {
    id: 105,
    mode: "rent",
    status: "To Let",
    location: "Norsey Road",
    area: "Billericay, Essex",
    postcode: "CM11",
    price: 2100,
    priceLabel: "£2,100 pcm",
    propertyType: "Detached house",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-02-20",
  },
  {
    id: 106,
    mode: "rent",
    status: "To Let",
    badge: "Pet considered",
    location: "Crouch Beck",
    area: "South Woodham Ferrers, Essex",
    postcode: "CM3",
    price: 1750,
    priceLabel: "£1,750 pcm",
    propertyType: "Semi-detached house",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2025-12-18",
  },
  {
    id: 107,
    mode: "rent",
    status: "To Let",
    location: "Rectory Lane",
    area: "Pitsea, Essex",
    postcode: "SS13",
    price: 1300,
    priceLabel: "£1,300 pcm",
    propertyType: "Maisonette",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566752734-2a0cd1c6d6e7?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-03-11",
  },
  {
    id: 108,
    mode: "rent",
    status: "To Let",
    badge: "Available August",
    location: "Arterial Road",
    area: "Rayleigh, Essex",
    postcode: "SS6",
    price: 1850,
    priceLabel: "£1,850 pcm",
    propertyType: "Detached house",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-06-18",
  },
  {
    id: 109,
    mode: "rent",
    status: "To Let",
    location: "Queens Park Avenue",
    area: "Billericay, Essex",
    postcode: "CM12",
    price: 1550,
    priceLabel: "£1,550 pcm",
    propertyType: "Modern house",
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2025-10-29",
  },
  {
    id: 110,
    mode: "rent",
    status: "To Let",
    location: "Long Riding",
    area: "Basildon, Essex",
    postcode: "SS14",
    price: 1400,
    priceLabel: "£1,400 pcm",
    propertyType: "End-terrace house",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-01-09",
  },
  {
    id: 111,
    mode: "rent",
    status: "To Let",
    badge: "New instruction",
    location: "The Willows",
    area: "Wickford, Essex",
    postcode: "SS12",
    price: 1950,
    priceLabel: "£1,950 pcm",
    propertyType: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-07-10",
  },
  {
    id: 112,
    mode: "rent",
    status: "To Let",
    location: "Burnham Road",
    area: "South Woodham Ferrers, Essex",
    postcode: "CM3",
    price: 2250,
    priceLabel: "£2,250 pcm",
    propertyType: "Detached family home",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86",
    listedDate: "2026-05-07",
  },
];

export const PROPERTIES: Property[] = rawProperties.map((property, index) => {
  const town = property.area.replace(", Essex", "");
  const isBuy = property.mode === "buy";
  const localAuthority =
    property.area.includes("Rayleigh") ||
    property.area.includes("South Woodham Ferrers") ||
    property.area.includes("Battlesbridge")
      ? "Rochford District Council"
      : property.area.includes("Billericay") ||
          property.area.includes("Wickford") ||
          property.area.includes("Basildon") ||
          property.area.includes("Pitsea")
        ? "Basildon Borough Council"
        : "Essex local authority";
  const parkingOptions = [
    "Driveway parking",
    "Allocated parking",
    "Garage and driveway",
    "On-street parking",
  ];
  const outsideOptions = [
    "Private rear garden",
    "Enclosed rear garden",
    "Patio and lawned garden",
    "Communal outside space",
  ];
  const floorArea = `${Math.round(610 + property.bedrooms * 185 + property.bathrooms * 55 + (index % 4) * 24)} sq ft (approx.)`;
  const tenureLabel = isBuy
    ? index % 3 === 0
      ? "Leasehold"
      : "Freehold"
    : "Minimum 12-month tenancy";
  const councilTaxOrDeposit = isBuy
    ? `Band ${["C", "D", "B", "E"][index % 4]} — ${localAuthority}`
    : `Deposit £${Math.round(property.price * 1.15).toLocaleString("en-GB")}`;
  const epc = `EPC rating ${["B", "C", "C", "D"][index % 4]}`;
  const parking = parkingOptions[index % parkingOptions.length];
  const outsideSpace = outsideOptions[index % outsideOptions.length];
  const availability = isBuy
    ? property.badge === "Chain free"
      ? "No onward chain"
      : "By arrangement"
    : property.badge?.toLowerCase().includes("available")
      ? property.badge
      : "Available by arrangement";

  return {
    ...property,
    summary: isBuy
      ? `A well-presented ${property.propertyType.toLowerCase()} in ${town}, offering practical living space, a straightforward layout and good access to local amenities and transport links.`
      : `A well-presented ${property.propertyType.toLowerCase()} available to rent in ${town}, with practical accommodation, useful local connections and a clear move-in process managed by the Wickford lettings team.`,
    features: [
      `${property.bedrooms} well-proportioned bedroom${property.bedrooms === 1 ? "" : "s"}`,
      `${property.bathrooms} bathroom${property.bathrooms === 1 ? "" : "s"}`,
      "Bright main living space",
      "Fitted kitchen with practical storage",
      outsideSpace,
      parking,
      `Convenient for ${town} amenities`,
      isBuy ? "Viewings available by appointment" : "Professionally managed application process",
    ],
    tenureLabel,
    councilTaxOrDeposit,
    epc,
    reference: `WA-${isBuy ? "S" : "L"}-${String(property.id).padStart(4, "0")}`,
    floorArea,
    parking,
    outsideSpace,
    heating: "Gas central heating",
    availability,
    localAuthority,
    descriptionParagraphs: [
      `This ${property.bedrooms}-bedroom ${property.propertyType.toLowerCase()} is positioned in ${town} and provides a practical arrangement of living and bedroom accommodation. The property is presented as a straightforward local home rather than a show property, with useful room proportions and scope for a buyer or tenant to make the space their own.`,
      `The main living accommodation includes a bright reception room and a fitted kitchen with storage and worktop space. The layout is designed for everyday use, with clear circulation between the principal rooms and access to the outside space where applicable.`,
      `${property.bedrooms === 1 ? "The bedroom is" : "The bedrooms are"} arranged away from the main living area, together with ${property.bathrooms === 1 ? "a family bathroom" : `${property.bathrooms} bathrooms`}. Storage and practical utility space are provided within the existing layout.`,
      `${outsideSpace} and ${parking.toLowerCase()} add to the day-to-day practicality of the property. The home is also within reach of local shops, schools, road links and public transport serving ${town} and the wider South Essex area.`,
      isBuy
        ? `The property is offered with ${tenureLabel.toLowerCase()} tenure. Buyers should confirm all legal, service-charge and boundary information through their solicitor before exchange of contracts.`
        : `The property is offered subject to referencing, affordability checks, right-to-rent checks and the landlord's final approval. The exact move-in date and tenancy terms will be confirmed before any holding payment is taken.`,
    ],
    roomDetails: [
      {
        name: "Entrance hall",
        description: "Entrance area with access to the principal ground-floor rooms and stairs or internal circulation to the remaining accommodation.",
      },
      {
        name: "Living room",
        description: "Main reception space with room for everyday seating and a useful outlook to the front or rear of the property.",
      },
      {
        name: "Kitchen",
        description: "Fitted kitchen with base and wall storage, work surfaces and space for the usual freestanding or integrated appliances.",
      },
      {
        name: property.bedrooms === 1 ? "Bedroom" : "Bedrooms",
        description: `${property.bedrooms} bedroom${property.bedrooms === 1 ? "" : "s"} arranged to provide a practical mix of main, double and single accommodation depending on the property type.`,
      },
      {
        name: property.bathrooms === 1 ? "Bathroom" : "Bathrooms",
        description: `${property.bathrooms} bathroom${property.bathrooms === 1 ? "" : "s"} with the usual sanitary fittings. Exact fixtures and condition should be checked during the viewing.`,
      },
      {
        name: "Outside",
        description: `${outsideSpace}. Boundaries, access, sheds, garages and any shared areas should be confirmed through the legal or tenancy process.`,
      },
    ],
    importantInformation: isBuy
      ? [
          `Tenure: ${tenureLabel}. Full title and lease information must be confirmed by the buyer's solicitor.`,
          `Council tax: ${councilTaxOrDeposit}. Charges should be checked directly with the local authority.`,
          `${epc}. The full certificate can be requested from the selling agent.`,
          "Measurements, photographs and descriptions are supplied as a guide and are not a substitute for a survey or legal enquiries.",
        ]
      : [
          `${tenureLabel}. Longer or shorter terms are subject to landlord approval.`,
          `${councilTaxOrDeposit}. Holding-deposit and permitted-payment information will be supplied before an application proceeds.`,
          `${epc}. Applicants can request the full certificate before committing to the tenancy.`,
          "All applicants are subject to referencing, affordability, identity and right-to-rent checks.",
        ],
    locationDescription: `${property.location} is positioned within the ${town} area, with access to local shopping, schools, everyday services and road connections across South Essex. Exact walking and driving distances should be checked independently according to the buyer's or tenant's own requirements.`,
  };
});

export function getProperty(mode: ListingMode, id: string | number) {
  return PROPERTIES.find(
    (property) => property.mode === mode && String(property.id) === String(id),
  );
}

export function getPropertyGallery(property: Property) {
  return [property.image, ...interiorImages];
}
