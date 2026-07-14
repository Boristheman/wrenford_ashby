import type { Metadata } from "next";
import { SiteFooter } from "../_components/SiteFooter";
import { SiteHeader } from "../_components/SiteHeader";

export const metadata: Metadata = {
  title: "News",
};

const articles = [
  {
    category: "Local market",
    title: "What is happening to house prices around Wickford?",
    excerpt:
      "A practical overview of asking prices, buyer demand and the homes currently moving across the local area.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=84",
  },
  {
    category: "Selling advice",
    title: "Preparing your home for photography and viewings",
    excerpt:
      "Simple changes that help rooms feel clear, welcoming and ready for a strong property launch.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=84",
  },
  {
    category: "Landlords",
    title: "A clear checklist before letting your property",
    excerpt:
      "The documents, safety checks and practical decisions to make before a new tenancy begins.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=84",
  },
  {
    category: "Buying advice",
    title: "What to ask during a property viewing",
    excerpt:
      "Useful questions about condition, running costs, location and the seller's moving position.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=84",
  },
  {
    category: "New homes",
    title: "Understanding reservations and new-build exchange dates",
    excerpt:
      "A straightforward introduction to the timing and paperwork involved in buying a new home.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=84",
  },
  {
    category: "Area guide",
    title: "Living in Rayleigh: transport, schools and local property",
    excerpt:
      "A starter area-guide mockup ready for genuine local detail, photography and current listings.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=84",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F4] text-[#17383C]">
      <SiteHeader />

      <section id="page-hero" className="relative min-h-[620px] overflow-hidden bg-[#17383C] px-5 pb-20 pt-40 text-white sm:px-8 sm:pt-44 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
            Local property news
          </p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.9] tracking-[-0.055em]">
            Useful updates, without the property jargon.
          </h1>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-22 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="group overflow-hidden border border-[#17383C]/10 bg-white shadow-[0_10px_32px_rgba(23,56,60,0.06)]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6B908D]">
                    {article.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.025em]">
                    {article.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#17383C]/62">
                    {article.excerpt}
                  </p>
                  <span className="mt-6 inline-block text-sm font-black">
                    Read article →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
