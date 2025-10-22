// app/services/[slug]/page.tsx

// import Tabs from '@/components/services/Tabs/Tabs';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface News {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    // portfolio_author?: {
    //   portfolio_author_photo: string;
    //   portfolio_author_name: string;
    //   portfolio_author_position: string;
    // }
    news_image: string;
    news_descr_preview: string;

  };
}

export async function generateStaticParams() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_NEWS;
  const res = await fetch(`${API_URL}?per_page=100`);
  const data: News[] = await res.json();



  return data.map(service => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_NEWS;
  const { slug } = await params;

  const res = await fetch(
    `${API_URL}?slug=${slug}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return { title: "Team | Tivaco" };

  const data: News[] = await res.json();
  const news = data[0];

  if (!news) return { title: "Team not found | Tivaco" };

  return {
    title: `${news.title.rendered} | Tivaco`,
    description: news.content.rendered || "Event page",
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_NEWS;
  const { slug } = await params;

  const res = await fetch(`${API_URL}?slug=${slug}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();
  const news = data[0];

    if (!news) return notFound();
  // const author = portfolio.acf?.portfolio_author;

  // Получаем список всех записей
  const allRes = await fetch(
    `${API_URL}?per_page=100&order=asc&orderby=date`,
    { cache: 'force-cache' }
  );
  const allData: News[] = await allRes.json();

  const currentIndex = allData.findIndex(item => item.slug === slug);

  const prevNews = currentIndex > 0 ? allData[currentIndex - 1] : null;
  const nextNews = currentIndex < allData.length - 1 ? allData[currentIndex + 1] : null;


  return (
    <>
      <section className={`section portfolio-section news-section light`}>
        <div className={`main-bg white`}></div>
        <div className={`secondary-bg light-bg`}></div>
        <div className="page-content">

          <div className="container padding-0">
            <div className="single-service__inner portfolio-page__inner news-page__inner detail-page-news">
              <Breadcrumbs current={news.title.rendered} />
              <div className="news-page__content">
                <div className="hero-block__title">
                  <h1 className={`h1`} dangerouslySetInnerHTML={{ __html: news.title.rendered }} />
                </div>
                <div className={`news-description__area`} dangerouslySetInnerHTML={{ __html: news.content.rendered }} />
              </div>
            </div>
            <div className="news-pagination">
              {prevNews && (
                <Link href={`/news-articles/${prevNews.slug}`}>
                  <Image src={'/prev-nav.svg'} width={34} height={34} alt='img' />
                  <span>
                    Previous article
                  </span>
                </Link>
              )}
              {nextNews && (
                <Link href={`/news-articles/${nextNews.slug}`}>
                  <span>
                    Next article
                  </span>
                  <Image src={'/next-nav.svg'} width={34} height={34} alt='img' />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

