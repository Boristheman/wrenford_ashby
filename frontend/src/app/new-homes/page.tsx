"use client";

import { useEffect, useState } from "react";
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

function SelectChevronIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="m5.5 7.5 4.5 4.5 4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NewHomesFooterPhoneIcon({
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

function NewHomesFooterMailIcon({
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

function NewHomesCookieIcon({
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

function NewHomesMobileFooter({
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
            <NewHomesFooterPhoneIcon className="h-4 w-4 text-[#BFD3CD]" />
            01268 000 000
          </a>

          <a
            href="mailto:hello@wrenfordashby.co.uk"
            className="flex items-center gap-3 text-white/60"
          >
            <NewHomesFooterMailIcon className="h-4 w-4 text-[#BFD3CD]" />
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
            <NewHomesCookieIcon className="h-3.5 w-3.5" />
            Cookie settings
          </button>
          <span>© 2026 Wrenford Ashby</span>
        </div>
      </div>
    </footer>
  );
}


function NewHomesMobileHeader({
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

const newHomesMobileNavItems = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

function NewHomesMobileDrawer({
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

      <aside
        aria-hidden={!open}
        className="nh-mobile-drawer-in fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(82vw,22rem)] max-w-full flex-col overflow-hidden bg-white text-[#17383C] shadow-[-24px_0_64px_rgba(0,0,0,0.22)] sm:hidden"
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
          {newHomesMobileNavItems.map((item) => (
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(true);

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
    <main className="min-h-screen w-full max-w-full overflow-x-clip bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <style>{`
        @keyframes nhMobileDrawerIn {
          from {
            transform: translate3d(100%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .nh-mobile-drawer-in {
          animation: nhMobileDrawerIn 300ms cubic-bezier(.22,1,.36,1) both;
        }

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

      <NewHomesMobileHeader
        menuOpen={mobileMenuOpen}
        onOpen={() => setMobileMenuOpen(true)}
      />
      <NewHomesMobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="hidden sm:block">
        <SiteHeader />
      </div>

      <div className="h-[5.1rem] sm:hidden" aria-hidden="true" />

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
        className="scroll-mt-28 bg-white px-3 py-6 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1480px] items-stretch gap-0 sm:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div className="nh-reveal nh-from-left hidden flex-col justify-between border border-[#17383C]/10 bg-[#F4F6F4] p-7 sm:flex sm:p-10 lg:p-12">
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

          <div className="nh-reveal nh-from-right bg-[#17383C] p-4 text-white sm:p-8 lg:p-10">
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
                <div className="border-b border-white/12 pb-5 sm:pb-6">
                  <h3 className="text-[2rem] font-black leading-[0.96] tracking-[-0.045em] sm:text-3xl">
                    Register your requirements
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-5 text-white/60 sm:mt-3 sm:text-sm sm:leading-6">
                    Tell us what would make a new home suitable for you.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 sm:mt-6 sm:gap-5">
                  <label className="min-w-0">
                    <span className="text-[0.7rem] font-black leading-4 text-white/76 sm:text-xs">
                      Full name *
                    </span>
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      className="mt-1.5 h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 py-0 text-base leading-none text-[#17383C] outline-none focus:border-[#BFD3CD] sm:mt-2 sm:px-4 sm:text-sm"
                    />
                  </label>

                  <label className="min-w-0">
                    <span className="text-[0.7rem] font-black leading-4 text-white/76 sm:text-xs">
                      Telephone *
                    </span>
                    <input
                      required
                      type="tel"
                      name="telephone"
                      autoComplete="tel"
                      className="mt-1.5 h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 py-0 text-base leading-none text-[#17383C] outline-none focus:border-[#BFD3CD] sm:mt-2 sm:px-4 sm:text-sm"
                    />
                  </label>

                  <label className="min-w-0">
                    <span className="text-[0.7rem] font-black leading-4 text-white/76 sm:text-xs">
                      Email address *
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="mt-1.5 h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 py-0 text-base leading-none text-[#17383C] outline-none focus:border-[#BFD3CD] sm:mt-2 sm:px-4 sm:text-sm"
                    />
                  </label>

                  <label className="min-w-0">
                    <span className="text-[0.7rem] font-black leading-4 text-white/76 sm:text-xs">
                      Preferred location
                    </span>
                    <div className="relative mt-1.5 sm:mt-2">

                      <select

                        name="location"

                        defaultValue=""

                        className="h-[3.25rem] min-h-[3.25rem] w-full min-w-0 appearance-none rounded-none border border-white/24 bg-white px-3 py-0 pr-10 text-base leading-none text-[#17383C] outline-none focus:border-[#BFD3CD] sm:px-4 sm:text-sm"

                      >

                        <option value="">Select an area</option>

                        <option>Wickford</option>

                        <option>Rayleigh</option>

                        <option>South Woodham Ferrers</option>

                        <option>Billericay</option>

                        <option>Basildon</option>

                        <option>Open to South Essex</option>

                      </select>

                      <SelectChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#17383C]" />

                    </div>
                  </label>

                  <label className="min-w-0">
                    <span className="text-[0.7rem] font-black leading-4 text-white/76 sm:text-xs">
                      Maximum budget
                    </span>
                    <input
                      type="text"
                      name="budget"
                      placeholder="£400,000"
                      className="mt-1.5 h-[3.25rem] min-h-[3.25rem] w-full min-w-0 rounded-none border border-white/24 bg-white px-3 py-0 text-base leading-none text-[#17383C] outline-none placeholder:text-[#17383C]/32 focus:border-[#BFD3CD] sm:mt-2 sm:px-4 sm:text-sm"
                    />
                  </label>

                  <label className="min-w-0">
                    <span className="text-[0.7rem] font-black leading-4 text-white/76 sm:text-xs">
                      Bedrooms
                    </span>
                    <div className="relative mt-1.5 sm:mt-2">

                      <select

                        name="bedrooms"

                        defaultValue=""

                        className="h-[3.25rem] min-h-[3.25rem] w-full min-w-0 appearance-none rounded-none border border-white/24 bg-white px-3 py-0 pr-10 text-base leading-none text-[#17383C] outline-none focus:border-[#BFD3CD] sm:px-4 sm:text-sm"

                      >

                        <option value="">Any</option>

                        <option>1 bedroom</option>

                        <option>2 bedrooms</option>

                        <option>3 bedrooms</option>

                        <option>4+ bedrooms</option>

                      </select>

                      <SelectChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#17383C]" />

                    </div>
                  </label>

                  <label className="col-span-2">
                    <span className="text-[0.7rem] font-black leading-4 text-white/76 sm:text-xs">
                      Buying position
                    </span>
                    <div className="relative mt-1.5 sm:mt-2">

                      <select

                        name="position"

                        defaultValue=""

                        className="h-[3.25rem] min-h-[3.25rem] w-full min-w-0 appearance-none rounded-none border border-white/24 bg-white px-3 py-0 pr-10 text-base leading-none text-[#17383C] outline-none focus:border-[#BFD3CD] sm:px-4 sm:text-sm"

                      >

                        <option value="">Select your position</option>

                        <option>First-time buyer</option>

                        <option>Nothing to sell</option>

                        <option>Property on the market</option>

                        <option>Property under offer</option>

                        <option>Just researching</option>

                      </select>

                      <SelectChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#17383C]" />

                    </div>
                  </label>
                </div>

                <label className="mt-4 flex items-start gap-2.5 text-[0.7rem] leading-4 text-white/60 sm:mt-5 sm:gap-3 sm:text-xs sm:leading-5">
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
                  className="mt-5 flex min-h-[3.25rem] w-full items-center justify-center gap-3 bg-[#BFD3CD] px-5 py-3.5 text-sm font-black !text-[#17383C] transition hover:bg-white hover:!text-[#17383C] disabled:cursor-wait disabled:opacity-65 sm:mt-7 sm:min-h-14 sm:px-6 sm:py-4 sm:text-base"
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

      <NewHomesMobileFooter
        onOpenCookiePreferences={() => setCookieNoticeOpen(true)}
      />

      <div className="hidden sm:block">
        <SiteFooter />
      </div>

      {cookieNoticeOpen && (
        <aside className="fixed bottom-4 left-4 right-4 z-[1050] border border-[#17383C]/14 bg-white p-4 shadow-[0_20px_60px_rgba(13,37,41,0.24)] sm:hidden">
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
