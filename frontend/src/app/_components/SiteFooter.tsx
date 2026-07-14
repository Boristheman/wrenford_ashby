export function SiteFooter() {
  return (
    <footer className="bg-[#0D2529] px-5 pb-7 pt-14 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-10 border-b border-white/12 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <img
              src="/graphics/logos/wa.png"
              alt="Wrenford Ashby"
              className="h-16 w-auto max-w-[250px] object-contain"
            />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              Independent estate agents serving Wickford and the
              surrounding South Essex area.
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
              Property
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/62">
              <a href="/buy">Buy</a>
              <a href="/rent">Rent</a>
              <a href="/sell">Sell</a>
              <a href="/landlords">Landlords</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
              Company
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/62">
              <a href="/about">About</a>
              <a href="/news">News</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#BFD3CD]">
              Wickford office
            </p>
            <p className="mt-5 text-sm leading-7 text-white/62">
              High Street
              <br />
              Wickford, Essex
              <br />
              SS12
            </p>
            <a
              href="mailto:hello@wrenfordashby.co.uk"
              className="mt-4 block text-sm font-bold text-white/75"
            >
              hello@wrenfordashby.co.uk
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 Wrenford Ashby Estate Agents</p>
          <p>Mock landing pages ready for content and integrations</p>
        </div>
      </div>
    </footer>
  );
}
