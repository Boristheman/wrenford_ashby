"use client";

import { useEffect } from "react";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";
import { useEnquiryForm } from "../__components/useEnquiryForm";
import { NEW_HOME_DEVELOPMENTS as developments } from "../__data/newHomes";

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

const buyingSteps = [
  {
    number: "01",
    title: "Choose the right plot",
    text: "Compare position, outlook, parking, garden size, specification and the estimated build-completion date rather than choosing on floorplan alone.",
  },
  {
    number: "02",
    title: "Understand the reservation",
    text: "Check the reservation fee, exchange deadline, incentives, cancellation terms and exactly what is included in the agreed price.",
  },
  {
    number: "03",
    title: "Arrange finance and legal work",
    text: "New-build purchases often use shorter exchange timescales, so the mortgage adviser and solicitor need to be ready from the beginning.",
  },
  {
    number: "04",
    title: "Inspect and complete",
    text: "Confirm the final specification, arrange snagging where appropriate and understand how keys, warranties and aftercare will be handled.",
  },
];

export default function NewHomesPage() {
  const registrationForm = useEnquiryForm("new-homes-registration");

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".nh-reveal"),
    );

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
        threshold: 0.14,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <style>{`
        .nh-reveal {
          opacity: 0;
          transform: translate3d(0, 30px, 0);
          transition:
            opacity 760ms cubic-bezier(.22,1,.36,1),
            transform 760ms cubic-bezier(.22,1,.36,1);
        }

        .nh-reveal.nh-from-left {
          transform: translate3d(-34px, 0, 0);
        }

        .nh-reveal.nh-from-right {
          transform: translate3d(34px, 0, 0);
        }

        .nh-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @keyframes nhTitleReveal {
          0% {
            opacity: 0;
            clip-path: inset(0 0 100% 0);
            transform: translate3d(0, 44px, 0);
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes nhIntroReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes nhPlotIn {
          0% {
            opacity: 0;
            transform: perspective(1100px) translate3d(0, 88px, 0)
              rotateX(7deg) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: perspective(1100px) translate3d(0, 0, 0)
              rotateX(0deg) scale(1);
          }
        }

        @keyframes nhImageSettle {
          0% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1);
          }
        }

        .nh-landing {
          position: relative;
        }

        .nh-landing-title {
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          animation: nhTitleReveal 900ms cubic-bezier(.22,1,.36,1) 260ms both;
        }

        .nh-landing-copy {
          opacity: 0;
          animation: nhIntroReveal 720ms cubic-bezier(.22,1,.36,1) 520ms both;
        }

        .nh-development-card {
          opacity: 0;
          transform-origin: center bottom;
          animation: nhPlotIn 880ms cubic-bezier(.22,1,.36,1) both;
        }

        .nh-development-card:nth-child(1) {
          animation-delay: 620ms;
        }

        .nh-development-card:nth-child(2) {
          animation-delay: 760ms;
        }

        .nh-development-card:nth-child(3) {
          animation-delay: 900ms;
        }

        .nh-development-card img {
          animation: nhImageSettle 1250ms cubic-bezier(.22,1,.36,1) both;
        }

        .nh-development-card:nth-child(1) img {
          animation-delay: 620ms;
        }

        .nh-development-card:nth-child(2) img {
          animation-delay: 760ms;
        }

        .nh-development-card:nth-child(3) img {
          animation-delay: 900ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .nh-reveal,
          .nh-landing-title,
          .nh-landing-copy,
          .nh-development-card,
          .nh-development-card img {
            opacity: 1;
            clip-path: none;
            transform: none;
            transition: none;
            animation: none;
          }

        }
      `}</style>

      <SiteHeader />

      <section
        id="current-developments"
        className="nh-landing scroll-mt-28 overflow-hidden bg-[#EAF0ED] px-5 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-7 lg:px-12 lg:pb-14 lg:pt-8"
      >
        <div className="mx-auto max-w-[1480px]">
          <div className="max-w-5xl">
            <h1 className="nh-landing-title text-[clamp(2.8rem,5vw,5.35rem)] font-black leading-[0.93] tracking-[-0.052em] text-[#17383C]">
              New homes available across South Essex.
            </h1>

            <p className="nh-landing-copy mt-4 max-w-3xl text-base leading-7 text-[#17383C]/60 sm:text-lg sm:leading-8">
              Explore current schemes and selected plots with clear information
              about location, availability and the next practical step.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {developments.map((development, index) => (
              <a
                key={development.name}
                href={`/new-homes/${development.slug}`}
                aria-label={`View ${development.name} development`}
                className="nh-development-card group flex h-full flex-col overflow-hidden border border-[#17383C]/10 bg-white shadow-[0_12px_34px_rgba(23,56,60,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(23,56,60,0.13)]"
              >
                <div className="h-[205px] overflow-hidden bg-[#DDE8E4] sm:h-[225px] lg:h-[235px]">
                  <img
                    src={development.image}
                    alt={`${development.name} new homes in ${development.location}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
                      {development.location}
                    </p>
                    <p className="text-xs font-bold text-[#17383C]/46">
                      {development.status}
                    </p>
                  </div>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                    {development.name}
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-[#17383C]/58">
                    {development.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#17383C]/10 pt-6">
                    <p className="font-black">{development.price}</p>
                    <span className="group/link inline-flex items-center gap-2 text-sm font-black text-[#17383C]">
                      View development
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="upcoming-releases"
        className="scroll-mt-28 bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1480px] items-stretch gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div className="nh-reveal nh-from-left flex flex-col justify-between border border-[#17383C]/10 bg-[#F4F6F4] p-7 sm:p-10 lg:p-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                Upcoming releases
              </p>

              <h2 className="mt-4 text-[clamp(2.8rem,4.8vw,5.2rem)] font-black leading-[0.96] tracking-[-0.05em]">
                Hear about suitable plots before the main launch.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#17383C]/60 sm:text-lg sm:leading-8">
                Register the location, budget and property type you are looking
                for. We will use that information to contact you when a relevant
                release is approaching.
              </p>
            </div>

            <div className="mt-10 grid gap-px border border-[#17383C]/10 bg-[#17383C]/10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                ["Matched", "Only relevant schemes and plots"],
                ["Updated", "Release and viewing information"],
                ["Prepared", "Reservation guidance before launch"],
              ].map(([title, text]) => (
                <div key={title} className="bg-white p-5">
                  <p className="font-black">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#17383C]/50">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="nh-reveal nh-from-right bg-[#17383C] p-6 text-white sm:p-8 lg:p-10">
            {registrationForm.status === "success" ? (
              <div className="flex min-h-[610px] flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
                  Interest registered
                </p>
                <h3 className="mt-4 max-w-2xl text-[clamp(2.5rem,4vw,4.5rem)] font-black leading-[0.98] tracking-[-0.045em]">
                  Thank you. We will contact you when a suitable release is due.
                </h3>
                <button
                  type="button"
                  onClick={registrationForm.reset}
                  className="mt-8 w-fit border-b border-white/35 pb-1 text-sm font-black transition hover:border-white"
                >
                  Register another requirement
                </button>
              </div>
            ) : (
              <form onSubmit={registrationForm.handleSubmit}>
                <input type="hidden" name="botField" value="" readOnly />
                <div className="border-b border-white/12 pb-6">
                  <h3 className="text-3xl font-black tracking-[-0.04em]">
                    Register your requirements
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">
                    Tell us what would make a new home suitable for you.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="text-xs font-black text-white/72">
                      Full name *
                    </span>
                    <input
                      required
                      type="text"
                      name="name"
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
                      type="tel"
                      name="telephone"
                      autoComplete="tel"
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="text-xs font-black text-white/72">
                      Email address *
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Preferred location
                    </span>
                    <select
                      name="location"
                      defaultValue=""
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
                    >
                      <option value="">Select an area</option>
                      <option>Wickford</option>
                      <option>Rayleigh</option>
                      <option>South Woodham Ferrers</option>
                      <option>Billericay</option>
                      <option>Basildon</option>
                      <option>Open to South Essex</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Maximum budget
                    </span>
                    <input
                      type="text"
                      name="budget"
                      placeholder="£400,000"
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/32 focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Bedrooms
                    </span>
                    <select
                      name="bedrooms"
                      defaultValue=""
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
                    >
                      <option value="">Any</option>
                      <option>1 bedroom</option>
                      <option>2 bedrooms</option>
                      <option>3 bedrooms</option>
                      <option>4+ bedrooms</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Buying position
                    </span>
                    <select
                      name="position"
                      defaultValue=""
                      className="mt-2 min-h-13 w-full border border-white/24 bg-white px-4 text-sm text-[#17383C] outline-none focus:border-[#BFD3CD]"
                    >
                      <option value="">Select your position</option>
                      <option>First-time buyer</option>
                      <option>Nothing to sell</option>
                      <option>Property on the market</option>
                      <option>Property under offer</option>
                      <option>Just researching</option>
                    </select>
                  </label>
                </div>

                <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-white/55">
                  <input
                    required
                    name="consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#BFD3CD]"
                  />
                  <span>
                    I agree that Wrenford Ashby may use these details to contact
                    me about relevant new-home releases.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={registrationForm.isSending}
                  className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 bg-[#BFD3CD] px-6 py-4 font-black !text-[#17383C] transition hover:bg-white hover:!text-[#17383C] disabled:cursor-wait disabled:opacity-65"
                >
                  {registrationForm.isSending
                    ? "Sending registration..."
                    : "Register interest"}
                  <ArrowIcon className="h-4 w-4 text-[#17383C]" />
                </button>

                {registrationForm.status === "error" && (
                  <p
                    role="alert"
                    className="mt-4 text-sm font-bold text-red-200"
                  >
                    {registrationForm.message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section
        id="buying-new-build"
        className="scroll-mt-28 bg-[#EAF0ED] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1480px]">
          <div className="nh-reveal max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
              Buying a new-build
            </p>
            <h2 className="mt-4 text-[clamp(2.8rem,4.8vw,5.2rem)] font-black leading-[0.96] tracking-[-0.05em]">
              Know what to check before reserving.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#17383C]/60 sm:text-lg sm:leading-8">
              A new-build purchase has different deadlines and decisions from
              buying an established home. These are the stages that deserve the
              closest attention.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-[#17383C]/10 bg-[#17383C]/10 lg:grid-cols-2">
            {buyingSteps.map((step, index) => (
              <article
                key={step.number}
                className="nh-reveal bg-white p-7 sm:p-9"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="flex items-start gap-5">
                  <p className="text-sm font-black tracking-[0.12em] text-[#6B908D]">
                    {step.number}
                  </p>
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.035em]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#17383C]/56 sm:text-base sm:leading-7">
                      {step.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
