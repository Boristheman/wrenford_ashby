"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useEnquiryForm } from "./useEnquiryForm";

type SearchMode = "buy" | "rent";

type MobileProperty = {
  id: number;
  mode: SearchMode;
  status: "For Sale" | "To Let";
  location: string;
  area: string;
  priceLabel: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
};

type MobileReview = {
  quote: string;
  name: string;
  detail: string;
};

const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const FEATURED_PROPERTIES: MobileProperty[] = [
  {
    id: 1,
    mode: "buy",
    status: "For Sale",
    location: "Nevendon Road",
    area: "Wickford, Essex",
    priceLabel: "£325,000",
    propertyType: "Three-bedroom semi-detached",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=84",
  },
  {
    id: 2,
    mode: "buy",
    status: "For Sale",
    location: "London Road",
    area: "Rayleigh, Essex",
    priceLabel: "£385,000",
    propertyType: "Three-bedroom end terrace",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=84",
  },
  {
    id: 3,
    mode: "buy",
    status: "For Sale",
    location: "The Knares",
    area: "Basildon, Essex",
    priceLabel: "£265,000",
    propertyType: "Two-bedroom terraced home",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=84",
  },
  {
    id: 4,
    mode: "rent",
    status: "To Let",
    location: "Southend Road",
    area: "Wickford, Essex",
    priceLabel: "£1,350 pcm",
    propertyType: "Two-bedroom apartment",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=84",
  },
  {
    id: 14,
    mode: "rent",
    status: "To Let",
    location: "Station Avenue",
    area: "Wickford, Essex",
    priceLabel: "£1,650 pcm",
    propertyType: "Three-bedroom family home",
    bedrooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=84",
  },
  {
    id: 15,
    mode: "rent",
    status: "To Let",
    location: "Crown Hill",
    area: "Rayleigh, Essex",
    priceLabel: "£1,200 pcm",
    propertyType: "One-bedroom apartment",
    bedrooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=84",
  },
];

const MOBILE_REVIEWS: MobileReview[] = [
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
];

const AREAS = [
  "Wickford",
  "Rayleigh",
  "Basildon",
  "Billericay",
  "Pitsea",
  "South Woodham Ferrers",
];

export default function MobileSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollPaneRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const green = "#17383C";
    const root = document.documentElement;
    const body = document.body;

    const previousRootBackground = root.style.backgroundColor;
    const previousBodyBackground = body.style.backgroundColor;

    // Only colour the hidden page behind the fixed mobile interface. This
    // keeps exposed iOS overscroll/safe-area space Wrenford green without
    // forcing Safari's toolbar or status bar to remain green.
    root.style.backgroundColor = green;
    body.style.backgroundColor = green;

    return () => {
      root.style.backgroundColor = previousRootBackground;
      body.style.backgroundColor = previousBodyBackground;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const scrollPane = scrollPaneRef.current;
    if (!scrollPane) return;

    const updateHeader = () => {
      setScrolled(scrollPane.scrollTop > 56);
    };

    updateHeader();
    scrollPane.addEventListener("scroll", updateHeader, { passive: true });

    return () => {
      scrollPane.removeEventListener("scroll", updateHeader);
    };
  }, []);

  return (
    <div className="fixed inset-0 h-[100svh] w-full max-w-[100vw] overflow-hidden bg-[#17383C] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <MobileHeader
        menuOpen={menuOpen}
        scrolled={scrolled}
        onOpen={() => setMenuOpen(true)}
      />

      <div
        ref={scrollPaneRef}
        className="absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#17383C] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        <MobileHome />
      </div>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <style jsx global>{`
        html,
        body,
        #__next {
          background: #17383c !important;
          overscroll-behavior-x: none;
        }

        @keyframes waMobileHeroIn {
          from {
            opacity: 0;
            transform: translate3d(0, 28px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes waMobilePropertyRailLeft {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes waMobilePropertyRailRight {
          from {
            transform: translate3d(-50%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .wa-mobile-hero-in {
          animation: waMobileHeroIn 820ms cubic-bezier(.16,1,.3,1) both;
        }

        .wa-mobile-property-track-left {
          animation: waMobilePropertyRailLeft 46s linear infinite;
          will-change: transform;
        }

        .wa-mobile-property-track-right {
          animation: waMobilePropertyRailRight 50s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-mobile-hero-in,
          .wa-mobile-property-track-left,
          .wa-mobile-property-track-right {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function MobileHeader({
  menuOpen,
  scrolled,
  onOpen,
}: {
  menuOpen: boolean;
  scrolled: boolean;
  onOpen: () => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? "border-b border-[#17383C]/12 bg-white text-[#17383C] shadow-[0_12px_34px_rgba(13,37,41,0.16)]"
          : "bg-gradient-to-b from-black/48 via-black/18 to-transparent text-white"
      }`}
    >
      <div className="grid h-[5.1rem] grid-cols-[1fr_auto_auto] items-center gap-3 px-4">
        <a href="/" aria-label="Wrenford Ashby home" className="min-w-0">
          <img
            src="/graphics/logos/wa.png"
            alt="Wrenford Ashby"
            draggable={false}
            className={`-ml-1 w-auto max-w-[17rem] origin-left object-contain object-left transition-all duration-300 ${
              scrolled
                ? "h-[4.25rem] scale-[1.25]"
                : "h-[4.7rem] scale-[1.44] drop-shadow-[0_3px_12px_rgba(0,0,0,0.28)]"
            }`}
          />
        </a>

        <a
          href="tel:01268000000"
          aria-label="Call Wrenford Ashby"
          className={`flex h-10 items-center gap-2 px-1 text-[0.73rem] font-black tracking-[0.01em] transition-colors ${
            scrolled ? "text-[#17383C]" : "text-white"
          }`}
        >
          <PhoneIcon className="h-4 w-4" />
          <span className="hidden min-[390px]:inline">01268 000 000</span>
        </a>

        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          onClick={onOpen}
          className="flex h-11 w-11 items-center justify-end"
        >
          <span className="relative block h-[18px] w-7">
            <span className="absolute left-0 top-0 h-[2px] w-7 bg-current" />
            <span className="absolute left-0 top-2 h-[2px] w-7 bg-current" />
            <span className="absolute left-0 top-4 h-[2px] w-7 bg-current" />
          </span>
        </button>
      </div>
    </header>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className={`fixed inset-0 z-[1090] bg-[#061719]/70 backdrop-blur-[2px] transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!open}
        className={`fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(84vw,24rem)] max-w-full flex-col overflow-hidden bg-[#F7F8F6] text-[#17383C] shadow-[-28px_0_70px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#17383C]/10 px-5 pb-4 pt-[calc(1rem+env(safe-area-inset-top))]">
          <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#6B908D]">
            Menu
          </p>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center border border-[#17383C]/14 bg-white text-[#17383C]"
            aria-label="Close navigation"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav>
            {MOBILE_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex min-h-[3.7rem] items-center justify-between gap-4 border-b border-[#17383C]/12 text-[1.02rem] font-black tracking-[-0.015em] active:opacity-55"
              >
                <span>{item.label}</span>
                <ArrowIcon className="h-4 w-4 text-[#6B908D]" />
              </a>
            ))}
          </nav>

          <div className="pt-5">
            <a
              href="tel:01268000000"
              onClick={onClose}
              className="flex min-h-[3.3rem] items-center justify-between bg-[#17383C] px-5 text-sm font-black uppercase tracking-[0.06em] text-white"
            >
              Call the office
              <PhoneIcon className="h-5 w-5" />
            </a>

            <a
              href="/#valuation"
              onClick={onClose}
              className="mt-3 flex min-h-[3.3rem] items-center justify-between border border-[#17383C] bg-[#BFD3CD] px-5 text-sm font-black uppercase tracking-[0.06em] text-[#17383C]"
            >
              Book valuation
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

function MobileHome() {
  const [searchMode, setSearchMode] = useState<SearchMode>("buy");
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(true);
  const valuationForm = useEnquiryForm("home-valuation");

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(
      "wrenford-ashby-cookie-preference",
    );

    if (savedPreference) {
      setCookieNoticeOpen(false);
    }
  }, []);

  const saveCookiePreference = (preference: "all" | "essential") => {
    window.localStorage.setItem(
      "wrenford-ashby-cookie-preference",
      preference,
    );

    document.cookie = `wa_cookie_preference=${preference}; path=/; max-age=31536000; SameSite=Lax`;
    setCookieNoticeOpen(false);
  };

  const handlePropertySearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const location = String(form.get("location") ?? "").trim();
    const bedrooms = String(form.get("bedrooms") ?? "0");
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (bedrooms !== "0") params.set("beds", bedrooms);

    const query = params.toString();
    window.location.assign(`/${searchMode}${query ? `?${query}` : ""}`);
  };

  const saleProperties = FEATURED_PROPERTIES.filter(
    (property) => property.mode === "buy",
  );
  const rentalProperties = FEATURED_PROPERTIES.filter(
    (property) => property.mode === "rent",
  );

  return (
    <main id="mobile-top" className="overflow-x-hidden">
      <section className="relative min-h-[100svh] overflow-hidden bg-[#071C20] text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Homes across Essex"
          className="absolute inset-0 h-full w-full scale-[1.38] object-cover object-center"
        >
          <source src="/graphics/hero/home.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#071C20]/18" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C20]/68 via-[#071C20]/28 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#071C20]/92 via-[#071C20]/46 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-center px-4 pb-4 pt-[5.65rem]">
          <p className="wa-mobile-hero-in text-[11px] font-black uppercase tracking-[0.18em] text-[#C9DDD7]">
            Estate agents for Wickford & South Essex
          </p>

          <h1 className="wa-mobile-hero-in mt-6 w-full max-w-none text-[clamp(3.55rem,16vw,5.45rem)] font-black leading-[0.88] tracking-[-0.072em] [animation-delay:100ms]">
            Helping Essex
            <br />
            move for
            <br />
            24 years.
          </h1>

          <div className="wa-mobile-hero-in mt-9 grid grid-cols-2 gap-4 [animation-delay:210ms]">
            <a
              href="#valuation"
              className="flex min-h-[3.75rem] items-center justify-between bg-[#6B908D] px-4 text-sm font-black text-white"
            >
              Valuation
              <ArrowIcon className="h-4 w-4" />
            </a>

            <a
              href="#mobile-properties"
              className="flex min-h-[3.75rem] items-center justify-between bg-[#1F6177] px-4 text-sm font-black text-white"
            >
              Properties
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="wa-mobile-hero-in mt-7 w-full [animation-delay:320ms]">
            <div className="flex min-h-10 flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-base font-black text-white">4.8</span>

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

              <span className="inline-flex items-center gap-1 text-sm font-black text-white">
                <span className="text-lg leading-none text-[#00B67A]">★</span>
                Trustpilot
              </span>
            </div>

            <div className="mt-2 flex min-h-10 flex-wrap items-center gap-x-3 gap-y-2">
              <img
                src="/graphics/logos/google.png"
                alt="Google"
                className="h-7 w-auto max-w-[104px] object-contain"
              />

              <span className="text-base font-black text-white">4.9</span>

              <span className="text-xs font-semibold text-white/68">
                from 391 local reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-px bg-[#17383C] px-5 py-7">
        <MobileReveal>
          <div className="border border-[#17383C]/10 bg-white shadow-[0_16px_40px_rgba(23,56,60,0.09)]">
            <div className="grid grid-cols-2 border-b border-[#17383C]/10">
              {(["buy", "rent"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSearchMode(mode)}
                  className={`min-h-12 text-sm font-black capitalize transition ${
                    searchMode === mode
                      ? "bg-[#17383C] text-white"
                      : "bg-white text-[#17383C]/58"
                  }`}
                >
                  {mode === "buy" ? "Buy" : "Rent"}
                </button>
              ))}
            </div>

            <form onSubmit={handlePropertySearch} className="p-4">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#6B908D]">
                  Area or road
                </span>
                <input
                  name="location"
                  type="search"
                  placeholder="Wickford, Rayleigh, Basildon..."
                  className="mt-2 min-h-12 w-full border border-[#17383C]/14 bg-[#F7F8F6] px-4 text-sm font-bold outline-none placeholder:font-medium placeholder:text-[#17383C]/30 focus:border-[#6B908D]"
                />
              </label>

              <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
                <label>
                  <span className="sr-only">Minimum bedrooms</span>
                  <select
                    name="bedrooms"
                    defaultValue="0"
                    className="min-h-12 w-full border border-[#17383C]/14 bg-[#F7F8F6] px-4 text-sm font-bold outline-none focus:border-[#6B908D]"
                  >
                    <option value="0">Any bedrooms</option>
                    <option value="1">1+ bedrooms</option>
                    <option value="2">2+ bedrooms</option>
                    <option value="3">3+ bedrooms</option>
                    <option value="4">4+ bedrooms</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="flex min-h-12 items-center justify-center gap-2 bg-[#17383C] px-5 text-sm font-black text-white"
                >
                  Search
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </MobileReveal>
      </section>

      <section id="mobile-properties" className="scroll-mt-28 bg-[#17383C] pb-11 text-white">
        <MobilePropertyRail
          title="For sale"
          href="/buy"
          linkLabel="See all"
          properties={saleProperties}
          direction="left"
        />

        <div className="mt-9">
          <MobilePropertyRail
            title="To let"
            href="/rent"
            linkLabel="See all"
            properties={rentalProperties}
            direction="right"
          />
        </div>
      </section>

      <section className="bg-white px-5 py-11">
        <div className="mx-auto max-w-[34rem]">
          <MobileReveal>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#6B908D]">
              Local knowledge
            </p>
            <h2 className="mt-3 text-[2.55rem] font-black leading-[0.96] tracking-[-0.05em]">
              Proper local estate agency, without the hard sell.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#17383C]/62">
              We help people buy, sell, rent and let homes across Wickford and
              South Essex. You get straightforward advice, clear updates and a
              named person who knows your move.
            </p>
          </MobileReveal>

          <MobileReveal>
            <div className="mt-7 grid grid-cols-2 gap-px border border-[#17383C]/10 bg-[#17383C]/10">
              {AREAS.map((area) => (
                <div
                  key={area}
                  className="flex min-h-14 items-center bg-[#F4F6F4] px-4 text-sm font-black"
                >
                  {area}
                </div>
              ))}
            </div>
          </MobileReveal>
        </div>
      </section>

      <section
        id="valuation"
        className="scroll-mt-24 bg-[#0D2529] px-5 py-11 text-white"
      >
        <div className="mx-auto max-w-[34rem]">
          <MobileReveal>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#BFD3CD]">
              Selling or letting?
            </p>
            <h2 className="mt-3 text-[2.75rem] font-black leading-[0.95] tracking-[-0.05em]">
              Request a valuation.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/62">
              Leave your details and a local member of the team will contact
              you to arrange a visit.
            </p>
          </MobileReveal>

          <MobileReveal>
            <div className="mt-7 border border-white/14 bg-white/[0.045] p-5">
              {valuationForm.status === "success" ? (
                <div className="py-8">
                  <h3 className="text-2xl font-black leading-tight">
                    Thanks — we’ll call you to arrange the valuation.
                  </h3>
                  <button
                    type="button"
                    onClick={valuationForm.reset}
                    className="mt-6 border-b border-white/45 pb-1 text-sm font-black"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={valuationForm.handleSubmit}>
                  <input type="hidden" name="botField" value="" readOnly />

                  <div className="grid gap-4">
                    <MobileField label="Property postcode">
                      <input
                        required
                        name="postcode"
                        type="text"
                        placeholder="SS12 9AA"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white px-4 text-[#17383C] outline-none placeholder:text-[#17383C]/28 focus:border-[#BFD3CD]"
                      />
                    </MobileField>

                    <MobileField label="Full name">
                      <input
                        required
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white px-4 text-[#17383C] outline-none focus:border-[#BFD3CD]"
                      />
                    </MobileField>

                    <MobileField label="Telephone">
                      <input
                        required
                        name="telephone"
                        type="tel"
                        autoComplete="tel"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white px-4 text-[#17383C] outline-none focus:border-[#BFD3CD]"
                      />
                    </MobileField>

                    <MobileField label="Email address">
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white px-4 text-[#17383C] outline-none focus:border-[#BFD3CD]"
                      />
                    </MobileField>

                    <MobileField label="I am looking to">
                      <select
                        required
                        name="valuationType"
                        defaultValue=""
                        className="mt-2 min-h-12 w-full border border-white/16 bg-white px-4 text-[#17383C] outline-none focus:border-[#BFD3CD]"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option>Sell a property</option>
                        <option>Let a property</option>
                        <option>Understand the value</option>
                      </select>
                    </MobileField>
                  </div>

                  <button
                    type="submit"
                    disabled={valuationForm.isSending}
                    className="mt-5 flex min-h-13 w-full items-center justify-center gap-3 bg-[#BFD3CD] px-5 py-3.5 font-black text-[#17383C] disabled:cursor-wait disabled:opacity-60"
                  >
                    {valuationForm.isSending
                      ? "Sending request..."
                      : "Request valuation"}
                    <ArrowIcon className="h-4 w-4" />
                  </button>

                  {valuationForm.status === "error" && (
                    <p role="alert" className="mt-4 text-sm font-bold text-red-200">
                      {valuationForm.message}
                    </p>
                  )}
                </form>
              )}
            </div>
          </MobileReveal>

          <a
            href="tel:01268000000"
            className="mt-5 flex min-h-14 items-center justify-between border border-white/18 px-5 text-sm font-black text-white"
          >
            Prefer to call? 01268 000 000
            <PhoneIcon className="h-5 w-5 text-[#BFD3CD]" />
          </a>
        </div>
      </section>

      <section className="bg-[#EAF0ED] px-5 py-11">
        <div className="mx-auto max-w-[34rem]">
          <MobileReveal>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#6B908D]">
              What local clients say
            </p>
            <h2 className="mt-3 text-[2.45rem] font-black leading-[0.97] tracking-[-0.05em]">
              Trusted across South Essex.
            </h2>
          </MobileReveal>

          <div className="-mx-5 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MOBILE_REVIEWS.map((review) => (
              <article
                key={review.name}
                className="w-[84vw] max-w-[22rem] shrink-0 snap-start border border-[#17383C]/10 bg-white p-5 shadow-[0_12px_30px_rgba(23,56,60,0.07)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-4xl font-black leading-none text-[#BFD3CD]">
                    “
                  </span>
                  <span className="text-sm text-[#00B67A]">★★★★★</span>
                </div>
                <blockquote className="mt-4 text-xl font-black leading-[1.22] tracking-[-0.03em]">
                  {review.quote}
                </blockquote>
                <div className="mt-6 border-t border-[#17383C]/10 pt-4">
                  <p className="font-black">{review.name}</p>
                  <p className="mt-1 text-xs font-bold text-[#17383C]/48">
                    {review.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#BFD3CD] px-5 py-10 text-[#17383C]">
        <div className="mx-auto max-w-[34rem]">
          <MobileReveal>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#17383C]/58">
              Ready when you are
            </p>
            <h2 className="mt-3 text-[2.45rem] font-black leading-[0.98] tracking-[-0.05em]">
              Let&apos;s talk about your property.
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="#valuation"
                className="flex min-h-14 items-center justify-center bg-[#17383C] px-4 text-center text-sm font-black text-white"
              >
                Book valuation
              </a>
              <a
                href="tel:01268000000"
                className="flex min-h-14 items-center justify-center border border-[#17383C] px-4 text-center text-sm font-black"
              >
                Call us
              </a>
            </div>
          </MobileReveal>
        </div>
      </section>

      <MobileFooter
        onOpenCookiePreferences={() => setCookieNoticeOpen(true)}
      />

      {cookieNoticeOpen && (
        <aside className="fixed bottom-4 left-4 right-4 z-[1050] border border-[#17383C]/14 bg-white p-4 shadow-[0_20px_60px_rgba(13,37,41,0.24)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Cookie preferences
              </p>
              <p className="mt-2 text-sm leading-6 text-[#17383C]/62">
                Essential cookies keep the site working. Optional cookies help
                us understand how it is used.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCookieNoticeOpen(false)}
              aria-label="Close cookie notice"
              className="text-2xl leading-none text-[#17383C]/48"
            >
              ×
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => saveCookiePreference("all")}
              className="min-h-11 bg-[#17383C] px-3 text-sm font-black text-white"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => saveCookiePreference("essential")}
              className="min-h-11 border border-[#17383C]/24 px-3 text-sm font-black"
            >
              Essential only
            </button>
          </div>
        </aside>
      )}
    </main>
  );
}

function MobilePropertyRail({
  title,
  href,
  linkLabel,
  properties,
  direction,
}: {
  title: string;
  href: string;
  linkLabel: string;
  properties: MobileProperty[];
  direction: "left" | "right";
}) {
  const repeatedProperties = Array.from(
    { length: 8 },
    (_, index) => properties[index % properties.length],
  );

  return (
    <div className="overflow-hidden">
      <div className="flex items-end justify-between gap-4 px-4">
        <MobileReveal>
          <h2 className="text-[2rem] font-black tracking-[-0.045em] text-white">
            {title}
          </h2>
        </MobileReveal>
        <a
          href={href}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-[#BFD3CD]"
        >
          {linkLabel}
          <ArrowIcon className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-4 overflow-hidden">
        <div
          className={`flex w-max ${
            direction === "left"
              ? "wa-mobile-property-track-left"
              : "wa-mobile-property-track-right"
          }`}
        >
          {[0, 1].map((copy) => (
            <div
              key={`${title}-${copy}`}
              aria-hidden={copy === 1}
              className="flex shrink-0 gap-3 pr-3"
            >
              {repeatedProperties.map((property, index) => (
                <MobilePropertyCard
                  key={`${copy}-${property.id}-${index}`}
                  property={property}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobilePropertyCard({ property }: { property: MobileProperty }) {
  return (
    <article className="w-[calc((100vw-2.75rem)/2)] max-w-[12rem] shrink-0 overflow-hidden border border-white/12 bg-white text-[#17383C] shadow-[0_10px_26px_rgba(0,0,0,0.16)]">
      <a href={`/${property.mode}/${property.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#DDE8E4]">
          <img
            src={property.image}
            alt={`${property.propertyType} in ${property.area}`}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-2 top-2 bg-[#17383C] px-2 py-1.5 text-[7px] font-black uppercase tracking-[0.11em] text-white">
            {property.status}
          </span>
        </div>

        <div className="p-3">
          <p className="truncate text-[7px] font-black uppercase tracking-[0.1em] text-[#6B908D]">
            {property.propertyType}
          </p>
          <h3 className="mt-1.5 truncate text-[0.98rem] font-black leading-tight tracking-[-0.025em]">
            {property.location}
          </h3>
          <p className="mt-1 truncate text-[10px] text-[#17383C]/52">
            {property.area}
          </p>

          <div className="mt-3 border-t border-[#17383C]/10 pt-3">
            <p className="text-[0.92rem] font-black leading-none">
              {property.priceLabel}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="truncate text-[9px] font-bold text-[#17383C]/48">
                {property.bedrooms} bed · {property.bathrooms} bath
              </p>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#17383C] text-white">
                <ArrowIcon className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}

function MobileField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black text-white/70">{label}</span>
      {children}
    </label>
  );
}

function MobileReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function MobileFooter({
  onOpenCookiePreferences,
}: {
  onOpenCookiePreferences: () => void;
}) {
  return (
    <footer className="bg-[#0D2529] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-9 text-white">
      <div className="mx-auto max-w-[34rem]">
        <a href="/" aria-label="Wrenford Ashby home">
          <img
            src="/graphics/logos/wa.png"
            alt="Wrenford Ashby"
            className="h-[4.9rem] w-auto max-w-[16rem] object-contain object-left"
          />
        </a>
        <p className="mt-2 max-w-[20rem] text-sm leading-6 text-white/52">
          Independent estate agents for Wickford and the surrounding South
          Essex area.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-white/12 py-6 text-sm font-bold text-white/64">
          <a href="/buy">Buy</a>
          <a href="/rent">Rent</a>
          <a href="/sell">Sell</a>
          <a href="/landlords">Landlords</a>
          <a href="/new-homes">New Homes</a>
          <a href="/about">About</a>
          <a href="/news">News</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <a
            href="tel:01268000000"
            className="flex items-center gap-3 font-black text-white"
          >
            <PhoneIcon className="h-4 w-4 text-[#BFD3CD]" />
            01268 000 000
          </a>
          <a
            href="mailto:hello@wrenfordashby.co.uk"
            className="flex items-center gap-3 text-white/60"
          >
            <MailIcon className="h-4 w-4 text-[#BFD3CD]" />
            hello@wrenfordashby.co.uk
          </a>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/12 pt-5 text-xs font-bold text-white/42">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms & conditions</a>
          <button
            type="button"
            onClick={onOpenCookiePreferences}
            className="inline-flex items-center gap-1.5 text-left transition hover:text-white"
          >
            <CookieIcon className="h-3.5 w-3.5" />
            Cookie settings
          </button>
          <span>© 2026 Wrenford Ashby</span>
        </div>
      </div>
    </footer>
  );
}

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

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 6.5h17v11h-17v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m4.5 7.5 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CookieIcon({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
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
  );
}
