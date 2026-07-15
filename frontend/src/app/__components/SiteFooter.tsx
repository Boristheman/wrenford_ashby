function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
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

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
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

export function SiteFooter() {
  return (
    <footer className="bg-[#0D2529] px-5 pb-5 pt-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-8 border-b border-white/12 pb-7 md:grid-cols-2 lg:grid-cols-[1.28fr_0.68fr_0.76fr_1fr] lg:gap-10">
          <div className="max-w-[430px]">
            <a
              href="/"
              aria-label="Wrenford Ashby home"
              className="inline-flex items-center"
            >
              <img
                src="/graphics/logos/wa.png"
                alt="Wrenford Ashby"
                className="h-[92px] w-auto max-w-[285px] object-contain object-left"
              />
            </a>
            <p className="mt-2 max-w-[390px] text-sm leading-6 text-white/55">
              Independent estate agents for Wickford and the surrounding South
              Essex area.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#BFD3CD]">
              Property
            </p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/60">
              <a href="/buy" className="w-fit transition hover:text-white">
                Buy
              </a>
              <a href="/rent" className="w-fit transition hover:text-white">
                Rent
              </a>
              <a href="/sell" className="w-fit transition hover:text-white">
                Sell
              </a>
              <a
                href="/landlords"
                className="w-fit transition hover:text-white"
              >
                Landlords
              </a>
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#BFD3CD]">
              Company
            </p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/60">
              <a href="/about" className="w-fit transition hover:text-white">
                About
              </a>
              <a href="/contact" className="w-fit transition hover:text-white">
                Contact
              </a>
              <a href="/privacy" className="w-fit transition hover:text-white">
                Privacy
              </a>
              <a href="/terms" className="w-fit transition hover:text-white">
                Terms &amp; conditions
              </a>
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#BFD3CD]">
              Wickford office
            </p>
            <address className="mt-4 not-italic text-sm leading-6 text-white/55">
              High Street, Wickford
              <br />
              Essex, SS12
            </address>
            <div className="mt-4 flex flex-col items-start gap-2.5 text-sm text-white/55">
              <a
                href="tel:01268000000"
                className="inline-flex items-center gap-2.5 transition hover:text-white"
              >
                <PhoneIcon className="h-4 w-4 shrink-0 text-white/45" />
                <span>01268 000 000</span>
              </a>
              <a
                href="mailto:hello@wrenfordashby.co.uk"
                className="inline-flex items-center gap-2.5 transition hover:text-white"
              >
                <MailIcon className="h-4 w-4 shrink-0 text-white/45" />
                <span>hello@wrenfordashby.co.uk</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 py-4 text-[11px] text-white/38 sm:flex-row sm:items-center">
          <p>© 2026 Wrenford Ashby Estate Agents</p>
          <p>Local sales and lettings across South Essex</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
