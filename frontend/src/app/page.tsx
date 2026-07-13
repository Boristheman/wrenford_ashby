"use client";

import { useState } from "react";

const properties = [
  {
    location: "Old Moulsham, Chelmsford",
    price: "£725,000",
    details: "4 beds · 2 baths · Detached",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    location: "Great Baddow, Chelmsford",
    price: "£495,000",
    details: "3 beds · 2 baths · Semi-detached",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
  },
  {
    location: "Danbury, Essex",
    price: "£895,000",
    details: "5 beds · 3 baths · Detached",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17221b]">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/20 text-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#" className="leading-none">
            <span className="block text-xl font-semibold tracking-[0.18em] sm:text-2xl">
              WRENFORD ASHBY
            </span>
            <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.34em] text-white/65">
              Estate Agents
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a className="transition hover:text-[#d7c39a]" href="#properties">
              Buy
            </a>
            <a className="transition hover:text-[#d7c39a]" href="#properties">
              Rent
            </a>
            <a className="transition hover:text-[#d7c39a]" href="#valuation">
              Sell
            </a>
            <a className="transition hover:text-[#d7c39a]" href="#about">
              About
            </a>
            <a className="transition hover:text-[#d7c39a]" href="#contact">
              Contact
            </a>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="#valuation"
              className="border border-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:bg-white hover:text-[#17221b]"
            >
              Book a valuation
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-white transition ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-px w-6 bg-white transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-6 bg-white transition ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/20 bg-[#17221b] px-5 py-6 lg:hidden">
            <nav className="flex flex-col gap-5 text-lg">
              <a href="#properties" onClick={() => setMenuOpen(false)}>
                Buy
              </a>
              <a href="#properties" onClick={() => setMenuOpen(false)}>
                Rent
              </a>
              <a href="#valuation" onClick={() => setMenuOpen(false)}>
                Sell
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative flex min-h-[760px] items-end overflow-hidden pb-16 pt-40 sm:min-h-[840px] sm:pb-20">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90"
          alt="Luxury Essex home"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1711]/90 via-[#0c1711]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1711]/75 via-transparent to-[#0c1711]/35" />

        <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl text-white">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c39a] sm:text-sm">
              Chelmsford · Essex
            </p>
            <h1 className="max-w-4xl font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.045em]">
              Property,
              <br />
              properly handled.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Independent estate agents combining local knowledge, considered
              marketing and straightforward advice.
            </p>
          </div>

          <div className="mt-12 grid max-w-5xl gap-px bg-white/20 shadow-2xl sm:grid-cols-[1fr_1fr_auto]">
            <label className="bg-white px-5 py-4 text-[#17221b]">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
                Looking to
              </span>
              <select className="mt-2 w-full bg-transparent text-base font-semibold outline-none">
                <option>Buy a property</option>
                <option>Rent a property</option>
              </select>
            </label>

            <label className="bg-white px-5 py-4 text-[#17221b]">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
                Area
              </span>
              <input
                type="text"
                placeholder="Chelmsford, Essex"
                className="mt-2 w-full bg-transparent text-base font-semibold outline-none placeholder:text-[#17221b]"
              />
            </label>

            <button className="bg-[#bda36f] px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-[#17221b] transition hover:bg-[#d7c39a]">
              Search homes
            </button>
          </div>
        </div>
      </section>

      <section id="properties" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-6 border-b border-[#17221b]/15 pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f7548]">
                Handpicked homes
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">
                Properties worth seeing
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-bold uppercase tracking-[0.16em] underline decoration-1 underline-offset-8"
            >
              View all properties
            </a>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {properties.map((property) => (
              <article key={property.location} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#d8d2c5]">
                  <img
                    src={property.image}
                    alt={property.location}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-[#f4f1e9] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.17em]">
                    For sale
                  </span>
                </div>
                <div className="border-b border-[#17221b]/20 py-6">
                  <p className="text-sm text-[#17221b]/60">{property.details}</p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {property.location}
                  </h3>
                  <p className="mt-3 font-serif text-2xl">{property.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="valuation" className="bg-[#17221b] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d7c39a]">
              Thinking of selling?
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] sm:text-7xl">
              Start with an honest valuation.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              We combine recent local sales, buyer demand and first-hand market
              knowledge to give you a realistic view of your property&apos;s
              value.
            </p>
          </div>

          <form className="bg-[#f4f1e9] p-6 text-[#17221b] sm:p-9">
            <div className="grid gap-5">
              <input
                type="text"
                placeholder="Full name"
                className="border-b border-[#17221b]/25 bg-transparent px-0 py-4 outline-none placeholder:text-[#17221b]/45"
              />
              <input
                type="email"
                placeholder="Email address"
                className="border-b border-[#17221b]/25 bg-transparent px-0 py-4 outline-none placeholder:text-[#17221b]/45"
              />
              <input
                type="text"
                placeholder="Property postcode"
                className="border-b border-[#17221b]/25 bg-transparent px-0 py-4 outline-none placeholder:text-[#17221b]/45"
              />
              <button
                type="submit"
                className="mt-3 bg-[#bda36f] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[#a98f5f]"
              >
                Request valuation
              </button>
            </div>
          </form>
        </div>
      </section>

      <section id="about" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85"
              alt="Estate agent meeting"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>

          <div className="lg:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f7548]">
              Independent by choice
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
              Local knowledge. Better judgement.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#17221b]/65">
              Wrenford Ashby is an independent Essex estate agency built around
              clear advice, exceptional presentation and a genuinely personal
              service.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#17221b]/15 pt-8">
              <div>
                <p className="font-serif text-4xl">Essex</p>
                <p className="mt-2 text-sm text-[#17221b]/55">
                  Local market specialists
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl">7 days</p>
                <p className="mt-2 text-sm text-[#17221b]/55">
                  Flexible viewing support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-[#17221b]/15 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-lg font-semibold tracking-[0.16em]">
              WRENFORD ASHBY
            </p>
            <p className="mt-2 text-sm text-[#17221b]/55">
              Estate Agents · Chelmsford & Essex
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
            <a href="tel:01245000000">01245 000 000</a>
            <a href="mailto:hello@wrenfordashby.co.uk">
              hello@wrenfordashby.co.uk
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
