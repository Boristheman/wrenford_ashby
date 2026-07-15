"use client";

import { useEffect, useState } from "react";

type DropdownMenu = {
  label: string;
  href: string;
  links: Array<{ label: string; href: string }>;
};

const dropdownMenus: DropdownMenu[] = [
  {
    label: "Buy",
    href: "/buy",
    links: [
      { label: "Properties for sale", href: "/buy#properties-for-sale" },
      { label: "New to market", href: "/buy?sort=new" },
      { label: "Property alerts", href: "/buy?focus=alerts" },
      { label: "Book a viewing", href: "/buy?focus=viewing" },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    links: [
      { label: "Homes to rent", href: "/rent#homes-to-rent" },
      { label: "New to market", href: "/rent?sort=new" },
      { label: "Rental alerts", href: "/rent?focus=alerts" },
      { label: "Book a viewing", href: "/rent?focus=viewing" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    links: [
      { label: "Selling fees", href: "/sell#selling-fees" },
      { label: "Why choose us", href: "/sell#why-choose-us" },
      { label: "Book a valuation", href: "/sell#book-valuation" },
      { label: "Selling process", href: "/sell#sales-progression" },
    ],
  },
  {
    label: "New Homes",
    href: "/new-homes",
    links: [
      {
        label: "Current developments",
        href: "/new-homes#current-developments",
      },
      {
        label: "Upcoming releases",
        href: "/new-homes#upcoming-releases",
      },
      {
        label: "Buying a new-build",
        href: "/new-homes#buying-new-build",
      },
    ],
  },
  {
    label: "Landlords",
    href: "/landlords",
    links: [
      { label: "Fully managed", href: "/landlords#managed" },
      { label: "Let only", href: "/landlords#let-only" },
      {
        label: "Rental valuation",
        href: "/landlords#rental-valuation",
      },
      {
        label: "Landlord enquiry",
        href: "/landlords#landlord-enquiry",
      },
    ],
  },
];

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

function NavReel({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="block h-7 overflow-hidden">
        <span
          className={`block transition-transform duration-[560ms] ease-[cubic-bezier(.16,1,.3,1)] will-change-transform group-hover:-translate-y-7 group-focus-visible:-translate-y-7 ${
            active ? "-translate-y-7" : "translate-y-0"
          }`}
        >
          <span className="block h-7 whitespace-nowrap leading-7">{label}</span>
          <span className="block h-7 whitespace-nowrap leading-7 text-[#6B908D]">
            {label}
          </span>
        </span>
      </span>
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-7">
      <span
        className={`absolute left-0 top-0 h-0.5 w-7 bg-current transition ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] h-0.5 w-7 bg-current transition ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-7 bg-current transition ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function SmallChevron() {
  return (
    <svg
      viewBox="0 0 10 16"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-2.5 shrink-0 text-[#17383C]/45 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#17383C]"
    >
      <path
        d="M2 2.5 7.5 8 2 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      onMouseLeave={() => setActiveMegaMenu(null)}
      className="sticky top-0 z-[80] bg-white text-[#17383C] shadow-[0_12px_35px_rgba(13,37,41,0.12)]"
    >
      <div className="mx-auto flex h-[96px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="/"
          onClick={() => setMenuOpen(false)}
          onMouseEnter={() => setActiveMegaMenu(null)}
          onFocus={() => setActiveMegaMenu(null)}
          aria-label="Wrenford Ashby home"
          className="flex shrink-0 items-center"
        >
          <img
            src="/graphics/logos/wa.png"
            alt="Wrenford Ashby"
            draggable={false}
            className="h-[82px] w-auto max-w-none shrink-0 origin-left scale-[1.18] object-contain sm:h-[90px] sm:scale-[1.22]"
          />
        </a>

        <nav
          className="hidden h-full items-center gap-[clamp(0.2rem,0.65vw,0.9rem)] text-[16px] font-bold text-[#17383C] xl:flex"
          aria-label="Main navigation"
        >
          <a
            href="/"
            onMouseEnter={() => setActiveMegaMenu(null)}
            onFocus={() => setActiveMegaMenu(null)}
            className="group flex h-12 items-center px-3 outline-none"
          >
            <NavReel label="Home" />
          </a>

          {dropdownMenus.map((menu) => {
            const open = activeMegaMenu === menu.label;

            return (
              <div
                key={menu.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => setActiveMegaMenu(menu.label)}
                onFocus={() => setActiveMegaMenu(menu.label)}
              >
                <a
                  href={menu.href}
                  aria-expanded={open}
                  className="group flex h-12 items-center whitespace-nowrap px-3 outline-none"
                >
                  <NavReel label={menu.label} active={open} />
                </a>

                {open && (
                  <div
                    onMouseEnter={() => setActiveMegaMenu(menu.label)}
                    className="absolute left-1/2 top-full z-[100] w-64 -translate-x-1/2 border-x border-b border-[#17383C]/10 bg-white pt-[7px] text-[#17383C] shadow-[0_16px_38px_rgba(13,37,41,0.14)]"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-px -right-px top-0 h-[7px] bg-[#17383C]"
                    />

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 28 15"
                      className="pointer-events-none absolute left-1/2 top-[-14px] z-10 h-[15px] w-7 -translate-x-1/2"
                    >
                      <path d="M0 15 14 0 28 15Z" fill="#17383C" />
                    </svg>

                    {menu.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setActiveMegaMenu(null)}
                        className="group flex min-h-14 w-full items-center justify-between gap-4 px-5 py-3 text-sm font-bold text-[#17383C] transition hover:bg-[#EAF0ED]"
                      >
                        <span>{link.label}</span>
                        <SmallChevron />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <a
            href="/about"
            onMouseEnter={() => setActiveMegaMenu(null)}
            onFocus={() => setActiveMegaMenu(null)}
            className="group flex h-12 items-center px-3 outline-none"
          >
            <NavReel label="About" />
          </a>

          <a
            href="/news"
            onMouseEnter={() => setActiveMegaMenu(null)}
            onFocus={() => setActiveMegaMenu(null)}
            className="group flex h-12 items-center px-3 outline-none"
          >
            <NavReel label="News" />
          </a>
        </nav>

        <a
          href="/contact"
          onMouseEnter={() => setActiveMegaMenu(null)}
          onFocus={() => setActiveMegaMenu(null)}
          className="hidden min-h-12 items-center border border-[#17383C] bg-[#17383C] px-6 text-base font-bold !text-white transition hover:border-[#2D5B5D] hover:bg-[#2D5B5D] xl:inline-flex"
        >
          Contact us
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center text-[#17383C] xl:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#17383C]/10 bg-white px-5 pb-8 pt-2 xl:hidden">
          <nav
            className="mx-auto max-h-[calc(100svh-7rem)] max-w-[1480px] overflow-y-auto"
            aria-label="Mobile navigation"
          >
            {mobileNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-14 items-center justify-between border-b border-[#17383C]/10 text-base font-bold"
              >
                <span>{item.label}</span>
                <SmallChevron />
              </a>
            ))}

            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex min-h-12 items-center justify-center bg-[#17383C] px-5 font-bold text-white"
            >
              Contact us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
