"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";
import CookiePreferences, { openCookieSettings } from "../__components/CookiePreferences";

const teamMembers = [
  {
    name: "Linda Parker",
    image: "/graphics/team/profiles/linda.png",
    role: "Office Manager",
    summary:
      "Linda keeps the Wickford office running smoothly, handles day-to-day client contact and makes sure enquiries reach the right person quickly.",
    focus: "Office · Enquiries · Client care",
    experienceYears: 18,
    certifications: 4,
  },
  {
    name: "Daniel Harper",
    image: "/graphics/team/profiles/daniel.png",
    role: "Branch Director",
    summary:
      "Daniel leads the office and oversees valuations, pricing strategy and the standard of advice given across both sales and lettings.",
    focus: "Valuations · Strategy · Local market",
    experienceYears: 24,
    certifications: 6,
  },
  {
    name: "Marcus Bennett",
    image: "/graphics/team/profiles/marcus.png",
    role: "Senior Property Consultant",
    summary:
      "Marcus manages new instructions, property launches and negotiations, helping sellers understand feedback and make clear decisions throughout the sale.",
    focus: "Sales · Negotiation · Marketing",
    experienceYears: 15,
    certifications: 4,
  },
  {
    name: "James Rowe",
    image: "/graphics/team/profiles/james.png",
    role: "Sales Negotiator",
    summary:
      "James works closely with buyers from the first viewing through to an agreed offer, keeping communication clear and every enquiry properly followed up.",
    focus: "Viewings · Buyers · Offers",
    experienceYears: 8,
    certifications: 3,
  },
  {
    name: "Shelly Morgan",
    image: "/graphics/team/profiles/shelly.png",
    role: "Sales Progressor",
    summary:
      "Shelly takes over once an offer is accepted, speaking with clients, solicitors, lenders and other agents to keep the chain moving and issues dealt with early.",
    focus: "Chains · Solicitors · Completion",
    experienceYears: 14,
    certifications: 4,
  },
  {
    name: "Hannah Cole",
    image: "/graphics/team/profiles/hannah.png",
    role: "Lettings & Property Manager",
    summary:
      "Hannah supports landlords and tenants across South Essex, coordinating applications, move-ins, inspections and the practical work needed during a tenancy.",
    focus: "Lettings · Tenancies · Management",
    experienceYears: 12,
    certifications: 5,
  },

];

const combinedExperience = teamMembers.reduce(
  (total, member) => total + member.experienceYears,
  0,
);

const certificationsGained = teamMembers.reduce(
  (total, member) => total + member.certifications,
  0,
);

const aboutMobileNavItems = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

function AboutArrowIcon({
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

function AboutPhoneIcon({
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

function AboutMailIcon({
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

function AboutCookieIcon({
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

function AboutMobileHeader({
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
            <AboutPhoneIcon className="h-4 w-4" />
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

function AboutMobileDrawer({
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

      <aside className="about-mobile-drawer-in fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(82vw,22rem)] max-w-full flex-col overflow-hidden bg-white text-[#17383C] shadow-[-24px_0_64px_rgba(0,0,0,0.22)] sm:hidden">
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
          {aboutMobileNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="group flex min-h-[3.45rem] items-center justify-between gap-4 border-b border-[#17383C]/8 text-[0.98rem] font-bold tracking-[-0.012em] active:opacity-50"
            >
              <span>{item.label}</span>
              <AboutArrowIcon className="h-3.5 w-3.5 text-[#6B908D]" />
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
            <AboutArrowIcon className="h-4 w-4 text-white" />
          </a>
        </div>
      </aside>
    </>
  );
}

function AboutMobileReveal({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
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
        threshold: 0.1,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-7 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function AboutMobileStats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setActive(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-white px-5 py-10 text-[#17383C] transition-[opacity,transform] duration-[950ms] ease-[cubic-bezier(.16,1,.3,1)] ${
        active
          ? "translate-y-0 opacity-100"
          : "translate-y-7 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[34rem]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6B908D]">
          Local experience
        </p>

        <h2 className="mt-3 text-[2.45rem] font-black leading-[0.99] tracking-[-0.045em]">
          Experience behind every move.
        </h2>

        <p className="mt-4 text-base font-semibold leading-7 text-[#17383C]/62">
          A local team combining sales, lettings, negotiation, property
          management and progression experience.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <article className="flex min-h-[13.5rem] flex-col justify-between bg-[#17383C] p-5 text-white">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#BFD3CD]">
                Combined experience
              </p>

              <p className="mt-5 text-[3.4rem] font-black leading-none tracking-[-0.07em] !text-white">
                <CountUp
                  value={combinedExperience}
                  active={active}
                  suffix="+"
                />
              </p>
            </div>

            <p className="mt-5 text-sm font-semibold leading-5 text-white/68">
              Years across the local team
            </p>
          </article>

          <article className="flex min-h-[13.5rem] flex-col justify-between bg-[#BFD3CD] p-5 text-[#17383C]">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#17383C]/58">
                Professional development
              </p>

              <p className="mt-5 text-[3.4rem] font-black leading-none tracking-[-0.07em]">
                <CountUp
                  value={certificationsGained}
                  active={active}
                />
              </p>
            </div>

            <p className="mt-5 text-sm font-semibold leading-5 text-[#17383C]/64">
              Certifications gained
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}


function AboutMobilePage() {
  return (
    <div className="sm:hidden">
      <div className="h-[5.1rem]" aria-hidden="true" />

      <section className="bg-white px-5 pb-9 pt-12">
        <div className="mx-auto max-w-[34rem]">
          <p className="about-mobile-first-in text-xs font-black uppercase tracking-[0.2em] text-[#6B908D]">
            Meet the team
          </p>

          <h1 className="about-mobile-second-in mt-4 text-[clamp(3rem,13vw,4.3rem)] font-black leading-[0.95] tracking-[-0.05em] text-[#17383C]">
            Meet the team behind Wrenford Ashby.
          </h1>

          <p className="about-mobile-third-in mt-5 text-base font-semibold leading-7 text-[#17383C]/66">
            We are an independent estate agency rooted in Wickford and South
            Essex. For 24 years, local people have trusted us to guide their
            sales, purchases, lettings and moves.
          </p>

          <p className="about-mobile-fourth-in mt-4 text-base font-semibold leading-7 text-[#17383C]/66">
            You deal with the same local team from the first call through to
            completion, with a named person who knows what is happening next.
          </p>

          <div className="about-mobile-image-in relative mt-7 aspect-[4/3] overflow-hidden bg-[#17383C]">
            <img
              src="/graphics/team/full.png"
              alt="The Wrenford Ashby estate agency team in Wickford"
              draggable={false}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#EAF0ED] px-5 py-10 text-[#17383C]">
        <div className="mx-auto max-w-[34rem]">
          <AboutMobileReveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6B908D]">
              The Wrenford Ashby team
            </p>

            <h2 className="mt-3 text-[2.45rem] font-black leading-[0.99] tracking-[-0.045em]">
              The people behind every move.
            </h2>

            <p className="mt-4 text-base font-semibold leading-7 text-[#17383C]/62">
              Meet the people you will speak to, see at valuations and rely on
              throughout the sale, purchase or tenancy.
            </p>
          </AboutMobileReveal>

          <div className="mt-7 grid gap-4">
            {teamMembers.map((member, index) => (
              <AboutMobileReveal key={member.name}>
                <article className="overflow-hidden border border-[#17383C]/12 bg-white shadow-[0_16px_38px_rgba(23,56,60,0.08)]">
                  <div className="grid grid-cols-[6.15rem_1fr] items-stretch">
                    <div className="flex min-h-[7.75rem] items-center justify-center overflow-hidden bg-white p-2.5">
                      <img
                        src={member.image}
                        alt={`${member.name}, ${member.role}`}
                        draggable={false}
                        className="h-[5.15rem] w-[5.15rem] shrink-0 object-contain object-center"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col justify-center px-4 py-3.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[0.68rem] font-black tracking-[0.16em] text-[#17383C]/34">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-[#17383C]/12" />
                      </div>

                      <h3 className="mt-3 text-2xl font-black tracking-[-0.035em] text-[#17383C]">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-[0.68rem] font-black uppercase leading-5 tracking-[0.12em] text-[#6B908D]">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#17383C]/10 px-4 py-4">
                    <p className="text-sm font-semibold leading-6 text-[#17383C]/62">
                      {member.summary}
                    </p>

                    <p className="mt-4 border-t border-[#17383C]/8 pt-3 text-[0.66rem] font-black uppercase tracking-[0.11em] text-[#6B908D]">
                      {member.focus}
                    </p>
                  </div>
                </article>
              </AboutMobileReveal>
            ))}
          </div>
        </div>
      </section>

      <AboutMobileStats />

      <section className="bg-[#BFD3CD] px-5 py-10 text-[#17383C]">
        <AboutMobileReveal>
          <div className="mx-auto max-w-[34rem]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#17383C]/56">
              Ready when you are
            </p>

            <h2 className="mt-3 text-[2.55rem] font-black leading-[0.98] tracking-[-0.045em]">
              Let&apos;s talk about your property.
            </h2>

            <p className="mt-4 text-base font-semibold leading-7 text-[#17383C]/62">
              Speak with the local team about selling, buying, letting or
              renting across Wickford and South Essex.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 bg-[#17383C] px-7 text-sm font-black !text-white"
            >
              Contact us
              <AboutArrowIcon className="h-4 w-4 text-white" />
            </Link>
          </div>
        </AboutMobileReveal>
      </section>
    </div>
  );
}

function AboutMobileFooter({
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
            <AboutPhoneIcon className="h-4 w-4 text-[#BFD3CD]" />
            01268 000 000
          </a>

          <a
            href="mailto:hello@wrenfordashby.co.uk"
            className="flex items-center gap-3 text-white/60"
          >
            <AboutMailIcon className="h-4 w-4 text-[#BFD3CD]" />
            hello@wrenfordashby.co.uk
          </a>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/12 pt-5 text-xs font-bold text-white/42">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms & conditions</a>

          <button
            type="button"
            onClick={onOpenCookiePreferences}
            className="inline-flex items-center gap-1.5 text-left"
          >
            <AboutCookieIcon className="h-3.5 w-3.5" />
            Cookie settings
          </button>

          <span>© 2026 Wrenford Ashby</span>
        </div>
      </div>
    </footer>
  );
}


function CountUp({
  value,
  active,
  suffix = "",
}: {
  value: number;
  active: boolean;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1650;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const [profilesVisible, setProfilesVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  useEffect(() => {
    const profiles = document.getElementById("team-profiles");

    if (!profiles) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProfilesVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(profiles);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stats = document.getElementById("team-statistics");

    if (!stats) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(stats);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <AboutMobileHeader
        menuOpen={mobileMenuOpen}
        onOpen={() => setMobileMenuOpen(true)}
      />
      <AboutMobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <AboutMobilePage />
      <AboutMobileFooter
        onOpenCookiePreferences={openCookieSettings}
      />

      <div className="hidden sm:block">
        <div className="sticky top-0 z-[100] w-full bg-white">
          <SiteHeader />
        </div>

      <section
        id="our-team"
        className="about-enter bg-[#EAF0ED] px-5 py-6 sm:px-8 sm:py-8 lg:h-[calc(100svh-96px)] lg:min-h-[620px] lg:px-12 lg:py-7"
      >
        <div className="mx-auto grid min-h-[640px] max-w-[1480px] overflow-hidden bg-white lg:h-full lg:min-h-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="about-hero-copy flex items-center px-6 py-10 sm:px-9 sm:py-12 lg:px-10 lg:py-8 xl:px-12">
            <div className="max-w-[620px]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6B908D]">
                Our story
              </p>

              <h1 className="mt-5 text-[clamp(2.85rem,4.8vw,5.35rem)] font-black leading-[0.92] tracking-[-0.058em] text-[#17383C]">
                Independent. Local. Easy to reach.
              </h1>

              <div className="mt-6 space-y-4">
                <p className="text-base leading-8 text-[#17383C]/66 sm:text-lg sm:leading-9">
                  Wrenford Ashby is an independent estate agency rooted in
                  Wickford and South Essex. For 24 years, we have helped people
                  sell, buy, let and rent homes with realistic advice, strong
                  local knowledge and a team that remains easy to reach.
                </p>

                <p className="text-base leading-8 text-[#17383C]/66 sm:text-lg sm:leading-9">
                  We keep decisions local and stay involved after the first
                  valuation, viewing or enquiry. Every client has a named person
                  who knows what is happening and what needs to happen next.
                </p>
              </div>
            </div>
          </div>

          <figure className="about-hero-image relative min-h-[440px] overflow-hidden bg-[#17383C] lg:min-h-0">
            <img
              src="/graphics/team/full.png"
              alt="The Wrenford Ashby estate agency team in Wickford"
              className="about-hero-photo absolute inset-0 h-full w-full object-cover object-center"
            />

            <figcaption className="absolute left-0 top-0 bg-[#17383C] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-white sm:px-6">
              Meet the team
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="team-profiles"
        className={`px-5 pb-14 pt-0 sm:px-8 sm:pb-16 sm:pt-0 lg:px-12 ${
          profilesVisible ? "team-profiles-visible" : ""
        }`}
      >
        <div className="mx-auto max-w-[1480px]">
          <div className="grid border-l border-t border-[#17383C]/12 bg-white sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {teamMembers.map((member, index) => (
              <article
                key={member.name}
                className="team-profile-card grid min-h-[500px] grid-rows-[auto_auto_52px_1fr_auto] border-b border-r border-[#17383C]/12 p-6"
                style={{ transitionDelay: `${180 + index * 180}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6B908D]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div className="profile-photo-shell h-[92px] w-[92px] shrink-0 overflow-hidden rounded-full border border-[#17383C]/12 bg-[#EAF0ED] p-1">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at Wrenford Ashby`}
                      className="h-full w-full rounded-full object-cover object-center"
                    />
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-[-0.035em]">
                  {member.name}
                </h3>

                <p className="mt-2 flex min-h-[52px] items-start text-xs font-black uppercase leading-5 tracking-[0.12em] text-[#17383C]/46">
                  {member.role}
                </p>

                <p className="mt-5 self-start text-sm leading-6 text-[#17383C]/60">
                  {member.summary}
                </p>

                <p className="mt-6 min-h-[64px] border-t border-[#17383C]/12 pt-5 text-[10px] font-black uppercase leading-5 tracking-[0.12em] text-[#6B908D]">
                  {member.focus}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="team-statistics"
        className="px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12"
      >
        <div
          className={`mx-auto grid max-w-[1480px] border-l border-t border-[#17383C]/12 md:grid-cols-2 ${
            statsVisible ? "team-statistics-visible" : ""
          }`}
        >
          <article className="team-stat-card min-h-[360px] border-b border-r border-[#17383C]/12 bg-[#17383C] p-7 text-white sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#BFD3CD]">
              Combined experience
            </p>

            <p className="mt-10 text-[clamp(5rem,11vw,10rem)] font-black leading-none tracking-[-0.07em] !text-white">
              <CountUp
                value={combinedExperience}
                active={statsVisible}
                suffix="+"
              />
            </p>

            <h2 className="mt-6 text-2xl font-black tracking-[-0.035em] !text-white sm:text-3xl">
              Years across the local team
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
              Experience covering valuations, property marketing, negotiation,
              lettings management and sales progression across Wickford and
              South Essex.
            </p>
          </article>

          <article className="team-stat-card min-h-[360px] border-b border-r border-[#17383C]/12 bg-[#BFD3CD] p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#17383C]/58">
              Professional development
            </p>

            <p className="mt-10 text-[clamp(5rem,11vw,10rem)] font-black leading-none tracking-[-0.07em] text-[#17383C]">
              <CountUp
                value={certificationsGained}
                active={statsVisible}
              />
            </p>

            <h2 className="mt-6 text-2xl font-black tracking-[-0.035em] sm:text-3xl">
              Certifications gained
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#17383C]/65 sm:text-base">
              Qualifications and accredited training across sales, lettings,
              property management, compliance, anti-money-laundering procedures
              and customer care.
            </p>
          </article>
        </div>
      </section>

      <section
        className="about-enter border-y border-[#17383C]/10 bg-[#E8EFEC] px-5 py-14 sm:px-8 lg:px-12"
        style={{ animationDelay: "320ms" }}
      >
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#5D7F7B]">
              Ready when you are
            </p>

            <h2 className="mt-3 text-[clamp(2.2rem,4vw,4rem)] font-black tracking-[-0.035em]">
              Let&apos;s talk about your property.
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#17383C] px-6 py-3 text-sm font-black !text-white transition hover:-translate-y-0.5 hover:bg-[#2D5B5D]"
            >
              <span className="!text-white">Make an enquiry</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <a
              href="tel:01268000000"
              className="group inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#17383C] px-6 font-black text-[#17383C] transition hover:bg-[#17383C] hover:!text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4 text-current transition group-hover:!text-white"
              >
                <path
                  d="M8.2 3.8 10 8.2 7.8 9.6a14 14 0 0 0 6.6 6.6l1.4-2.2 4.4 1.8v3a2 2 0 0 1-2 2C9.9 20.8 3.2 14.1 3.2 5.8a2 2 0 0 1 2-2h3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-current transition group-hover:!text-white">
                Call 01268 000 000
              </span>
            </a>
          </div>
        </div>
      </section>

        <SiteFooter />
      </div>


      <style>{`
        @keyframes aboutMobileDrawerIn {
          from {
            transform: translate3d(100%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .about-mobile-drawer-in {
          animation: aboutMobileDrawerIn 300ms cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes aboutMobileEnter {
          from {
            opacity: 0;
            transform: translate3d(0, 28px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes aboutMobileImageIn {
          from {
            opacity: 0;
            transform: scale(1.045);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .about-mobile-first-in,
        .about-mobile-second-in,
        .about-mobile-third-in,
        .about-mobile-fourth-in {
          opacity: 0;
          animation: aboutMobileEnter 880ms cubic-bezier(.16,1,.3,1) both;
        }

        .about-mobile-first-in {
          animation-delay: 70ms;
        }

        .about-mobile-second-in {
          animation-delay: 150ms;
        }

        .about-mobile-third-in {
          animation-delay: 250ms;
        }

        .about-mobile-fourth-in {
          animation-delay: 350ms;
        }

        .about-mobile-image-in {
          opacity: 0;
          animation: aboutMobileImageIn 1100ms cubic-bezier(.16,1,.3,1) 430ms both;
        }

        @keyframes aboutRise {
          from {
            opacity: 0;
            transform: translate3d(0, 34px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes aboutCopyReveal {
          from {
            opacity: 0;
            transform: translate3d(-36px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes aboutImageReveal {
          from {
            opacity: 0;
            clip-path: inset(0 0 0 100%);
            transform: translate3d(42px, 0, 0);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes aboutPhotoSettle {
          from {
            transform: scale(1.075);
          }
          to {
            transform: scale(1);
          }
        }

        .about-enter {
          opacity: 0;
          animation: aboutRise 1850ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .about-hero-copy {
          opacity: 0;
          animation: aboutCopyReveal 1900ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both;
        }

        .about-hero-image {
          opacity: 0;
          animation: aboutImageReveal 2100ms cubic-bezier(0.16, 1, 0.3, 1) 360ms both;
        }

        .about-hero-photo {
          animation: aboutPhotoSettle 2600ms cubic-bezier(0.16, 1, 0.3, 1) 360ms both;
          will-change: transform;
        }

        .team-profile-card {
          opacity: 0;
          transform: translate3d(72px, 18px, 0);
          transition:
            opacity 1550ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 1550ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .profile-photo-shell {
          opacity: 0;
          transform: scale(0.86);
          transition:
            opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 1400ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-profiles-visible .team-profile-card {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .team-profiles-visible .profile-photo-shell {
          opacity: 1;
          transform: scale(1);
        }

        .team-stat-card {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition:
            opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 1100ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-stat-card:nth-child(2) {
          transition-delay: 160ms;
        }

        .team-statistics-visible .team-stat-card {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .about-mobile-first-in,
          .about-mobile-second-in,
          .about-mobile-third-in,
          .about-mobile-fourth-in,
          .about-mobile-image-in,
          .about-enter,
          .about-hero-copy,
          .about-hero-image,
          .about-hero-photo,
          .team-profile-card,
          .profile-photo-shell,
          .team-stat-card {
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
