"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { useEnquiryForm } from "./useEnquiryForm";
import {
  PROPERTIES,
  type ListingMode,
  type Property,
} from "../__data/properties";

type ViewMode = "grid" | "list";


type LocationSuggestion = {
  id: string;
  name: string;
  context: string;
  value: string;
};

type LocationSearchResponse = {
  results?: LocationSuggestion[];
};

const LOCAL_LOCATION_FALLBACKS: LocationSuggestion[] = [
  {
    id: "wickford-essex",
    name: "Wickford",
    context: "Essex, England",
    value: "Wickford, Essex",
  },
  {
    id: "rayleigh-essex",
    name: "Rayleigh",
    context: "Essex, England",
    value: "Rayleigh, Essex",
  },
  {
    id: "basildon-essex",
    name: "Basildon",
    context: "Essex, England",
    value: "Basildon, Essex",
  },
  {
    id: "billericay-essex",
    name: "Billericay",
    context: "Essex, England",
    value: "Billericay, Essex",
  },
  {
    id: "chelmsford-essex",
    name: "Chelmsford",
    context: "Essex, England",
    value: "Chelmsford, Essex",
  },
  {
    id: "brentwood-essex",
    name: "Brentwood",
    context: "Essex, England",
    value: "Brentwood, Essex",
  },
  {
    id: "southend-on-sea-essex",
    name: "Southend-on-Sea",
    context: "Essex, England",
    value: "Southend-on-Sea, Essex",
  },
  {
    id: "south-woodham-ferrers-essex",
    name: "South Woodham Ferrers",
    context: "Essex, England",
    value: "South Woodham Ferrers, Essex",
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}


function LocationAutocomplete({
  value,
  onChange,
  mobile = false,
}: {
  value: string;
  onChange: (value: string) => void;
  mobile?: boolean;
}) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cacheRef = useRef(new Map<string, LocationSuggestion[]>());
  const idBase = useId().replace(/:/g, "");
  const listboxId = `${idBase}-location-results`;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    const query = value.trim();

    if (!open || query.length < 2) {
      setSuggestions([]);
      setLoading(false);
      setActiveIndex(-1);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const cached = cacheRef.current.get(normalizedQuery);

    if (cached) {
      setSuggestions(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/location-search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Location search failed");
        }

        const data = (await response.json()) as LocationSearchResponse;
        const apiResults = Array.isArray(data.results) ? data.results : [];
        const fallbackResults = LOCAL_LOCATION_FALLBACKS.filter((place) =>
          `${place.name} ${place.context}`
            .toLowerCase()
            .includes(normalizedQuery),
        );
        const combined = [...apiResults, ...fallbackResults].filter(
          (place, index, places) =>
            places.findIndex(
              (candidate) =>
                candidate.value.toLowerCase() === place.value.toLowerCase(),
            ) === index,
        );
        const results = combined.slice(0, 6);

        cacheRef.current.set(normalizedQuery, results);
        setSuggestions(results);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        const fallbackResults = LOCAL_LOCATION_FALLBACKS.filter((place) =>
          `${place.name} ${place.context}`
            .toLowerCase()
            .includes(normalizedQuery),
        );
        setSuggestions(fallbackResults.slice(0, 6));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 260);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, value]);

  const chooseSuggestion = (suggestion: LocationSuggestion) => {
    onChange(suggestion.value);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        current >= suggestions.length - 1 ? 0 : current + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      chooseSuggestion(suggestions[activeIndex]);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full min-w-0 max-w-full">
      <span className="sr-only">Location or postcode</span>
      <span
        className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 ${
          mobile ? "text-[#6B908D]" : "text-[#17383C]/45"
        }`}
      >
        <SearchIcon />
      </span>

      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        type="search"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0 ? `${idBase}-location-option-${activeIndex}` : undefined
        }
        placeholder={mobile ? "Town, area or postcode" : "Location or postcode"}
        className={
          mobile
            ? "min-h-14 w-full border border-white/16 bg-white pl-12 pr-11 text-[0.95rem] font-bold text-[#17383C] shadow-[0_8px_24px_rgba(4,21,24,0.16)] outline-none transition placeholder:font-semibold placeholder:text-[#17383C]/35 focus:border-[#BFD3CD] [&::-webkit-search-cancel-button]:hidden"
            : "min-h-12 w-full border border-[#17383C]/16 bg-white pl-12 pr-11 text-sm text-[#17383C] outline-none transition placeholder:text-[#17383C]/38 focus:border-[#6B908D] [&::-webkit-search-cancel-button]:hidden"
        }
      />

      {loading ? (
        <span
          aria-label="Searching locations"
          className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin border-2 border-[#17383C]/18 border-t-[#17383C]"
        />
      ) : value ? (
        <button
          type="button"
          aria-label="Clear location"
          onClick={() => {
            onChange("");
            setSuggestions([]);
            setOpen(true);
            setActiveIndex(-1);
          }}
          className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-xl font-medium text-[#17383C]/42"
        >
          ×
        </button>
      ) : null}

      {open && value.trim().length >= 2 && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-[90] max-w-full overflow-hidden border border-[#17383C]/14 bg-white text-[#17383C] shadow-[0_20px_48px_rgba(4,21,24,0.3)]"
        >
          {suggestions.length > 0 ? (
            <div className="divide-y divide-[#17383C]/8">
              {suggestions.map((suggestion, index) => (
                <button
                  id={`${idBase}-location-option-${index}`}
                  key={suggestion.id}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => chooseSuggestion(suggestion)}
                  className={`flex min-h-[3.65rem] w-full items-center gap-3 px-4 text-left transition ${
                    activeIndex === index
                      ? "bg-[#EAF0ED]"
                      : "bg-white hover:bg-[#F4F6F4]"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#EAF0ED] text-[#17383C]">
                    <SearchIcon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black">
                      {suggestion.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#17383C]/48">
                      {suggestion.context}
                    </span>
                  </span>
                  <ArrowIcon />
                </button>
              ))}
            </div>
          ) : !loading ? (
            <p className="px-4 py-4 text-sm font-semibold text-[#17383C]/50">
              No matching UK town or city found.
            </p>
          ) : null}

          <div className="flex items-center justify-between border-t border-[#17383C]/8 bg-[#F7F8F6] px-4 py-2">
            <span className="text-[9px] font-bold text-[#17383C]/38">
              UK town &amp; city search
            </span>
            <a
              href="https://www.geoapify.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[9px] font-black text-[#6B908D]"
            >
              Powered by Geoapify
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 7h10M18 7h2M4 17h2M10 17h10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16" cy="7" r="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="8" cy="17" r="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ChevronDownIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
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

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M8 6h13M8 12h13M8 18h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="3.5" cy="6" r="1.3" fill="currentColor" />
      <circle cx="3.5" cy="12" r="1.3" fill="currentColor" />
      <circle cx="3.5" cy="18" r="1.3" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
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


const HOME_MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

function HomeMobileArrowIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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

function HomeMobilePhoneIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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

function HomeMobileMailIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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

function HomeMobileCookieIcon({
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

function HomeStyleMobileHeader({
  menuOpen,
  onOpen,
}: {
  menuOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] border-b border-[#17383C]/12 bg-white text-[#17383C] shadow-[0_12px_34px_rgba(13,37,41,0.16)] sm:hidden">
      <div className="grid h-[5.1rem] grid-cols-[1fr_auto] items-center gap-3 px-4">
        <a href="/" aria-label="Wrenford Ashby home" className="min-w-0">
          <img
            src="/graphics/logos/wa.png"
            alt="Wrenford Ashby"
            draggable={false}
            className="-ml-1 h-[4.25rem] w-auto max-w-[17rem] origin-left scale-[1.25] object-contain object-left"
          />
        </a>

        <div className="flex items-center gap-2">
          <a
            href="tel:01268000000"
            aria-label="Call Wrenford Ashby"
            className="flex h-10 items-center gap-2 px-1 text-[0.73rem] font-black tracking-[0.01em] text-[#17383C]"
          >
            <HomeMobilePhoneIcon className="h-4 w-4" />
            <span className="hidden min-[390px]:inline">01268 000 000</span>
          </a>

          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={onOpen}
            className="flex h-11 w-10 items-center justify-end"
          >
            <span className="relative block h-[18px] w-7">
              <span className="absolute left-0 top-0 h-[2px] w-7 bg-current" />
              <span className="absolute left-0 top-2 h-[2px] w-7 bg-current" />
              <span className="absolute left-0 top-4 h-[2px] w-7 bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function HomeStyleMobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className="fixed inset-0 z-[1090] bg-[#061719]/62 backdrop-blur-[1px] sm:hidden"
      />

      <aside className="home-mobile-drawer-in fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(82vw,22rem)] max-w-full flex-col overflow-hidden bg-white text-[#17383C] shadow-[-24px_0_64px_rgba(0,0,0,0.22)] sm:hidden">
        <div className="flex min-h-[5rem] shrink-0 items-center justify-between border-b border-[#17383C]/8 px-5 pt-[env(safe-area-inset-top)]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B908D]">
            Navigation
          </p>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-end text-[#17383C]"
            aria-label="Close navigation"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto px-5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Mobile navigation"
        >
          {HOME_MOBILE_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="group flex min-h-[3.45rem] items-center justify-between gap-4 border-b border-[#17383C]/8 text-[0.98rem] font-bold tracking-[-0.012em] transition active:opacity-50"
            >
              <span>{item.label}</span>
              <HomeMobileArrowIcon className="h-3.5 w-3.5 text-[#6B908D] transition-transform group-active:translate-x-0.5" />
            </a>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#17383C]/8 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <a
            href="/contact"
            onClick={onClose}
            style={{ color: "#ffffff" }}
            className="group flex min-h-14 w-full items-center justify-between bg-[#17383C] px-5 text-sm font-black !text-white visited:!text-white active:bg-[#2D5B5D]"
          >
            <span style={{ color: "#ffffff" }} className="!text-white">
              Contact us
            </span>
            <span
              style={{ color: "#ffffff" }}
              className="flex h-8 w-8 items-center justify-center !text-white"
            >
              <HomeMobileArrowIcon className="h-4 w-4" />
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}

function HomeStyleMobileFooter({
  onOpenCookiePreferences,
}: {
  onOpenCookiePreferences: () => void;
}) {
  return (
    <footer className="bg-[#0D2529] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-9 text-white sm:hidden">
      <div className="mx-auto max-w-[34rem]">
        <a href="/" aria-label="Wrenford Ashby home">
          <img
            src="/graphics/logos/wa.png"
            alt="Wrenford Ashby"
            draggable={false}
            className="h-[4.9rem] w-auto max-w-[16rem] object-contain object-left"
          />
        </a>

        <p className="mt-2 max-w-[20rem] text-sm leading-6 text-white/52">
          Independent estate agents for Wickford and the surrounding South Essex
          area.
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
            <HomeMobilePhoneIcon className="h-4 w-4 text-[#BFD3CD]" />
            01268 000 000
          </a>

          <a
            href="mailto:hello@wrenfordashby.co.uk"
            className="flex items-center gap-3 text-white/60"
          >
            <HomeMobileMailIcon className="h-4 w-4 text-[#BFD3CD]" />
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
            <HomeMobileCookieIcon className="h-3.5 w-3.5" />
            Cookie settings
          </button>
          <span>© 2026 Wrenford Ashby</span>
        </div>
      </div>
    </footer>
  );
}

function HomeStyleCookieNotice({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (preference: "all" | "essential") => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[1050] border border-[#17383C]/14 bg-white p-4 shadow-[0_20px_60px_rgba(13,37,41,0.24)] sm:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
            Cookie preferences
          </p>
          <p className="mt-2 text-sm leading-6 text-[#17383C]/62">
            Essential cookies keep the site working. Optional cookies help us
            understand how it is used.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close cookie notice"
          className="text-2xl leading-none text-[#17383C]/48"
        >
          ×
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onSave("all")}
          className="min-h-11 bg-[#17383C] px-3 text-sm font-black text-white"
        >
          Accept all
        </button>

        <button
          type="button"
          onClick={() => onSave("essential")}
          className="min-h-11 border border-[#17383C]/24 px-3 text-sm font-black text-[#17383C]"
        >
          Essential only
        </button>
      </div>
    </aside>
  );
}


function PropertyCard({
  property,
  favourite,
  onToggleFavourite,
  view,
}: {
  property: Property;
  favourite: boolean;
  onToggleFavourite: () => void;
  view: ViewMode;
}) {
  const href = `/${property.mode}/${property.id}`;

  return (
    <article
      className={`group relative w-full min-w-0 max-w-full overflow-hidden border border-[#17383C]/12 bg-white shadow-[0_10px_30px_rgba(23,56,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,56,60,0.12)] ${
        view === "list" ? "md:grid md:grid-cols-[360px_1fr]" : ""
      }`}
    >
      <a
        href={href}
        className="contents"
        aria-label={`Open ${property.location}, ${property.area}`}
      >
        <div className="relative overflow-hidden bg-[#DDE8E4]">
          <img
            src={property.image}
            alt={`${property.propertyType} on ${property.location}, ${property.area}`}
            className={`w-full object-cover transition duration-700 group-hover:scale-[1.035] ${
              view === "list"
                ? "h-64 md:h-full md:min-h-[285px]"
                : "aspect-[4/3]"
            }`}
          />
          <span className="absolute left-3 top-3 bg-[#17383C] px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-white">
            {property.status}
          </span>
          {property.badge && (
            <span className="absolute bottom-3 left-3 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.11em] text-[#17383C] shadow-sm">
              {property.badge}
            </span>
          )}
        </div>

        <div className="flex min-h-[225px] flex-col p-5 sm:p-6">
          <div className="pr-12">
            <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
              {property.propertyType}
            </p>
            <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-[#17383C]">
              {property.location}
            </h2>
            <p className="mt-1 text-sm text-[#17383C]/55">
              {property.area} · {property.postcode}
            </p>
            {view === "list" && (
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#17383C]/56">
                {property.summary}
              </p>
            )}
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#17383C]/10 pt-5">
            <div>
              <p className="text-xl font-black text-[#17383C]">
                {property.priceLabel}
              </p>
              <p className="mt-1 text-xs font-bold text-[#17383C]/52">
                {property.bedrooms} bed · {property.bathrooms} bath
              </p>
            </div>
            <span className="inline-flex min-h-11 min-w-[132px] shrink-0 items-center justify-center gap-2 border border-[#17383C] bg-[#17383C] px-5 text-[13px] font-black leading-none !text-white transition group-hover:border-[#2D5B5D] group-hover:bg-[#2D5B5D]">
              View property
              <ArrowIcon />
            </span>
          </div>
        </div>
      </a>

      <button
        type="button"
        aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
        onClick={onToggleFavourite}
        className={`absolute right-4 top-[calc(75%+0.5rem)] z-20 flex h-10 w-10 items-center justify-center border transition md:top-auto md:bottom-[152px] ${
          view === "grid"
            ? "top-[calc(57%+0.25rem)] md:bottom-auto md:top-[calc(57%+0.25rem)]"
            : ""
        } ${
          favourite
            ? "border-[#BFD3CD] bg-[#BFD3CD] text-[#17383C]"
            : "border-[#17383C]/15 bg-white text-[#17383C] hover:bg-[#EAF0ED]"
        }`}
      >
        <HeartIcon filled={favourite} />
      </button>
    </article>
  );
}

export default function PropertyListingsPage({ mode }: { mode: ListingMode }) {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("0");
  const [minBeds, setMinBeds] = useState("0");
  const [propertyType, setPropertyType] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState<ViewMode>("grid");
  const [focusedSupport, setFocusedSupport] = useState<
    "alerts" | "viewing" | null
  >(null);
  const [favourites, setFavourites] = useState<Set<number>>(new Set());
  const [viewingProperty, setViewingProperty] = useState("");
  const [cardsVisible, setCardsVisible] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileSupportTab, setMobileSupportTab] = useState<
    "alerts" | "viewing"
  >("alerts");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(true);
  const alertsForm = useEnquiryForm("property-alerts");
  const viewingForm = useEnquiryForm("property-viewing", {
    onSuccess: () => setViewingProperty(""),
  });

  const isBuy = mode === "buy";


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

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflowX = html.style.overflowX;
    const previousHtmlOverscrollX = html.style.overscrollBehaviorX;
    const previousHtmlOverscrollY = html.style.overscrollBehaviorY;
    const previousHtmlMaxWidth = html.style.maxWidth;

    const previousBodyOverflowX = body.style.overflowX;
    const previousBodyOverscrollX = body.style.overscrollBehaviorX;
    const previousBodyOverscrollY = body.style.overscrollBehaviorY;
    const previousBodyMaxWidth = body.style.maxWidth;
    const previousBodyTouchAction = body.style.touchAction;

    // Keep the document as the only vertical scroller. Using overflow-x:hidden
    // on page sections can create a nested scroll container in mobile Safari.
    html.style.overflowX = "clip";
    html.style.overscrollBehaviorX = "none";
    html.style.overscrollBehaviorY = "none";
    html.style.maxWidth = "100%";

    body.style.overflowX = "clip";
    body.style.overscrollBehaviorX = "none";
    body.style.overscrollBehaviorY = "none";
    body.style.maxWidth = "100%";
    body.style.touchAction = "pan-y pinch-zoom";

    return () => {
      html.style.overflowX = previousHtmlOverflowX;
      html.style.overscrollBehaviorX = previousHtmlOverscrollX;
      html.style.overscrollBehaviorY = previousHtmlOverscrollY;
      html.style.maxWidth = previousHtmlMaxWidth;

      body.style.overflowX = previousBodyOverflowX;
      body.style.overscrollBehaviorX = previousBodyOverscrollX;
      body.style.overscrollBehaviorY = previousBodyOverscrollY;
      body.style.maxWidth = previousBodyMaxWidth;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    setCardsVisible(false);

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setCardsVisible(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [mode]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedLocation =
      params.get("location")?.trim() ??
      params.get("area")?.trim() ??
      params.get("postcode")?.trim() ??
      "";
    const requestedMinPrice = params.get("minPrice") ?? "0";
    const requestedMaxPrice = params.get("maxPrice") ?? "0";
    const requestedBeds =
      params.get("beds") ?? params.get("bedrooms") ?? "0";
    const requestedPropertyType = params.get("propertyType") ?? "all";
    const requestedSort = params.get("sort");
    const requestedFocus = params.get("focus");

    setLocation(requestedLocation);
    if (/^\d+$/.test(requestedMinPrice)) setMinPrice(requestedMinPrice);
    if (/^\d+$/.test(requestedMaxPrice)) setMaxPrice(requestedMaxPrice);
    if (/^\d+$/.test(requestedBeds)) setMinBeds(requestedBeds);
    setPropertyType(requestedPropertyType || "all");

    if (
      requestedSort === "new" ||
      requestedSort === "price-low" ||
      requestedSort === "price-high" ||
      requestedSort === "beds-high" ||
      requestedSort === "recommended"
    ) {
      setSort(requestedSort);
    }

    if (requestedFocus === "alerts" || requestedFocus === "viewing") {
      setFocusedSupport(requestedFocus);
      setMobileSupportTab(requestedFocus);
      const targetId =
        requestedFocus === "alerts" ? "register-alerts" : "book-viewing";
      window.setTimeout(() => {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
      window.setTimeout(() => setFocusedSupport(null), 2400);
    }
  }, []);

  const pageProperties = useMemo(
    () => PROPERTIES.filter((property) => property.mode === mode),
    [mode],
  );

  const { filteredProperties, showingNearby } = useMemo(() => {
    const min = Number(minPrice);
    const max = Number(maxPrice);
    const beds = Number(minBeds);
    const locationQuery = location
      .toLowerCase()
      .replace(/\b(england|united kingdom|uk)\b/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    const locationWords = locationQuery.split(/\s+/).filter(Boolean);
    const requestedType = propertyType.toLowerCase().trim();

    const matchingOtherFilters = pageProperties.filter((property) => {
      const typeMatches =
        propertyType === "all" ||
        property.propertyType.toLowerCase().includes(requestedType) ||
        requestedType.includes(property.propertyType.toLowerCase());

      return (
        (!min || property.price >= min) &&
        (!max || property.price <= max) &&
        (!beds || property.bedrooms >= beds) &&
        typeMatches
      );
    });

    const exactLocationMatches = matchingOtherFilters.filter((property) => {
      if (locationWords.length === 0) return true;

      const searchable =
        `${property.location} ${property.area} ${property.postcode}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, " ");

      return locationWords.every((word) => searchable.includes(word));
    });

    const useNearbyResults =
      locationWords.length > 0 &&
      exactLocationMatches.length === 0 &&
      matchingOtherFilters.length > 0;

    const results = useNearbyResults
      ? matchingOtherFilters
      : exactLocationMatches;

    const sorted = [...results].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "beds-high") return b.bedrooms - a.bedrooms;
      if (sort === "new") return b.listedDate.localeCompare(a.listedDate);
      return a.id - b.id;
    });

    return {
      filteredProperties: sorted,
      showingNearby: useNearbyResults,
    };
  }, [
    location,
    maxPrice,
    minBeds,
    minPrice,
    pageProperties,
    propertyType,
    sort,
  ]);

  const mobilePageSize = 6;
  const mobilePageCount = Math.max(
    1,
    Math.ceil(filteredProperties.length / mobilePageSize),
  );

  const visibleProperties = isMobileViewport
    ? filteredProperties.slice(
        (currentPage - 1) * mobilePageSize,
        currentPage * mobilePageSize,
      )
    : filteredProperties;

  useEffect(() => {
    setCurrentPage(1);
  }, [
    location,
    maxPrice,
    minBeds,
    minPrice,
    mode,
    propertyType,
    sort,
  ]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, mobilePageCount));
  }, [mobilePageCount]);

  const changePage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), mobilePageCount);
    if (nextPage === currentPage) return;

    setCardsVisible(false);
    setCurrentPage(nextPage);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setCardsVisible(true);
      });
    });

    window.setTimeout(() => {
      document.getElementById("property-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 40);
  };

  const priceOptions = isBuy
    ? [
        ["0", "No minimum"],
        ["200000", "£200,000"],
        ["250000", "£250,000"],
        ["300000", "£300,000"],
        ["350000", "£350,000"],
        ["400000", "£400,000"],
        ["500000", "£500,000"],
      ]
    : [
        ["0", "No minimum"],
        ["900", "£900 pcm"],
        ["1100", "£1,100 pcm"],
        ["1300", "£1,300 pcm"],
        ["1500", "£1,500 pcm"],
        ["1800", "£1,800 pcm"],
      ];

  const maxPriceOptions = isBuy
    ? [
        ["0", "No maximum"],
        ["300000", "£300,000"],
        ["350000", "£350,000"],
        ["400000", "£400,000"],
        ["450000", "£450,000"],
        ["500000", "£500,000"],
        ["600000", "£600,000"],
      ]
    : [
        ["0", "No maximum"],
        ["1200", "£1,200 pcm"],
        ["1400", "£1,400 pcm"],
        ["1600", "£1,600 pcm"],
        ["1800", "£1,800 pcm"],
        ["2000", "£2,000 pcm"],
        ["2500", "£2,500 pcm"],
      ];

  const propertyTypes = Array.from(
    new Set(pageProperties.map((property) => property.propertyType)),
  );

  const activeFilterCount = [
    minPrice !== "0",
    maxPrice !== "0",
    minBeds !== "0",
    propertyType !== "all",
  ].filter(Boolean).length;

  const shortLocation = location.split(",")[0]?.trim() || location.trim();

  const resetFilters = () => {
    setLocation("");
    setMinPrice("0");
    setMaxPrice("0");
    setMinBeds("0");
    setPropertyType("all");
    setSort("recommended");
    setMobileFiltersOpen(false);
    setCurrentPage(1);

    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, "", url.pathname);
  };

  const toggleFavourite = (id: number) => {
    setFavourites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <HomeStyleMobileHeader
        menuOpen={mobileMenuOpen}
        onOpen={() => setMobileMenuOpen(true)}
      />
      <HomeStyleMobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="min-h-screen w-full min-w-0 max-w-[100vw] overflow-x-clip overflow-y-visible [touch-action:pan-y_pinch-zoom] bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
        <div className="hidden w-full bg-white sm:sticky sm:top-0 sm:z-[1000] sm:block">
          <SiteHeader />
        </div>
        <div className="h-[5.1rem] sm:hidden" aria-hidden="true" />

      <style jsx global>{`

        @keyframes homeMobileDrawerIn {
          from {
            transform: translate3d(100%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .home-mobile-drawer-in {
          animation: homeMobileDrawerIn 300ms cubic-bezier(.22,1,.36,1) both;
        }
        html,
        body {
          width: 100%;
          max-width: 100%;
          overflow-x: clip !important;
          overscroll-behavior-x: none;
          overscroll-behavior-y: none;
        }

        body {
          touch-action: pan-y pinch-zoom;
        }

        #__next,
        main {
          width: 100%;
          min-width: 0;
          max-width: 100vw;
          overflow-x: clip;
          overflow-y: visible;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        img,
        video,
        svg {
          max-width: 100%;
        }
      `}</style>

      <section
        id={isBuy ? "properties-for-sale" : "homes-to-rent"}
        className="sticky top-[5.1rem] z-40 sm:top-[96px] w-full min-w-0 max-w-full overflow-x-clip border-b border-white/10 bg-[#17383C] px-5 py-4 shadow-[0_10px_30px_rgba(23,56,60,0.18)] sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full min-w-0 max-w-[1480px]">
          <div className="w-full min-w-0 max-w-full md:hidden">
            <div className="grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_7.15rem] gap-2.5">
              <LocationAutocomplete
                value={location}
                onChange={setLocation}
                mobile
              />

              <button
                type="button"
                onClick={() => setMobileFiltersOpen((open) => !open)}
                aria-expanded={mobileFiltersOpen}
                aria-controls="mobile-listing-filters"
                className={`relative flex min-h-14 items-center justify-center gap-2 border px-3 text-sm font-black transition ${
                  mobileFiltersOpen
                    ? "border-[#BFD3CD] bg-[#BFD3CD] text-[#17383C]"
                    : "border-white/18 bg-white/[0.07] text-white"
                }`}
              >
                <FilterIcon />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center bg-[#BFD3CD] px-1 text-[10px] font-black text-[#17383C] ring-2 ring-[#17383C]">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            <div
              id="mobile-listing-filters"
              className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                mobileFiltersOpen
                  ? "mt-3 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border border-white/12 bg-[#0F3034] p-3 shadow-[0_18px_38px_rgba(3,18,21,0.26)]">
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="relative min-w-0 bg-white px-3.5 py-3">
                      <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                        Minimum price
                      </span>
                      <select
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                        className="mt-1.5 w-full appearance-none bg-transparent pr-6 text-[13px] font-black text-[#17383C] outline-none"
                      >
                        {priceOptions.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute bottom-3.5 right-3 text-[#17383C]/52">
                        <ChevronDownIcon />
                      </span>
                    </label>

                    <label className="relative min-w-0 bg-white px-3.5 py-3">
                      <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                        Maximum price
                      </span>
                      <select
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                        className="mt-1.5 w-full appearance-none bg-transparent pr-6 text-[13px] font-black text-[#17383C] outline-none"
                      >
                        {maxPriceOptions.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute bottom-3.5 right-3 text-[#17383C]/52">
                        <ChevronDownIcon />
                      </span>
                    </label>

                    <label className="relative min-w-0 bg-white px-3.5 py-3">
                      <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                        Bedrooms
                      </span>
                      <select
                        value={minBeds}
                        onChange={(event) => setMinBeds(event.target.value)}
                        className="mt-1.5 w-full appearance-none bg-transparent pr-6 text-[13px] font-black text-[#17383C] outline-none"
                      >
                        <option value="0">Any number</option>
                        <option value="1">1+ bedrooms</option>
                        <option value="2">2+ bedrooms</option>
                        <option value="3">3+ bedrooms</option>
                        <option value="4">4+ bedrooms</option>
                      </select>
                      <span className="pointer-events-none absolute bottom-3.5 right-3 text-[#17383C]/52">
                        <ChevronDownIcon />
                      </span>
                    </label>

                    <label className="relative min-w-0 bg-white px-3.5 py-3">
                      <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                        Property type
                      </span>
                      <select
                        value={propertyType}
                        onChange={(event) => setPropertyType(event.target.value)}
                        className="mt-1.5 w-full appearance-none bg-transparent pr-6 text-[13px] font-black text-[#17383C] outline-none"
                      >
                        <option value="all">All types</option>
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute bottom-3.5 right-3 text-[#17383C]/52">
                        <ChevronDownIcon />
                      </span>
                    </label>
                  </div>

                  <div className="mt-3 grid grid-cols-[0.8fr_1.35fr] gap-2.5">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="min-h-12 border border-white/30 px-3 text-sm font-black text-white"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="flex min-h-12 items-center justify-center gap-2 bg-[#BFD3CD] px-3 text-sm font-black text-[#17383C]"
                    >
                      Show {filteredProperties.length}{" "}
                      {filteredProperties.length === 1 ? "home" : "homes"}
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-[1.35fr_0.85fr_0.85fr_0.75fr_1fr_auto]">
            <LocationAutocomplete
              value={location}
              onChange={setLocation}
            />

            <select
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              className="min-h-12 w-full border border-[#17383C]/16 bg-white px-4 text-sm text-[#17383C] outline-none"
            >
              {priceOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {value === "0" ? "Min price" : label}
                </option>
              ))}
            </select>

            <select
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="min-h-12 w-full border border-[#17383C]/16 bg-white px-4 text-sm text-[#17383C] outline-none"
            >
              {maxPriceOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {value === "0" ? "Max price" : label}
                </option>
              ))}
            </select>

            <select
              value={minBeds}
              onChange={(event) => setMinBeds(event.target.value)}
              className="min-h-12 w-full border border-[#17383C]/16 bg-white px-4 text-sm text-[#17383C] outline-none"
            >
              <option value="0">Min beds</option>
              <option value="1">1+ beds</option>
              <option value="2">2+ beds</option>
              <option value="3">3+ beds</option>
              <option value="4">4+ beds</option>
            </select>

            <select
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
              className="min-h-12 w-full border border-[#17383C]/16 bg-white px-4 text-sm text-[#17383C] outline-none"
            >
              <option value="all">Property type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="min-h-12 border border-white px-5 text-sm font-black text-white transition hover:bg-white hover:text-[#17383C]"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section id="property-results" className="w-full min-w-0 max-w-full scroll-mt-[12rem] overflow-x-clip px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto w-full min-w-0 max-w-[1480px]">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#17383C]/10 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black text-[#17383C]">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1 ? "property" : "properties"}
              </p>
              <p className="mt-1 text-xs text-[#17383C]/48">
                {showingNearby
                  ? `No exact matches in ${shortLocation} — showing nearby South Essex homes`
                  : isBuy
                    ? "Available for sale across South Essex"
                    : "Currently available to rent"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-11 border border-[#17383C]/12 bg-white px-4 text-sm font-bold text-[#17383C] outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="new">Newest first</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
                <option value="beds-high">Most bedrooms</option>
              </select>

              <div className="flex border border-[#17383C]/12 bg-white">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`flex h-11 w-11 items-center justify-center ${view === "grid" ? "bg-[#17383C] text-white" : "text-[#17383C]"}`}
                >
                  <GridIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`flex h-11 w-11 items-center justify-center ${view === "list" ? "bg-[#17383C] text-white" : "text-[#17383C]"}`}
                >
                  <ListIcon />
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              view === "grid"
                ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                : "space-y-6"
            }
          >
            {visibleProperties.map((property, index) => {
              return (
                <div
                  key={`${mode}-${property.id}`}
                  className="w-full min-w-0 max-w-full"
                  style={{
                    opacity: cardsVisible ? 1 : 0,
                    transform: cardsVisible
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, 42px, 0) scale(0.965)",
                    filter: cardsVisible ? "blur(0px)" : "blur(8px)",
                    transitionProperty: "opacity, transform, filter",
                    transitionDuration: "760ms, 900ms, 760ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: cardsVisible
                      ? `${110 + Math.min(index, 18) * 90}ms`
                      : "0ms",
                    willChange: "opacity, transform, filter",
                  }}
                >
                  <PropertyCard
                    property={property}
                    favourite={favourites.has(property.id)}
                    onToggleFavourite={() => toggleFavourite(property.id)}
                    view={view}
                  />
                </div>
              );
            })}
          </div>

          {isMobileViewport && mobilePageCount > 1 && (
            <nav
              aria-label="Property result pages"
              className="mt-8 flex justify-center md:hidden"
            >
              <div className="inline-flex items-center gap-1 border border-[#17383C]/12 bg-white p-1.5 shadow-[0_12px_30px_rgba(23,56,60,0.08)]">
                <button
                  type="button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex h-10 w-10 items-center justify-center text-[#17383C] transition disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <span className="rotate-180">
                    <ArrowIcon />
                  </span>
                </button>

                {Array.from({ length: mobilePageCount }, (_, index) => {
                  const page = index + 1;
                  const active = page === currentPage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => changePage(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex h-10 min-w-10 items-center justify-center px-3 text-sm font-black transition ${
                        active
                          ? "bg-[#17383C] text-white"
                          : "text-[#17383C]/62 hover:bg-[#EAF0ED]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === mobilePageCount}
                  aria-label="Next page"
                  className="flex h-10 w-10 items-center justify-center text-[#17383C] transition disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <ArrowIcon />
                </button>
              </div>
            </nav>
          )}

          {filteredProperties.length === 0 && (
            <div className="border border-[#17383C]/10 bg-white px-6 py-16 text-center">
              <h2 className="text-2xl font-black">No matching properties</h2>
              <p className="mt-3 text-sm text-[#17383C]/55">
                {shortLocation
                  ? `There are no homes matching every filter around ${shortLocation}.`
                  : "Try widening the price, bedroom or property type filters."}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="w-full min-w-0 max-w-full overflow-x-clip px-4 pb-12 sm:px-8 sm:pb-14 lg:px-12">
        <div className="mx-auto w-full min-w-0 max-w-[1480px]">
          <div className="overflow-hidden border border-[#17383C]/12 bg-white shadow-[0_14px_34px_rgba(23,56,60,0.08)] lg:contents">
            <div
              role="tablist"
              aria-label="Property help options"
              className="grid grid-cols-2 border-b border-[#17383C]/10 bg-white lg:hidden"
            >
            <button
              type="button"
              role="tab"
              aria-selected={mobileSupportTab === "alerts"}
              aria-controls="register-alerts"
              onClick={() => setMobileSupportTab("alerts")}
              className={`flex min-h-[3.75rem] items-center justify-center gap-2 border-r border-[#17383C]/10 px-3 text-[12px] font-black transition ${
                mobileSupportTab === "alerts"
                  ? "bg-[#17383C] text-white"
                  : "bg-white text-[#17383C]/52"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 20h4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              Property alerts
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mobileSupportTab === "viewing"}
              aria-controls="book-viewing"
              onClick={() => setMobileSupportTab("viewing")}
              className={`flex min-h-[3.75rem] items-center justify-center gap-2 px-3 text-[12px] font-black transition ${
                mobileSupportTab === "viewing"
                  ? "bg-[#17383C] text-white"
                  : "bg-white text-[#17383C]/52"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  d="M3 11.5 12 4l9 7.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 10v9h13v-9M9 19v-5h6v5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Book viewing
            </button>
            </div>

            <div className="grid w-full min-w-0 gap-4 sm:gap-6 lg:grid-cols-2">
              <article
            id="register-alerts"
            role="tabpanel"
            aria-hidden={mobileSupportTab !== "alerts"}
            className={`min-w-0 scroll-mt-32 overflow-hidden border-0 bg-white transition lg:block lg:border lg:border-[#17383C]/10 ${
              mobileSupportTab === "alerts" ? "block" : "hidden"
            } ${focusedSupport === "alerts" ? "ring-4 ring-[#BFD3CD]" : ""}`}
          >
            <div className="border-b border-[#17383C]/10 px-5 py-5 sm:px-8 sm:py-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#EAF0ED] text-[#17383C]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-4.5 w-4.5"
                  >
                    <path
                      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 20h4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#6B908D] sm:text-xs">
                  Property alerts
                </p>
              </div>

              <h2 className="mt-4 max-w-[18ch] text-[clamp(1.7rem,8vw,2.2rem)] font-black leading-[0.98] tracking-[-0.045em] sm:max-w-xl sm:text-3xl sm:leading-[1.05]">
                <span className="sm:hidden">Get new homes sent to you.</span>
                <span className="hidden sm:inline">
                  Hear about suitable homes first.
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#17383C]/56">
                Tell us what you are looking for and we will send matching new
                instructions.
              </p>
            </div>

            <form
              onSubmit={alertsForm.handleSubmit}
              className="relative grid min-w-0 gap-3 p-5 sm:grid-cols-2 sm:p-8"
            >
              <input type="hidden" name="botField" value="" readOnly />
              <input type="hidden" name="listingMode" value={mode} />

              <label className="block min-w-0">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  className="h-13 w-full min-w-0 max-w-full border border-[#17383C]/15 bg-[#F7F8F6] px-4 text-base text-[#17383C] outline-none transition placeholder:text-[#17383C]/30 focus:border-[#6B908D] sm:text-sm"
                />
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                  Preferred area
                </span>
                <input
                  type="text"
                  name="area"
                  autoComplete="postal-code"
                  placeholder="Town, area or postcode"
                  className="h-13 w-full min-w-0 max-w-full border border-[#17383C]/15 bg-[#F7F8F6] px-4 text-base text-[#17383C] outline-none transition placeholder:text-[#17383C]/30 focus:border-[#6B908D] sm:text-sm"
                />
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                  Minimum bedrooms
                </span>
                <select
                  name="bedrooms"
                  defaultValue=""
                  className="h-13 w-full min-w-0 max-w-full border border-[#17383C]/15 bg-[#F7F8F6] px-4 text-base text-[#17383C] outline-none focus:border-[#6B908D] sm:text-sm"
                >
                  <option value="">Any bedrooms</option>
                  <option value="1">1+ bedrooms</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                </select>
              </label>

              <button
                type="submit"
                disabled={alertsForm.isSending}
                className="mt-1 flex h-13 w-full min-w-0 items-center justify-center gap-2 bg-[#17383C] px-5 text-sm font-black text-white transition hover:bg-[#2D5B5D] disabled:cursor-wait disabled:opacity-60 sm:mt-[1.55rem]"
              >
                {alertsForm.isSending ? "Sending..." : "Create alert"}
                {!alertsForm.isSending && <ArrowIcon />}
              </button>
            </form>

            {alertsForm.status !== "idle" && (
              <p
                className={`mx-5 mb-5 border-t border-[#17383C]/10 pt-4 text-sm font-bold sm:mx-8 sm:mb-8 ${alertsForm.status === "error" ? "text-red-700" : "text-[#17383C]"}`}
              >
                {alertsForm.message}
              </p>
            )}
          </article>

          <article
            id="book-viewing"
            role="tabpanel"
            aria-hidden={mobileSupportTab !== "viewing"}
            className={`min-w-0 scroll-mt-32 overflow-hidden border-0 bg-[#EAF0ED] transition lg:block lg:border lg:border-[#17383C]/10 ${
              mobileSupportTab === "viewing" ? "block" : "hidden"
            } ${focusedSupport === "viewing" ? "ring-4 ring-[#6B908D]" : ""}`}
          >
            <div className="border-b border-[#17383C]/10 px-5 py-5 sm:px-8 sm:py-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white text-[#17383C]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-4.5 w-4.5"
                  >
                    <path
                      d="M3 11.5 12 4l9 7.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.5 10v9h13v-9M9 19v-5h6v5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#6B908D] sm:text-xs">
                  Book a viewing
                </p>
              </div>

              <h2 className="mt-4 max-w-[18ch] text-[clamp(1.7rem,8vw,2.2rem)] font-black leading-[0.98] tracking-[-0.045em] sm:max-w-2xl sm:text-3xl sm:leading-[1.05]">
                <span className="sm:hidden">See a home in person.</span>
                <span className="hidden sm:inline">
                  Choose a property and a member of the team will call.
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#17383C]/56">
                Pick the property and leave your details. We will call to agree
                a suitable time.
              </p>
            </div>

            <form
              onSubmit={viewingForm.handleSubmit}
              className="relative grid min-w-0 gap-3 p-5 sm:grid-cols-2 sm:p-8"
            >
              <input type="hidden" name="botField" value="" readOnly />
              <input type="hidden" name="listingMode" value={mode} />

              <label className="block min-w-0 sm:col-span-2">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                  Property
                </span>
                <select
                  required
                  name="property"
                  value={viewingProperty}
                  onChange={(event) => setViewingProperty(event.target.value)}
                  className="h-13 w-full min-w-0 max-w-full border border-[#17383C]/15 bg-white px-4 text-base text-[#17383C] outline-none focus:border-[#6B908D] sm:text-sm"
                >
                  <option value="">Choose a property</option>
                  {pageProperties.map((property) => (
                    <option
                      key={property.id}
                      value={`${property.location}, ${property.area} — ${property.priceLabel}`}
                    >
                      {property.location}, {property.area} — {property.priceLabel}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                  Name
                </span>
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  className="h-13 w-full min-w-0 max-w-full border border-[#17383C]/15 bg-white px-4 text-base text-[#17383C] outline-none transition placeholder:text-[#17383C]/30 focus:border-[#6B908D] sm:text-sm"
                />
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                  Phone
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Phone number"
                  className="h-13 w-full min-w-0 max-w-full border border-[#17383C]/15 bg-white px-4 text-base text-[#17383C] outline-none transition placeholder:text-[#17383C]/30 focus:border-[#6B908D] sm:text-sm"
                />
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                  Email <span className="font-bold normal-case tracking-normal text-[#17383C]/38">(optional)</span>
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  className="h-13 w-full min-w-0 max-w-full border border-[#17383C]/15 bg-white px-4 text-base text-[#17383C] outline-none transition placeholder:text-[#17383C]/30 focus:border-[#6B908D] sm:text-sm"
                />
              </label>

              <button
                type="submit"
                disabled={viewingForm.isSending}
                className="mt-1 flex h-13 w-full min-w-0 items-center justify-center gap-2 bg-[#17383C] px-5 text-sm font-black text-white transition hover:bg-[#2D5B5D] disabled:cursor-wait disabled:opacity-60 sm:mt-[1.55rem]"
              >
                {viewingForm.isSending ? "Sending..." : "Request viewing"}
                {!viewingForm.isSending && <ArrowIcon />}
              </button>
            </form>

            {viewingForm.status !== "idle" && (
              <p
                className={`mx-5 mb-5 border-t border-[#17383C]/10 pt-4 text-sm font-bold sm:mx-8 sm:mb-8 ${viewingForm.status === "error" ? "text-red-700" : "text-[#17383C]"}`}
              >
                {viewingForm.message}
              </p>
            )}
              </article>
            </div>
          </div>
        </div>
      </section>

      <HomeStyleMobileFooter
        onOpenCookiePreferences={() => setCookieNoticeOpen(true)}
      />

      <div className="hidden sm:block">
        <SiteFooter />
      </div>

      <HomeStyleCookieNotice
        open={cookieNoticeOpen}
        onClose={() => setCookieNoticeOpen(false)}
        onSave={saveCookiePreference}
      />
      </main>
    </>
  );
}
