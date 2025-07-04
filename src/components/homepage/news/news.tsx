import Image from "next/image";
import Link from "next/link";


export default async function NewsScreen() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/news-list?per_page=3', {
    cache: 'no-store',
  });
  const newsItems = await res.json();

  return (
    <>
      <div className="main-bg dark"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        <div className="w-bg">
          <Image src={'/w-bg.png'} width={4000} height={4000} alt="bg" />
        </div>
        <div className="container">
          <div className="news-block">
            <div className="news-block__head">
              <div className="news-blok__title">
                News & ARTICLES
              </div>
              <Link href={'/news-articles'} className="all-news">
                Read more
              </Link>
            </div>
            <div className='news-items'>
              {newsItems.map((item: any) => (
                <div key={item.id} className="news-item">
                  <div className="news-item__image">
                    <Image
                      src={item.acf.news_image}
                      width={390}
                      height={240}
                      alt={item.title.rendered}
                    />
                  </div>
                  <div className="news-item__body">
                    <div className="news-item__name">
                      {item.title.rendered}
                    </div>
                    <div className="news-item__description">
                      {item.acf.news_descr_preview}
                    </div>
                  </div>
                  <Link href={item.link} className="read-more">
                    <span>
                      read more
                    </span>
                      <Image src={'/news-arr.svg'} width={34} height={34} alt="img" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
