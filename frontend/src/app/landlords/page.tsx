"use client";

import { useEffect } from "react";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";
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
      <div className="sticky top-0 z-[200] w-full bg-white">
        <SiteHeader />
      </div>

      <section
        id="landlord-services"
        className="relative overflow-hidden bg-[#0D2529] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16"
      >
        <img
          src="/graphics/hero/tree.png"
          alt="Mature tree and open countryside in South Essex"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#071C20]/22" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C20]/62 via-[#071C20]/22 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#071C20]/68 to-transparent" />

        <div className="relative mx-auto -translate-y-3 max-w-[1480px] sm:-translate-y-5">
          <div className="landlord-hero-copy max-w-[1080px]">
            <h1 className="text-[clamp(3.2rem,6vw,6.8rem)] font-black leading-[0.92] tracking-[-0.055em] !text-white">
              We handle the tenancy.
              <br />
              You keep the control.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 !text-white/72 sm:text-lg sm:leading-8">
              Choose the level of support that suits you, with the fee and
              responsibilities explained clearly before anything begins.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-white/18 bg-white/18 md:grid-cols-3">
            {heroCards.map((card, index) => (
              <article
                key={card.label}
                className="landlord-hero-card flex min-h-[205px] flex-col justify-between bg-white p-6 text-[#17383C] sm:p-7"
                style={{ animationDelay: `${230 + index * 90}ms` }}
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#6B908D]">
                    {card.label}
                  </p>

                  <p className="mt-3 text-[clamp(2rem,3vw,3.1rem)] font-black tracking-[-0.045em]">
                    {card.value}
                  </p>
                </div>

                <p className="mt-6 max-w-sm text-sm leading-6 text-[#17383C]/52">
                  {card.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#rental-valuation"
              className="landlord-hero-action group inline-flex min-h-13 items-center justify-center gap-3 border border-[#AFC7C0] bg-[#BFD3CD] px-6 py-3 font-black !text-[#17383C] transition duration-200 hover:border-white hover:bg-white"
              style={{ animationDelay: "580ms" }}
            >
              Book a rental valuation
              <ArrowIcon />
            </a>

            <a
              href="#managed"
              className="landlord-hero-action group inline-flex min-h-13 items-center justify-center gap-3 border border-white/55 bg-[#0D2529]/45 px-6 py-3 font-black !text-white backdrop-blur-sm transition duration-200 hover:border-[#BFD3CD] hover:bg-[#BFD3CD] hover:!text-[#17383C]"
              style={{ animationDelay: "670ms" }}
            >
              <span className="!text-white group-hover:!text-[#17383C]">
                See landlord services
              </span>
              <ArrowIcon />
            </a>
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
        className="scroll-mt-28 border-y border-white/10 bg-[#17383C] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12"
      >
        <div
          data-landlord-reveal
          className="landlord-reveal mx-auto grid max-w-[1480px] items-stretch gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12"
        >
          <div className="flex h-full flex-col pt-1">
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
            className="relative h-full bg-white p-6 shadow-[0_18px_45px_rgba(23,56,60,0.08)] sm:p-8 lg:p-9"
          >
            <input type="hidden" name="botField" value="" readOnly />
            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  className="min-h-13 w-full border border-[#17383C]/16 px-4 outline-none focus:border-[#17383C] bg-white text-[#17383C]"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                  Phone number
                </span>
                <input
                  required
                  name="phone"
                  type="tel"
                  className="min-h-13 w-full border border-[#17383C]/16 px-4 outline-none focus:border-[#17383C] bg-white text-[#17383C]"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                  Email address
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  className="min-h-13 w-full border border-[#17383C]/16 px-4 outline-none focus:border-[#17383C] bg-white text-[#17383C]"
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                  Property postcode
                </span>
                <input
                  required
                  name="postcode"
                  type="text"
                  className="min-h-13 w-full border border-[#17383C]/16 px-4 outline-none focus:border-[#17383C] bg-white text-[#17383C]"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                  Service required
                </span>
                <select
                  required
                  name="service"
                  defaultValue=""
                  className="min-h-13 w-full border border-[#17383C]/16 bg-white px-4 outline-none focus:border-[#17383C] text-[#17383C]"
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

              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                  Property details
                </span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Property type, current tenancy position or preferred timing..."
                  className="w-full resize-y border border-[#17383C]/16 bg-white px-4 py-3 text-[#17383C] outline-none placeholder:text-[#17383C]/34 focus:border-[#17383C]"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={enquiryForm.isSending}
              className="mt-6 inline-flex min-h-13 items-center justify-center gap-3 bg-[#17383C] px-7 font-black !text-white transition hover:bg-[#2D5B5D] disabled:cursor-wait disabled:opacity-65"
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

      <SiteFooter />

      <style>{`
        @keyframes heroCopyIn {
          from {
            opacity: 0;
            transform: translate3d(-38px, 14px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes heroItemIn {
          from {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .landlord-hero-copy {
          opacity: 0;
          animation: heroCopyIn 700ms cubic-bezier(.22,1,.36,1) 70ms both;
        }

        .landlord-hero-card,
        .landlord-hero-action {
          opacity: 0;
          animation: heroItemIn 560ms cubic-bezier(.22,1,.36,1) both;
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
          .landlord-hero-copy,
          .landlord-hero-card,
          .landlord-hero-action,
          .landlord-reveal,
          .landlord-item {
            opacity: 1;
            transform: none;
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
