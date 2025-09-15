// app/services/[slug]/page.tsx

// import Tabs from '@/components/services/Tabs/Tabs';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';

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
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/news-list?per_page=100');
  const data: News[] = await res.json();



  return data.map(service => ({
    slug: service.slug,
  }));
}
export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`http://tivaco.borodadigital.com/wp-json/wp/v2/news-list?slug=${slug}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();
  const news = data[0];
  // const author = portfolio.acf?.portfolio_author;

  // Получаем список всех записей
  const allRes = await fetch(
    'http://tivaco.borodadigital.com/wp-json/wp/v2/news-list?per_page=100&order=asc&orderby=date',
    { cache: 'force-cache' }
  );
  const allData: News[] = await allRes.json();

  const currentIndex = allData.findIndex(item => item.slug === slug);

  const prevNews = currentIndex > 0 ? allData[currentIndex - 1] : null;
  const nextNews = currentIndex < allData.length - 1 ? allData[currentIndex + 1] : null;


  return (
    <>
      <section className={`section portfolio-section news-section light`}>
        <div className={`main-bg`}></div>
        <div className={`secondary-bg light-bg`}></div>
        <div className="page-content">

          <div className="container">
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

