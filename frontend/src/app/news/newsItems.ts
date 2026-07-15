export type NewsSectionInput = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  tip?: string;
  image?: string;
  imageAlt?: string;
};

export type NewsItemInput = {
  title: string;
  image: string;
  imageAlt?: string;
  category?: string;
  date?: string;
  intro: string;
  sections: NewsSectionInput[];
  conclusion?: string;
};

export const NEWS_ITEMS = [
  {
    title: "Preparing your Wickford home for the market",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Well-presented family home ready for sale",
    category: "Selling",
    date: "2026-07-14",
    intro:
      "Small, practical improvements can make viewings clearer and help buyers understand the value of a home without making the property feel over-staged.",
    sections: [
      {
        heading: "Start with the first impression",
        paragraphs: [
          "Buyers form an opinion before they reach the front door. Clear access, tidy planting and a clean entrance help the viewing begin positively.",
          "The goal is not to make the property look unused. It is to remove distractions so buyers can focus on the space and condition.",
        ],
        bullets: [
          "Clear the driveway and entrance",
          "Clean windows and external doors",
          "Deal with obvious minor repairs",
        ],
      },
      {
        heading: "Make each room easy to understand",
        paragraphs: [
          "Rooms should have an obvious purpose and a sensible route through them. Removing surplus furniture can make proportions easier to judge.",
          "Natural light, working lamps and neutral presentation usually matter more than expensive last-minute decoration.",
        ],
        tip: "Ask someone who does not live in the property to walk through it and point out anything that feels unclear or crowded.",
      },
    ],
    conclusion:
      "A well-prepared launch gives the photography, listing and first round of viewings the strongest possible start.",
  },
  {
    title: "What buyers should check before making an offer",
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Buyer viewing a bright residential property",
    category: "Buying",
    date: "2026-07-12",
    intro:
      "An offer should reflect more than the asking price. Buyers should consider condition, likely expenditure, chain position and how the property fits their actual plans.",
    sections: [
      {
        heading: "Look beyond the presentation",
        paragraphs: [
          "Fresh decoration can improve a viewing, but buyers should still check the age and condition of heating, windows, roofing and visible services.",
          "Questions raised during the viewing can be followed up before an offer is finalised.",
        ],
        bullets: [
          "Ask what is included in the sale",
          "Check parking and access arrangements",
          "Understand any onward chain",
        ],
      },
      {
        heading: "Keep the offer position clear",
        paragraphs: [
          "A seller will normally want to understand the buyer's mortgage position, deposit, chain and preferred timescale.",
          "Providing accurate information early can make an offer easier to assess and reduce delays after it is accepted.",
        ],
      },
    ],
    conclusion:
      "A clear offer supported by a realistic buying position is usually more useful than a higher figure with unresolved complications.",
  },
  {
    title: "A straightforward guide to rental applications",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Modern rental property interior",
    category: "Renting",
    date: "2026-07-10",
    intro:
      "Understanding the application process before a suitable property appears can help tenants respond quickly and provide the right information.",
    sections: [
      {
        heading: "Information normally required",
        paragraphs: [
          "Applicants are commonly asked for identification, address history, employment or income information and details of any other proposed occupiers.",
          "Requirements can vary, so it is important to answer accurately rather than guessing what the landlord may accept.",
        ],
        bullets: [
          "Proof of identity",
          "Income and employment details",
          "Previous address information",
        ],
      },
      {
        heading: "Read the tenancy information carefully",
        paragraphs: [
          "Before committing, check the rent, deposit, proposed start date, tenancy length and any restrictions or responsibilities.",
          "Questions about pets, parking, furnishings or maintenance should be raised before the agreement is signed.",
        ],
      },
    ],
    conclusion:
      "A complete and accurate application gives the landlord and agent the clearest basis for a decision.",
  },
  {
    title: "Choosing between managed and let-only service",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Landlord reviewing property management information",
    category: "Landlords",
    date: "2026-07-08",
    intro:
      "The right service depends on how involved a landlord wants to be after the tenant moves in and how much time is available for ongoing administration.",
    sections: [
      {
        heading: "What let only usually covers",
        paragraphs: [
          "A let-only service commonly focuses on valuation, marketing, viewings, applicant qualification, referencing and setting up the tenancy.",
          "After handover, the landlord normally manages rent, maintenance and tenant communication directly.",
        ],
      },
      {
        heading: "What management adds",
        paragraphs: [
          "A managed service provides an ongoing point of contact for the tenant and landlord throughout the tenancy.",
          "The exact responsibilities and fees should be confirmed clearly before marketing begins.",
        ],
        bullets: [
          "Rent administration",
          "Maintenance coordination",
          "Routine tenancy communication",
        ],
      },
    ],
    conclusion:
      "The best choice is the service level that matches the landlord's experience, availability and preferred level of control.",
  },
  {
    title: "How local pricing evidence supports a valuation",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Property valuation notes and local market evidence",
    category: "Market",
    date: "2026-07-06",
    intro:
      "A useful valuation combines nearby evidence with the individual features, condition and likely buyer demand for the property.",
    sections: [
      {
        heading: "Comparable sales need context",
        paragraphs: [
          "A nearby sale is most useful when the property type, size, condition and location are genuinely comparable.",
          "Headline prices alone can be misleading where one home has been extended, modernised or sold under different circumstances.",
        ],
      },
      {
        heading: "Current competition also matters",
        paragraphs: [
          "Buyers compare a new instruction with the other homes available at the same time.",
          "Pricing should therefore consider both completed sales and the alternatives buyers can view now.",
        ],
        tip: "A written launch plan should explain the proposed price and how the response will be reviewed after the first viewings.",
      },
    ],
    conclusion:
      "The strongest valuation is evidence-led, property-specific and clear about the assumptions behind the recommended range.",
  },
  {
    title: "What happens after an offer is accepted",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Property sale paperwork being reviewed",
    category: "Selling",
    date: "2026-07-04",
    intro:
      "Accepting an offer is an important stage, but the legal work, mortgage process and wider chain still need active coordination.",
    sections: [
      {
        heading: "The memorandum of sale",
        paragraphs: [
          "Once the parties and solicitors are confirmed, the agent issues the sale details needed for the legal process to begin.",
          "Accurate contact information and clear chain details help avoid an unnecessary delay at the start.",
        ],
      },
      {
        heading: "Keeping the chain aligned",
        paragraphs: [
          "Progress is rarely identical across every transaction in a chain. Regular communication helps identify outstanding searches, enquiries, mortgage work or signatures.",
          "Proposed dates should not be treated as fixed until the solicitors confirm exchange.",
        ],
        bullets: [
          "Mortgage valuation and offer",
          "Searches and enquiries",
          "Exchange and completion dates",
        ],
      },
    ],
    conclusion:
      "Consistent sales progression helps the seller understand what is outstanding and who is responsible for the next action.",
  },
  {
    title: "Buying a new-build home in South Essex",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "New-build homes on a residential development",
    category: "New homes",
    date: "2026-07-02",
    intro:
      "New-build purchases can involve reservation deadlines, staged releases and shorter exchange timescales than a typical resale transaction.",
    sections: [
      {
        heading: "Compare the plot as well as the house type",
        paragraphs: [
          "Position, outlook, parking, garden dimensions and nearby construction can vary between plots using the same floorplan.",
          "Buyers should confirm the specification and any optional extras in writing.",
        ],
      },
      {
        heading: "Prepare for the reservation timetable",
        paragraphs: [
          "The developer may expect solicitors and mortgage arrangements to progress quickly after reservation.",
          "Using advisers who understand new-build timescales can help keep the purchase on track.",
        ],
        bullets: [
          "Reservation fee and deadline",
          "Included specification",
          "Estimated build completion",
        ],
      },
    ],
    conclusion:
      "Clear information at reservation stage makes it easier to compare developments and understand the commitment being made.",
  },
  {
    title: "Questions to ask at a property viewing",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=84",
    imageAlt: "Bright living room during a property viewing",
    category: "Buying",
    date: "2026-06-30",
    intro:
      "A viewing is easier to use well when buyers arrive with a short list of practical questions rather than trying to remember everything afterwards.",
    sections: [
      {
        heading: "Ask about the property",
        paragraphs: [
          "Useful questions include the age of major improvements, what fixtures are included and whether the seller is aware of any important maintenance history.",
          "Measurements and marketing particulars should be checked rather than treated as a substitute for a survey.",
        ],
        bullets: [
          "Reason for moving",
          "Length of ownership",
          "Parking and access",
        ],
      },
      {
        heading: "Ask about the transaction",
        paragraphs: [
          "The seller's chain position and preferred timescale can affect whether the property suits the buyer's plans.",
          "Where information is not available during the viewing, the agent can follow it up afterwards.",
        ],
      },
    ],
    conclusion:
      "Good viewing notes make it easier to compare homes objectively and decide which questions need a second look.",
  },
] satisfies NewsItemInput[];
