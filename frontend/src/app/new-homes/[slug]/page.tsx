import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewHomeDevelopmentChrome from "../../__components/NewHomeDevelopmentChrome";
import { getNewHomeDevelopment } from "../../__data/newHomes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 border-b border-[#17383C]/10 py-3 text-sm last:border-b-0">
      <dt className="font-black text-[#17383C]">{label}</dt>
      <dd className="text-[#17383C]/66">{value}</dd>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const development = getNewHomeDevelopment(slug);

  if (!development) return { title: "Development not found" };

  return {
    title: `${development.name}, ${development.location} | New homes`,
    description: development.description,
  };
}

export default async function NewHomeDevelopmentPage({ params }: PageProps) {
  const { slug } = await params;
  const development = getNewHomeDevelopment(slug);

  if (!development) notFound();

  return (
    <NewHomeDevelopmentChrome>
      <section className="border-b border-[#17383C]/12 bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <a
            href="/new-homes"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#6B908D] transition hover:text-[#17383C]"
          >
            <span className="rotate-180">
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
            New homes
          </a>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#17383C] px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-white">
                  New development
                </span>
                <span className="border border-[#17383C]/18 bg-[#EAF0ED] px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-[#17383C]">
                  {development.status}
                </span>
              </div>
              <h1 className="mt-4 text-[clamp(2.5rem,5vw,5.2rem)] font-black leading-[0.94] tracking-[-0.052em] text-[#17383C]">
                {development.name}
              </h1>
              <p className="mt-3 text-base font-bold text-[#17383C]/58 sm:text-lg">
                {development.location}, Essex
              </p>
            </div>

            <div className="lg:text-right">
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.045em] text-[#17383C]">
                {development.price}
              </p>
              <p className="mt-2 text-sm font-bold text-[#17383C]/52">
                {development.homes}
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav
        className="border-b border-[#17383C]/12 bg-[#F7F8F6] px-5 sm:px-8 lg:px-12"
        aria-label="Development sections"
      >
        <div className="mx-auto flex max-w-[1480px] gap-7 overflow-x-auto py-4 text-xs font-black uppercase tracking-[0.1em] text-[#17383C]/62">
          <a href="#development-photos" className="shrink-0 hover:text-[#17383C]">
            Photos
          </a>
          <a href="#development-details" className="shrink-0 hover:text-[#17383C]">
            Development details
          </a>
          <a href="#specification" className="shrink-0 hover:text-[#17383C]">
            Specification
          </a>
          <a href="#buying-process" className="shrink-0 hover:text-[#17383C]">
            Buying process
          </a>
          <a href="#register" className="shrink-0 hover:text-[#17383C]">
            Register interest
          </a>
        </div>
      </nav>

      <section
        id="development-photos"
        className="scroll-mt-28 px-5 py-8 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1480px] gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="h-[380px] overflow-hidden border border-[#17383C]/10 bg-[#DDE8E4] sm:h-[520px]">
            <img
              src={development.image}
              alt={`${development.name} in ${development.location}`}
              className="h-full w-full object-cover"
            />
          </div>

          <aside className="border border-[#17383C]/12 bg-white p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
              Development at a glance
            </p>
            <dl className="mt-4">
              <DetailRow label="Location" value={development.location} />
              <DetailRow label="Homes" value={development.homes} />
              <DetailRow label="Prices" value={development.price} />
              <DetailRow label="Status" value={development.status} />
              <DetailRow label="Completion" value={development.completion} />
              <DetailRow label="Warranty" value="New-home warranty included" />
              <DetailRow
                label="Tenure"
                value="Plot dependent — confirm before reservation"
              />
            </dl>

            <a
              href="#register"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#17383C] px-5 text-sm font-black text-white transition hover:bg-[#2D5B5D]"
            >
              Register your interest
              <ArrowIcon />
            </a>
            <a
              href="tel:01268000000"
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center border border-[#17383C] px-5 text-sm font-black text-[#17383C] transition hover:bg-[#EAF0ED]"
            >
              Call 01268 000 000
            </a>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#17383C]/10 bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div>
            <section id="development-details" className="scroll-mt-28">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Development details
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#17383C] sm:text-4xl">
                New homes in {development.location}
              </h2>
              <div className="mt-6 max-w-4xl space-y-5 text-sm leading-7 text-[#17383C]/68 sm:text-base sm:leading-8">
                <p>{development.description}</p>
                <p>
                  The development is intended for buyers looking for a practical
                  modern home with a clear reservation and completion process.
                  Availability is plot-specific, so the exact position, outlook,
                  parking arrangement, garden size and internal specification
                  should be confirmed before a reservation fee is paid.
                </p>
                <p>
                  Wrenford Ashby can explain the current release, expected build
                  stage, exchange deadline and any developer incentives. Buyers
                  should still obtain independent legal and mortgage advice and
                  arrange their own snagging inspection where appropriate.
                </p>
              </div>
            </section>

            <section
              id="specification"
              className="mt-12 scroll-mt-28 border-t border-[#17383C]/12 pt-9"
            >
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Typical specification
              </p>
              <div className="mt-5 grid gap-px border border-[#17383C]/10 bg-[#17383C]/10 sm:grid-cols-2">
                {development.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex min-h-14 items-center gap-3 bg-[#F7F8F6] px-4 py-3 text-sm font-bold text-[#17383C]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#BFD3CD] text-xs font-black text-[#17383C]">
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-[#17383C]/50">
                Specifications can vary by house type and build phase. The
                developer&apos;s reservation documents take precedence over
                website information.
              </p>
            </section>

            <section
              id="buying-process"
              className="mt-12 scroll-mt-28 border-t border-[#17383C]/12 pt-9"
            >
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Buying process
              </p>
              <div className="mt-5 border border-[#17383C]/12">
                {[
                  [
                    "01",
                    "Discuss availability",
                    "Confirm the current plots, prices, incentives, parking, tenure and estimated completion window.",
                  ],
                  [
                    "02",
                    "View the development",
                    "Visit the site or show home and compare the plot position, outlook and specification.",
                  ],
                  [
                    "03",
                    "Reserve the plot",
                    "Review the reservation agreement, fee, cancellation terms and exchange deadline before paying.",
                  ],
                  [
                    "04",
                    "Arrange legal work and finance",
                    "Instruct a solicitor and submit the mortgage application immediately because new-build exchange deadlines are usually short.",
                  ],
                  [
                    "05",
                    "Inspect and complete",
                    "Confirm the final specification, arrange snagging and agree the completion and key-handover process.",
                  ],
                ].map(([number, title, stepText]) => (
                  <div
                    key={number}
                    className="grid gap-3 border-b border-[#17383C]/10 p-5 last:border-b-0 sm:grid-cols-[55px_180px_1fr] sm:items-start"
                  >
                    <span className="text-sm font-black text-[#6B908D]">
                      {number}
                    </span>
                    <h3 className="text-sm font-black text-[#17383C]">
                      {title}
                    </h3>
                    <p className="text-sm leading-6 text-[#17383C]/64">
                      {stepText}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside
            id="register"
            className="scroll-mt-28 border border-[#17383C]/12 bg-[#F7F8F6] p-6 sm:p-7 lg:sticky lg:top-[118px]"
          >
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
              Register interest
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#17383C]">
              Ask about {development.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#17383C]/60">
              Use the main new-homes registration form and select{" "}
              {development.location}. The team will explain the current release
              and next viewing opportunity.
            </p>
            <a
              href="/new-homes#upcoming-releases"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#17383C] px-5 text-sm font-black text-white transition hover:bg-[#2D5B5D]"
            >
              Open registration form
              <ArrowIcon />
            </a>
            <a
              href="mailto:hello@wrenfordashby.co.uk"
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center border border-[#17383C] px-5 text-sm font-black text-[#17383C] transition hover:bg-[#EAF0ED]"
            >
              Email the team
            </a>

            <div className="mt-6 border-t border-[#17383C]/12 pt-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                Important
              </p>
              <p className="mt-3 text-xs leading-6 text-[#17383C]/56">
                Images may show a representative house type or development
                setting. Plot dimensions, specification, incentives and
                completion dates must be checked against the developer&apos;s
                current documents.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </NewHomeDevelopmentChrome>
  );
}
