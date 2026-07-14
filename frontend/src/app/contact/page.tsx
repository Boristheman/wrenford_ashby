import type { Metadata } from "next";
import { SiteFooter } from "../_components/SiteFooter";
import { SiteHeader } from "../_components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F4] text-[#17383C]">
      <SiteHeader />

      <section id="page-hero" className="relative min-h-[580px] overflow-hidden bg-[#17383C] px-5 pb-20 pt-40 text-white sm:px-8 sm:pt-44 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
            Contact Wrenford Ashby
          </p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,6.5vw,6.8rem)] font-black leading-[0.92] tracking-[-0.055em]">
            Tell us what you need help with.
          </h1>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-22 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="bg-[#BFD3CD] p-7 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#17383C]/60">
              Wickford office
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">
              Easy to reach and ready to help.
            </h2>

            <div className="mt-8 space-y-7 border-t border-[#17383C]/18 pt-7">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.13em] text-[#17383C]/55">
                  Telephone
                </p>
                <a
                  href="tel:01268000000"
                  className="mt-2 block text-2xl font-black"
                >
                  01268 000 000
                </a>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.13em] text-[#17383C]/55">
                  Email
                </p>
                <a
                  href="mailto:hello@wrenfordashby.co.uk"
                  className="mt-2 block break-all text-lg font-black"
                >
                  hello@wrenfordashby.co.uk
                </a>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.13em] text-[#17383C]/55">
                  Office
                </p>
                <p className="mt-2 leading-7">
                  High Street
                  <br />
                  Wickford, Essex
                  <br />
                  SS12
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[#17383C]/10 bg-white p-7 shadow-[0_14px_44px_rgba(23,56,60,0.07)] sm:p-10">
            <h2 className="text-3xl font-black tracking-[-0.03em]">
              Send an enquiry
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#17383C]/60">
              This is a front-end mock form. Connect it to your enquiry
              API route when the design is approved.
            </p>

            <form className="mt-8 grid gap-5 sm:grid-cols-2">
              <label>
                <span className="text-xs font-black">Full name</span>
                <input
                  type="text"
                  className="mt-2 min-h-12 w-full border border-[#17383C]/20 px-4 outline-none focus:border-[#6B908D]"
                />
              </label>

              <label>
                <span className="text-xs font-black">Telephone</span>
                <input
                  type="tel"
                  className="mt-2 min-h-12 w-full border border-[#17383C]/20 px-4 outline-none focus:border-[#6B908D]"
                />
              </label>

              <label>
                <span className="text-xs font-black">Email address</span>
                <input
                  type="email"
                  className="mt-2 min-h-12 w-full border border-[#17383C]/20 px-4 outline-none focus:border-[#6B908D]"
                />
              </label>

              <label>
                <span className="text-xs font-black">Enquiry type</span>
                <select className="mt-2 min-h-12 w-full border border-[#17383C]/20 bg-white px-4 outline-none focus:border-[#6B908D]">
                  <option>Buying</option>
                  <option>Renting</option>
                  <option>Selling</option>
                  <option>Landlord</option>
                  <option>New homes</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="sm:col-span-2">
                <span className="text-xs font-black">Message</span>
                <textarea
                  rows={6}
                  className="mt-2 w-full border border-[#17383C]/20 p-4 outline-none focus:border-[#6B908D]"
                />
              </label>

              <button
                type="submit"
                className="min-h-13 bg-[#17383C] px-6 font-black text-white transition hover:bg-[#2D5B5D] sm:col-span-2"
              >
                Send enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
