import type { MarketingPageContent } from "../_data/pageContent";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

function Arrow() {
  return (
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
  );
}

export function MarketingPage({
  content,
}: {
  content: MarketingPageContent;
}) {
  return (
    <main className="min-h-screen bg-[#F4F6F4] text-[#17383C]">
      <SiteHeader />

      <section id="page-hero" className="relative min-h-[720px] overflow-hidden bg-[#0D2529] text-white">
        <img
          src={content.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C20]/90 via-[#071C20]/54 to-[#071C20]/10" />

        <div className="relative mx-auto flex min-h-[720px] max-w-[1480px] items-center px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pt-44">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.17em] text-[#BFD3CD] sm:text-sm">
              {content.eyebrow}
            </p>

            <h1 className="mt-5 text-[clamp(3.2rem,7vw,7.2rem)] font-black leading-[0.9] tracking-[-0.055em]">
              {content.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              {content.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={content.primaryCta.href}
                className="inline-flex min-h-13 items-center justify-center gap-3 bg-[#BFD3CD] px-6 py-3 font-black text-[#17383C] transition hover:bg-white"
              >
                {content.primaryCta.label}
                <Arrow />
              </a>

              <a
                href={content.secondaryCta.href}
                className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/55 bg-black/10 px-6 py-3 font-black text-white backdrop-blur-sm transition hover:bg-white hover:text-[#17383C]"
              >
                {content.secondaryCta.label}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav className="border-b border-[#17383C]/10 bg-white px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] gap-3 overflow-x-auto py-4">
          {content.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 border border-[#17383C]/15 px-4 py-2 text-sm font-bold transition hover:border-[#17383C] hover:bg-[#17383C] hover:text-white"
            >
              {section.title}
            </a>
          ))}
        </div>
      </nav>

      {content.sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-32 px-5 py-16 sm:px-8 sm:py-22 lg:px-12 ${
            index % 2 === 0 ? "bg-[#F4F6F4]" : "bg-white"
          }`}
        >
          <div
            className={`mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-2 lg:items-center ${
              index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative min-h-[390px] overflow-hidden bg-[#DDE8E4]">
              <img
                src={section.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="max-w-2xl lg:px-8">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                {section.eyebrow}
              </p>

              <h2 className="mt-4 text-[clamp(2.3rem,4vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em]">
                {section.title}
              </h2>

              <p className="mt-5 text-base leading-7 text-[#17383C]/65">
                {section.description}
              </p>

              <div className="mt-7 border-y border-[#17383C]/10 py-2">
                {section.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 border-b border-[#17383C]/8 py-3 last:border-b-0"
                  >
                    <span className="h-2 w-2 shrink-0 bg-[#6B908D]" />
                    <span className="font-bold">{point}</span>
                  </div>
                ))}
              </div>

              <a
                href={section.ctaHref}
                className="mt-7 inline-flex min-h-12 items-center gap-3 bg-[#17383C] px-6 font-black text-white transition hover:bg-[#2D5B5D]"
              >
                {section.ctaLabel}
                <Arrow />
              </a>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#BFD3CD] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#17383C]/58">
              Ready when you are
            </p>
            <h2 className="mt-3 text-[clamp(2.1rem,4vw,4rem)] font-black tracking-[-0.04em]">
              Speak to a local member of the team.
            </h2>
          </div>

          <a
            href="/contact"
            className="inline-flex min-h-13 items-center gap-3 bg-[#17383C] px-6 font-black text-white"
          >
            Contact us
            <Arrow />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
