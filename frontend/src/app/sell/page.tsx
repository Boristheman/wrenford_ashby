"use client";

import React, { useEffect, useRef, useState } from "react";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";
import { useEnquiryForm } from "../__components/useEnquiryForm";

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

const feeDetails = [
  {
    title: "Sole agency",
    value: "From 1.2%",
    detail: "Including VAT. The exact fee is agreed before marketing begins.",
  },
  {
    title: "Upfront cost",
    value: "£0",
    detail: "Photography, floorplans and portal marketing are included.",
  },
  {
    title: "Payment",
    value: "On completion",
    detail: "No sale, no agency fee.",
  },
];


const salesJourney = [
  {
    number: "01",
    phase: "Valuation",
    title: "Understand the likely selling range.",
    text: "We visit the property, review recent nearby sales and discuss the condition, location and current buyer demand before recommending a price.",
  },
  {
    number: "02",
    phase: "Instruction",
    title: "Agree the fee and launch plan.",
    text: "The agency agreement, fee, asking price and marketing approach are confirmed in writing before photography or advertising begins.",
  },
  {
    number: "03",
    phase: "Preparation",
    title: "Prepare the property for market.",
    text: "Photography, floorplans, measurements, property details and compliance information are completed and checked with you.",
  },
  {
    number: "04",
    phase: "Launch",
    title: "Put the property in front of the right buyers.",
    text: "The listing goes live across the agreed portals and is matched with suitable buyers already registered with the Wickford office.",
  },
  {
    number: "05",
    phase: "Viewings",
    title: "Manage appointments and useful feedback.",
    text: "We qualify viewers, arrange access, follow up after each appointment and adjust the approach when the feedback shows it is needed.",
  },
  {
    number: "06",
    phase: "Offers",
    title: "Check the buyer before recommending an offer.",
    text: "We confirm the buyer's funding, chain position and timescale, then negotiate clearly and report the full position to you.",
  },
  {
    number: "07",
    phase: "Sales progression",
    title: "Keep the legal work and chain moving.",
    text: "After the memorandum of sale is issued, we maintain contact with solicitors, mortgage advisers, buyers and the other agents in the chain.",
  },
  {
    number: "08",
    phase: "Exchange and completion",
    title: "Coordinate the final move.",
    text: "We help keep proposed dates aligned, confirm exchange and arrange the final key handover once completion has taken place.",
  },
];

const sellerStats = [
  {
    value: 154,
    label: "buyers ready to proceed",
  },
  {
    value: 230,
    label: "first-time buyers registered with us",
  },
  {
    value: 42,
    label: "cash buyers registered with us",
  },
  {
    value: 5047,
    label: "viewings arranged in the last 12 months",
  },
  {
    value: 139,
    label: "active buyers registered with us with a property to sell",
  },
];

function AnimatedStat({ value }: { value: number }) {
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const number = numberRef.current;

    if (!number || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    observer.observe(number);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let animationFrame = 0;
    let startTime = 0;
    const duration = value >= 1000 ? 2400 : 2000;

    const animate = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasStarted, value]);

  return (
    <span ref={numberRef} className="block tabular-nums">
      {displayValue.toLocaleString("en-GB")}
    </span>
  );
}


function SellMobileHeader({
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

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

function SellMobileDrawer({
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
        className={`fixed inset-0 z-[1090] bg-[#061719]/62 backdrop-blur-[1px] transition-opacity duration-300 sm:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!open}
        className={`fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(82vw,22rem)] max-w-full flex-col overflow-hidden bg-white text-[#17383C] shadow-[-24px_0_64px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] sm:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
          {mobileNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="group flex min-h-[3.45rem] items-center justify-between gap-4 border-b border-[#17383C]/8 text-[0.98rem] font-bold tracking-[-0.012em] active:opacity-50"
            >
              <span>{item.label}</span>
              <ArrowIcon className="h-3.5 w-3.5 text-[#6B908D] transition-transform group-active:translate-x-0.5" />
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
            <ArrowIcon className="h-4 w-4 text-white" />
          </a>
        </div>
      </aside>
    </>
  );
}

export default function SellPage() {
  const valuationForm = useEnquiryForm("sales-valuation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <style>{`
        .sell-hero {
          margin-top: 5.1rem;
          min-height: calc(100svh - 5.1rem);
        }

        .sell-hero-inner {
          min-height: calc(100svh - 5.1rem);
        }

        .sell-fee-card {
          height: 108px;
        }

        @media (min-width: 640px) {
          .sell-hero {
            margin-top: 0;
            min-height: 0;
          }

          .sell-hero-inner {
            min-height: 0;
          }

          .sell-fee-card {
            height: auto;
            min-height: 210px;
          }
        }
      `}</style>

      <SellMobileHeader
        menuOpen={mobileMenuOpen}
        onOpen={() => setMobileMenuOpen(true)}
      />
      <SellMobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="hidden sm:block">
        <SiteHeader />
      </div>

      <section
        id="selling-fees"
        className="sell-hero relative scroll-mt-28 overflow-hidden bg-[#0D2529] text-white"
      >
        <img
          src="/graphics/hero/london.png"
          alt="Homes across Essex"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#071C20]/10 sm:bg-[#071C20]/28" />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#071C20]/76 via-[#071C20]/24 to-transparent sm:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#071C20]/86 via-[#071C20]/20 to-transparent sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#071C20]/58 via-[#071C20]/20 to-transparent sm:block" />

        <div className="sell-hero-inner relative mx-auto flex max-w-[1480px] flex-col px-4 pb-4 pt-7 sm:block sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C7D9D4] sm:hidden">
              Selling your home
            </p>

            <h1 className="mt-3 text-[3.8rem] font-black leading-[0.84] tracking-[-0.07em] sm:mt-0 sm:text-[clamp(3.2rem,6vw,6.8rem)] sm:leading-[0.92] sm:tracking-[-0.055em]">
              Clear from the
              <br />
              very beginning.
            </h1>

            <p className="mt-4 max-w-[29rem] text-[0.82rem] leading-[1.2rem] text-white/80 sm:mt-6 sm:max-w-3xl sm:text-lg sm:leading-8 sm:text-white/72">
              We agree the fee, asking price and launch plan before any work
              begins. Everything needed to market the property properly is
              included from day one.
            </p>
          </div>

          <div className="mt-auto sm:mt-10">
            <div className="grid grid-cols-3 gap-2 sm:gap-px sm:border sm:border-white/18 sm:bg-white/18">
              {feeDetails.map((fee) => (
                <article
                  key={fee.title}
                  className="sell-fee-card flex min-w-0 flex-col justify-between overflow-hidden border border-white/35 bg-white p-2.5 text-[#17383C] shadow-[0_8px_20px_rgba(0,0,0,0.16)] sm:border-0 sm:p-7 sm:shadow-none"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[7px] font-black uppercase tracking-[0.09em] text-[#6B908D] sm:text-[10px] sm:tracking-[0.13em]">
                      {fee.title}
                    </p>
                    <p className="mt-2 break-words text-[0.98rem] font-black leading-[0.94] tracking-[-0.04em] sm:mt-3 sm:text-[clamp(2rem,3vw,3.1rem)]">
                      {fee.value}
                    </p>
                  </div>

                  <p className="overflow-hidden text-[0.45rem] leading-[0.61rem] text-[#17383C]/56 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:mt-6 sm:block sm:text-sm sm:leading-6 sm:text-[#17383C]/52">
                    {fee.detail}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3">
              <a
                href="#book-valuation"
                style={{ color: "#ffffff" }}
                className="group flex min-h-[3.25rem] items-center justify-between gap-2 bg-[#17383C] px-3 text-[0.72rem] font-black !text-white shadow-[0_8px_22px_rgba(0,0,0,0.18)] visited:!text-white sm:inline-flex sm:px-6 sm:text-base"
              >
                <span style={{ color: "#ffffff" }}>Book a valuation</span>
                <ArrowIcon className="h-4 w-4 text-white" />
              </a>

              <a
                href="#sales-progression"
                style={{ color: "#17383C" }}
                className="group flex min-h-[3.25rem] items-center justify-between gap-2 border border-[#BFD3CD] bg-[#BFD3CD] px-3 text-[0.72rem] font-black !text-[#17383C] shadow-[0_8px_22px_rgba(0,0,0,0.14)] visited:!text-[#17383C] sm:inline-flex sm:px-6 sm:text-base"
              >
                <span style={{ color: "#17383C" }}>Selling process</span>
                <ArrowIcon className="h-4 w-4 text-[#17383C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-choose-us"
        className="scroll-mt-28 bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1480px]">
          <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#6B908D] sm:text-xs sm:tracking-[0.16em]">
            Why choose Wrenford Ashby
          </p>

          <h2 className="mt-3 max-w-[12ch] text-[2.35rem] font-black leading-[0.94] tracking-[-0.052em] sm:max-w-5xl sm:text-[clamp(2.8rem,4.6vw,5rem)] sm:leading-[0.96]">
            Local buyers already looking.
          </h2>

          <p className="mt-4 max-w-2xl text-[0.88rem] leading-6 text-[#17383C]/58 sm:mt-6 sm:text-lg sm:leading-8">
            A realistic launch is stronger when the right buyers are already
            registered, qualified and ready to view.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:mt-16 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-3">
            {sellerStats.map((stat, index) => (
              <article
                key={stat.value}
                className={index === sellerStats.length - 1 ? "col-span-2 max-w-[18rem] lg:col-span-1 lg:max-w-none" : ""}
              >
                <div className="mb-4 h-px w-14 border-t border-dashed border-[#C49A43] sm:mb-7 sm:w-28" />
                <p className="text-[2.8rem] font-black leading-none tracking-[-0.065em] text-[#0F4657] sm:text-[clamp(3.5rem,7vw,7.4rem)]">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="mt-3 max-w-[11rem] text-[0.76rem] leading-[1.05rem] text-[#17383C]/58 sm:mt-5 sm:max-w-md sm:text-lg sm:leading-7">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="book-valuation"
        className="scroll-mt-28 bg-[#EAF0ED] px-3 py-6 sm:px-8 sm:py-16 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1480px] items-stretch gap-0 sm:gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div className="hidden h-full flex-col justify-between border border-[#17383C]/10 bg-white p-9 sm:flex sm:min-h-[720px] lg:p-10 xl:p-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                Request a valuation
              </p>

              <h2 className="mt-5 max-w-3xl text-[clamp(3rem,5.2vw,5.8rem)] font-black leading-[0.94] tracking-[-0.052em] text-[#17383C]">
                Start with a realistic figure.
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#17383C]/60">
                Send the property details and a local member of the team will
                contact you to arrange a convenient visit.
              </p>

              <div className="mt-10 max-w-xl border-t border-[#17383C]/12">
                {[
                  "Recent comparable sales considered",
                  "No-pressure appointment",
                  "Fee and launch plan explained clearly",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-16 items-center gap-3 border-b border-[#17383C]/10 text-sm font-bold"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-[#6B908D]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-[#17383C]/12 pt-7">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6B908D]">
                What happens next
              </p>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#17383C]/58">
                We will confirm the appointment, visit the property and follow
                up with the recommended price range, proposed fee and launch
                plan in writing.
              </p>
            </div>
          </div>

          <div className="h-full bg-[#17383C] p-4 text-white shadow-[0_18px_48px_rgba(23,56,60,0.14)] sm:p-8 lg:p-10">
            {valuationForm.status === "success" ? (
              <div className="flex min-h-[420px] flex-col justify-center sm:min-h-[590px]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
                  Valuation request received
                </p>
                <h3 className="mt-4 max-w-2xl text-[2.4rem] font-black leading-[0.98] tracking-[-0.045em] sm:text-[clamp(2.4rem,4vw,4.3rem)]">
                  Thank you. We will contact you to arrange the visit.
                </h3>
                <button
                  type="button"
                  onClick={valuationForm.reset}
                  className="mt-8 w-fit border-b border-white/35 pb-1 text-sm font-black"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={valuationForm.handleSubmit}>
                <input type="hidden" name="botField" value="" readOnly />

                <div className="border-b border-white/12 pb-4 sm:pb-6">
                  <h3 className="text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-3xl">
                    Arrange your valuation
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-5 text-white/58 sm:mt-3 sm:text-sm sm:leading-6">
                    Add the basic details below. We will confirm the appointment
                    by phone or email.
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
                  <label className="sm:col-span-2">
                    <span className="text-xs font-black text-white/72">
                      Property postcode *
                    </span>
                    <input
                      required
                      name="postcode"
                      type="text"
                      placeholder="SS12 9AA"
                      className="mt-1.5 min-h-12 w-full border border-white/24 bg-white px-4 text-base text-[#17383C] outline-none placeholder:text-[#17383C]/32 focus:border-[#BFD3CD] sm:mt-2 sm:min-h-[3.25rem] sm:text-sm"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Full name *
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="mt-1.5 min-h-12 w-full border border-white/24 bg-white px-4 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:mt-2 sm:min-h-[3.25rem] sm:text-sm"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Telephone *
                    </span>
                    <input
                      required
                      name="telephone"
                      type="tel"
                      autoComplete="tel"
                      className="mt-1.5 min-h-12 w-full border border-white/24 bg-white px-4 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:mt-2 sm:min-h-[3.25rem] sm:text-sm"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Email address *
                    </span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-1.5 min-h-12 w-full border border-white/24 bg-white px-4 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:mt-2 sm:min-h-[3.25rem] sm:text-sm"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      When are you hoping to move?
                    </span>
                    <select
                      name="timescale"
                      defaultValue=""
                      className="mt-1.5 min-h-12 w-full border border-white/24 bg-white px-4 text-base text-[#17383C] outline-none focus:border-[#BFD3CD] sm:mt-2 sm:min-h-[3.25rem] sm:text-sm"
                    >
                      <option value="">Select a timescale</option>
                      <option>As soon as possible</option>
                      <option>Within 3 months</option>
                      <option>Within 6 months</option>
                      <option>Just researching</option>
                    </select>
                  </label>

                  <label className="sm:col-span-2">
                    <span className="text-xs font-black text-white/72">
                      Property address or useful details
                    </span>
                    <textarea
                      name="details"
                      rows={3}
                      placeholder="Add the address, property type or anything useful for the valuation."
                      className="mt-1.5 w-full resize-y border border-white/24 bg-white px-4 py-3 text-base leading-6 text-[#17383C] outline-none placeholder:text-[#17383C]/32 focus:border-[#BFD3CD] sm:mt-2 sm:py-4 sm:text-sm"
                    />
                  </label>
                </div>

                <label className="mt-4 flex items-start gap-3 text-[0.7rem] leading-4 text-white/58 sm:mt-5 sm:text-xs sm:leading-5">
                  <input
                    required
                    type="checkbox"
                    name="consent"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#BFD3CD]"
                  />
                  <span>
                    I agree that Wrenford Ashby may use these details to
                    respond to this valuation request.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={valuationForm.isSending}
                  className="mt-5 flex min-h-[3.25rem] w-full items-center justify-center gap-3 bg-[#BFD3CD] px-5 py-3.5 text-sm font-black !text-[#17383C] disabled:cursor-wait disabled:opacity-65 sm:mt-7 sm:min-h-14 sm:px-6 sm:py-4 sm:text-base"
                >
                  {valuationForm.isSending
                    ? "Sending request..."
                    : "Submit valuation request"}
                  <ArrowIcon className="h-4 w-4 text-[#17383C]" />
                </button>

                {valuationForm.status === "error" && (
                  <p role="alert" className="mt-4 text-sm font-bold text-red-200">
                    {valuationForm.message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section
        id="sales-progression"
        className="scroll-mt-28 bg-white px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                The full selling process
              </p>

              <h2 className="mt-3 max-w-[12ch] text-[2.5rem] font-black leading-[0.95] tracking-[-0.05em] text-[#17383C] sm:mt-4 sm:max-w-none sm:text-[clamp(2.8rem,5vw,5.5rem)] sm:leading-[0.96]">
                From valuation to key handover.
              </h2>

              <p className="mt-4 max-w-xl text-[0.92rem] leading-6 text-[#17383C]/60 sm:mt-6 sm:text-lg sm:leading-8">
                Sales progression is not a final phone call after an offer. It
                is the continuous management of every stage, person and
                deadline involved in the move.
              </p>
            </div>

            <div className="relative mt-2 border-t border-[#17383C]/12 before:absolute before:bottom-0 before:left-[1.35rem] before:top-0 before:w-px before:bg-[#17383C]/10 sm:mt-0 sm:before:hidden">
              {salesJourney.map((step, index) => (
                <article
                  key={step.number}
                  id={index === 6 ? "after-offer" : undefined}
                  className="relative grid grid-cols-[2.7rem_1fr] gap-x-3 gap-y-1 border-b border-[#17383C]/10 py-5 sm:grid-cols-[88px_180px_1fr] sm:gap-6 sm:py-8"
                >
                  <p className="relative z-10 flex h-8 w-8 items-center justify-center bg-[#EAF0ED] text-[0.65rem] font-black tracking-[0.1em] text-[#17383C] sm:block sm:h-auto sm:w-auto sm:bg-transparent sm:text-sm sm:text-[#6B908D]">
                    {step.number}
                  </p>

                  <p className="self-center text-[0.68rem] font-black uppercase tracking-[0.09em] text-[#17383C]/55 sm:self-auto sm:text-sm sm:text-[#17383C]/65">
                    {step.phase}
                  </p>

                  <div className="col-start-2 sm:col-start-auto">
                    <h3 className="text-[1.05rem] font-black leading-[1.15] tracking-[-0.03em] text-[#17383C] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-[0.78rem] leading-5 text-[#17383C]/55 sm:mt-3 sm:text-base sm:leading-7">
                      {step.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
