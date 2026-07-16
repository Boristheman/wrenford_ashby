import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import SiteFooter from "../../__components/SiteFooter";
import SiteHeader from "../../__components/SiteHeader";
import {
  NEWS_ITEMS,
  type NewsItemInput,
} from "../newsItems";

type NewsItem = NewsItemInput & {
  slug: string;
  category: string;
  date: string;
  excerpt: string;
};

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{
    category?: string | string[];
  }>;
};

const ITEMS_PER_PAGE = 8;

const newsItems: NewsItem[] = NEWS_ITEMS
  .map((item) => ({
    ...item,
    slug: makeSlug(item.title),
    category: item.category?.trim() || "News",
    date: item.date || "2026-07-14",
    excerpt: makeExcerpt(item.intro),
  }))
  .sort(
    (first, second) =>
      new Date(second.date).getTime() -
      new Date(first.date).getTime(),
  );

export function generateStaticParams() {
  const totalPages = Math.ceil(
    newsItems.length / ITEMS_PER_PAGE,
  );

  return [
    { slug: [] },
    ...newsItems.map((item) => ({
      slug: [item.slug],
    })),
    ...Array.from(
      { length: Math.max(0, totalPages - 1) },
      (_, index) => ({
        slug: ["page", String(index + 2)],
      }),
    ),
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;

  if (slug.length === 1 && slug[0] !== "page") {
    const article = newsItems.find(
      (item) => item.slug === slug[0],
    );

    if (!article) {
      return {
        title: "Article not found | Wrenford Ashby",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title: `${article.title} | Wrenford Ashby`,
      description: article.excerpt,
      alternates: {
        canonical: `/news/${article.slug}`,
      },
      openGraph: {
        type: "article",
        title: article.title,
        description: article.excerpt,
        publishedTime: article.date,
        url: `/news/${article.slug}`,
        siteName: "Wrenford Ashby",
        locale: "en_GB",
        images: [
          {
            url: article.image,
            alt: article.imageAlt || article.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: [article.image],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: "Property News and South Essex Guides | Wrenford Ashby",
    description:
      "Property advice, Wickford area guides and practical buying, selling, renting and landlord articles from Wrenford Ashby.",
    alternates: {
      canonical: "/news",
    },
    openGraph: {
      title: "Property News | Wrenford Ashby",
      description:
        "Plain-English property advice and local South Essex guides.",
      type: "website",
      url: "/news",
      siteName: "Wrenford Ashby",
      locale: "en_GB",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NewsPage({
  params,
  searchParams,
}: PageProps) {
  const [{ slug = [] }, query] = await Promise.all([
    params,
    searchParams,
  ]);

  const selectedCategory = Array.isArray(query.category)
    ? query.category[0]
    : query.category;

  if (slug.length === 0) {
    return (
      <NewsShell>
        <NewsGrid
          page={1}
          selectedCategory={selectedCategory}
        />
      </NewsShell>
    );
  }

  if (slug[0] === "page") {
    const pageNumber = Number(slug[1]);

    if (
      slug.length !== 2 ||
      !Number.isInteger(pageNumber) ||
      pageNumber < 2
    ) {
      notFound();
    }

    return (
      <NewsShell>
        <NewsGrid
          page={pageNumber}
          selectedCategory={selectedCategory}
        />
      </NewsShell>
    );
  }

  if (slug.length === 1) {
    const article = newsItems.find(
      (item) => item.slug === slug[0],
    );

    if (!article) {
      notFound();
    }

    return (
      <NewsShell>
        <ArticlePage article={article} />
      </NewsShell>
    );
  }

  return notFound();
}

function NewsGrid({
  page,
  selectedCategory,
}: {
  page: number;
  selectedCategory?: string;
}) {
  const categories = [
    "All",
    ...Array.from(
      new Set(newsItems.map((item) => item.category)),
    ).sort((first, second) =>
      first.localeCompare(second),
    ),
  ];

  const activeCategory =
    selectedCategory &&
    categories.includes(selectedCategory)
      ? selectedCategory
      : "All";

  const filteredItems =
    activeCategory === "All"
      ? newsItems
      : newsItems.filter(
          (item) => item.category === activeCategory,
        );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );

  if (page > totalPages) {
    notFound();
  }

  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredItems.slice(
    start,
    start + ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="sm:hidden">
        <nav
          aria-label="News categories"
          className="overflow-x-auto border-b border-[#17383C]/10 bg-white px-5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max min-w-full gap-7">
            {categories.map((category) => {
              const active = category === activeCategory;

              return (
                <Link
                  key={category}
                  href={categoryUrl(category)}
                  className={`relative shrink-0 py-4 text-[0.72rem] font-black uppercase tracking-[0.1em] ${
                    active
                      ? "text-[#17383C]"
                      : "text-[#17383C]/38"
                  }`}
                >
                  {category}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-[2px] bg-[#17383C] transition-transform ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        <section className="bg-[#F4F6F4] px-5 pb-12 pt-8 text-[#17383C]">
          <div className="mx-auto max-w-[34rem]">
            {visibleItems.length > 0 ? (
              <div className="grid gap-6">
                {visibleItems.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="wa-news-enter block bg-white shadow-[0_14px_36px_rgba(23,56,60,0.07)]"
                    style={{
                      animationDelay: `${Math.min(index, 7) * 55}ms`,
                    }}
                  >
                    <article>
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#DDE8E4]">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          loading={index < 2 ? "eager" : "lazy"}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute left-0 top-0 bg-[#17383C] px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.12em] !text-white">
                          {item.category}
                        </span>
                      </div>

                      <div className="border border-t-0 border-[#17383C]/10 p-5">
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#6B908D]">
                          <time dateTime={item.date}>
                            {formatDate(item.date)}
                          </time>
                          {" · "}
                          {readingTime(item)}
                        </p>

                        <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em]">
                          {item.title}
                        </h2>

                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#17383C]">
                          Read article
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-[#17383C]/12 bg-white px-5 py-14 text-center">
                <h2 className="text-3xl font-black">
                  No articles in this category yet.
                </h2>
              </div>
            )}

            {filteredItems.length > ITEMS_PER_PAGE && (
              <MobileNewsPagination
                page={page}
                totalPages={totalPages}
                category={activeCategory}
                itemCount={filteredItems.length}
              />
            )}
          </div>
        </section>

        <MobileBottomCta />
      </div>

      <div className="hidden sm:block">
        <>
      <section className="bg-[#F4F6F4] px-5 pb-16 pt-0 text-[#17383C] sm:px-8 sm:pb-20 sm:pt-0 lg:px-12">
        <div className="mx-auto w-full max-w-[1480px]">
          <nav
            aria-label="News categories"
            className="wa-news-enter max-w-full overflow-x-auto border-b border-[#17383C]/14 pt-5 sm:pt-6"
            style={{ animationDelay: "80ms" }}
          >
            <div className="flex w-max min-w-full gap-8 sm:gap-10">
              {categories.map((category) => {
                const active = category === activeCategory;

                return (
                  <Link
                    key={category}
                    href={categoryUrl(category)}
                    className={`relative shrink-0 pb-4 text-sm font-black transition ${
                      active
                        ? "text-[#17383C]"
                        : "text-[#17383C]/38 hover:text-[#17383C]"
                    }`}
                  >
                    {category}

                    <span
                      className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#17383C] transition-transform ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {visibleItems.length > 0 ? (
            <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleItems.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="wa-news-enter group block min-w-0 border-b border-[#17383C]/12 pb-7"
                  style={{
                    animationDelay: `${140 + Math.min(index, 7) * 65}ms`,
                  }}
                >
                  <article>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#DDE8E4]">
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        loading={index < 4 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                      />

                      <span className="absolute left-0 top-0 bg-[#17383C] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] !text-white">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.12em] text-[#6B908D]">
                      <time dateTime={item.date}>
                        {formatDate(item.date)}
                      </time>
                      {" · "}
                      {readingTime(item)}
                    </p>

                    <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.035em] transition group-hover:text-[#2D5B5D]">
                      {item.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#17383C]/55">
                      {item.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-[#17383C]/12 bg-white px-6 py-20 text-center">
              <h2 className="text-3xl font-black">
                No articles in this category yet.
              </h2>
              <p className="mt-3 text-sm text-[#17383C]/55">
                Add another object to newsItems.ts and it will appear automatically.
              </p>
            </div>
          )}

          {filteredItems.length > ITEMS_PER_PAGE && (
            <Pagination
              page={page}
              totalPages={totalPages}
              category={activeCategory}
            />
          )}
        </div>
      </section>

      <BottomCta />
    </>
      </div>
    </>
  );
}

function ArticlePage({
  article,
}: {
  article: NewsItem;
}) {
  const related = newsItems
    .filter(
      (item) =>
        item.slug !== article.slug &&
        item.category === article.category,
    )
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image: [article.image],
    mainEntityOfPage: `/news/${article.slug}`,
    author: {
      "@type": "Organization",
      name: "Wrenford Ashby",
    },
    publisher: {
      "@type": "Organization",
      name: "Wrenford Ashby",
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: "/news",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `/news/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <div className="sm:hidden">
        <article className="bg-white text-[#17383C]">
          <header className="bg-[#17383C] px-5 pb-9 pt-11 !text-white">
            <div className="mx-auto max-w-[34rem]">
              <Link
                href="/news"
                className="wa-mobile-news-first inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] !text-[#BFD3CD]"
              >
                <span aria-hidden="true">←</span>
                Back to News
              </Link>

              <div className="wa-mobile-news-second mt-7 flex flex-wrap items-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.13em]">
                <span className="bg-[#BFD3CD] px-3 py-2 !text-[#17383C]">
                  {article.category}
                </span>

                <time dateTime={article.date} className="!text-white/58">
                  {formatDate(article.date)}
                </time>

                <span className="!text-white/28">•</span>
                <span className="!text-white/58">
                  {readingTime(article)}
                </span>
              </div>

              <h1 className="wa-mobile-news-third mt-5 break-words text-[clamp(2.7rem,12vw,4rem)] font-black leading-[0.98] tracking-[-0.05em] !text-white">
                {article.title}
              </h1>

              <p className="wa-mobile-news-fourth mt-5 text-base font-semibold leading-8 !text-white/74">
                {article.intro}
              </p>
            </div>
          </header>

          <figure className="aspect-[16/9] overflow-hidden bg-[#DDE8E4]">
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              className="h-full w-full object-cover"
            />
          </figure>

          <div className="mx-auto max-w-[34rem] px-5 py-10">
            <div className="space-y-12">
              {article.sections.map((section, sectionIndex) => (
                <div
                  key={`${section.heading}-${sectionIndex}`}
                  className="wa-news-enter"
                  style={{
                    animationDelay: `${Math.min(sectionIndex, 7) * 65}ms`,
                  }}
                >
                  <section
                    id={`mobile-${makeSlug(section.heading)}`}
                    className="scroll-mt-[5.5rem]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#17383C] text-xs font-black !text-white">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <p className="text-[0.66rem] font-black uppercase tracking-[0.17em] text-[#6B908D]">
                          Section {sectionIndex + 1}
                        </p>

                        <h2 className="mt-2 text-[2rem] font-black leading-[1.02] tracking-[-0.04em]">
                          {section.heading}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-6 space-y-5">
                      {section.paragraphs.map(
                        (paragraph, paragraphIndex) => (
                          <p
                            key={`${section.heading}-mobile-paragraph-${paragraphIndex}`}
                            className="text-base font-semibold leading-8 text-[#17383C]/64"
                          >
                            {paragraph}
                          </p>
                        ),
                      )}
                    </div>

                    {section.image && (
                      <figure className="mt-7 aspect-[16/9] overflow-hidden bg-[#DDE8E4]">
                        <img
                          src={section.image}
                          alt={
                            section.imageAlt ||
                            `${article.title}: ${section.heading}`
                          }
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </figure>
                    )}

                    {section.bullets && section.bullets.length > 0 && (
                      <div className="mt-7 border-l-4 border-[#17383C] bg-[#EAF0ED] px-5 py-6">
                        <p className="text-[0.66rem] font-black uppercase tracking-[0.17em] text-[#6B908D]">
                          Key points
                        </p>

                        <ul className="mt-5 space-y-4">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-base font-semibold leading-7 text-[#17383C]/72"
                            >
                              <span className="mt-[0.65rem] h-2 w-2 shrink-0 bg-[#17383C]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.tip && (
                      <div className="mt-7 border border-[#17383C]/12 bg-white px-5 py-5 shadow-[0_14px_40px_rgba(23,56,60,0.08)]">
                        <p className="text-[0.66rem] font-black uppercase tracking-[0.17em] text-[#6B908D]">
                          Wrenford Ashby note
                        </p>

                        <p className="mt-3 text-base font-semibold leading-7 text-[#17383C]/72">
                          {section.tip}
                        </p>
                      </div>
                    )}
                  </section>
                </div>
              ))}
            </div>

            {article.conclusion && (
              <section className="wa-news-enter mt-12 bg-[#17383C] px-6 py-8 !text-white">
                <p className="text-[0.66rem] font-black uppercase tracking-[0.17em] !text-[#BFD3CD]">
                  Final word
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] !text-white">
                  What to remember
                </h2>

                <p className="mt-4 text-base font-semibold leading-8 !text-white/76">
                  {article.conclusion}
                </p>
              </section>
            )}

            <div className="mt-10 border-t border-[#17383C]/10 pt-6">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.13em] text-[#17383C]/38">
                Published by Wrenford Ashby
              </p>
            </div>
          </div>
        </article>

        <MobileBottomCta />
      </div>

      <div className="hidden sm:block">
        <>
      <article className="bg-white px-5 pb-16 pt-12 text-[#17383C] sm:px-8 sm:pb-20 sm:pt-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1480px]">
          <nav
            aria-label="Breadcrumb"
            className="wa-news-enter flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#17383C]/40"
          >
            <Link href="/" className="transition hover:text-[#17383C]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/news" className="transition hover:text-[#17383C]">
              News
            </Link>
            <span aria-hidden="true">/</span>
            <span className="max-w-[44ch] truncate text-[#17383C]/65">
              {article.title}
            </span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <header className="wa-news-enter min-w-0" style={{ animationDelay: "60ms" }}>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.13em]">
                <span className="bg-[#17383C] px-3 py-2 !text-white">
                  {article.category}
                </span>
                <time
                  dateTime={article.date}
                  className="text-[#17383C]/42"
                >
                  {formatDate(article.date)}
                </time>
                <span className="text-[#17383C]/20">•</span>
                <span className="text-[#17383C]/42">
                  {readingTime(article)}
                </span>
              </div>

              <h1 className="mt-7 max-w-5xl text-[clamp(3rem,6vw,6.25rem)] font-black leading-[0.94] tracking-[-0.055em]">
                {article.title}
              </h1>

              <p className="mt-7 max-w-4xl text-lg leading-8 text-[#17383C]/60 sm:text-xl sm:leading-9">
                {article.intro}
              </p>
            </header>

            <aside
              className="wa-news-enter border-t-4 border-[#17383C] bg-[#EAF0ED] p-7"
              style={{ animationDelay: "120ms" }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6B908D]">
                In this article
              </p>

              <nav className="mt-6 space-y-5">
                {article.sections.map((section, index) => (
                  <a
                    key={`${section.heading}-nav-${index}`}
                    href={`#${makeSlug(section.heading)}`}
                    className="group flex items-start gap-4 text-sm font-bold leading-6 text-[#17383C]/52 transition hover:text-[#17383C]"
                  >
                    <span className="shrink-0 text-[10px] font-black text-[#6B908D]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.heading}</span>
                  </a>
                ))}
              </nav>
            </aside>
          </div>

          <figure
            className="wa-news-enter mt-12 overflow-hidden bg-[#DDE8E4]"
            style={{ animationDelay: "180ms" }}
          >
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </figure>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="space-y-16">
              {article.sections.map((section, index) => (
                <section
                  key={`${section.heading}-${index}`}
                  id={makeSlug(section.heading)}
                  className="scroll-mt-32"
                >
                  <div className="flex items-start gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#17383C] text-xs font-black !text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6B908D]">
                        Section {index + 1}
                      </p>
                      <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
                        {section.heading}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-7 space-y-6">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${section.heading}-paragraph-${paragraphIndex}`}
                        className="text-lg leading-8 text-[#17383C]/66 sm:text-[1.15rem] sm:leading-9"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.image && (
                    <figure className="mt-9 overflow-hidden bg-[#DDE8E4]">
                      <img
                        src={section.image}
                        alt={
                          section.imageAlt ||
                          `${article.title}: ${section.heading}`
                        }
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </figure>
                  )}

                  {section.bullets && section.bullets.length > 0 && (
                    <div className="mt-9 border-l-4 border-[#17383C] bg-[#EAF0ED] px-6 py-7 sm:px-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6B908D]">
                        Key points
                      </p>

                      <ul className="mt-5 space-y-4 text-base leading-7 text-[#17383C]/72">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-4"
                          >
                            <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 bg-[#17383C]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.tip && (
                    <div className="mt-9 border border-[#17383C]/14 bg-white px-6 py-6 shadow-[0_16px_42px_rgba(23,56,60,0.07)] sm:px-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6B908D]">
                        Wrenford Ashby note
                      </p>
                      <p className="mt-3 text-base font-semibold leading-7 text-[#17383C]/72">
                        {section.tip}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {article.conclusion && (
              <section className="mt-16 bg-[#17383C] px-7 py-9 !text-white sm:px-10 sm:py-11">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#BFD3CD]">
                  Final word
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] !text-white sm:text-4xl">
                  What to remember
                </h2>
                <p className="mt-5 text-lg leading-8 !text-white/75">
                  {article.conclusion}
                </p>
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-16 border-t border-[#17383C]/12 pt-10">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6B908D]">
                  Continue reading
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Related {article.category.toLowerCase()} guides
                </h2>

                <div className="mt-7 grid gap-5 md:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="group border-t border-[#17383C]/18 py-5"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#6B908D]">
                        {formatDate(item.date)}
                      </p>
                      <h3 className="mt-3 text-xl font-black leading-tight tracking-[-0.03em] transition group-hover:text-[#2D5B5D]">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-12 border-t border-[#17383C]/12 pt-7">
              <p className="text-xs font-black uppercase tracking-[0.13em] text-[#17383C]/38">
                Published by Wrenford Ashby
              </p>
            </div>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
          }}
        />
      </article>

      <BottomCta />
    </>
      </div>
    </>
  );
}


const NEWS_MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "New Homes", href: "/new-homes" },
  { label: "Landlords", href: "/landlords" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

function NewsChromeArrowIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
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

function NewsChromePhoneIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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

function NewsChromeMailIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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

function NewsChromeCookieIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
    >
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

function NewsHomepageMobileHeader() {
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
            <NewsChromePhoneIcon className="h-4 w-4" />
            <span className="hidden min-[390px]:inline">
              01268 000 000
            </span>
          </a>

          <label
            htmlFor="wa-news-mobile-menu"
            aria-label="Open navigation"
            className="flex h-11 w-10 cursor-pointer items-center justify-end"
          >
            <span className="relative block h-[18px] w-7">
              <span className="absolute left-0 top-0 h-[2px] w-7 bg-current" />
              <span className="absolute left-0 top-2 h-[2px] w-7 bg-current" />
              <span className="absolute left-0 top-4 h-[2px] w-7 bg-current" />
            </span>
          </label>
        </div>
      </div>
    </header>
  );
}

function NewsHomepageMobileDrawer() {
  return (
    <>
      <label
        htmlFor="wa-news-mobile-menu"
        aria-label="Close navigation overlay"
        className="pointer-events-none fixed inset-0 z-[1090] cursor-pointer bg-[#061719]/62 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 peer-checked:pointer-events-auto peer-checked:opacity-100 sm:hidden"
      />

      <aside className="fixed bottom-0 right-0 top-0 z-[1100] flex w-[min(82vw,22rem)] max-w-full translate-x-full flex-col overflow-hidden bg-white text-[#17383C] shadow-[-24px_0_64px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] peer-checked:translate-x-0 sm:hidden">
        <div className="flex min-h-[5rem] shrink-0 items-center justify-between border-b border-[#17383C]/8 px-5 pt-[env(safe-area-inset-top)]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B908D]">
            Navigation
          </p>

          <label
            htmlFor="wa-news-mobile-menu"
            className="flex h-11 w-11 cursor-pointer items-center justify-end text-[#17383C]"
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
          </label>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto px-5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Mobile navigation"
        >
          {NEWS_MOBILE_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex min-h-[3.45rem] items-center justify-between gap-4 border-b border-[#17383C]/8 text-[0.98rem] font-bold tracking-[-0.012em] transition active:opacity-50"
            >
              <span>{item.label}</span>
              <NewsChromeArrowIcon className="h-3.5 w-3.5 text-[#6B908D] transition-transform group-active:translate-x-0.5" />
            </a>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#17383C]/8 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <a
            href="/contact"
            style={{ color: "#ffffff" }}
            className="group flex min-h-14 w-full items-center justify-between bg-[#17383C] px-5 text-sm font-black !text-white visited:!text-white active:bg-[#2D5B5D]"
          >
            <span style={{ color: "#ffffff" }} className="!text-white">
              Contact us
            </span>

            <span
              style={{ color: "#ffffff" }}
              className="flex h-8 w-8 items-center justify-center !text-white"
            >
              <NewsChromeArrowIcon className="h-4 w-4" />
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}

function NewsHomepageMobileFooter() {
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
          <a
            href="tel:01268000000"
            className="flex items-center gap-3 font-black text-white"
          >
            <NewsChromePhoneIcon className="h-4 w-4 text-[#BFD3CD]" />
            01268 000 000
          </a>

          <a
            href="mailto:hello@wrenfordashby.co.uk"
            className="flex items-center gap-3 text-white/60"
          >
            <NewsChromeMailIcon className="h-4 w-4 text-[#BFD3CD]" />
            hello@wrenfordashby.co.uk
          </a>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/12 pt-5 text-xs font-bold text-white/42">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms & conditions</a>

          <label
            htmlFor="wa-news-cookie-settings"
            className="inline-flex cursor-pointer items-center gap-1.5 text-left transition hover:text-white"
          >
            <NewsChromeCookieIcon className="h-3.5 w-3.5" />
            Cookie settings
          </label>

          <span>© 2026 Wrenford Ashby</span>
        </div>
      </div>
    </footer>
  );
}

function NewsHomepageCookiePanel() {
  return (
    <aside className="wa-news-cookie-panel pointer-events-none fixed bottom-4 left-4 right-4 z-[1200] translate-y-4 border border-[#17383C]/14 bg-white p-4 opacity-0 shadow-[0_20px_60px_rgba(13,37,41,0.24)] transition duration-300 sm:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
            Cookie preferences
          </p>

          <p className="mt-2 text-sm leading-6 text-[#17383C]/62">
            Essential cookies keep the site working. Optional cookies help us
            understand how it is used.
          </p>
        </div>

        <label
          htmlFor="wa-news-cookie-settings"
          aria-label="Close cookie preferences"
          className="cursor-pointer text-2xl leading-none text-[#17383C]/48"
        >
          ×
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <label
          htmlFor="wa-news-cookie-settings"
          className="flex min-h-11 cursor-pointer items-center justify-center bg-[#17383C] px-3 text-sm font-black text-white"
        >
          Accept all
        </label>

        <label
          htmlFor="wa-news-cookie-settings"
          className="flex min-h-11 cursor-pointer items-center justify-center border border-[#17383C]/24 px-3 text-sm font-black text-[#17383C]"
        >
          Essential only
        </label>
      </div>
    </aside>
  );
}

function NewsShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <input
        id="wa-news-mobile-menu"
        type="checkbox"
        className="peer sr-only sm:hidden"
        aria-hidden="true"
      />

      <input
        id="wa-news-cookie-settings"
        type="checkbox"
        className="sr-only sm:hidden"
        aria-hidden="true"
      />

      <NewsHomepageMobileHeader />
      <NewsHomepageMobileDrawer />

      <main className="min-h-screen w-full overflow-x-clip bg-[#F4F6F4] font-sans text-[#17383C] antialiased selection:bg-[#BFD3CD] selection:text-[#17383C]">
        <div
          className="h-[5.1rem] bg-white sm:hidden"
          aria-hidden="true"
        />

        <div className="sticky top-0 z-[1000] hidden w-full bg-white sm:block">
          <SiteHeader />
        </div>

        {children}

        <NewsHomepageMobileFooter />

        <div className="hidden sm:block">
          <SiteFooter />
        </div>

        <style>{`
          @keyframes waNewsRise {
            from {
              opacity: 0;
              transform: translate3d(0, 16px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .wa-news-enter {
            opacity: 0;
            animation: waNewsRise 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          body:has(#wa-news-mobile-menu:checked) {
            overflow: hidden;
          }

          #wa-news-cookie-settings:checked
            ~ .wa-news-cookie-panel {
            pointer-events: auto;
            opacity: 1;
            transform: translateY(0);
          }

          @media (prefers-reduced-motion: reduce) {
            .wa-news-enter {
              opacity: 1;
              transform: none;
              animation: none;
            }
          }
        `}</style>
      </main>

      <NewsHomepageCookiePanel />
    </>
  );
}


function MobileNewsPagination({
  page,
  totalPages,
  category,
  itemCount,
}: {
  page: number;
  totalPages: number;
  category: string;
  itemCount: number;
}) {
  const pages = makePagination(page, totalPages);
  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);
  const firstVisibleItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const lastVisibleItem = Math.min(
    page * ITEMS_PER_PAGE,
    itemCount,
  );

  return (
    <nav
      aria-label="News pagination"
      className="mt-10 border-t border-[#17383C]/14 pt-7"
    >
      <p className="text-center text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#17383C]/42">
        Showing {firstVisibleItem}–{lastVisibleItem} of {itemCount} articles
      </p>

      <div className="mt-5 flex items-center justify-center">
        {page === 1 ? (
          <span className="flex h-11 min-w-10 items-center justify-center border border-[#17383C]/12 bg-white px-2 text-sm font-black text-[#17383C]/20">
            ‹
          </span>
        ) : (
          <Link
            href={pageUrl(previousPage, category)}
            aria-label="Previous news page"
            className="flex h-11 min-w-10 items-center justify-center border border-[#17383C]/12 bg-white px-2 text-sm font-black text-[#17383C]"
          >
            ‹
          </Link>
        )}

        {pages.map((value, index) =>
          value === "…" ? (
            <span
              key={`mobile-dots-${index}`}
              className="flex h-11 min-w-8 items-center justify-center border-y border-r border-[#17383C]/12 bg-white px-1 text-sm font-black text-[#17383C]/38"
            >
              …
            </span>
          ) : (
            <Link
              key={value}
              href={pageUrl(value, category)}
              aria-current={value === page ? "page" : undefined}
              className={`flex h-11 min-w-10 items-center justify-center border-y border-r border-[#17383C]/12 px-2 text-sm font-black ${
                value === page
                  ? "bg-[#17383C] !text-white"
                  : "bg-white text-[#17383C]"
              }`}
            >
              {value}
            </Link>
          ),
        )}

        {page === totalPages ? (
          <span className="flex h-11 min-w-10 items-center justify-center border-y border-r border-[#17383C]/12 bg-white px-2 text-sm font-black text-[#17383C]/20">
            ›
          </span>
        ) : (
          <Link
            href={pageUrl(nextPage, category)}
            aria-label="Next news page"
            className="flex h-11 min-w-10 items-center justify-center border-y border-r border-[#17383C]/12 bg-white px-2 text-sm font-black text-[#17383C]"
          >
            ›
          </Link>
        )}
      </div>

      <p className="mt-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#17383C]/34">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}

function MobileBottomCta() {
  return (
    <section className="bg-[#BFD3CD] px-5 py-10 text-[#17383C] sm:hidden">
      <div className="mx-auto max-w-[34rem]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#17383C]/52">
          Thinking about moving?
        </p>

        <h2 className="mt-3 text-[2.55rem] font-black leading-[0.98] tracking-[-0.045em]">
          Start with a straightforward local conversation.
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href="/sell#book-valuation"
            className="flex min-h-12 items-center justify-center bg-[#17383C] px-4 text-center text-sm font-black !text-white"
          >
            Book valuation
          </Link>

          <Link
            href="/contact"
            className="flex min-h-12 items-center justify-center border border-[#17383C] px-4 text-center text-sm font-black text-[#17383C]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="w-full overflow-hidden border-y border-[#17383C]/10 bg-[#BFD3CD] px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1480px] min-w-0 gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#17383C]/58">
            Thinking about moving?
          </p>
          <h2 className="mt-2 max-w-[760px] text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
            Start with a straightforward local conversation.
          </h2>
        </div>

        <div className="flex min-w-0 flex-wrap gap-3 md:justify-end">
          <Link
            href="/sell#book-valuation"
            className="inline-flex min-h-12 min-w-[178px] items-center justify-center border border-[#17383C] bg-[#17383C] px-6 text-sm font-black !text-white no-underline transition hover:bg-[#2D5B5D]"
          >
            <span className="whitespace-nowrap !text-white" style={{ color: "#ffffff" }}>
              Book a valuation
            </span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex min-h-12 min-w-[178px] items-center justify-center border border-[#17383C] bg-transparent px-6 text-sm font-black !text-[#17383C] no-underline transition hover:bg-white"
          >
            <span className="whitespace-nowrap !text-[#17383C]" style={{ color: "#17383C" }}>
              Contact the team
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Pagination({
  page,
  totalPages,
  category,
}: {
  page: number;
  totalPages: number;
  category: string;
}) {
  const pages = makePagination(page, totalPages);

  return (
    <nav
      aria-label="News pagination"
      className="mt-14 flex max-w-full flex-wrap justify-center gap-0"
    >
      <PageLink
        label="←"
        page={Math.max(1, page - 1)}
        category={category}
        disabled={page === 1}
        edge="left"
      />

      {pages.map((value, index) =>
        value === "…" ? (
          <span
            key={`dots-${index}`}
            className="flex h-12 min-w-12 items-center justify-center border border-l-0 border-[#17383C]/14 bg-white text-[#17383C]/38"
          >
            …
          </span>
        ) : (
          <PageLink
            key={value}
            label={String(value)}
            page={value}
            category={category}
            active={value === page}
          />
        ),
      )}

      <PageLink
        label="→"
        page={Math.min(totalPages, page + 1)}
        category={category}
        disabled={page === totalPages}
      />
    </nav>
  );
}

function PageLink({
  label,
  page,
  category,
  active = false,
  disabled = false,
  edge,
}: {
  label: string;
  page: number;
  category: string;
  active?: boolean;
  disabled?: boolean;
  edge?: "left";
}) {
  return (
    <Link
      href={pageUrl(page, category)}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={`flex h-12 min-w-12 items-center justify-center border border-[#17383C]/14 px-4 text-sm font-black no-underline transition ${
        edge === "left" ? "" : "border-l-0"
      } ${
        active
          ? "bg-[#17383C] !text-white"
          : disabled
            ? "pointer-events-none bg-white text-[#17383C]/20"
            : "bg-white !text-[#17383C] hover:bg-[#EAF0ED]"
      }`}
    >
      <span
        className={active ? "!text-white" : ""}
        style={active ? { color: "#ffffff" } : undefined}
      >
        {label}
      </span>
    </Link>
  );
}

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeExcerpt(text: string): string {
  const plain = text.replace(/\s+/g, " ").trim();

  return plain.length > 170
    ? `${plain.slice(0, 170).trim()}…`
    : plain;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function readingTime(article: NewsItemInput): string {
  const words = [
    article.intro,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets || []),
      section.tip || "",
    ]),
    article.conclusion || "",
  ]
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function categoryUrl(category: string): string {
  return category === "All"
    ? "/news"
    : `/news?category=${encodeURIComponent(category)}`;
}

function pageUrl(
  page: number,
  category: string,
): string {
  const base =
    page <= 1 ? "/news" : `/news/page/${page}`;

  return category === "All"
    ? base
    : `${base}?category=${encodeURIComponent(category)}`;
}

function makePagination(
  current: number,
  total: number,
): Array<number | "…"> {
  if (total <= 9) {
    return Array.from(
      { length: total },
      (_, index) => index + 1,
    );
  }

  const numbers = Array.from(
    new Set([
      1,
      2,
      current - 2,
      current - 1,
      current,
      current + 1,
      current + 2,
      total - 1,
      total,
    ]),
  )
    .filter((value) => value >= 1 && value <= total)
    .sort((first, second) => first - second);

  const result: Array<number | "…"> = [];

  numbers.forEach((value, index) => {
    const previous = numbers[index - 1];

    if (previous && value - previous > 1) {
      result.push("…");
    }

    result.push(value);
  });

  return result;
}
