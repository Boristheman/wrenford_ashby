"use client";

import { useState } from "react";
import SiteFooter from "../__components/SiteFooter";
import SiteHeader from "../__components/SiteHeader";
import { useEnquiryForm } from "../__components/useEnquiryForm";

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

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
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

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m5 7 7 5.5L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="10"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const openingHours = [
  ["Monday–Friday", "8:30am–6:00pm"],
  ["Saturday", "9:00am–4:00pm"],
  ["Sunday", "Closed"],
];

const processSteps = [
  {
    number: "01",
    title: "Send the details",
    text: "Choose the nature of your enquiry and add the property address or area where relevant.",
  },
  {
    number: "02",
    title: "We review it locally",
    text: "Your message goes to the appropriate sales, lettings or property management contact.",
  },
  {
    number: "03",
    title: "A named person replies",
    text: "We will call or email with the next useful step rather than passing you between departments.",
  },
];

export default function ContactPage() {
  const enquiryForm = useEnquiryForm("general-enquiry");

  return (
    <main className="min-h-screen bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
      <style>{`
        @keyframes waContactFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes waContactRise {
          from {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes waContactSlide {
          from {
            opacity: 0;
            transform: translate3d(28px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .wa-contact-grid {
          opacity: 0;
          animation: waContactFade 420ms ease-out 60ms both;
        }

        .wa-contact-left > p,
        .wa-contact-left > h1,
        .wa-contact-left > h1 + p {
          opacity: 0;
          animation: waContactRise 680ms cubic-bezier(.22,1,.36,1) both;
        }

        .wa-contact-left > p {
          animation-delay: 100ms;
        }

        .wa-contact-left > h1 {
          animation-delay: 170ms;
        }

        .wa-contact-left > h1 + p {
          animation-delay: 250ms;
        }

        .wa-contact-details {
          opacity: 0;
          animation: waContactRise 720ms cubic-bezier(.22,1,.36,1) 330ms both;
        }

        .wa-contact-hours {
          opacity: 0;
          animation: waContactRise 720ms cubic-bezier(.22,1,.36,1) 430ms both;
        }

        .wa-contact-form {
          opacity: 0;
          animation: waContactSlide 760ms cubic-bezier(.22,1,.36,1) 180ms both;
        }

        .wa-contact-shelly {
          opacity: 0;
          animation: waContactRise 760ms cubic-bezier(.22,1,.36,1) 520ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-contact-grid,
          .wa-contact-left > p,
          .wa-contact-left > h1,
          .wa-contact-left > h1 + p,
          .wa-contact-details,
          .wa-contact-hours,
          .wa-contact-form,
          .wa-contact-shelly {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>

      <SiteHeader />

      <section className="bg-[#EAF0ED] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="wa-contact-grid mx-auto grid max-w-[1480px] items-stretch gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:gap-16">
          <div className="wa-contact-left flex h-full flex-col xl:pt-2">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
              Contact Wrenford Ashby
            </p>

            <h1 className="mt-5 max-w-[720px] text-[clamp(3rem,5.4vw,6rem)] font-black leading-[0.94] tracking-[-0.052em] text-[#17383C]">
              Tell us what you need help with.
            </h1>

            <p className="mt-6 max-w-[650px] text-base leading-7 text-[#17383C]/62 sm:text-lg sm:leading-8">
              Send a general enquiry, ask about a property, arrange a
              valuation or speak to the lettings team. The form goes directly
              to the relevant local contact.
            </p>

            <div className="wa-contact-details mt-9 grid gap-px border border-[#17383C]/10 bg-[#17383C]/10 sm:grid-cols-2 xl:grid-cols-1">
              <a
                href="tel:01268000000"
                className="group flex min-h-24 items-center justify-between bg-white px-5 py-4 transition hover:bg-[#F7F9F7]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-[#17383C]/12 bg-[#EAF0ED] text-[#17383C]">
                    <PhoneIcon />
                  </span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                      Call the office
                    </span>
                    <span className="mt-1 block text-xl font-black">
                      01268 000 000
                    </span>
                  </span>
                </span>
                <span className="transition group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>

              <a
                href="mailto:hello@wrenfordashby.co.uk"
                className="group flex min-h-24 items-center justify-between bg-white px-5 py-4 transition hover:bg-[#F7F9F7]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-[#17383C]/12 bg-[#EAF0ED] text-[#17383C]">
                    <MailIcon />
                  </span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                      Email
                    </span>
                    <span className="mt-1 block text-base font-black sm:text-lg">
                      hello@wrenfordashby.co.uk
                    </span>
                  </span>
                </span>
                <span className="transition group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>

              <div className="flex min-h-24 items-center gap-4 bg-white px-5 py-4 sm:col-span-2 xl:col-span-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#17383C]/12 bg-[#EAF0ED] text-[#17383C]">
                  <PinIcon />
                </span>
                <span>
                  <span className="block text-xs font-black uppercase tracking-[0.12em] text-[#6B908D]">
                    Wickford office
                  </span>
                  <span className="mt-1 block text-base font-black">
                    High Street, Wickford, Essex, SS12
                  </span>
                </span>
              </div>
            </div>

            <div className="wa-contact-hours mt-8 flex min-h-[330px] flex-1 flex-col border border-[#17383C]/12 bg-white p-6 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                Opening times
              </p>

              <div className="mt-5 flex flex-1 flex-col justify-evenly">
                {openingHours.map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex min-h-16 items-center justify-between gap-6 text-sm sm:text-base"
                  >
                    <span className="font-black text-[#17383C]">{day}</span>
                    <span className="text-right text-[#17383C]/52">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="enquiry"
            className="wa-contact-form h-full self-stretch border border-[#17383C] bg-[#17383C] p-5 text-white shadow-[0_18px_50px_rgba(23,56,60,0.16)] sm:p-8 lg:p-10"
          >
            {enquiryForm.status === "success" ? (
              <div className="flex min-h-[690px] flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6B908D]">
                  Enquiry received
                </p>

                <h2 className="mt-4 max-w-2xl text-[clamp(2.5rem,4vw,4.5rem)] font-black leading-[0.98] tracking-[-0.045em]">
                  Thank you. The local team will be in touch.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
                  Your message will be reviewed and sent to the right person.
                </p>

                <button
                  type="button"
                  onClick={enquiryForm.reset}
                  className="mt-8 w-fit border-b border-white/35 pb-1 text-sm font-black text-white transition hover:border-white"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={enquiryForm.handleSubmit}>
                <input type="hidden" name="botField" value="" readOnly />
                <div className="border-b border-white/12 pb-7">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
                    General enquiry
                  </p>

                  <h2 className="mt-3 text-[clamp(2.2rem,3.6vw,4rem)] font-black leading-[0.98] tracking-[-0.045em]">
                    How can we help?
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
                    Add as much detail as you can. Fields marked with an
                    asterisk are required.
                  </p>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="text-xs font-black text-white/72">
                      Nature of enquiry *
                    </span>
                    <select
                      required
                      name="enquiryType"
                      defaultValue=""
                      className="mt-2 min-h-13 w-full border border-white/25 bg-white px-4 text-sm text-[#17383C] outline-none transition focus:border-[#BFD3CD]"
                    >
                      <option value="" disabled>
                        Select the reason for your enquiry
                      </option>
                      <option value="buying">Buying a property</option>
                      <option value="renting">Renting a property</option>
                      <option value="selling">Selling a property</option>
                      <option value="letting">Letting a property</option>
                      <option value="valuation">Property valuation</option>
                      <option value="viewing">Book or change a viewing</option>
                      <option value="management">
                        Property management or maintenance
                      </option>
                      <option value="new-homes">New homes</option>
                      <option value="other">Something else</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Full name *
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="mt-2 min-h-13 w-full border border-white/25 bg-white px-4 text-sm text-[#17383C] outline-none transition focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Telephone *
                    </span>
                    <input
                      required
                      name="telephone"
                      type="tel"
                      autoComplete="tel"
                      className="mt-2 min-h-13 w-full border border-white/25 bg-white px-4 text-sm text-[#17383C] outline-none transition focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Email address *
                    </span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-2 min-h-13 w-full border border-white/25 bg-white px-4 text-sm text-[#17383C] outline-none transition focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-black text-white/72">
                      Preferred contact
                    </span>
                    <select
                      name="preferredContact"
                      defaultValue="telephone"
                      className="mt-2 min-h-13 w-full border border-white/25 bg-white px-4 text-sm text-[#17383C] outline-none transition focus:border-[#BFD3CD]"
                    >
                      <option value="telephone">Telephone</option>
                      <option value="email">Email</option>
                      <option value="either">Either is fine</option>
                    </select>
                  </label>

                  <label className="sm:col-span-2">
                    <span className="text-xs font-black text-white/72">
                      Property address, postcode or area
                    </span>
                    <input
                      name="property"
                      type="text"
                      placeholder="Add this where your enquiry relates to a property"
                      className="mt-2 min-h-13 w-full border border-white/25 bg-white px-4 text-sm text-[#17383C] outline-none transition placeholder:text-[#17383C]/35 focus:border-[#BFD3CD]"
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="text-xs font-black text-white/72">
                      Your message *
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={7}
                      placeholder="Tell us what you need help with, any relevant dates and the best time to contact you."
                      className="mt-2 w-full resize-y border border-white/25 bg-white px-4 py-4 text-sm leading-6 text-[#17383C] outline-none transition placeholder:text-[#17383C]/35 focus:border-[#BFD3CD]"
                    />
                  </label>
                </div>

                <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-white/55">
                  <input
                    required
                    name="consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#BFD3CD]"
                  />
                  <span>
                    I agree that Wrenford Ashby may use these details to
                    respond to this enquiry.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={enquiryForm.isSending}
                  className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 bg-[#BFD3CD] px-6 py-4 font-black text-[#17383C] transition hover:bg-white disabled:cursor-wait disabled:opacity-65"
                >
                  {enquiryForm.isSending
                    ? "Sending enquiry..."
                    : "Send enquiry"}
                  <ArrowIcon />
                </button>

                {enquiryForm.status === "error" && (
                  <p role="alert" className="mt-4 text-sm font-bold text-red-200">
                    {enquiryForm.message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="wa-contact-shelly border-b border-[#17383C]/10 bg-[#EAF0ED] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] overflow-hidden border border-[#17383C]/10 bg-white sm:grid-cols-[210px_1fr] lg:grid-cols-[260px_1fr]">
          <div className="h-[220px] overflow-hidden bg-[#DDE8E4] sm:h-full">
            <img
              src="/graphics/team/shelly.png"
              alt="Shelly, receptionist at Wrenford Ashby"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:px-10">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6B908D]">
              Your enquiry
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] text-[#17383C] sm:text-3xl">
              Shelly will review it first.
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-[#17383C]/58 sm:text-base sm:leading-7">
              Shelly checks each enquiry before it is passed on. If anything
              important is missing, she will contact you directly to confirm
              the details. Once everything is clear, she will send it to the
              appropriate member of the sales, lettings or property-management
              team so they can respond properly.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
