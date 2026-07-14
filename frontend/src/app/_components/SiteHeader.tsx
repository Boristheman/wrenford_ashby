"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

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

function HeaderRow({
  overHero,
  menuOpen,
  setMenuOpen,
}: {
  overHero: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <div className="mx-auto flex min-h-[104px] max-w-[1480px] items-center justify-between gap-7 px-5 sm:px-8 lg:px-12">
      <a href="/" aria-label="Wrenford Ashby home" className="shrink-0">
        <img
          src="/graphics/logos/wa.png"
          alt="Wrenford Ashby"
          draggable={false}
          className="h-[82px] w-auto max-w-[300px] object-contain sm:h-[90px] sm:max-w-[335px]"
        />
      </a>

      <nav
        aria-label="Main navigation"
        className={`hidden items-center gap-[clamp(1rem,1.55vw,2rem)] text-[16px] font-bold xl:flex ${
          overHero ? "text-white" : "text-[#17383C]"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`transition ${
              overHero
                ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] hover:text-[#BFD3CD]"
                : "hover:text-[#6B908D]"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href="/contact"
        style={{ color: overHero ? "#ffffff" : "#ffffff" }}
        className={`hidden min-h-12 items-center px-6 text-base font-black !text-white transition duration-200 visited:!text-white hover:!text-white focus:!text-white xl:inline-flex ${
          overHero
            ? "border border-white/65 bg-[#0D2529]/38 backdrop-blur-sm hover:border-white hover:bg-[#0D2529]/58"
            : "bg-[#17383C] hover:bg-[#2D5B5D]"
        }`}
      >
        <span className="!text-white" style={{ color: "#ffffff" }}>
          Contact us
        </span>
      </a>

      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className={`flex h-11 w-11 items-center justify-center xl:hidden ${
          overHero ? "text-white" : "text-[#17383C]"
        }`}
      >
        <MenuIcon open={menuOpen} />
      </button>
    </div>
  );
}

export function SiteHeader() {
  const [scrolledHeaderVisible, setScrolledHeaderVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.getElementById("page-hero");
      const heroBottom =
        hero?.getBoundingClientRect().bottom ?? window.innerHeight;

      setScrolledHeaderVisible(heroBottom <= 0);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="relative z-[70] bg-[#0D2529] text-white">
        <div className="mx-auto flex min-h-10 max-w-[1480px] items-center justify-between gap-4 px-5 py-2 text-xs sm:px-8 lg:px-12">
          <p className="hidden sm:block">
            Independent estate agents for Wickford and South Essex
          </p>

          <div className="ml-auto flex items-center gap-5">
            <span className="text-white/60">Mon–Sat</span>
            <a href="tel:01268000000" className="font-black text-white">
              01268 000 000
            </a>
          </div>
        </div>
      </div>

      <header className="absolute left-0 right-0 top-10 z-[60] text-white">
        <HeaderRow
          overHero
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </header>

      <header
        className={`fixed left-0 right-0 top-0 z-[80] border-b border-[#17383C]/10 bg-white/97 shadow-[0_12px_34px_rgba(13,37,41,0.10)] backdrop-blur-md transition-[transform,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          scrolledHeaderVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <HeaderRow
          overHero={false}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[75] bg-white px-5 pb-8 pt-28 text-[#17383C] xl:hidden">
          <nav className="mx-auto flex max-w-xl flex-col border-t border-[#17383C]/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#17383C]/10 py-4 text-xl font-black"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex min-h-13 items-center justify-center bg-[#17383C] px-6 font-black text-white"
            >
              Contact us
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
