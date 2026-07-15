"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";

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

      <style>{`
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
    </main>
  );
}
