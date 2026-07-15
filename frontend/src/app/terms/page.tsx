import type { Metadata } from "next";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms & conditions | Wrenford Ashby",
  description: "These terms explain the basis on which the Wrenford Ashby website and its property information are provided.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased">
      <SiteHeader />

      <section className="bg-[#EAF0ED] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
            Website terms
          </p>
          <h1 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.94] tracking-[-0.052em]">
            Terms & conditions
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#17383C]/62 sm:text-lg">
            These terms explain the basis on which the Wrenford Ashby website and its property information are provided.
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#17383C]/38">
            Last updated 15 July 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="h-fit border border-[#17383C]/12 bg-[#F4F6F4] p-6 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#6B908D]">
              Contact
            </p>
            <p className="mt-4 text-sm leading-6 text-[#17383C]/58">
              Questions about this page can be sent to
              hello@wrenfordashby.co.uk.
            </p>
          </aside>

          <div>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Using this website
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>This website provides general information about Wrenford Ashby, available properties and related estate-agency services. Users must not misuse the website, interfere with its operation or attempt unauthorised access.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Property information
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Property particulars, measurements, photographs, descriptions and availability are provided as a general guide and should not be treated as a contractual statement or substitute for inspection, survey, legal advice or independent verification.</p>
                  <p>Prices, rents, availability and other property details may change or be withdrawn without notice.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Valuations and market commentary
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Any indicative valuation, fee example or market commentary shown on the website is general information. A formal recommendation depends on the property, market evidence and the service agreed directly with the client.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Third-party links and services
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>The website may link to property portals, mapping services, social platforms or other third-party websites. Wrenford Ashby does not control their content, availability or privacy practices.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Intellectual property
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Website design, written content, branding and original media may not be copied, republished or commercially reused without permission, except where normal browser use or applicable law permits it.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Liability
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Reasonable care is taken when maintaining the website, but uninterrupted access or complete accuracy cannot be guaranteed. Nothing on the website limits liability where it cannot lawfully be limited.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Changes and governing law
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>These terms may be updated when the website or services change. Use of the website is governed by the laws of England and Wales, subject to any mandatory consumer rights.</p>
                </div>
              </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
