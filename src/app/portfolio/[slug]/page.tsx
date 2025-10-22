// // app/services/[slug]/page.tsx

// // import Tabs from '@/components/services/Tabs/Tabs';
// import Image from 'next/image';
// import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
// import Link from 'next/link';

// interface Portfolio {
//   id: number;
//   slug: string;
//   title: { rendered: string };
//   content: { rendered: string };
//   acf?: {
//     portfolio_author?: {
//       portfolio_author_photo: string;
//       portfolio_author_name: string;
//       portfolio_author_position: string;
//     }
//     portfolio_image: string;
//     portfolio_short_description: string;

//   };
// }

// export async function generateStaticParams() {
//   const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/portfolio-list?per_page=100');
//   const data: Portfolio[] = await res.json();



//   return data.map(service => ({
//     slug: service.slug,
//   }));
// }
// export default async function PortfolioPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   const res = await fetch(`http://tivaco.borodadigital.com/wp-json/wp/v2/portfolio-list?slug=${slug}`, {
//     cache: 'force-cache',
//   });

//   if (!res.ok) throw new Error('Failed to fetch');

//   const data = await res.json();
//   const portfolio = data[0];
//   const author = portfolio.acf?.portfolio_author;

//   // Получаем список всех записей
//   const allRes = await fetch(
//     'http://tivaco.borodadigital.com/wp-json/wp/v2/portfolio-list?per_page=100&order=asc&orderby=date',
//     { cache: 'force-cache' }
//   );
//   const allData: Portfolio[] = await allRes.json();

//   const currentIndex = allData.findIndex(item => item.slug === slug);

//   const prevPortfolio = currentIndex > 0 ? allData[currentIndex - 1] : null;
//   const nextPortfolio = currentIndex < allData.length - 1 ? allData[currentIndex + 1] : null;


//   return (
//     <>
//       <section className={`section portfolio-section`}>
//         <div className={`main-bg`}></div>
//         <div className={`secondary-bg`}></div>
//         <div className="page-content">

//           <div className="container">
//             <div className="single-service__inner portfolio-page__inner">
//               <Breadcrumbs current={portfolio.title.rendered} />
//               <div className="portfolio-page__content">
//                 <div className="hero-block__title">
//                   <h1 className={`h1`} dangerouslySetInnerHTML={{ __html: portfolio.title.rendered }} />
//                 </div>
//                 <div className="portfolio-short__description">
//                   {portfolio.acf?.portfolio_short_description}
//                 </div>
//                 <div className="portfolio-detail__image">
//                   <Image src={portfolio.acf?.portfolio_image} width={980} height={493} alt='img' />
//                 </div>
//                 <div className={`portfolio-description__area`} dangerouslySetInnerHTML={{ __html: portfolio.content.rendered }} />
//                 <div className="portfolio-author">
//                   <h2 className="h2">
//                     Worked on the project
//                   </h2>
//                   <div className="portfolio-author__item">
//                     <div className="portfolio-author__avatar">
//                       <Image src={author.portfolio_author_photo} width={98} height={98} alt='img' />

//                     </div>
//                     <div className="portfolio-author__info">
//                       <div className="portfolio-author__name">
//                         {author.portfolio_author_name}
//                       </div>
//                       <div className="portfolio-author__position">
//                         {author.portfolio_author_position}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="portfolio-pagination">
//               {prevPortfolio && (
//                 <Link href={`/portfolio/${prevPortfolio.slug}`}>
//                   <Image src={'/prev-nav.svg'} width={34} height={34} alt='img' />
//                   <span>
//                     Previous case
//                   </span>
//                 </Link>
//               )}
//               {nextPortfolio && (
//                 <Link href={`/portfolio/${nextPortfolio.slug}`}>
//                   <span>
//                     Next case
//                   </span>
//                   <Image src={'/next-nav.svg'} width={34} height={34} alt='img' />
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


// app/services/[slug]/page.tsx

import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';

interface Portfolio {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    portfolio_author?: {
      portfolio_author_photo?: string;
      portfolio_author_name?: string;
      portfolio_author_position?: string;
    };
    portfolio_image?: string;
    portfolio_short_description?: string;
  };
}

// Генерация статических путей
export async function generateStaticParams() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_PORTFOLIO;
  const res = await fetch(
    `${API_URL}?per_page=100`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return [];

  const data: Portfolio[] = await res.json();

  return data.map((service) => ({
    slug: service.slug,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_PORTFOLIO;
  const { slug } = await params;

  const res = await fetch(
    `${API_URL}?slug=${slug}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return { title: "Team | Tivaco" };

  const data: Portfolio[] = await res.json();
  const portfolio = data[0];

  if (!portfolio) return { title: "Team not found | Tivaco" };

  return {
    title: `${portfolio.title.rendered} | Tivaco`,
    description: portfolio.content.rendered || "Event page",
  };
}

export default async function PortfolioPage({
 params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_PORTFOLIO;
  const { slug } = await params;

  const res = await fetch(
    `${API_URL}?slug=${slug}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch portfolio');
  }

  const data: Portfolio[] = await res.json();
  const portfolio = data[0];

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  const author = portfolio.acf?.portfolio_author;

  // Получаем список всех записей (для пагинации)
  const allRes = await fetch(
    `${API_URL}?per_page=100&order=asc&orderby=date`,
    { cache: 'force-cache' }
  );

  const allData: Portfolio[] = await allRes.json();
  const currentIndex = allData.findIndex((item) => item.slug === slug);
  const prevPortfolio = currentIndex > 0 ? allData[currentIndex - 1] : null;
  const nextPortfolio =
    currentIndex < allData.length - 1 ? allData[currentIndex + 1] : null;

  return (
    <section className="section portfolio-section">
      <div className="main-bg white"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        <div className="container padding-0">
          <div className="single-service__inner portfolio-page__inner">
            <Breadcrumbs current={portfolio.title.rendered} />
            <div className="portfolio-page__content">
              <div className="hero-block__title portfolio-detail-content">
                <h1
                  className="h1"
                  dangerouslySetInnerHTML={{ __html: portfolio.title.rendered }}
                />
              </div>
              {portfolio.acf?.portfolio_short_description && (
                <div className="portfolio-short__description">
                  {portfolio.acf.portfolio_short_description}
                </div>
              )}
              {portfolio.acf?.portfolio_image && (
                <div className="portfolio-detail__image">
                  <Image
                    src={portfolio.acf.portfolio_image}
                    width={980}
                    height={493}
                    alt="Portfolio image"
                  />
                </div>
              )}
              <div
                className="portfolio-description__area"
                dangerouslySetInnerHTML={{
                  __html: portfolio.content.rendered || '',
                }}
              />
              {author && (
                <div className="portfolio-author">
                  <h2 className="h2">Worked on the project</h2>
                  <div className="portfolio-author__item">
                    {author.portfolio_author_photo && (
                      <div className="portfolio-author__avatar">
                        <Image
                          src={author.portfolio_author_photo}
                          width={98}
                          height={98}
                          alt={author.portfolio_author_name || 'Author'}
                        />
                      </div>
                    )}
                    <div className="portfolio-author__info">
                      {author.portfolio_author_name && (
                        <div className="portfolio-author__name">
                          {author.portfolio_author_name}
                        </div>
                      )}
                      {author.portfolio_author_position && (
                        <div className="portfolio-author__position">
                          {author.portfolio_author_position}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="portfolio-pagination">
            {prevPortfolio && (
              <Link href={`/portfolio/${prevPortfolio.slug}`}>
                <Image src="/prev-nav.svg" width={34} height={34} alt="Previous" />
                <span>Previous case</span>
              </Link>
            )}
            {nextPortfolio && (
              <Link href={`/portfolio/${nextPortfolio.slug}`}>
                <span>Next case</span>
                <Image src="/next-nav.svg" width={34} height={34} alt="Next" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

