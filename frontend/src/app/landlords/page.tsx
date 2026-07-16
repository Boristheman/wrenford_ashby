"use client";

import React, { useEffect, useState } from "react";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";
import CookiePreferences, { openCookieSettings } from "../__components/CookiePreferences";
import { useEnquiryForm } from "../__components/useEnquiryForm";

const managedFee = "10% + VAT";
const letOnlyFee = "£795 + VAT";

const heroCards = [
  {
    label: "Managed",
    value: managedFee,
    text: "Ongoing support with rent, tenants, repairs and tenancy administration.",
  },
  {
    label: "Let only",
    value: letOnlyFee,
    text: "Marketing, viewings, referencing and tenancy setup before handover.",
  },
  {
    label: "Rental valuation",
    value: "£0",
    text: "A realistic rental figure and clear route-to-market recommendation.",
  },
];

const managedItems = [
  "Tenant communication",
  "Rent collection",
  "Maintenance coordination",
  "Routine tenancy administration",
  "Renewal support",
  "Regular landlord updates",
];

const letOnlyItems = [
  "Rental valuation",
  "Photography and marketing",
  "Viewings and feedback",
  "Applicant qualification",
  "Referencing",
  "Tenancy setup and handover",
];

const valuationItems = [
  "Comparable local rents",
  "Current tenant demand",
  "Property condition",
  "Likely tenant profile",
  "Recommended launch rent",
  "Suggested service level",
];

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

function LandlordsMobileHeader({
  menuOpen,
  onOpen,
}: {
  menuOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] border-b border-[#17383C]/12 bg-white text-[#17383C] shadow-[0_10px_28px_rgba(13,37,41,0.12)] sm:hidden">
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                d="M8.2 3.8 10 8.2 7.8 9.6a14 14 0 0 0 6.6 6.6l1.4-2.2 4.4 1.8v3a2 2 0 0 1-2 2C9.9 20.8 3.2 14.1 3.2 5.8a2 2 0 0 1 2-2h3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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

const landlordsMobileNavItems = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

function LandlordsMobileDrawer({
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

      <aside className="landlords-mobile-drawer-in fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(82vw,22rem)] max-w-full flex-col overflow-hidden bg-white text-[#17383C] shadow-[-24px_0_64px_rgba(0,0,0,0.22)] sm:hidden">
        <div className="flex min-h-[5rem] shrink-0 items-center justify-between border-b border-[#17383C]/8 px-5 pt-[env(safe-area-inset-top)]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B908D]">
            Navigation
          </p>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-end"
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
          {landlordsMobileNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="group flex min-h-[3.45rem] items-center justify-between gap-4 border-b border-[#17383C]/8 text-[0.98rem] font-bold tracking-[-0.012em] active:opacity-50"
            >
              <span>{item.label}</span>
              <ArrowIcon />
            </a>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#17383C]/8 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <a
            href="/contact"
            onClick={onClose}
            style={{ color: "#ffffff" }}
            className="flex min-h-14 items-center justify-between bg-[#17383C] px-5 text-sm font-black !text-white visited:!text-white"
          >
            <span style={{ color: "#ffffff" }}>Contact us</span>
            <ArrowIcon />
          </a>
        </div>
      </aside>
    </>
  );
}

function LandlordsFooterPhoneIcon({
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

function LandlordsFooterMailIcon({
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

function LandlordsCookieIcon({
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

function LandlordsMobileFooter({
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
            <LandlordsFooterPhoneIcon className="h-4 w-4 text-[#BFD3CD]" />
            01268 000 000
          </a>

          <a
            href="mailto:hello@wrenfordashby.co.uk"
            className="flex items-center gap-3 text-white/60"
          >
            <LandlordsFooterMailIcon className="h-4 w-4 text-[#BFD3CD]" />
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
            <LandlordsCookieIcon className="h-3.5 w-3.5" />
            Cookie settings
          </button>
          <span>© 2026 Wrenford Ashby</span>
        </div>
      </div>
    </footer>
  );
}


function InfoGrid({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${
        dark ? "text-white" : "text-[#17383C]"
      }`}
    >
      {items.map((item, index) => (
        <div
          key={item}
          className={`landlord-item flex min-h-[72px] items-center gap-4 px-5 py-4 ${
            dark
              ? "border border-white/14 bg-white/[0.055]"
              : "border border-[#17383C]/12 bg-white"
          }`}
          style={{ transitionDelay: `${120 + index * 70}ms` }}
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              dark
                ? "bg-[#BFD3CD] text-[#17383C]"
                : "bg-[#EAF0ED] text-[#17383C]"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-3.5 w-3.5"
            >
              <path
                d="m6.5 12.5 3.4 3.4 7.6-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span
            className={`text-sm font-black leading-5 ${dark ? "!text-white" : ""}`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function LandlordsPage() {
  const enquiryForm = useEnquiryForm("landlord-enquiry");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-landlord-reveal]"),
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      elements.forEach((element) => {
        element.classList.add("landlord-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("landlord-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <LandlordsMobileHeader
        menuOpen={mobileMenuOpen}
        onOpen={() => setMobileMenuOpen(true)}
      />
      <LandlordsMobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="hidden sm:block">
        <SiteHeader />
      </div>

      <section
        id="landlord-services"
        className="landlords-hero relative overflow-x-clip overflow-y-visible bg-[#0D2529] text-white"
      >
        <img
          src="/graphics/hero/tree.png"
          alt="Mature tree and open countryside in South Essex"
          draggable={false}
          className="landlords-hero-image-in pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#071C20]/12 sm:bg-[#071C20]/25" />
        <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-[#071C20]/78 via-[#071C20]/28 to-transparent sm:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[#071C20]/88 via-[#071C20]/24 to-transparent sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#071C20]/64 via-[#071C20]/24 to-transparent sm:block" />

        <div className="landlords-hero-inner relative mx-auto flex max-w-[1480px] flex-col px-4 pb-4 pt-7 sm:block sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div>
            <p
              className="landlords-hero-item-in text-[10px] font-black uppercase tracking-[0.18em] text-[#D9E7E2] sm:hidden"
              style={{ animationDelay: "140ms" }}
            >
              Landlord services
            </p>

            <h1
              className="landlords-hero-item-in mt-3 max-w-[10ch] text-[3.45rem] font-black leading-[0.86] tracking-[-0.068em] !text-white sm:mt-0 sm:max-w-none sm:text-[clamp(3.2rem,6vw,6.8rem)] sm:leading-[0.92] sm:tracking-[-0.055em]"
              style={{ animationDelay: "220ms" }}
            >
              We handle the tenancy.
              <br />
              You keep the control.
            </h1>

            <p
              className="landlords-hero-item-in mt-4 max-w-[29rem] text-[0.86rem] font-semibold leading-[1.28rem] !text-white/88 sm:mt-6 sm:max-w-3xl sm:text-lg sm:font-medium sm:leading-8 sm:!text-white/76"
              style={{ animationDelay: "320ms" }}
            >
              Choose the support that suits you, with the fee and
              responsibilities explained clearly before anything begins.
            </p>
          </div>

          <div className="mt-auto sm:mt-10">
            <div
              className="landlords-hero-item-in grid grid-cols-3 gap-2 sm:gap-px sm:border sm:border-white/18 sm:bg-white/18"
              style={{ animationDelay: "430ms" }}
            >
              {heroCards.map((card) => (
                <article
                  key={card.label}
                  className="landlords-hero-card flex min-w-0 flex-col justify-between overflow-hidden border border-white/35 bg-white p-2.5 text-[#17383C] shadow-[0_8px_20px_rgba(0,0,0,0.16)] sm:border-0 sm:p-7 sm:shadow-none"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[8px] font-black uppercase tracking-[0.09em] text-[#527875] sm:text-[10px] sm:tracking-[0.13em]">
                      {card.label}
                    </p>

                    <p className="mt-2 break-words text-[0.96rem] font-black leading-[0.94] tracking-[-0.04em] sm:mt-3 sm:text-[clamp(2rem,3vw,3.1rem)]">
                      {card.value}
                    </p>
                  </div>

                  <p className="overflow-hidden text-[0.52rem] font-bold leading-[0.69rem] text-[#17383C]/72 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:mt-6 sm:block sm:text-sm sm:font-semibold sm:leading-6 sm:text-[#17383C]/62">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>

            <div
              className="landlords-hero-item-in mt-3 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3"
              style={{ animationDelay: "540ms" }}
            >
              <a
                href="#rental-valuation"
                style={{ color: "#ffffff" }}
                className="group flex min-h-[3.25rem] items-center justify-between gap-2 bg-[#17383C] px-3 text-[0.7rem] font-black !text-white shadow-[0_8px_22px_rgba(0,0,0,0.18)] visited:!text-white sm:inline-flex sm:px-6 sm:text-base"
              >
                <span style={{ color: "#ffffff" }}>Book a valuation</span>
                <ArrowIcon />
              </a>

              <a
                href="#managed"
                style={{ color: "#17383C" }}
                className="group flex min-h-[3.25rem] items-center justify-between gap-2 border border-[#BFD3CD] bg-[#BFD3CD] px-3 text-[0.7rem] font-black !text-[#17383C] shadow-[0_8px_22px_rgba(0,0,0,0.14)] visited:!text-[#17383C] sm:inline-flex sm:px-6 sm:text-base"
              >
                <span style={{ color: "#17383C" }}>Landlord services</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="managed"
        className="scroll-mt-28 bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12"
      >
        <div
          data-landlord-reveal
          className="landlord-reveal landlord-from-left mx-auto max-w-[1480px]"
        >
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6B908D]">
                Managed
              </p>

              <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,4.4vw,4.9rem)] font-black leading-[0.96] tracking-[-0.052em]">
                Ongoing management without the daily workload.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#17383C]/62">
                We stay involved after move-in, handling rent, tenant contact,
                maintenance and routine administration while you keep oversight
                of the decisions that matter.
              </p>
            </div>

            <div className="bg-[#17383C] p-6 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
                Management fee
              </p>
              <p className="mt-2 text-4xl font-black tracking-[-0.045em] !text-white">
                {managedFee}
              </p>
              <p className="mt-1 text-sm !text-white/52">of the monthly rent</p>

              <a
                href="#landlord-enquiry"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#BFD3CD] px-5 font-black !text-[#17383C] transition hover:bg-white"
              >
                Ask about management
                <ArrowIcon />
              </a>
            </div>
          </div>

          <InfoGrid items={managedItems} />
        </div>
      </section>

      <section
        id="let-only"
        className="scroll-mt-28 bg-[#EAF0ED] px-5 py-12 sm:px-8 sm:py-14 lg:px-12"
      >
        <div
          data-landlord-reveal
          className="landlord-reveal landlord-from-right mx-auto max-w-[1480px]"
        >
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6B908D]">
                Let only
              </p>

              <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,4.4vw,4.9rem)] font-black leading-[0.96] tracking-[-0.052em]">
                We prepare the tenancy. You manage it.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#17383C]/62">
                We handle the valuation, marketing, viewings, applicant checks
                and move-in setup, then hand the ongoing tenancy back to you in
                a clear and organised state.
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Let-only fee
              </p>
              <p className="mt-2 text-4xl font-black tracking-[-0.045em]">
                {letOnlyFee}
              </p>
              <p className="mt-1 text-sm text-[#17383C]/48">one-off fee</p>

              <a
                href="#landlord-enquiry"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 border border-[#17383C] px-5 font-black text-[#17383C] transition hover:bg-[#F4F6F4]"
              >
                Ask about let only
                <ArrowIcon />
              </a>
            </div>
          </div>

          <InfoGrid items={letOnlyItems} />
        </div>
      </section>

      <section
        id="rental-valuation"
        className="scroll-mt-28 bg-[#BFD3CD] px-5 py-12 text-[#17383C] sm:px-8 sm:py-14 lg:px-12"
      >
        <div
          data-landlord-reveal
          className="landlord-reveal landlord-from-left mx-auto max-w-[1480px]"
        >
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#17383C]/58">
                Rental valuation
              </p>

              <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,4.4vw,4.9rem)] font-black leading-[0.96] tracking-[-0.052em] text-[#17383C]">
                A realistic rent backed by local evidence.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#17383C]/64">
                We assess the exact home, current tenant demand and nearby
                competition, then recommend the launch rent, likely tenant
                profile and most suitable service.
              </p>
            </div>

            <div className="bg-[#17383C] p-6 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
                Rental valuation
              </p>
              <p className="mt-2 text-4xl font-black tracking-[-0.045em] !text-white">
                £0
              </p>
              <p className="mt-1 text-sm !text-white/52">
                no-obligation appointment
              </p>

              <a
                href="#landlord-enquiry"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-white px-5 font-black !text-[#17383C] transition hover:bg-[#EAF0ED]"
              >
                Arrange a valuation
                <ArrowIcon />
              </a>
            </div>
          </div>

          <InfoGrid items={valuationItems} />
        </div>
      </section>

      <section
        id="landlord-enquiry"
        className="scroll-mt-28 border-y border-white/10 bg-[#EAF0ED] px-3 py-5 text-white sm:bg-[#17383C] sm:px-8 sm:py-14 lg:px-12"
      >
        <div
          data-landlord-reveal
          className="landlord-reveal mx-auto grid max-w-[1480px] items-stretch gap-0 sm:gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12"
        >
          <div className="hidden h-full flex-col pt-1 sm:flex">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#BFD3CD]">
              Landlord enquiry
            </p>

            <h2 className="mt-5 max-w-3xl text-[clamp(3rem,5vw,5.5rem)] font-black leading-[0.94] tracking-[-0.055em] !text-white">
              Tell us about the property.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 !text-white/68">
              Share the property details, preferred timing and service you are
              considering. The Wickford lettings team will contact you with a
              clear recommendation.
            </p>

            <div className="mt-6">
              <p className="text-sm font-black !text-white">
                Prefer to speak directly?
              </p>

              <a
                href="tel:01268000000"
                className="mt-3 inline-block text-3xl font-black tracking-[-0.035em] !text-white"
              >
                01268 000 000
              </a>

              <p className="mt-2 max-w-lg text-sm leading-6 !text-white/52">
                Speak with the local team about managed, let only or arranging a
                rental valuation.
              </p>
            </div>

            <div className="mt-6 border border-white/14 bg-white/[0.06] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
                What to expect
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 !text-white/68">
                A local member of the Wickford lettings team will review the
                property details, call you to discuss the likely rent and
                timing, then explain the available service options clearly
                without any pressure to proceed.
              </p>
            </div>
          </div>

          <form
            onSubmit={enquiryForm.handleSubmit}
            className="relative h-full bg-[#17383C] p-4 text-white shadow-[0_18px_45px_rgba(23,56,60,0.12)] sm:bg-white sm:p-8 sm:text-[#17383C] lg:p-9"
          >
            <input type="hidden" name="botField" value="" readOnly />
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-5">
              <label>
                <span className="mb-1.5 block text-[0.68rem] font-black uppercase tracking-[0.08em] text-white/74 sm:mb-2 sm:text-xs sm:tracking-[0.12em] sm:text-[#6B908D]">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  className="h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:border-[#17383C]/16 sm:px-4 sm:text-sm sm:focus:border-[#17383C]"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-[0.68rem] font-black uppercase tracking-[0.08em] text-white/74 sm:mb-2 sm:text-xs sm:tracking-[0.12em] sm:text-[#6B908D]">
                  Phone number
                </span>
                <input
                  required
                  name="phone"
                  type="tel"
                  className="h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:border-[#17383C]/16 sm:px-4 sm:text-sm sm:focus:border-[#17383C]"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-[0.68rem] font-black uppercase tracking-[0.08em] text-white/74 sm:mb-2 sm:text-xs sm:tracking-[0.12em] sm:text-[#6B908D]">
                  Email address
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  className="h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:border-[#17383C]/16 sm:px-4 sm:text-sm sm:focus:border-[#17383C]"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-[0.68rem] font-black uppercase tracking-[0.08em] text-white/74 sm:mb-2 sm:text-xs sm:tracking-[0.12em] sm:text-[#6B908D]">
                  Property postcode
                </span>
                <input
                  required
                  name="postcode"
                  type="text"
                  className="h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:border-[#17383C]/16 sm:px-4 sm:text-sm sm:focus:border-[#17383C]"
                />
              </label>

              <label className="col-span-2">
                <span className="mb-1.5 block text-[0.68rem] font-black uppercase tracking-[0.08em] text-white/74 sm:mb-2 sm:text-xs sm:tracking-[0.12em] sm:text-[#6B908D]">
                  Service required
                </span>
                <select
                  required
                  name="service"
                  defaultValue=""
                  className="h-[3.25rem] min-h-[3.25rem] w-full appearance-none rounded-none border border-white/24 bg-white px-3 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:border-[#17383C]/16 sm:px-4 sm:text-sm sm:focus:border-[#17383C]"
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  <option value="managed">Managed</option>
                  <option value="let-only">Let only</option>
                  <option value="rental-valuation">Rental valuation</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </label>

              <label className="col-span-2">
                <span className="mb-1.5 block text-[0.68rem] font-black uppercase tracking-[0.08em] text-white/74 sm:mb-2 sm:text-xs sm:tracking-[0.12em] sm:text-[#6B908D]">
                  Property details
                </span>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Property type, current tenancy position or preferred timing..."
                  className="w-full resize-y rounded-none border border-white/24 bg-white px-3 py-3 text-base leading-5 text-[#17383C] outline-none placeholder:text-[#17383C]/34 focus:border-[#BFD3CD] sm:border-[#17383C]/16 sm:px-4 sm:text-sm sm:leading-6 sm:focus:border-[#17383C]"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={enquiryForm.isSending}
              className="mt-5 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-3 bg-[#BFD3CD] px-5 text-sm font-black !text-[#17383C] transition hover:bg-white disabled:cursor-wait disabled:opacity-65 sm:mt-6 sm:w-auto sm:bg-[#17383C] sm:px-7 sm:!text-white sm:hover:bg-[#2D5B5D]"
            >
              {enquiryForm.isSending
                ? "Sending enquiry..."
                : "Send landlord enquiry"}
              <ArrowIcon />
            </button>

            {enquiryForm.status === "success" && (
              <p
                role="status"
                className="mt-5 border-l-4 border-[#17383C] bg-[#EAF0ED] px-4 py-3 text-sm font-bold"
              >
                {enquiryForm.message}
              </p>
            )}

            {enquiryForm.status === "error" && (
              <p
                role="alert"
                className="mt-5 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm font-bold text-red-800"
              >
                {enquiryForm.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <LandlordsMobileFooter
        onOpenCookiePreferences={openCookieSettings}
      />

      <div className="hidden sm:block">
        <SiteFooter />
      </div>


      <style>{`
        .landlords-hero {
          margin-top: 5.1rem;
          min-height: calc(100svh - 5.1rem);
        }

        .landlords-hero-inner {
          min-height: calc(100svh - 5.1rem);
        }

        .landlords-hero-card {
          height: 108px;
        }

        @media (min-width: 640px) {
          .landlords-hero {
            margin-top: 0;
            min-height: 0;
          }

          .landlords-hero-inner {
            min-height: 0;
          }

          .landlords-hero-card {
            height: auto;
            min-height: 205px;
          }
        }

        @keyframes landlordsMobileDrawerIn {
          from {
            transform: translate3d(100%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .landlords-mobile-drawer-in {
          animation: landlordsMobileDrawerIn 300ms cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes landlordsHeroImageIn {
          from {
            opacity: 0;
            transform: scale(1.055);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes landlordsHeroItemIn {
          from {
            opacity: 0;
            transform: translate3d(0, 24px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .landlords-hero-image-in {
          animation: landlordsHeroImageIn 1100ms cubic-bezier(.22,1,.36,1) both;
          will-change: opacity, transform;
        }

        .landlords-hero-item-in {
          opacity: 0;
          animation: landlordsHeroItemIn 760ms cubic-bezier(.22,1,.36,1) both;
          will-change: opacity, transform;
        }

        .landlord-reveal {
          opacity: 0;
          transform: translate3d(0, 30px, 0);
          transition:
            opacity 720ms cubic-bezier(.22,1,.36,1),
            transform 720ms cubic-bezier(.22,1,.36,1);
        }

        .landlord-from-left {
          transform: translate3d(-40px, 18px, 0);
        }

        .landlord-from-right {
          transform: translate3d(40px, 18px, 0);
        }

        .landlord-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .landlord-item {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition:
            opacity 600ms cubic-bezier(.22,1,.36,1),
            transform 600ms cubic-bezier(.22,1,.36,1);
        }

        .landlord-visible .landlord-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .landlords-hero-image-in,
          .landlords-hero-item-in,
          .landlord-reveal,
          .landlord-item {
            opacity: 1;
            transform: none;
            animation: none;
            transition: none;
          }
        }
      `}</style>
      <CookiePreferences />
    </main>
  );
}
