// import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import NewsTabs from "../newsTabs/NewsTabs";


// interface News {
//   id: number;
//   slug: string;
//   title: {
//     rendered: string;
//   };
//   // content: {
//   //   rendered: string;
//   // };
//   acf: {
//     news_image?: string;
//     // portfolio_date?: string;
//     // portfolio_author?: {
//     //   portfolio_author_photo?: string;
//     //   portfolio_author_name?: string;
//     //   portfolio_author_position?: string;
//     // };
//   };
// }



export default async function Mainscreen() {
  // const res = await fetch(
  //   "http://tivaco.borodadigital.com/wp-json/wp/v2/news-list?per_page=100",
  //   { cache: "force-cache" }
  // );

  // const news: News[] = await res.json();

  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        <div className="w-bg">
          <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
        </div>
        <div className="container">
          <div className="services-page__inner news-page__inner">
            <Breadcrumbs />
            <div className="hero-block__title">
              <h1 className="h1">News & ARTICLES</h1>
            </div>
            <NewsTabs  />
          </div>
        </div>
      </div>
    </>
  );
}
