import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export type MarketingPageCard = {
  eyebrow?: string;
  title: string;
  text: string;
  meta?: string;
  image?: string;
  href?: string;
};

export type MarketingPageSection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  points?: string[];
  cards?: MarketingPageCard[];
};

export type MarketingPageConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  facts: Array<{ value: string; label: string }>;
  sections: MarketingPageSection[];
};

function ArrowIcon() {
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

function Points({ points }: { points: string[] }) {
  return (
    <div className="mt-7 grid gap-px border border-[#17383C]/10 bg-[#17383C]/10 sm:grid-cols-2">
      {points.map((point) => (
        <div
          key={point}
          className="flex min-h-14 items-center gap-3 bg-white px-4 py-3 text-sm font-bold"
        >
          <span className="h-1.5 w-1.5 shrink-0 bg-[#6B908D]" />
          {point}
        </div>
      ))}
    </div>
  );
}

function Card({
  card,
}: {
  card: MarketingPageCard;
}) {
  const content = (
    <article className="group flex h-full flex-col overflow-hidden border border-[#17383C]/10 bg-white shadow-[0_12px_34px_rgba(23,56,60,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(23,56,60,0.12)]">
      {card.image && (
        <div className="aspect-[16/10] overflow-hidden bg-[#DDE8E4]">
          <img
            src={card.image}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {card.eyebrow && (
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
            {card.eyebrow}
          </p>
        )}

        <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#17383C]">
          {card.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#17383C]/58">
          {card.text}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#17383C]/10 pt-5">
          <p className="text-xs font-bold text-[#17383C]/48">
            {card.meta ?? "Wrenford Ashby"}
          </p>
          {card.href && (
            <span className="text-[#17383C] transition group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (!card.href) return content;

  return (
    <a href={card.href} className="block h-full">
      {content}
    </a>
  );
}

export default function MarketingPage({
  config,
}: {
  config: MarketingPageConfig;
}) {
  return (
    <main className="min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <SiteHeader />

      <section
        id="page-hero"
        className="relative min-h-[650px] overflow-hidden bg-[#0D2529] text-white"
      >
        <img
          src={config.heroImage}
          alt={config.heroAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C20]/88 via-[#071C20]/48 to-[#071C20]/12" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#071C20]/72 to-transparent" />

        <div className="relative mx-auto flex min-h-[650px] max-w-[1480px] items-center px-5 py-20 sm:px-8 lg:px-12">
          <div className="max-w-[900px]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C9DDD7] sm:text-sm">
              {config.eyebrow}
            </p>

            <h1 className="mt-6 text-[clamp(3.3rem,6.7vw,7rem)] font-black leading-[0.91] tracking-[-0.055em]">
              {config.title}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              {config.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={config.primaryCta.href}
                className="inline-flex min-h-13 items-center justify-center gap-3 bg-[#BFD3CD] px-6 py-3 font-black text-[#17383C] transition hover:bg-white"
              >
                {config.primaryCta.label}
                <ArrowIcon />
              </a>

              {config.secondaryCta ? (
                <a
                  href={config.secondaryCta.href}
                  className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/55 bg-[#0D2529]/25 px-6 py-3 font-black text-white backdrop-blur-sm transition hover:bg-white hover:text-[#17383C]"
                >
                  {config.secondaryCta.label}
                  <ArrowIcon />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#17383C]/10 bg-[#EAF0ED] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] divide-y divide-[#17383C]/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {config.facts.map((fact) => (
            <div key={fact.value} className="px-0 py-7 md:px-8">
              <p className="text-2xl font-black tracking-[-0.035em] text-[#17383C]">
                {fact.value}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#17383C]/52">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {config.sections.map((section, index) => {
        if (section.cards?.length) {
          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 px-5 py-14 sm:px-8 sm:py-18 lg:px-12"
            >
              <div className="mx-auto max-w-[1480px]">
                <div className="max-w-4xl">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-4 text-[clamp(2.5rem,4.6vw,4.8rem)] font-black leading-[0.98] tracking-[-0.045em]">
                    {section.title}
                  </h2>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-[#17383C]/60">
                    {section.body}
                  </p>
                </div>

                <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {section.cards.map((card) => (
                    <Card key={card.title} card={card} />
                  ))}
                </div>

                {section.points?.length ? (
                  <Points points={section.points} />
                ) : null}
              </div>
            </section>
          );
        }

        if (section.image) {
          const imageFirst = index % 2 === 0;

          return (
            <section
              key={section.id}
              id={section.id}
              className={`scroll-mt-28 px-5 py-14 sm:px-8 sm:py-18 lg:px-12 ${
                index % 2 === 0 ? "bg-white" : "bg-[#EAF0ED]"
              }`}
            >
              <div className="mx-auto grid max-w-[1480px] items-stretch gap-8 lg:grid-cols-2 lg:gap-0">
                <div
                  className={`min-h-[360px] overflow-hidden bg-[#DDE8E4] ${
                    imageFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={section.image}
                    alt={section.imageAlt ?? ""}
                    className="h-full min-h-[360px] w-full object-cover"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center p-1 sm:p-4 lg:p-12 xl:p-16 ${
                    imageFirst ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-4 text-[clamp(2.4rem,4.3vw,4.6rem)] font-black leading-[0.98] tracking-[-0.045em]">
                    {section.title}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-[#17383C]/60">
                    {section.body}
                  </p>

                  {section.points?.length ? (
                    <Points points={section.points} />
                  ) : null}
                </div>
              </div>
            </section>
          );
        }

        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-28 px-5 py-14 sm:px-8 sm:py-18 lg:px-12 ${
              index % 2 === 0 ? "bg-white" : "bg-[#EAF0ED]"
            }`}
          >
            <div className="mx-auto max-w-[1480px]">
              <div className="max-w-5xl border-l-[7px] border-[#17383C] bg-white p-7 shadow-[0_12px_34px_rgba(23,56,60,0.06)] sm:p-10 lg:p-14">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                  {section.eyebrow}
                </p>
                <h2 className="mt-4 text-[clamp(2.5rem,4.6vw,4.8rem)] font-black leading-[0.98] tracking-[-0.045em]">
                  {section.title}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-[#17383C]/60">
                  {section.body}
                </p>

                {section.points?.length ? (
                  <Points points={section.points} />
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      <SiteFooter />
    </main>
  );
}
