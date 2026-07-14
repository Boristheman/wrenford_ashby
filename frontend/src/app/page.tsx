"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type SearchMode = "buy" | "rent";

type Property = {
  id: number;
  mode: SearchMode;
  status: "For Sale" | "To Let";
  location: string;
  area: string;
  price: number;
  priceLabel: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
};

const properties: Property[] = [
  {
    id: 1,
    mode: "buy",
    status: "For Sale",
    location: "Nevendon Road",
    area: "Wickford, Essex",
    price: 325000,
    priceLabel: "£325,000",
    propertyType: "Three-bedroom semi-detached",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 2,
    mode: "buy",
    status: "For Sale",
    location: "London Road",
    area: "Rayleigh, Essex",
    price: 385000,
    priceLabel: "£385,000",
    propertyType: "Three-bedroom end terrace",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 3,
    mode: "buy",
    status: "For Sale",
    location: "The Knares",
    area: "Basildon, Essex",
    price: 265000,
    priceLabel: "£265,000",
    propertyType: "Two-bedroom terraced home",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 5,
    mode: "buy",
    status: "For Sale",
    location: "Runwell Road",
    area: "Wickford, Essex",
    price: 475000,
    priceLabel: "£475,000",
    propertyType: "Four-bedroom detached home",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 6,
    mode: "buy",
    status: "For Sale",
    location: "Hawk Hill",
    area: "Battlesbridge, Essex",
    price: 425000,
    priceLabel: "£425,000",
    propertyType: "Three-bedroom detached bungalow",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 7,
    mode: "buy",
    status: "For Sale",
    location: "High Street",
    area: "Billericay, Essex",
    price: 295000,
    priceLabel: "£295,000",
    propertyType: "Two-bedroom character cottage",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 8,
    mode: "buy",
    status: "For Sale",
    location: "Downham Road",
    area: "Ramsden Heath, Essex",
    price: 550000,
    priceLabel: "£550,000",
    propertyType: "Four-bedroom family home",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 9,
    mode: "buy",
    status: "For Sale",
    location: "Wolsey Park",
    area: "Rayleigh, Essex",
    price: 410000,
    priceLabel: "£410,000",
    propertyType: "Three-bedroom modern home",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 10,
    mode: "buy",
    status: "For Sale",
    location: "Chapel Street",
    area: "Billericay, Essex",
    price: 340000,
    priceLabel: "£340,000",
    propertyType: "Three-bedroom terraced home",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 11,
    mode: "buy",
    status: "For Sale",
    location: "Menzies Avenue",
    area: "Basildon, Essex",
    price: 285000,
    priceLabel: "£285,000",
    propertyType: "Two-bedroom end terrace",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 12,
    mode: "buy",
    status: "For Sale",
    location: "Crouch View",
    area: "South Woodham Ferrers, Essex",
    price: 445000,
    priceLabel: "£445,000",
    propertyType: "Four-bedroom detached home",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 13,
    mode: "buy",
    status: "For Sale",
    location: "Maple Way",
    area: "Pitsea, Essex",
    price: 315000,
    priceLabel: "£315,000",
    propertyType: "Three-bedroom semi-detached",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 4,
    mode: "rent",
    status: "To Let",
    location: "Southend Road",
    area: "Wickford, Essex",
    price: 1350,
    priceLabel: "£1,350 pcm",
    propertyType: "Two-bedroom apartment",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 14,
    mode: "rent",
    status: "To Let",
    location: "Station Avenue",
    area: "Wickford, Essex",
    price: 1650,
    priceLabel: "£1,650 pcm",
    propertyType: "Three-bedroom family home",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 15,
    mode: "rent",
    status: "To Let",
    location: "Crown Hill",
    area: "Rayleigh, Essex",
    price: 1200,
    priceLabel: "£1,200 pcm",
    propertyType: "One-bedroom apartment",
    bedrooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 16,
    mode: "rent",
    status: "To Let",
    location: "Church Road",
    area: "Basildon, Essex",
    price: 1450,
    priceLabel: "£1,450 pcm",
    propertyType: "Two-bedroom terraced home",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 17,
    mode: "rent",
    status: "To Let",
    location: "Norsey Road",
    area: "Billericay, Essex",
    price: 2100,
    priceLabel: "£2,100 pcm",
    propertyType: "Four-bedroom detached home",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 18,
    mode: "rent",
    status: "To Let",
    location: "Crouch Beck",
    area: "South Woodham Ferrers, Essex",
    price: 1750,
    priceLabel: "£1,750 pcm",
    propertyType: "Three-bedroom semi-detached",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 19,
    mode: "rent",
    status: "To Let",
    location: "Rectory Lane",
    area: "Pitsea, Essex",
    price: 1300,
    priceLabel: "£1,300 pcm",
    propertyType: "Two-bedroom maisonette",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566752734-2a0cd1c6d6e7?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 20,
    mode: "rent",
    status: "To Let",
    location: "Arterial Road",
    area: "Rayleigh, Essex",
    price: 1850,
    priceLabel: "£1,850 pcm",
    propertyType: "Three-bedroom detached home",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 21,
    mode: "rent",
    status: "To Let",
    location: "Queens Park Avenue",
    area: "Billericay, Essex",
    price: 1550,
    priceLabel: "£1,550 pcm",
    propertyType: "Two-bedroom modern home",
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 22,
    mode: "rent",
    status: "To Let",
    location: "Long Riding",
    area: "Basildon, Essex",
    price: 1400,
    priceLabel: "£1,400 pcm",
    propertyType: "Two-bedroom end terrace",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 23,
    mode: "rent",
    status: "To Let",
    location: "The Willows",
    area: "Wickford, Essex",
    price: 1950,
    priceLabel: "£1,950 pcm",
    propertyType: "Three-bedroom townhouse",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=84",
  },
  {
    id: 24,
    mode: "rent",
    status: "To Let",
    location: "Burnham Road",
    area: "South Woodham Ferrers, Essex",
    price: 2250,
    priceLabel: "£2,250 pcm",
    propertyType: "Four-bedroom family home",
    bedrooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=84",
  }
];

type DropdownMenu = {
  label: string;
  href: string;
  links: Array<{ label: string; href: string }>;
};

const dropdownMenus: DropdownMenu[] = [
  {
    label: "Buy",
    href: "/buy",
    links: [
      {
        label: "Properties for sale",
        href: "/buy#properties-for-sale",
      },
      {
        label: "New to the market",
        href: "/buy#new-to-market",
      },
      {
        label: "Register for alerts",
        href: "/buy#register-alerts",
      },
      {
        label: "Book a viewing",
        href: "/buy#book-viewing",
      },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    links: [
      {
        label: "Homes to rent",
        href: "/rent#homes-to-rent",
      },
      {
        label: "Register for rental alerts",
        href: "/rent#rental-alerts",
      },
      {
        label: "Tenant information",
        href: "/rent#tenant-information",
      },
      {
        label: "Report a repair",
        href: "/rent#report-repair",
      },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    links: [
      {
        label: "Book a valuation",
        href: "/sell#book-valuation",
      },
      {
        label: "Selling your home",
        href: "/sell#selling-your-home",
      },
      {
        label: "Marketing your property",
        href: "/sell#property-marketing",
      },
      {
        label: "Sales progression",
        href: "/sell#sales-progression",
      },
    ],
  },
  {
    label: "New Homes",
    href: "/new-homes",
    links: [
      {
        label: "Current developments",
        href: "/new-homes#current-developments",
      },
      {
        label: "Upcoming releases",
        href: "/new-homes#upcoming-releases",
      },
      {
        label: "Buying a new-build",
        href: "/new-homes#buying-new-build",
      },
      {
        label: "Developer services",
        href: "/new-homes#developer-services",
      },
    ],
  },
  {
    label: "Landlords",
    href: "/landlords",
    links: [
      {
        label: "Rental valuation",
        href: "/landlords#rental-valuation",
      },
      {
        label: "Tenant-find service",
        href: "/landlords#tenant-find",
      },
      {
        label: "Fully managed service",
        href: "/landlords#fully-managed",
      },
      {
        label: "Switching agent",
        href: "/landlords#switching-agent",
      },
    ],
  },
];

const mobileNavItems = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

const areas = [
  "Wickford",
  "Rayleigh",
  "Basildon",
  "Billericay",
  "Pitsea",
  "South Woodham Ferrers",
];

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8.2 3.8 10 8.2 7.8 9.6a14 14 0 0 0 6.6 6.6l1.4-2.2 4.4 1.8v3a2 2 0 0 1-2 2C9.9 20.8 3.2 14.1 3.2 5.8a2 2 0 0 1 2-2h3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
    >
      <path
        d="M20.8 4.8a5.4 5.4 0 0 0-7.7 0L12 5.9l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7l1.1 1.1 7.7 7.7 7.7-7.7 1.1-1.1a5.4 5.4 0 0 0 0-7.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrimaryButton({
  href,
  children,
  pale = false,
}: {
  href: string;
  children: ReactNode;
  pale?: boolean;
}) {
  return (
    <a
      href={href}
      style={{ color: pale ? "#12343B" : "#ffffff" }}
      className={`inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5 ${
        pale
          ? "bg-white !text-[#12343B] hover:bg-[#DDE8E4] hover:!text-[#12343B]"
          : "bg-[#12343B] !text-white visited:!text-white hover:bg-[#2D5B5D] hover:!text-white"
      }`}
    >
      <span style={{ color: pale ? "#12343B" : "#ffffff" }}>
        {children}
      </span>
      <ArrowIcon />
    </a>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#5D7F7B]">
      {children}
    </p>
  );
}

function NavReel({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="block h-7 overflow-hidden">
        <span
          className={`block transition-transform duration-[560ms] ease-[cubic-bezier(.16,1,.3,1)] will-change-transform group-hover:-translate-y-7 group-focus-visible:-translate-y-7 ${
            active ? "-translate-y-7" : "translate-y-0"
          }`}
        >
          <span className="block h-7 whitespace-nowrap leading-7">{label}</span>
          <span className="block h-7 whitespace-nowrap leading-7 text-[#6B908D]">
            {label}
          </span>
        </span>
      </span>
    </>
  );
}

function PropertyRailCard({
  property,
  favourite,
  onToggleFavourite,
}: {
  property: Property;
  favourite: boolean;
  onToggleFavourite: () => void;
}) {
  return (
    <article className="group w-[285px] shrink-0 overflow-hidden border border-[#17383C]/10 bg-white shadow-[0_10px_30px_rgba(23,56,60,0.08)] sm:w-[330px] lg:w-[360px]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#DDE8E4]">
        <img
          src={property.image}
          alt={`${property.propertyType} in ${property.area}`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />

        <span className="absolute left-3 top-3 bg-[#17383C] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white">
          {property.status}
        </span>

        <button
          type="button"
          aria-label={
            favourite
              ? `Remove ${property.area} from favourites`
              : `Add ${property.area} to favourites`
          }
          onClick={onToggleFavourite}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center border backdrop-blur-sm transition ${
            favourite
              ? "border-[#BFD3CD] bg-[#BFD3CD] text-[#17383C]"
              : "border-white/70 bg-[#17383C]/55 text-white hover:bg-[#17383C]"
          }`}
        >
          <HeartIcon filled={favourite} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black uppercase tracking-[0.12em] text-[#6B908D]">
              {property.propertyType}
            </p>
            <h3 className="mt-1 truncate text-xl font-black tracking-[-0.025em] text-[#17383C]">
              {property.location}
            </h3>
            <p className="mt-1 truncate text-xs text-[#17383C]/52">
              {property.area}
            </p>
          </div>

          <p className="shrink-0 text-right text-base font-black text-[#17383C]">
            {property.priceLabel}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#17383C]/10 pt-4">
          <div className="flex gap-4 text-xs font-bold text-[#17383C]/58">
            <span>{property.bedrooms} bed</span>
            <span>{property.bathrooms} bath</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#17383C] transition hover:text-[#6B908D]"
          >
            View
            <ArrowIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>("buy");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("0");
  const [minimumPrice, setMinimumPrice] = useState("0");
  const [search, setSearch] = useState({
    mode: "buy" as SearchMode,
    location: "",
    bedrooms: 0,
    minimumPrice: 0,
  });
  const [favourites, setFavourites] = useState<Set<number>>(new Set());
  const [propertyShowcaseVisible, setPropertyShowcaseVisible] = useState(false);
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  const [valuationSent, setValuationSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHeroReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(
      "wrenford-ashby-cookie-preference",
    );

    if (savedPreference) {
      setCookieNoticeOpen(false);
    }
  }, []);

  useEffect(() => {
    const showcase = document.getElementById("properties");

    if (!showcase) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPropertyShowcaseVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(showcase);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const testimonial = document.getElementById("testimonial");

    if (!testimonial) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(testimonial);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.location.hash === "#top") {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }
  }, []);

  useEffect(() => {
    const updateHeaderVisibility = () => {
      const landingHeader = document.getElementById("hero-header");
      const shouldShow = landingHeader
        ? landingHeader.getBoundingClientRect().bottom <= 0
        : window.scrollY >= 152;

      setHeaderVisible(shouldShow);

      if (!shouldShow) {
        setActiveMegaMenu(null);
      }
    };

    updateHeaderVisibility();

    window.addEventListener("scroll", updateHeaderVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", updateHeaderVisibility);
      window.removeEventListener("resize", updateHeaderVisibility);
    };
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesMode = property.mode === search.mode;
      const matchesLocation =
        !search.location ||
        `${property.location} ${property.area}`
          .toLowerCase()
          .includes(search.location.toLowerCase());
      const matchesBedrooms = property.bedrooms >= search.bedrooms;
      const matchesPrice = property.price >= search.minimumPrice;

      return matchesMode && matchesLocation && matchesBedrooms && matchesPrice;
    });
  }, [search]);

  const propertyRailRows = useMemo(() => {
    const saleProperties = properties.filter(
      (property) => property.mode === "buy",
    );
    const rentalProperties = properties.filter(
      (property) => property.mode === "rent",
    );

    const repeatForRail = (pool: Property[]) =>
      Array.from({ length: 6 }, (_, index) => pool[index % pool.length]);

    return [
      repeatForRail(saleProperties),
      repeatForRail(rentalProperties),
    ];
  }, []);

  const priceOptions =
    searchMode === "buy"
      ? [
          ["0", "No minimum"],
          ["200000", "£200,000"],
          ["250000", "£250,000"],
          ["300000", "£300,000"],
          ["350000", "£350,000"],
          ["400000", "£400,000"],
        ]
      : [
          ["0", "No minimum"],
          ["900", "£900 pcm"],
          ["1100", "£1,100 pcm"],
          ["1300", "£1,300 pcm"],
          ["1500", "£1,500 pcm"],
        ];

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch({
      mode: searchMode,
      location: location.trim(),
      bedrooms: Number(bedrooms),
      minimumPrice: Number(minimumPrice),
    });
    document
      .getElementById("properties")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFavourite = (id: number) => {
    setFavourites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const saveCookiePreference = (preference: "all" | "essential") => {
    window.localStorage.setItem(
      "wrenford-ashby-cookie-preference",
      preference,
    );

    document.cookie = `wa_cookie_preference=${preference}; path=/; max-age=31536000; SameSite=Lax`;
    setCookieNoticeOpen(false);
  };

  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]"
    >
      <style>{`
        @keyframes wa-property-rail-left {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes wa-property-rail-right {
          from {
            transform: translate3d(-50%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .wa-property-track-left {
          animation: wa-property-rail-left 82s linear infinite;
        }

        .wa-property-track-right {
          animation: wa-property-rail-right 90s linear infinite;
        }

        .wa-property-rail:hover .wa-property-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-property-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="relative z-[70] bg-[#0D2529] text-white">
        <div className="mx-auto flex min-h-10 max-w-[1480px] items-center justify-between gap-4 px-5 py-2 text-xs sm:px-8 lg:px-12">
          <p className="hidden sm:block">
            Independent estate agents for Wickford and South Essex
          </p>
          <div className="flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-end">
            <span className="text-white/70">Mon–Sat</span>
            <a
              href="tel:01268000000"
              className="inline-flex items-center gap-2 font-bold transition hover:text-[#BFD3CD]"
            >
              <PhoneIcon />
              01268 000 000
            </a>
          </div>
        </div>
      </div>

      <header
        onMouseLeave={() => setActiveMegaMenu(null)}
        className={`fixed left-0 right-0 top-0 z-[80] border-b border-[#17383C]/10 bg-white text-[#17383C] shadow-[0_12px_35px_rgba(13,37,41,0.12)] backdrop-blur-md will-change-transform transition-[transform,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
          headerVisible || menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex h-[96px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            onMouseEnter={() => setActiveMegaMenu(null)}
            onFocus={() => setActiveMegaMenu(null)}
            aria-label="Wrenford Ashby home"
            className="flex shrink-0 items-center"
          >
            <img
              src="/graphics/logos/wa.png"
              alt="Wrenford Ashby"
              draggable={false}
              className="h-[82px] w-auto max-w-none shrink-0 origin-left scale-[1.18] object-contain sm:h-[90px] sm:scale-[1.22]"
            />
          </a>

          <nav
            className="hidden h-full items-center gap-[clamp(0.2rem,0.65vw,0.9rem)] text-[16px] font-bold text-[#17383C] xl:flex"
            aria-label="Main navigation"
          >
            <a
              href="/"
              onMouseEnter={() => setActiveMegaMenu(null)}
              onFocus={() => setActiveMegaMenu(null)}
              className="group flex h-12 items-center px-3 outline-none"
            >
              <NavReel label="Home" />
            </a>

            {dropdownMenus.map((menu) => {
              const active = activeMegaMenu === menu.label;

              return (
                <div
                  key={menu.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => setActiveMegaMenu(menu.label)}
                  onFocus={() => setActiveMegaMenu(menu.label)}
                >
                  <a
                    href={menu.href}
                    aria-expanded={active}
                    className="group flex h-12 items-center whitespace-nowrap px-3 outline-none"
                  >
                    <NavReel label={menu.label} active={active} />
                  </a>

                  {active && (
                    <div
                      onMouseEnter={() => setActiveMegaMenu(menu.label)}
                      className="absolute left-1/2 top-[calc(100%-1px)] z-[100] w-64 -translate-x-1/2 border border-[#17383C]/10 bg-white p-2 text-[#17383C] shadow-[0_16px_38px_rgba(13,37,41,0.14)]"
                    >
                      {menu.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          style={{ color: "#17383C" }}
                          className="group flex min-h-11 items-center justify-between gap-4 px-3 py-2 text-sm font-bold !text-[#17383C] transition hover:bg-[#EAF0ED] hover:!text-[#17383C]"
                        >
                          <span style={{ color: "#17383C" }}>{link.label}</span>
                          <ArrowIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <a
              href="/about"
              onMouseEnter={() => setActiveMegaMenu(null)}
              onFocus={() => setActiveMegaMenu(null)}
              className="group flex h-12 items-center px-3 outline-none"
            >
              <NavReel label="About" />
            </a>

            <a
              href="/news"
              onMouseEnter={() => setActiveMegaMenu(null)}
              onFocus={() => setActiveMegaMenu(null)}
              className="group flex h-12 items-center px-3 outline-none"
            >
              <NavReel label="News" />
            </a>
          </nav>

          <a
            href="/contact"
            onMouseEnter={() => setActiveMegaMenu(null)}
            onFocus={() => setActiveMegaMenu(null)}
            style={{ color: "#ffffff" }}
            className="hidden min-h-12 items-center border border-[#17383C] bg-[#17383C] px-6 text-base font-bold !text-white transition hover:border-[#2D5B5D] hover:bg-[#2D5B5D] hover:!text-white xl:inline-flex"
          >
            <span style={{ color: "#ffffff" }} className="!text-white">
              Contact us
            </span>
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center xl:hidden"
          >
            <span className="relative block h-4 w-7">
              <span
                className={`absolute left-0 top-0 h-0.5 w-7 bg-[#17383C] transition ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-7 bg-[#17383C] transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-7 bg-[#17383C] transition ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#17383C]/10 bg-white px-5 pb-8 pt-2 xl:hidden">
            <nav
              className="mx-auto max-h-[calc(100svh-8rem)] max-w-[1480px] overflow-y-auto"
              aria-label="Mobile navigation"
            >
              {[{ label: "Home", href: "#top" }, ...mobileNavItems].map(
                (item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-14 items-center justify-between border-b border-[#17383C]/10 text-base font-bold"
                  >
                    {item.label}
                    <ArrowIcon />
                  </a>
                ),
              )}
              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex min-h-12 items-center justify-center bg-[#17383C] px-5 font-bold text-white"
              >
                Contact us
              </a>
            </nav>
          </div>
        )}
      </header>

      <section id="hero" className="bg-black">
        <div className="relative h-[calc(100svh-2.5rem)] min-h-[680px] w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Wrenford Ashby hero video"
            className="absolute inset-0 z-0 h-full w-full scale-[1.5] object-cover object-center will-change-transform"
          >
            <source
              src="/graphics/hero/home.mp4"
              type="video/mp4"
            />
          </video>

          <div className="pointer-events-none absolute inset-0 z-[1] bg-black/20" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#071C20]/82 via-[#071C20]/28 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-56 bg-gradient-to-b from-black/58 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-[#071C20]/78 to-transparent" />

          <div
            id="hero-header"
            onMouseLeave={() => setActiveMegaMenu(null)}
            className={`absolute inset-x-0 top-0 z-30 transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${
              heroReady
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }`}
          >
            <div className="mx-auto flex h-[112px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
              <a
                href="/"
                onMouseEnter={() => setActiveMegaMenu(null)}
                onFocus={() => setActiveMegaMenu(null)}
                aria-label="Wrenford Ashby home"
                className="flex shrink-0 items-center"
              >
                <img
                  src="/graphics/logos/wa.png"
                  alt="Wrenford Ashby"
                  draggable={false}
                  className="h-[108px] w-auto max-w-none shrink-0 origin-left scale-[1.3] object-contain sm:h-[118px] sm:scale-[1.36]"
                />
              </a>

              <nav
                className="hidden h-full items-center gap-[clamp(0.25rem,0.8vw,1.15rem)] text-[17px] font-bold text-white xl:flex"
                aria-label="Hero navigation"
              >
                <a
                  href="/"
                  onMouseEnter={() => setActiveMegaMenu(null)}
                  onFocus={() => setActiveMegaMenu(null)}
                  className="group flex h-12 items-center px-3 outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                >
                  <NavReel label="Home" />
                </a>

                {dropdownMenus.map((menu) => {
                  const active = activeMegaMenu === menu.label;

                  return (
                    <div
                      key={`hero-${menu.label}`}
                      className="relative flex h-full items-center"
                      onMouseEnter={() => setActiveMegaMenu(menu.label)}
                      onFocus={() => setActiveMegaMenu(menu.label)}
                    >
                      <a
                        href={menu.href}
                        aria-expanded={active}
                        className="group flex h-12 items-center whitespace-nowrap px-3 outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                      >
                        <NavReel label={menu.label} active={active} />
                      </a>

                      {active && (
                        <div
                          onMouseEnter={() => setActiveMegaMenu(menu.label)}
                          className="absolute left-1/2 top-full w-64 -translate-x-1/2 border border-white/14 bg-white p-2 text-[#17383C] shadow-[0_20px_48px_rgba(0,0,0,0.24)]"
                        >
                          {menu.links.map((link) => (
                            <a
                              key={`hero-${link.label}`}
                              href={link.href}
                              className="group flex min-h-11 items-center justify-between gap-4 px-3 py-2 text-sm font-bold text-[#17383C]/72 transition hover:bg-[#EAF0ED] hover:text-[#17383C]"
                            >
                              <span>{link.label}</span>
                              <ArrowIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <a
                  href="/about"
                  onMouseEnter={() => setActiveMegaMenu(null)}
                  onFocus={() => setActiveMegaMenu(null)}
                  className="group flex h-12 items-center px-3 outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                >
                  <NavReel label="About" />
                </a>

                <a
                  href="/news"
                  onMouseEnter={() => setActiveMegaMenu(null)}
                  onFocus={() => setActiveMegaMenu(null)}
                  className="group flex h-12 items-center px-3 outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                >
                  <NavReel label="News" />
                </a>
              </nav>

              <a
                href="/contact"
                onMouseEnter={() => setActiveMegaMenu(null)}
                onFocus={() => setActiveMegaMenu(null)}
                style={{ color: "#ffffff" }}
                className="hidden min-h-12 items-center border border-white/65 bg-[#0D2529]/35 px-6 text-base font-bold !text-white backdrop-blur-sm transition duration-200 visited:!text-white hover:border-white hover:bg-[#0D2529]/55 hover:!text-white focus:!text-white xl:inline-flex"
              >
                <span
                  style={{ color: "#ffffff" }}
                  className="!text-white"
                >
                  Contact us
                </span>
              </a>

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-11 w-11 items-center justify-center text-white xl:hidden"
              >
                <span className="relative block h-4 w-7">
                  <span
                    className={`absolute left-0 top-0 h-0.5 w-7 bg-current transition ${
                      menuOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] h-0.5 w-7 bg-current transition ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-7 bg-current transition ${
                      menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>

          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-center px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-30 lg:px-12 lg:pb-12 lg:pt-32">
            <div className="flex max-w-[900px] flex-col text-white">
              <p
                className={`text-xs font-extrabold uppercase tracking-[0.18em] text-[#C9DDD7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:text-sm ${
                  heroReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{ transitionDelay: "180ms" }}
              >
                Estate agents for Wickford & South Essex
              </p>

              <h1
                className={`mt-7 max-w-[900px] text-[clamp(3.4rem,7.1vw,7.15rem)] font-black leading-[0.9] tracking-[-0.055em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.34)] transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${
                  heroReady
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-10 opacity-0 blur-[3px]"
                }`}
                style={{ transitionDelay: "280ms" }}
              >
                Helping Essex
                <br />
                move for
                <br />
                24 years.
              </h1>

              <div
                className={`mt-9 grid max-w-[560px] gap-3 transition-all duration-900 ease-[cubic-bezier(.22,1,.36,1)] sm:grid-cols-2 lg:mt-11 ${
                  heroReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "460ms" }}
              >
                <a
                  href="#valuation"
                  className="group flex min-h-[70px] items-center justify-between gap-4 bg-[#6B908D] px-5 py-3.5 text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7DA09D]"
                >
                  <span>
                    <span className="block text-[11px] font-semibold sm:text-xs">
                      Selling or letting?
                    </span>
                    <span className="mt-0.5 block text-base font-black sm:text-lg">
                      Instant valuation
                    </span>
                  </span>
                  <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#properties"
                  className="group flex min-h-[70px] items-center justify-between gap-4 bg-[#1F6177] px-5 py-3.5 text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#28768D]"
                >
                  <span>
                    <span className="block text-[11px] font-semibold text-white/78 sm:text-xs">
                      Buying or renting?
                    </span>
                    <span className="mt-0.5 block text-base font-black sm:text-lg">
                      Find a property
                    </span>
                  </span>
                  <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              <div
                id="reviews"
                className={`mt-7 flex max-w-[860px] flex-col gap-3 text-white transition-all duration-900 ease-[cubic-bezier(.22,1,.36,1)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 ${
                  heroReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: "620ms" }}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-sm font-black sm:text-base">
                    4.8
                  </span>

                  <div
                    className="flex items-center gap-1"
                    aria-label="Trustpilot rating 4.8 out of 5"
                  >
                    {[0, 1, 2, 3, 4].map((star) => (
                      <span
                        key={star}
                        className="flex h-5 w-5 items-center justify-center bg-[#00B67A] text-[11px] font-black text-white"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold">
                    <span className="text-lg text-[#00B67A]">★</span>
                    Trustpilot
                  </span>

                  <a
                    href="#contact"
                    className="text-[11px] font-bold underline decoration-white/45 underline-offset-4 transition hover:decoration-white sm:text-xs"
                  >
                    Read our reviews
                  </a>
                </div>

                <span className="hidden h-5 w-px bg-white/25 sm:block" />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <img
                    src="/graphics/logos/google.png"
                    alt="Google"
                    draggable={false}
                    className="h-7 w-auto max-w-[105px] object-contain"
                  />

                  <span className="text-sm font-black sm:text-base">
                    4.9
                  </span>

                  <span className="text-[11px] font-semibold text-white/72 sm:text-xs">
                    from 391 reviews
                  </span>

                  <a
                    href="#contact"
                    className="text-[11px] font-bold underline decoration-white/45 underline-offset-4 transition hover:decoration-white sm:text-xs"
                  >
                    View Google reviews
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section
        id="properties"
        className="relative scroll-mt-28 overflow-hidden bg-[#EAF0ED] py-8 sm:py-10"
      >
        <span id="services" className="absolute top-0" aria-hidden="true" />
        <span id="about" className="absolute top-0" aria-hidden="true" />
        <span id="areas" className="absolute top-0" aria-hidden="true" />
        <span id="new-homes" className="absolute top-0" aria-hidden="true" />

        <div className="mt-5 space-y-9">
          <div>
            <div
              className={`mx-auto mb-3 flex max-w-[1480px] items-end justify-between gap-5 px-5 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 lg:px-12 ${
                propertyShowcaseVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
                  Buying
                </p>
                <h3 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#17383C] sm:text-3xl">
                  Homes for sale
                </h3>
              </div>

              <a
                href="/buy#properties-for-sale"
                className="group inline-flex items-center gap-2 text-sm font-black text-[#17383C] transition hover:text-[#6B908D]"
              >
                See all homes for sale
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div
              className={`wa-property-rail overflow-hidden transition-all duration-[950ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                propertyShowcaseVisible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "-translate-x-16 -translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "160ms" }}
            >
              <div className="wa-property-track wa-property-track-left flex w-max will-change-transform">
                {[0, 1].map((copy) => (
                  <div
                    key={`top-rail-copy-${copy}`}
                    aria-hidden={copy === 1}
                    className="flex shrink-0 gap-5 pr-5"
                  >
                    {propertyRailRows[0].map((property, index) => (
                      <div
                        key={`${copy}-${property.id}-${index}`}
                        className={`shrink-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                          propertyShowcaseVisible
                            ? "translate-x-0 translate-y-0 opacity-100"
                            : "-translate-x-10 -translate-y-5 opacity-0"
                        }`}
                        style={{
                          transitionDelay: `${
                            220 + (copy === 0 ? index * 65 : 0)
                          }ms`,
                        }}
                      >
                        <PropertyRailCard
                          property={property}
                          favourite={favourites.has(property.id)}
                          onToggleFavourite={() =>
                            toggleFavourite(property.id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div
              className={`mx-auto mb-3 flex max-w-[1480px] items-end justify-between gap-5 px-5 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 lg:px-12 ${
                propertyShowcaseVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "340ms" }}
            >
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
                  Renting
                </p>
                <h3 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#17383C] sm:text-3xl">
                  Homes to rent
                </h3>
              </div>

              <a
                href="/rent#homes-to-rent"
                className="group inline-flex items-center gap-2 text-sm font-black text-[#17383C] transition hover:text-[#6B908D]"
              >
                See all homes to rent
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div
              className={`wa-property-rail overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                propertyShowcaseVisible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "translate-x-16 -translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "380ms" }}
            >
              <div className="wa-property-track wa-property-track-right flex w-max will-change-transform">
                {[0, 1].map((copy) => (
                  <div
                    key={`bottom-rail-copy-${copy}`}
                    aria-hidden={copy === 1}
                    className="flex shrink-0 gap-5 pr-5"
                  >
                    {propertyRailRows[1].map((property, index) => (
                      <div
                        key={`${copy}-${property.id}-${index}`}
                        className={`shrink-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                          propertyShowcaseVisible
                            ? "translate-x-0 translate-y-0 opacity-100"
                            : "translate-x-10 -translate-y-5 opacity-0"
                        }`}
                        style={{
                          transitionDelay: `${
                            440 + (copy === 0 ? index * 65 : 0)
                          }ms`,
                        }}
                      >
                        <PropertyRailCard
                          property={property}
                          favourite={favourites.has(property.id)}
                          onToggleFavourite={() =>
                            toggleFavourite(property.id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          id="valuation"
          className={`relative mx-auto mt-14 max-w-[1480px] scroll-mt-24 overflow-hidden bg-[#0D2529] text-white transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] sm:mt-16 ${
            propertyShowcaseVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "520ms" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-32 text-[22rem] font-black leading-none text-white/[0.025]">
            24
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#17383C]/35 via-transparent to-[#6B908D]/12" />

          <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:px-14 lg:py-16">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
                  Free local valuation
                </p>
                <h2 className="mt-4 max-w-xl text-[clamp(2.5rem,4.4vw,4.7rem)] font-black leading-[1] tracking-[-0.04em]">
                  A realistic figure, without the sales routine.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/66">
                  Tell us a little about the property. A local member of the
                  team will call to arrange a convenient valuation and explain
                  what is genuinely happening in your area.
                </p>
              </div>

              <div className="mt-9 grid gap-px border border-white/14 bg-white/14 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  ["Local evidence", "Recent nearby sales"],
                  ["Clear advice", "No inflated instruction price"],
                  ["Sales or lettings", "One straightforward visit"],
                ].map(([title, text]) => (
                  <div key={title} className="bg-[#0D2529]/82 p-4">
                    <p className="text-sm font-black">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/48">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/14 bg-white/[0.055] p-5 backdrop-blur-sm sm:p-7 lg:p-8">
              {valuationSent ? (
                <div className="flex min-h-[430px] flex-col justify-center">
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
                    Request received
                  </p>
                  <h3 className="mt-4 max-w-xl text-4xl font-black leading-tight">
                    Thanks. A member of the local team will call you.
                  </h3>
                  <p className="mt-5 max-w-lg leading-7 text-white/62">
                    We will arrange a convenient time and keep the conversation
                    straightforward.
                  </p>
                  <button
                    type="button"
                    onClick={() => setValuationSent(false)}
                    className="mt-7 w-fit border-b border-white/40 pb-1 text-sm font-black transition hover:border-white"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setValuationSent(true);
                  }}
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#BFD3CD]">
                        Start here
                      </p>
                      <h3 className="mt-2 text-3xl font-black">
                        Request your valuation
                      </h3>
                    </div>
                    <p className="text-xs leading-5 text-white/46">
                      Usually takes less than a minute.
                    </p>
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className="text-xs font-black text-white/72">
                        Property postcode
                      </span>
                      <input
                        required
                        name="postcode"
                        type="text"
                        placeholder="SS12 9AA"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white/[0.08] px-4 text-white outline-none placeholder:text-white/28 focus:border-[#BFD3CD]"
                      />
                    </label>

                    <label>
                      <span className="text-xs font-black text-white/72">
                        Full name
                      </span>
                      <input
                        required
                        name="name"
                        type="text"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white/[0.08] px-4 text-white outline-none focus:border-[#BFD3CD]"
                      />
                    </label>

                    <label>
                      <span className="text-xs font-black text-white/72">
                        Telephone
                      </span>
                      <input
                        required
                        name="telephone"
                        type="tel"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white/[0.08] px-4 text-white outline-none focus:border-[#BFD3CD]"
                      />
                    </label>

                    <label>
                      <span className="text-xs font-black text-white/72">
                        Email address
                      </span>
                      <input
                        required
                        name="email"
                        type="email"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white/[0.08] px-4 text-white outline-none focus:border-[#BFD3CD]"
                      />
                    </label>

                    <label>
                      <span className="text-xs font-black text-white/72">
                        I am looking to
                      </span>
                      <select
                        required
                        name="valuationType"
                        defaultValue=""
                        className="mt-2 min-h-12 w-full border border-white/16 bg-[#17383C] px-4 text-white outline-none focus:border-[#BFD3CD]"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option>Sell a property</option>
                        <option>Let a property</option>
                        <option>Just understand the value</option>
                      </select>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 bg-[#BFD3CD] px-6 py-4 font-black text-[#17383C] transition hover:bg-white"
                  >
                    Request my valuation
                    <ArrowIcon />
                  </button>

                  <p className="mt-4 text-xs leading-5 text-white/38">
                    Your details will only be used to respond to this enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="testimonial"
        className="bg-[#EAF0ED] px-5 py-10 sm:px-8 sm:py-12 lg:px-12"
      >
        <div className="mx-auto max-w-[1480px]">
          <div
            className={`flex flex-col gap-6 transition-all duration-800 ease-[cubic-bezier(.22,1,.36,1)] md:flex-row md:items-end md:justify-between ${
              testimonialVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-7 opacity-0"
            }`}
          >
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Local feedback
              </p>

              <h2 className="mt-3 text-[clamp(2.3rem,4vw,4.2rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#17383C]">
                What local clients say
              </h2>
            </div>

            <div className="flex items-center gap-3 text-sm font-bold text-[#17383C]/62">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((star) => (
                  <span
                    key={star}
                    className="flex h-6 w-6 items-center justify-center bg-[#00B67A] text-xs font-black text-white"
                  >
                    ★
                  </span>
                ))}
              </div>
              <span>4.8 on Trustpilot</span>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {[
              {
                quote:
                  "They knew the area, kept us updated and made the whole move feel straightforward from start to finish.",
                name: "Sarah",
                detail: "Wickford homeowner",
              },
              {
                quote:
                  "The valuation was realistic, the communication was clear and we always knew what was happening next.",
                name: "Daniel",
                detail: "Rayleigh landlord",
              },
              {
                quote:
                  "We never felt pressured. The team answered every question and helped us move at the right pace.",
                name: "Priya",
                detail: "Billericay buyer",
              },
            ].map((review, index) => (
              <article
                key={review.name}
                className={`flex min-h-[290px] flex-col justify-between border border-[#17383C]/10 bg-white p-6 shadow-[0_12px_36px_rgba(23,56,60,0.07)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:p-7 ${
                  testimonialVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${160 + index * 110}ms` }}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-5xl font-black leading-none text-[#BFD3CD]">
                      “
                    </div>

                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <span
                          key={star}
                          className="text-sm text-[#00B67A]"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-4 text-[clamp(1.3rem,2vw,1.75rem)] font-black leading-[1.18] tracking-[-0.025em] text-[#17383C]">
                    {review.quote}
                  </blockquote>
                </div>

                <div className="mt-6 border-t border-[#17383C]/10 pt-4">
                  <p className="text-lg font-black text-[#17383C]">
                    {review.name}
                  </p>
                  <p className="mt-1 text-sm text-[#17383C]/52">
                    {review.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div
            className={`mt-5 flex flex-col gap-4 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:flex-row sm:items-center sm:justify-between ${
              testimonialVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "520ms" }}
          >
            <p className="max-w-2xl text-sm leading-6 text-[#17383C]/58">
              Read more feedback or speak to the team about selling, buying,
              letting or renting locally.
            </p>

            <a
              href="#contact"
              style={{ color: "#ffffff" }}
              className="inline-flex min-h-12 w-fit items-center gap-3 bg-[#17383C] px-6 text-sm font-black !text-white visited:!text-white transition hover:bg-[#2D5B5D] hover:!text-white"
            >
              <span style={{ color: "#ffffff" }}>Speak to the local team</span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#17383C]/10 bg-[#E8EFEC] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <SectionLabel>Ready when you are</SectionLabel>
            <h2 className="mt-3 text-[clamp(2.2rem,4vw,4rem)] font-black tracking-[-0.035em]">
              Let&apos;s talk about your property.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="#valuation">Book a valuation</PrimaryButton>
            <a
              href="tel:01268000000"
              className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#17383C] px-6 font-black transition hover:bg-[#17383C] hover:text-white"
            >
              <PhoneIcon />
              Call 01268 000 000
            </a>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="scroll-mt-28 bg-[#0D2529] px-5 pb-7 pt-14 text-white sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-10 border-b border-white/12 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
            <div>
              <img
                src="/graphics/logos/wa.png"
                alt="Wrenford Ashby"
                draggable={false}
                className="h-24 w-auto max-w-[360px] object-contain brightness-0 invert sm:h-28"
              />
              <p className="mt-5 max-w-md text-sm leading-7 text-white/58">
                Independent estate agents for Wickford, Rayleigh, Basildon,
                Billericay and surrounding South Essex communities.
              </p>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
                Property
              </p>
              <nav className="mt-5 flex flex-col gap-3 text-sm text-white/62">
                <a href="/buy#properties-for-sale" className="hover:text-white">
                  For sale
                </a>
                <a href="/rent#homes-to-rent" className="hover:text-white">
                  To let
                </a>
                <a href="/sell" className="hover:text-white">
                  Sell your home
                </a>
                <a href="/landlords" className="hover:text-white">
                  Landlords
                </a>
              </nav>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
                Company
              </p>
              <nav className="mt-5 flex flex-col gap-3 text-sm text-white/62">
                <a href="/about" className="hover:text-white">
                  About us
                </a>
                <a href="#areas" className="hover:text-white">
                  Areas we cover
                </a>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
                <a href="#contact" className="hover:text-white">
                  Privacy
                </a>
              </nav>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
                Wickford office
              </p>
              <address className="mt-5 not-italic text-sm leading-7 text-white/62">
                High Street
                <br />
                Wickford, Essex
                <br />
                SS12
              </address>
              <div className="mt-4 flex flex-col gap-2 text-sm font-bold">
                <a href="tel:01268000000" className="hover:text-[#BFD3CD]">
                  01268 000 000
                </a>
                <a
                  href="mailto:hello@wrenfordashby.co.uk"
                  className="break-all hover:text-[#BFD3CD]"
                >
                  hello@wrenfordashby.co.uk
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-7 border-b border-white/12 py-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
                Local property updates
              </p>
              <p className="mt-2 text-sm text-white/52">
                New listings and useful local property advice. No daily spam.
              </p>
            </div>

            {newsletterSent ? (
              <p className="text-sm font-bold">Thanks — you are subscribed.</p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setNewsletterSent(true);
                }}
                className="flex border border-white/22"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  required
                  type="email"
                  placeholder="Your email address"
                  className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  className="bg-[#BFD3CD] px-5 font-black text-[#17383C] transition hover:bg-white"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
            <p>© 2026 Wrenford Ashby Estate Agents</p>
            <p>Local sales and lettings across South Essex</p>
          </div>
        </div>
      </footer>
      {cookieNoticeOpen ? (
        <aside
          aria-label="Cookie preferences"
          className="fixed bottom-5 right-5 z-[90] w-[min(calc(100vw-2.5rem),380px)] border border-[#17383C]/14 bg-white p-5 shadow-[0_20px_60px_rgba(13,37,41,0.18)] sm:bottom-6 sm:right-6"
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6B908D]">
                Cookie preferences
              </p>

              <h2 className="mt-2 text-xl font-black tracking-[-0.02em] text-[#17383C]">
                A better browsing experience
              </h2>
            </div>

            <button
              type="button"
              aria-label="Close cookie notice"
              onClick={() => setCookieNoticeOpen(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-xl leading-none text-[#17383C]/55 transition hover:text-[#17383C]"
            >
              ×
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#17383C]/62">
            We use essential cookies to make the website work and optional
            cookies to understand how it is used.
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => saveCookiePreference("all")}
              className="min-h-11 flex-1 bg-[#17383C] px-4 text-sm font-black text-white transition hover:bg-[#2D5B5D]"
            >
              Accept all
            </button>

            <button
              type="button"
              onClick={() => saveCookiePreference("essential")}
              className="min-h-11 flex-1 border border-[#17383C]/24 bg-white px-4 text-sm font-black text-[#17383C] transition hover:border-[#17383C]"
            >
              Essential only
            </button>
          </div>

          <button
            type="button"
            onClick={() => setCookieNoticeOpen(true)}
            className="mt-3 text-xs font-bold text-[#17383C]/55 underline decoration-[#17383C]/30 underline-offset-4 transition hover:text-[#17383C]"
          >
            Manage preferences
          </button>
        </aside>
      ) : (
        <button
          type="button"
          aria-label="Open cookie preferences"
          title="Cookie preferences"
          onClick={() => setCookieNoticeOpen(true)}
          className="group fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-[#17383C] text-[#BFD3CD] shadow-[0_12px_34px_rgba(13,37,41,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#2D5B5D] sm:bottom-6 sm:right-6"
        >
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="h-8 w-8"
            fill="none"
          >
            <path
              d="M39 23.5A15.5 15.5 0 1 1 24.5 9c.4 4.6 4.1 8.3 8.7 8.7.2 3.1 2.7 5.6 5.8 5.8Z"
              fill="currentColor"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="19" cy="18" r="2.2" fill="#17383C" />
            <circle cx="16" cy="28" r="2.4" fill="#17383C" />
            <circle cx="27" cy="29" r="2.1" fill="#17383C" />
            <circle cx="25" cy="20" r="1.8" fill="#17383C" />
          </svg>

          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-[#17383C] px-3 py-2 text-xs font-bold text-white shadow-lg group-hover:block">
            Cookie preferences
          </span>
        </button>
      )}

    </main>
  );
}
