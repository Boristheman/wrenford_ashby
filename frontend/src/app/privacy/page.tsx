import type { Metadata } from "next";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy policy | Wrenford Ashby",
  description: "This page explains the types of personal information the website may receive and the general ways that information is handled.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased">
      <SiteHeader />

      <section className="bg-[#EAF0ED] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
            Your information
          </p>
          <h1 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.94] tracking-[-0.052em]">
            Privacy policy
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#17383C]/62 sm:text-lg">
            This page explains the types of personal information the website may receive and the general ways that information is handled.
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
                  Information we may collect
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>When you contact us, request a valuation, register for property alerts or enquire about a property, we may receive details such as your name, telephone number, email address, property information and the content of your enquiry.</p>
                  <p>Technical information may also be generated when the website is used, including basic device, browser and usage information.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  How the information is used
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Information is used to respond to enquiries, arrange appointments, provide requested property services, maintain appropriate business records and improve the website.</p>
                  <p>We do not use an enquiry for unrelated marketing unless there is an appropriate basis to do so and the relevant preference has been provided.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Sharing and service providers
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Information may be handled by suppliers that support website hosting, email, property marketing, referencing or other operational services.</p>
                  <p>Information may also be shared where required by law or where it is necessary to progress a service requested by the client.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Retention and security
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Personal information is kept only for as long as it is reasonably needed for the relevant enquiry, service, legal obligation or business record.</p>
                  <p>Reasonable administrative and technical measures are used to protect information, although no internet service can guarantee absolute security.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Your rights
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>Depending on the circumstances, individuals may have rights to request access, correction, deletion, restriction or objection, and to complain to the UK Information Commissioner's Office.</p>
                  <p>A request can be made using the contact details shown on this website.</p>
                </div>
              </section>
              <section className="border-t border-[#17383C]/12 py-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-black tracking-[-0.025em] text-[#17383C]">
                  Cookies
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[#17383C]/62 sm:text-base">
                  <p>The website may use essential cookies needed for core functionality and preference storage. Any non-essential measurement or marketing technology should be described through the site's cookie controls before it is used.</p>
                </div>
              </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
