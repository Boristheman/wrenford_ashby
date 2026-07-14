export type PageSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

export type MarketingPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sections: PageSection[];
};

export const pageContent: Record<
  "buy" | "rent" | "sell" | "newHomes" | "landlords" | "about",
  MarketingPageContent
> = {
  buy: {
    eyebrow: "Buying in South Essex",
    title: "A clearer way to find your next home.",
    intro:
      "Browse local homes, register your requirements and arrange viewings with a team that knows the roads, schools and price points.",
    heroImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2200&q=88",
    primaryCta: {
      label: "Browse properties",
      href: "#properties-for-sale",
    },
    secondaryCta: {
      label: "Register for alerts",
      href: "#register-alerts",
    },
    sections: [
      {
        id: "properties-for-sale",
        eyebrow: "Available homes",
        title: "Properties for sale",
        description:
          "A starter mockup for the full sales search. Replace these cards with your live property feed when it is ready.",
        points: [
          "Wickford, Rayleigh and Basildon",
          "Clear asking prices and key details",
          "Viewing requests from every listing",
        ],
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Register your requirements",
        ctaHref: "#register-alerts",
      },
      {
        id: "new-to-market",
        eyebrow: "Latest instructions",
        title: "New to the market",
        description:
          "Feature the newest instructions here before visitors reach the complete property results.",
        points: [
          "Recently added homes",
          "Priority viewing prompts",
          "Local market context",
        ],
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "See recent homes",
        ctaHref: "#properties-for-sale",
      },
      {
        id: "register-alerts",
        eyebrow: "Stay ahead",
        title: "Register for property alerts",
        description:
          "Collect the buyer's preferred areas, price range and property type, then notify them when something suitable appears.",
        points: [
          "Area and postcode preferences",
          "Budget and bedroom requirements",
          "Email or telephone follow-up",
        ],
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Register now",
        ctaHref: "/contact",
      },
      {
        id: "book-viewing",
        eyebrow: "See it in person",
        title: "Book a viewing",
        description:
          "A simple viewing request area with room for preferred dates, contact details and the property reference.",
        points: [
          "Preferred dates and times",
          "Property reference",
          "Local team confirmation",
        ],
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Arrange a viewing",
        ctaHref: "/contact",
      },
    ],
  },
  rent: {
    eyebrow: "Renting in South Essex",
    title: "Find somewhere that feels like home.",
    intro:
      "Explore available rentals, understand the application process and get practical help from a local lettings team.",
    heroImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2200&q=88",
    primaryCta: {
      label: "See homes to rent",
      href: "#homes-to-rent",
    },
    secondaryCta: {
      label: "Register for alerts",
      href: "#rental-alerts",
    },
    sections: [
      {
        id: "homes-to-rent",
        eyebrow: "Available now",
        title: "Homes to rent",
        description:
          "A mock rental results area for apartments, terraces and family homes across the local patch.",
        points: [
          "Monthly rent shown clearly",
          "Deposit and availability details",
          "Direct viewing requests",
        ],
        image:
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Register for a rental",
        ctaHref: "#rental-alerts",
      },
      {
        id: "rental-alerts",
        eyebrow: "Hear first",
        title: "Register for rental alerts",
        description:
          "Collect tenant requirements and contact details so the lettings team can match applicants quickly.",
        points: [
          "Preferred towns and postcodes",
          "Move-in date and budget",
          "Bedrooms, pets and parking",
        ],
        image:
          "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Register your details",
        ctaHref: "/contact",
      },
      {
        id: "tenant-information",
        eyebrow: "Before applying",
        title: "Tenant information",
        description:
          "Explain referencing, deposits, tenancy documents and what applicants should prepare.",
        points: [
          "Referencing checklist",
          "Deposit information",
          "Moving-in process",
        ],
        image:
          "https://images.unsplash.com/photo-1600566752734-2a0cd1c6d6e7?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Ask a tenant question",
        ctaHref: "/contact",
      },
      {
        id: "report-repair",
        eyebrow: "Existing tenants",
        title: "Report a repair",
        description:
          "Provide a clear route for managed tenants to report maintenance issues and upload supporting photographs.",
        points: [
          "Property and contact details",
          "Issue priority",
          "Photo upload placeholder",
        ],
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Report an issue",
        ctaHref: "/contact",
      },
    ],
  },
  sell: {
    eyebrow: "Selling in South Essex",
    title: "A realistic valuation and a sensible plan.",
    intro:
      "Start with honest local evidence, strong presentation and clear updates from valuation through to completion.",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=88",
    primaryCta: {
      label: "Book a valuation",
      href: "#book-valuation",
    },
    secondaryCta: {
      label: "How we sell",
      href: "#selling-your-home",
    },
    sections: [
      {
        id: "book-valuation",
        eyebrow: "Start here",
        title: "Book a valuation",
        description:
          "Use this section for a postcode-first valuation request and a brief explanation of what the appointment includes.",
        points: [
          "Recent comparable evidence",
          "Sales and rental valuations",
          "No inflated instruction figure",
        ],
        image:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Request a valuation",
        ctaHref: "/contact",
      },
      {
        id: "selling-your-home",
        eyebrow: "The process",
        title: "Selling your home",
        description:
          "A relaxed overview of preparation, launch, viewings, offers and the move through to completion.",
        points: [
          "Preparation and pricing",
          "Viewings and feedback",
          "Offer negotiation",
        ],
        image:
          "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Talk through your move",
        ctaHref: "/contact",
      },
      {
        id: "property-marketing",
        eyebrow: "Presentation",
        title: "Marketing your property",
        description:
          "Show the photography, floorplans, portal coverage and local promotion used to put a home in front of the right buyers.",
        points: [
          "Professional photography",
          "Clear floorplans and details",
          "Portal and local marketing",
        ],
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "See our approach",
        ctaHref: "/contact",
      },
      {
        id: "sales-progression",
        eyebrow: "After the offer",
        title: "Sales progression",
        description:
          "Explain how the team keeps buyers, sellers, solicitors and mortgage advisers moving in the same direction.",
        points: [
          "Regular chain updates",
          "Solicitor communication",
          "Clear next steps",
        ],
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Speak to the sales team",
        ctaHref: "/contact",
      },
    ],
  },
  newHomes: {
    eyebrow: "New homes",
    title: "New developments, explained clearly.",
    intro:
      "Discover current schemes, register for upcoming releases and get practical guidance on buying a new-build home.",
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88",
    primaryCta: {
      label: "Current developments",
      href: "#current-developments",
    },
    secondaryCta: {
      label: "Register interest",
      href: "#upcoming-releases",
    },
    sections: [
      {
        id: "current-developments",
        eyebrow: "Available now",
        title: "Current developments",
        description:
          "A landing area for active local schemes, available plots and links to the relevant development details.",
        points: [
          "Development overview",
          "Available plots",
          "Show-home appointments",
        ],
        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Arrange a visit",
        ctaHref: "/contact",
      },
      {
        id: "upcoming-releases",
        eyebrow: "Coming soon",
        title: "Upcoming releases",
        description:
          "Capture early interest before the next homes or phases are formally launched.",
        points: [
          "Priority registration",
          "Launch notifications",
          "Buyer requirements",
        ],
        image:
          "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Register early",
        ctaHref: "/contact",
      },
      {
        id: "buying-new-build",
        eyebrow: "Buyer guidance",
        title: "Buying a new-build",
        description:
          "Explain reservations, exchange deadlines, warranties, snagging and how the process differs from a traditional purchase.",
        points: [
          "Reservation and exchange",
          "Warranty information",
          "Completion and handover",
        ],
        image:
          "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Ask a new-build question",
        ctaHref: "/contact",
      },
      {
        id: "developer-services",
        eyebrow: "For developers",
        title: "Developer services",
        description:
          "A concise introduction to local pricing advice, launch strategy, sales suites and ongoing development marketing.",
        points: [
          "Local pricing advice",
          "Launch and release strategy",
          "Buyer registration management",
        ],
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Discuss a development",
        ctaHref: "/contact",
      },
    ],
  },
  landlords: {
    eyebrow: "For local landlords",
    title: "Letting and management without loose ends.",
    intro:
      "Choose the right level of support, understand the likely rent and keep communication straightforward throughout the tenancy.",
    heroImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=88",
    primaryCta: {
      label: "Rental valuation",
      href: "#rental-valuation",
    },
    secondaryCta: {
      label: "Management options",
      href: "#fully-managed",
    },
    sections: [
      {
        id: "rental-valuation",
        eyebrow: "Know the market",
        title: "Rental valuation",
        description:
          "A local rental assessment based on comparable homes, likely tenant demand and the condition of the property.",
        points: [
          "Likely monthly rent",
          "Local applicant demand",
          "Preparation recommendations",
        ],
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Request a rental valuation",
        ctaHref: "/contact",
      },
      {
        id: "tenant-find",
        eyebrow: "Find the right tenant",
        title: "Tenant-find service",
        description:
          "Marketing, viewings, referencing and tenancy preparation for landlords who want to manage the property themselves.",
        points: [
          "Property marketing",
          "Viewings and applications",
          "Referencing and documents",
        ],
        image:
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Ask about tenant-find",
        ctaHref: "/contact",
      },
      {
        id: "fully-managed",
        eyebrow: "Ongoing support",
        title: "Fully managed service",
        description:
          "A mockup for rent collection, tenant communication, inspections, maintenance and tenancy administration.",
        points: [
          "Day-to-day tenant contact",
          "Maintenance coordination",
          "Regular landlord updates",
        ],
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Compare management options",
        ctaHref: "/contact",
      },
      {
        id: "switching-agent",
        eyebrow: "A smoother handover",
        title: "Switching agent",
        description:
          "Explain how Wrenford Ashby can take over an existing tenancy with a clear handover and minimal disruption.",
        points: [
          "Document and deposit review",
          "Tenant communication",
          "Managed handover",
        ],
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Discuss switching",
        ctaHref: "/contact",
      },
    ],
  },
  about: {
    eyebrow: "About Wrenford Ashby",
    title: "Local knowledge without the estate-agent theatre.",
    intro:
      "A mock company page for the story, people, values and South Essex communities behind the brand.",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=88",
    primaryCta: {
      label: "Meet the team",
      href: "#meet-the-team",
    },
    secondaryCta: {
      label: "Our local area",
      href: "#our-area",
    },
    sections: [
      {
        id: "our-story",
        eyebrow: "Our story",
        title: "Independent, local and straightforward",
        description:
          "Use this area for the real company history, including the 24-year experience message and how the business serves local clients.",
        points: [
          "Independent local advice",
          "Sales and lettings expertise",
          "Long-term client relationships",
        ],
        image:
          "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Speak to us",
        ctaHref: "/contact",
      },
      {
        id: "meet-the-team",
        eyebrow: "The people",
        title: "Meet the team",
        description:
          "Replace this mock section with team portraits, names, roles and short biographies.",
        points: [
          "Sales specialists",
          "Lettings and management",
          "Local progression support",
        ],
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Contact the office",
        ctaHref: "/contact",
      },
      {
        id: "our-area",
        eyebrow: "Our patch",
        title: "The areas we know",
        description:
          "Wickford, Rayleigh, Basildon, Billericay, Pitsea and South Woodham Ferrers can each become dedicated area guides.",
        points: [
          "Local market context",
          "Roads, schools and transport",
          "Sales and rental trends",
        ],
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Ask about an area",
        ctaHref: "/contact",
      },
      {
        id: "our-approach",
        eyebrow: "How we work",
        title: "Clear advice and useful updates",
        description:
          "A simple values section focused on realistic pricing, communication and helping clients make informed decisions.",
        points: [
          "Honest pricing",
          "Responsive communication",
          "Practical next steps",
        ],
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=84",
        ctaLabel: "Start a conversation",
        ctaHref: "/contact",
      },
    ],
  },
};
