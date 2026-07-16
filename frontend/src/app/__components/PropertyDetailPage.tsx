"use client";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { useEnquiryForm } from "./useEnquiryForm";
import { getPropertyGallery, type Property } from "../__data/properties";

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

function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="m6.5 12.5 3.4 3.4 7.6-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-4 border-b border-[#17383C]/10 py-3 text-sm last:border-b-0">
      <dt className="font-black text-[#17383C]">{label}</dt>
      <dd className="text-[#17383C]/68">{value}</dd>
    </div>
  );
}

export default function PropertyDetailPage({ property }: { property: Property }) {
  const viewingForm = useEnquiryForm("property-viewing");
  const gallery = getPropertyGallery(property);
  const backHref = property.mode === "buy" ? "/buy" : "/rent";
  const backLabel = property.mode === "buy" ? "Properties for sale" : "Homes to rent";

  return (
    <main className="property-page-enter min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased">
      <style>{`
        @keyframes propertyPageEnter {
          from {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .property-page-enter {
          animation: propertyPageEnter 480ms cubic-bezier(.22,1,.36,1) 40ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .property-page-enter {
            animation: none;
          }
        }
      `}</style>

      <SiteHeader />

      <section className="border-b border-[#17383C]/12 bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <a
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#6B908D] transition hover:text-[#17383C]"
          >
            <span className="rotate-180">
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
            {backLabel}
          </a>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs font-bold text-[#17383C]/46">
                  {property.status}
                </span>
                {property.badge && (
                  <span className="text-xs font-bold text-[#17383C]/46">
                    {property.badge}
                  </span>
                )}
                <span className="text-xs font-bold text-[#17383C]/46">
                  Ref: {property.reference}
                </span>
              </div>

              <h1 className="mt-4 text-[clamp(2.35rem,5vw,5rem)] font-black leading-[0.94] tracking-[-0.052em] text-[#17383C]">
                {property.location}
              </h1>
              <p className="mt-3 text-base font-bold text-[#17383C]/58 sm:text-lg">
                {property.area} · {property.postcode}
              </p>
            </div>

            <div className="lg:text-right">
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.045em] text-[#17383C]">
                {property.priceLabel}
              </p>
              <p className="mt-2 text-sm font-bold text-[#17383C]/52">
                {property.propertyType} · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav className="border-b border-[#17383C]/12 bg-[#F7F8F6] px-5 sm:px-8 lg:px-12" aria-label="Property sections">
        <div className="mx-auto flex max-w-[1480px] gap-7 overflow-x-auto py-4 text-xs font-black uppercase tracking-[0.1em] text-[#17383C]/62">
          <a href="#photos" className="shrink-0 hover:text-[#17383C]">Photos</a>
          <a href="#about-property" className="shrink-0 hover:text-[#17383C]">About the property</a>
          <a href="#room-details" className="shrink-0 hover:text-[#17383C]">Room details</a>
          <a href="#important-information" className="shrink-0 hover:text-[#17383C]">Important information</a>
          <a href="#location" className="shrink-0 hover:text-[#17383C]">Location</a>
        </div>
      </nav>

      <section id="photos" className="scroll-mt-28 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-3 md:grid-cols-[1.6fr_0.8fr]">
            <div className="h-[360px] overflow-hidden border border-[#17383C]/10 bg-[#DDE8E4] sm:h-[500px]">
              <img
                src={gallery[0]}
                alt={`${property.location}, ${property.area}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid h-[360px] grid-cols-2 gap-3 sm:h-[500px] md:grid-cols-1 md:grid-rows-2">
              {gallery.slice(1, 3).map((image, index) => (
                <div key={image} className="overflow-hidden border border-[#17383C]/10 bg-[#DDE8E4]">
                  <img
                    src={image}
                    alt={`${property.location} property photo ${index + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-[#17383C]/12 bg-white p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
              Property at a glance
            </p>
            <dl className="mt-4">
              <DetailRow label="Type" value={property.propertyType} />
              <DetailRow label="Bedrooms" value={String(property.bedrooms)} />
              <DetailRow label="Bathrooms" value={String(property.bathrooms)} />
              <DetailRow label={property.mode === "buy" ? "Tenure" : "Tenancy"} value={property.tenureLabel} />
              <DetailRow label="Floor area" value={property.floorArea} />
              <DetailRow label="Parking" value={property.parking} />
              <DetailRow label="Outside" value={property.outsideSpace} />
              <DetailRow label="EPC" value={property.epc.replace("EPC rating ", "Band ")} />
              <DetailRow
                label={property.mode === "buy" ? "Council tax" : "Deposit"}
                value={property.councilTaxOrDeposit}
              />
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#17383C]/10 bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div>
            <section id="about-property" className="scroll-mt-28">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                About the property
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#17383C] sm:text-4xl">
                {property.propertyType} in {property.area.replace(", Essex", "")}
              </h2>

              <div className="mt-6 max-w-4xl space-y-5 text-sm leading-7 text-[#17383C]/68 sm:text-base sm:leading-8">
                {property.descriptionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 border-t border-[#17383C]/12 pt-7">
                <h3 className="text-lg font-black text-[#17383C]">Key features</h3>
                <div className="mt-4 grid gap-px border border-[#17383C]/10 bg-[#17383C]/10 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex min-h-14 items-center gap-3 bg-[#F7F8F6] px-4 py-3 text-sm font-bold text-[#17383C]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#BFD3CD] text-[#17383C]">
                        <TickIcon />
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="room-details" className="mt-12 scroll-mt-28 border-t border-[#17383C]/12 pt-9">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Room details
              </p>
              <div className="mt-5 border border-[#17383C]/12">
                {property.roomDetails.map((room) => (
                  <div
                    key={room.name}
                    className="grid gap-2 border-b border-[#17383C]/10 p-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-6"
                  >
                    <h3 className="text-sm font-black text-[#17383C]">{room.name}</h3>
                    <p className="text-sm leading-6 text-[#17383C]/64">{room.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="important-information" className="mt-12 scroll-mt-28 border-t border-[#17383C]/12 pt-9">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Important information
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {property.importantInformation.map((item) => (
                  <div key={item} className="border border-[#17383C]/12 bg-[#F7F8F6] p-5 text-sm leading-6 text-[#17383C]/68">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section id="location" className="mt-12 scroll-mt-28 border-t border-[#17383C]/12 pt-9">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">Location</p>
              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
                <div className="border border-[#17383C]/12 bg-[#EAF0ED] p-6 sm:p-8">
                  <h3 className="text-2xl font-black text-[#17383C]">{property.area}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#17383C]/66">
                    {property.locationDescription}
                  </p>
                </div>
                <dl className="border border-[#17383C]/12 bg-white p-5">
                  <DetailRow label="Local authority" value={property.localAuthority} />
                  <DetailRow label="Postcode" value={property.postcode} />
                  <DetailRow label="Heating" value={property.heating} />
                  <DetailRow label="Availability" value={property.availability} />
                </dl>
              </div>
            </section>
          </div>

          <aside id="arrange-viewing" className="scroll-mt-28 border border-[#17383C]/12 bg-[#F7F8F6] p-6 sm:p-7 lg:sticky lg:top-[118px]">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
              Contact the local team
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#17383C]">
              Arrange a viewing
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#17383C]/60">
              Send your details and a member of the Wickford team will call to confirm a suitable appointment.
            </p>

            {viewingForm.status === "success" ? (
              <div className="mt-6 border border-[#17383C]/12 bg-white p-5">
                <p className="text-base font-black text-[#17383C]">{viewingForm.message}</p>
                <button
                  type="button"
                  onClick={viewingForm.reset}
                  className="mt-4 border-b border-[#17383C]/35 pb-1 text-sm font-black text-[#17383C]"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={viewingForm.handleSubmit} className="mt-6 grid gap-3">
                <input type="hidden" name="botField" value="" readOnly />
                <input type="hidden" name="listingMode" value={property.mode} />
                <input
                  type="hidden"
                  name="property"
                  value={`${property.location}, ${property.area} — ${property.priceLabel}`}
                />
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Full name"
                  className="min-h-12 w-full border border-[#17383C]/16 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38 focus:border-[#17383C]"
                />
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="min-h-12 w-full border border-[#17383C]/16 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38 focus:border-[#17383C]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="min-h-12 w-full border border-[#17383C]/16 bg-white px-4 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38 focus:border-[#17383C]"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Preferred days or times"
                  className="w-full resize-y border border-[#17383C]/16 bg-white px-4 py-3 text-sm text-[#17383C] outline-none placeholder:text-[#17383C]/38 focus:border-[#17383C]"
                />
                <button
                  type="submit"
                  disabled={viewingForm.isSending}
                  className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#17383C] px-5 text-sm font-black text-white transition hover:bg-[#2D5B5D] disabled:opacity-60"
                >
                  {viewingForm.isSending ? "Sending..." : "Request a viewing"}
                  <ArrowIcon />
                </button>
              </form>
            )}

            {viewingForm.status === "error" && (
              <p className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
                {viewingForm.message}
              </p>
            )}

            <div className="mt-6 border-t border-[#17383C]/12 pt-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">Wrenford Ashby</p>
              <p className="mt-2 text-sm font-black text-[#17383C]">Wickford office</p>
              <p className="mt-1 text-sm leading-6 text-[#17383C]/58">
                <a
                  href="tel:01268000000"
                  className="transition hover:text-[#17383C]"
                >
                  01268 000 000
                </a>
                <br />
                <a
                  href="mailto:hello@wrenfordashby.co.uk"
                  className="transition hover:text-[#17383C]"
                >
                  hello@wrenfordashby.co.uk
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">Property photos</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#17383C]">More views of the property</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(1).map((image, index) => (
              <div key={`${image}-${index}`} className="aspect-[4/3] overflow-hidden border border-[#17383C]/10 bg-[#DDE8E4]">
                <img
                  src={image}
                  alt={`${property.location} property photo ${index + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
