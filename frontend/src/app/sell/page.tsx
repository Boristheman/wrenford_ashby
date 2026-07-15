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


export default function SellPage() {
  const valuationForm = useEnquiryForm("sales-valuation");

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".sell-enter, .sell-image-enter",
      ),
    );

    if (!items.length) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <style>{`
        .sell-enter {
          opacity: 0;
          transform: translate3d(0, 30px, 0);
          transition:
            opacity 760ms cubic-bezier(.22,1,.36,1),
            transform 760ms cubic-bezier(.22,1,.36,1);
          transition-delay: var(--sell-delay, 0ms);
        }

        .sell-image-enter {
          opacity: 0;
          transform: translate3d(0, 24px, 0) scale(1.02);
          transition:
            opacity 900ms cubic-bezier(.22,1,.36,1),
            transform 900ms cubic-bezier(.22,1,.36,1);
          transition-delay: var(--sell-delay, 0ms);
        }

        .sell-enter.is-visible,
        .sell-image-enter.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .sell-enter,
          .sell-image-enter {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <SiteHeader />

      <section
        id="selling-fees"
        className="relative scroll-mt-28 overflow-hidden bg-[#0D2529] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16"
      >
        <img
          src="/graphics/hero/london.png"
          alt="Homes across Essex"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#071C20]/28" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C20]/58 via-[#071C20]/20 to-transparent" />

        <div className="relative mx-auto -translate-y-3 max-w-[1480px] sm:-translate-y-5">
          <div className="sell-enter max-w-[1040px]">
            <h1 className="text-[clamp(3.2rem,6vw,6.8rem)] font-black leading-[0.92] tracking-[-0.055em]">
              Clear from the
              <br />
              very beginning.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              We agree the fee, asking price and launch plan before any work
              begins. The essentials needed to market the property properly
              are included rather than added later as separate charges.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-white/18 bg-white/18 md:grid-cols-3">
            {feeDetails.map((fee, index) => (
              <article
                key={fee.title}
                className="sell-enter flex min-h-[210px] flex-col justify-between bg-white p-6 text-[#17383C] sm:p-7"
                style={{ "--sell-delay": `${180 + index * 90}ms` } as React.CSSProperties}
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                    {fee.title}
                  </p>
                  <p className="mt-3 text-[clamp(2rem,3vw,3.1rem)] font-black tracking-[-0.045em]">
                    {fee.value}
                  </p>
                </div>

                <p className="mt-6 max-w-sm text-sm leading-6 text-[#17383C]/52">
                  {fee.detail}
                </p>
              </article>
            ))}
          </div>

          <div
            className="sell-enter mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ "--sell-delay": "480ms" } as React.CSSProperties}
          >
            <a
              href="#book-valuation"
              className="group inline-flex min-h-13 items-center justify-center gap-3 border border-[#AFC7C0] bg-[#BFD3CD] px-6 py-3 font-black !text-[#17383C] transition duration-200 visited:!text-[#17383C] hover:border-white hover:bg-white hover:!text-[#17383C]"
            >
              <span className="!text-[#17383C]">Book a valuation</span>
              <ArrowIcon className="h-4 w-4 text-[#17383C] transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#sales-progression"
              className="group inline-flex min-h-13 items-center justify-center gap-3 border border-white/55 bg-[#0D2529]/45 px-6 py-3 font-black !text-white transition duration-200 visited:!text-white hover:border-[#BFD3CD] hover:bg-[#BFD3CD] hover:!text-[#17383C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="!text-white transition-colors duration-200 group-hover:!text-[#17383C]">
                See the selling process
              </span>
              <ArrowIcon className="h-4 w-4 text-white transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#17383C]" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="why-choose-us"
        className="scroll-mt-28 bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1480px]">
          <div className="sell-enter max-w-5xl">
            <h2 className="text-[clamp(2.4rem,4.2vw,4.8rem)] font-black leading-[0.98] tracking-[-0.045em] text-[#17383C]">
              So, why are we the right agents for you?
            </h2>
          </div>

          <div className="mt-20 grid gap-x-12 gap-y-16 sm:mt-24 lg:mt-28 md:grid-cols-2 lg:grid-cols-3">
            {sellerStats.map((stat, index) => (
              <article
                key={stat.value}
                className="sell-enter"
                style={{ "--sell-delay": `${180 + index * 85}ms` } as React.CSSProperties}
              >
                <div className="mb-7 h-px w-28 border-t border-dashed border-[#C49A43]" />
                <p className="text-[clamp(3.5rem,7vw,7.4rem)] font-black leading-none tracking-[-0.065em] text-[#0F4657]">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="mt-5 max-w-md text-base leading-7 text-[#17383C]/58 sm:text-lg">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section
        id="book-valuation"
        className="scroll-mt-28 bg-[#EAF0ED] px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1480px] items-stretch gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div className="sell-enter flex min-h-[720px] h-full flex-col justify-between border border-[#17383C]/10 bg-white p-7 sm:p-9 lg:p-10 xl:p-12">
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

          <div className="sell-enter h-full bg-[#17383C] p-5 text-white shadow-[0_18px_48px_rgba(23,56,60,0.14)] sm:p-8 lg:p-10">
            {valuationForm.status === "success" ? (
              <div className="flex min-h-[590px] flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
                  Valuation request received
                </p>
                <h3 className="mt-4 max-w-2xl text-[clamp(2.4rem,4vw,4.3rem)] font-black leading-[0.98] tracking-[-0.045em]">
                  Thank you. We will contact you to arrange the visit.
                </h3>
                <button
                  type="button"
                  onClick={valuationForm.reset}
                  className="mt-8 w-fit border-b border-white/35 pb-1 text-sm font-black transition hover:border-white"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={valuationForm.handleSubmit}>
                <input type="hidden" name="botField" value="" readOnly />
                <div className="border-b border-white/12 pb-6">
                  <h3 className="text-3xl font-black tracking-[-0.04em]">
                    Arrange your valuation
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">
                    Add the basic details below. We will confirm the appointment
                    by phone or email.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="text-xs font-black text-white/72">
                      Property postcode *
                    </span>
                    <input
                      required
                      name="postcode"
                      type="text"
                      placeholder="SS12 9AA"
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/32 focus:border-[#BFD3CD]"
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
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
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
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
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
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      When are you hoping to move?
                    </span>
                    <select
                      name="timescale"
                      defaultValue=""
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
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
                      rows={4}
                      placeholder="Add the address, property type or anything useful for the valuation."
                      className="mt-2 w-full resize-y border border-white/24 bg-white px-4 py-4 text-sm leading-6 text-[#17383C] outline-none placeholder:text-[#17383C]/32 focus:border-[#BFD3CD]"
                    />
                  </label>
                </div>

                <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-white/55">
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
                  className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 bg-[#BFD3CD] px-6 py-4 font-black !text-[#17383C] transition hover:bg-white hover:!text-[#17383C] disabled:cursor-wait disabled:opacity-65"
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
        className="scroll-mt-28 bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="sell-enter lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                The full selling process
              </p>

              <h2 className="mt-4 text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-[0.96] tracking-[-0.05em] text-[#17383C]">
                From valuation to key handover.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#17383C]/60 sm:text-lg sm:leading-8">
                Sales progression is not a final phone call after an offer. It
                is the continuous management of every stage, person and
                deadline involved in the move.
              </p>
            </div>

            <div className="border-t border-[#17383C]/12">
              {salesJourney.map((step, index) => (
                <article
                  key={step.number}
                  id={index === 6 ? "after-offer" : undefined}
                  className="sell-enter grid gap-4 border-b border-[#17383C]/10 py-7 sm:grid-cols-[88px_180px_1fr] sm:gap-6 sm:py-8"
                  style={{ "--sell-delay": `${index * 65}ms` } as React.CSSProperties}
                >
                  <p className="text-sm font-black tracking-[0.12em] text-[#6B908D]">
                    {step.number}
                  </p>

                  <p className="text-sm font-black uppercase tracking-[0.08em] text-[#17383C]/65">
                    {step.phase}
                  </p>

                  <div>
                    <h3 className="text-xl font-black tracking-[-0.03em] text-[#17383C] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-[#17383C]/55 sm:text-base sm:leading-7">
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
