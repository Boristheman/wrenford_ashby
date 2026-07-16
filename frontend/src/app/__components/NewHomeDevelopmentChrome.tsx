"use client";

import { useEffect, useState, type ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

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

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
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

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3.5 6.5h17v11h-17v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m4.5 7.5 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CookieIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M39 23.5A15.5 15.5 0 1 1 24.5 9c.4 4.6 4.1 8.3 8.7 8.7.2 3.1 2.7 5.6 5.8 5.8Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="18" r="2.2" fill="#17383C" />
      <circle cx="16" cy="28" r="2.4" fill="#17383C" />
      <circle cx="27" cy="29" r="2.1" fill="#17383C" />
      <circle cx="25" cy="20" r="1.8" fill="#17383C" />
    </svg>
  );
}

function MobileHeader({
  menuOpen,
  onOpen,
}: {
  menuOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] border-b border-[#17383C]/12 bg-white text-[#17383C] shadow-[0_12px_34px_rgba(13,37,41,0.16)] sm:hidden">
      <div className="grid h-[5.1rem] grid-cols-[1fr_auto] items-center gap-3 px-4">
        <a href="/" aria-label="Wrenford Ashby home" className="min-w-0">
          <img
            src="/graphics/logos/wa.png"
            alt="Wrenford Ashby"
            draggable={false}
            className="-ml-1 h-[4.25rem] w-auto max-w-[17rem] origin-left scale-[1.25] object-contain object-left"
          />
        </a>

        <div className="flex items-center gap-2">
          <a
            href="tel:01268000000"
            aria-label="Call Wrenford Ashby"
            className="flex h-10 items-center gap-2 px-1 text-[0.73rem] font-black tracking-[0.01em] text-[#17383C]"
          >
            <PhoneIcon />
            <span className="hidden min-[390px]:inline">01268 000 000</span>
          </a>

          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={onOpen}
            className="flex h-11 w-10 items-center justify-end"
          >
            <span className="relative block h-[18px] w-7">
              <span className="absolute left-0 top-0 h-[2px] w-7 bg-current" />
              <span className="absolute left-0 top-2 h-[2px] w-7 bg-current" />
              <span className="absolute left-0 top-4 h-[2px] w-7 bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className="fixed inset-0 z-[1090] bg-[#061719]/62 backdrop-blur-[1px] sm:hidden"
      />

      <aside className="new-home-detail-drawer-in fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(82vw,22rem)] max-w-full flex-col overflow-hidden bg-white text-[#17383C] shadow-[-24px_0_64px_rgba(0,0,0,0.22)] sm:hidden">
        <div className="flex min-h-[5rem] shrink-0 items-center justify-between border-b border-[#17383C]/8 px-5 pt-[env(safe-area-inset-top)]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B908D]">
            Navigation
          </p>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-end"
            aria-label="Close navigation"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto px-5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Mobile navigation"
        >
          {MOBILE_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="group flex min-h-[3.45rem] items-center justify-between gap-4 border-b border-[#17383C]/8 text-[0.98rem] font-bold tracking-[-0.012em] active:opacity-50"
            >
              <span>{item.label}</span>
              <ArrowIcon className="h-3.5 w-3.5 text-[#6B908D]" />
            </a>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#17383C]/8 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <a
            href="/contact"
            onClick={onClose}
            style={{ color: "#ffffff" }}
            className="flex min-h-14 items-center justify-between bg-[#17383C] px-5 text-sm font-black !text-white visited:!text-white"
          >
            <span style={{ color: "#ffffff" }}>Contact us</span>
            <ArrowIcon className="h-4 w-4 text-white" />
          </a>
        </div>
      </aside>
    </>
  );
}

function MobileFooter({
  onOpenCookiePreferences,
}: {
  onOpenCookiePreferences: () => void;
}) {
  return (
    <footer className="bg-[#0D2529] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-9 text-white sm:hidden">
      <div className="mx-auto max-w-[34rem]">
        <a href="/" aria-label="Wrenford Ashby home">
          <img
            src="/graphics/logos/wa.png"
            alt="Wrenford Ashby"
            draggable={false}
            className="h-[4.9rem] w-auto max-w-[16rem] object-contain object-left"
          />
        </a>

        <p className="mt-2 max-w-[20rem] text-sm leading-6 text-white/52">
          Independent estate agents for Wickford and the surrounding South Essex
          area.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-white/12 py-6 text-sm font-bold text-white/64">
          <a href="/buy">Buy</a>
          <a href="/rent">Rent</a>
          <a href="/sell">Sell</a>
          <a href="/landlords">Landlords</a>
          <a href="/new-homes">New Homes</a>
          <a href="/about">About</a>
          <a href="/news">News</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <a href="tel:01268000000" className="flex items-center gap-3 font-black">
            <PhoneIcon className="h-4 w-4 text-[#BFD3CD]" />
            01268 000 000
          </a>
          <a
            href="mailto:hello@wrenfordashby.co.uk"
            className="flex items-center gap-3 text-white/60"
          >
            <MailIcon className="h-4 w-4 text-[#BFD3CD]" />
            hello@wrenfordashby.co.uk
          </a>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/12 pt-5 text-xs font-bold text-white/42">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms & conditions</a>
          <button
            type="button"
            onClick={onOpenCookiePreferences}
            className="inline-flex items-center gap-1.5"
          >
            <CookieIcon className="h-3.5 w-3.5" />
            Cookie settings
          </button>
          <span>© 2026 Wrenford Ashby</span>
        </div>
      </div>
    </footer>
  );
}

export default function NewHomeDevelopmentChrome({
  children,
}: {
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(true);

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(
      "wrenford-ashby-cookie-preference",
    );

    if (savedPreference) {
      setCookieNoticeOpen(false);
    }
  }, []);

  const saveCookiePreference = (preference: "all" | "essential") => {
    window.localStorage.setItem(
      "wrenford-ashby-cookie-preference",
      preference,
    );
    document.cookie = `wa_cookie_preference=${preference}; path=/; max-age=31536000; SameSite=Lax`;
    setCookieNoticeOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes newHomeDetailDrawerIn {
          from {
            transform: translate3d(100%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .new-home-detail-drawer-in {
          animation: newHomeDetailDrawerIn 300ms cubic-bezier(.22,1,.36,1) both;
        }
      `}</style>

      <MobileHeader menuOpen={menuOpen} onOpen={() => setMenuOpen(true)} />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="min-h-screen w-full max-w-full overflow-x-clip bg-[#F4F6F4] font-sans text-[#17383C] antialiased">
        <div className="hidden sm:block">
          <SiteHeader />
        </div>
        <div className="h-[5.1rem] sm:hidden" aria-hidden="true" />

        {children}

        <MobileFooter
          onOpenCookiePreferences={() => setCookieNoticeOpen(true)}
        />

        <div className="hidden sm:block">
          <SiteFooter />
        </div>
      </main>

      {cookieNoticeOpen && (
        <aside className="fixed bottom-4 left-4 right-4 z-[1050] border border-[#17383C]/14 bg-white p-4 shadow-[0_20px_60px_rgba(13,37,41,0.24)] sm:hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
                Cookie preferences
              </p>
              <p className="mt-2 text-sm leading-6 text-[#17383C]/62">
                Essential cookies keep the site working. Optional cookies help
                us understand how it is used.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCookieNoticeOpen(false)}
              aria-label="Close cookie notice"
              className="text-2xl leading-none text-[#17383C]/48"
            >
              ×
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => saveCookiePreference("all")}
              className="min-h-11 bg-[#17383C] px-3 text-sm font-black text-white"
            >
              Accept all
            </button>

            <button
              type="button"
              onClick={() => saveCookiePreference("essential")}
              className="min-h-11 border border-[#17383C]/24 px-3 text-sm font-black text-[#17383C]"
            >
              Essential only
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
