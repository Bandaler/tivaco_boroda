
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import NewsTabs from "../newsTabs/NewsTabs";




export default async function Mainscreen() {


  return (
    <>
      <div className="main-bg white"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        {/* <div className="w-bg">
          <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
        </div> */}
        <div className="container padding-0">
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
