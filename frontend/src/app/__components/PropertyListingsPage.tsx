"use client";

import { useEffect, useMemo, useState } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { useEnquiryForm } from "./useEnquiryForm";
import {
  PROPERTIES,
  type ListingMode,
  type Property,
} from "../__data/properties";

type ViewMode = "grid" | "list";

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
      className={`group relative overflow-hidden border border-[#17383C]/12 bg-white shadow-[0_10px_30px_rgba(23,56,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,56,60,0.12)] ${
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
  const alertsForm = useEnquiryForm("property-alerts");
  const viewingForm = useEnquiryForm("property-viewing", {
    onSuccess: () => setViewingProperty(""),
  });

  const isBuy = mode === "buy";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSort = params.get("sort");
    const requestedFocus = params.get("focus");

    if (requestedSort === "new") setSort("new");

    if (requestedFocus === "alerts" || requestedFocus === "viewing") {
      setFocusedSupport(requestedFocus);
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

  const filteredProperties = useMemo(() => {
    const query = location.trim().toLowerCase();
    const min = Number(minPrice);
    const max = Number(maxPrice);
    const beds = Number(minBeds);

    const filtered = pageProperties.filter((property) => {
      const searchable =
        `${property.location} ${property.area} ${property.postcode}`.toLowerCase();
      return (
        (!query || searchable.includes(query)) &&
        (!min || property.price >= min) &&
        (!max || property.price <= max) &&
        (!beds || property.bedrooms >= beds) &&
        (propertyType === "all" || property.propertyType === propertyType)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "beds-high") return b.bedrooms - a.bedrooms;
      if (sort === "new") return b.listedDate.localeCompare(a.listedDate);
      return a.id - b.id;
    });
  }, [
    location,
    maxPrice,
    minBeds,
    minPrice,
    pageProperties,
    propertyType,
    sort,
  ]);

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

  const resetFilters = () => {
    setLocation("");
    setMinPrice("0");
    setMaxPrice("0");
    setMinBeds("0");
    setPropertyType("all");
    setSort("recommended");
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
    <main className="min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <SiteHeader />

      <section
        id={isBuy ? "properties-for-sale" : "homes-to-rent"}
        className="sticky top-[96px] z-40 border-b border-white/10 bg-[#17383C] px-5 py-4 shadow-[0_10px_30px_rgba(23,56,60,0.18)] sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1480px] gap-3 md:grid-cols-2 xl:grid-cols-[1.35fr_0.85fr_0.85fr_0.75fr_1fr_auto]">
          <label className="relative">
            <span className="sr-only">Location or postcode</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#17383C]/45">
              <SearchIcon />
            </span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              type="search"
              placeholder="Location or postcode"
              className="min-h-12 w-full border border-[#17383C]/16 bg-white pl-12 pr-4 text-sm text-[#17383C] outline-none transition placeholder:text-[#17383C]/38 focus:border-[#6B908D]"
            />
          </label>

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
      </section>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#17383C]/10 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black text-[#17383C]">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1 ? "property" : "properties"}
              </p>
              <p className="mt-1 text-xs text-[#17383C]/48">
                {isBuy
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
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                favourite={favourites.has(property.id)}
                onToggleFavourite={() => toggleFavourite(property.id)}
                view={view}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="border border-[#17383C]/10 bg-white px-6 py-16 text-center">
              <h2 className="text-2xl font-black">No matching properties</h2>
              <p className="mt-3 text-sm text-[#17383C]/55">
                Try widening the location, price or bedroom filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-2">
          <article
            id="register-alerts"
            className={`scroll-mt-32 bg-white p-6 transition sm:p-8 ${focusedSupport === "alerts" ? "ring-4 ring-[#BFD3CD]" : ""}`}
          >
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
              Property alerts
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
              Hear about suitable homes first.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#17383C]/56">
              Register the area and bedroom range you are looking for and the
              local team will send relevant new instructions.
            </p>

            <form
              onSubmit={alertsForm.handleSubmit}
              className="relative mt-6 grid gap-3 sm:grid-cols-2"
            >
              <input type="hidden" name="botField" value="" readOnly />
              <input type="hidden" name="listingMode" value={mode} />
              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                className="min-h-12 border border-[#17383C]/15 bg-[#F7F8F6] px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38"
              />
              <input
                type="text"
                name="area"
                placeholder="Preferred area or postcode"
                className="min-h-12 border border-[#17383C]/15 bg-[#F7F8F6] px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38"
              />
              <select
                name="bedrooms"
                defaultValue=""
                className="min-h-12 border border-[#17383C]/15 bg-[#F7F8F6] px-4 text-sm text-[#17383C] outline-none"
              >
                <option value="">Minimum bedrooms</option>
                <option value="1">1+ bedrooms</option>
                <option value="2">2+ bedrooms</option>
                <option value="3">3+ bedrooms</option>
                <option value="4">4+ bedrooms</option>
              </select>
              <button
                type="submit"
                disabled={alertsForm.isSending}
                className="min-h-12 border border-[#17383C] bg-[#17383C] px-5 text-sm font-black text-white transition hover:bg-[#2D5B5D] disabled:opacity-60"
              >
                {alertsForm.isSending ? "Sending..." : "Register for alerts"}
              </button>
            </form>
            {alertsForm.status !== "idle" && (
              <p
                className={`mt-4 text-sm font-bold ${alertsForm.status === "error" ? "text-red-700" : "text-[#17383C]"}`}
              >
                {alertsForm.message}
              </p>
            )}
          </article>

          <article
            id="book-viewing"
            className={`scroll-mt-32 bg-[#EAF0ED] p-6 transition sm:p-8 ${focusedSupport === "viewing" ? "ring-4 ring-[#6B908D]" : ""}`}
          >
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
              Book a viewing
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
              Choose a property and a member of the team will call.
            </h2>

            <form
              onSubmit={viewingForm.handleSubmit}
              className="relative mt-6 grid gap-3 sm:grid-cols-2"
            >
              <input type="hidden" name="botField" value="" readOnly />
              <input type="hidden" name="listingMode" value={mode} />
              <select
                required
                name="property"
                value={viewingProperty}
                onChange={(event) => setViewingProperty(event.target.value)}
                className="min-h-12 border border-[#17383C]/15 bg-white px-4 text-sm text-[#17383C] outline-none sm:col-span-2"
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
              <input
                required
                type="text"
                name="name"
                placeholder="Your name"
                className="min-h-12 border border-[#17383C]/15 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38"
              />
              <input
                required
                type="tel"
                name="phone"
                placeholder="Phone number"
                className="min-h-12 border border-[#17383C]/15 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="min-h-12 border border-[#17383C]/15 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38"
              />
              <button
                type="submit"
                disabled={viewingForm.isSending}
                className="min-h-12 bg-[#17383C] px-5 text-sm font-black text-white transition hover:bg-[#2D5B5D] disabled:opacity-60"
              >
                {viewingForm.isSending ? "Sending..." : "Request viewing"}
              </button>
            </form>
            {viewingForm.status !== "idle" && (
              <p
                className={`mt-4 text-sm font-bold ${viewingForm.status === "error" ? "text-red-700" : "text-[#17383C]"}`}
              >
                {viewingForm.message}
              </p>
            )}
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
