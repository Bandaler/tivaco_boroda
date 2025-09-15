import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PortfolioTabs from "./PortfolioTabs/PortfolioTabs";
import Image from "next/image";
// import MotionSection from "@/hooks/MotionSection";

interface Portfolio {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    portfolio_short_description?: string;
    portfolio_date?: string;
    portfolio_author?: {
      portfolio_author_photo?: string;
      portfolio_author_name?: string;
      portfolio_author_position?: string;
    };
  };
}

export default async function Mainscreen() {
  const res = await fetch(
    "http://tivaco.borodadigital.com/wp-json/wp/v2/portfolio-list?per_page=100",
    { cache: "force-cache" }
  );

  const portfolio: Portfolio[] = await res.json();

  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="container">
          <div className="services-page__inner portfolio-page__inner">
            <Breadcrumbs />
            {/* <MotionSection animation="fade-up"> */}
              <div className="hero-block__title portfolio-title">
                <h1 className="h1">Portfolio</h1>
                <Link href={'/portfolio/partners'}>
                  <span>
                    view partners
                  </span>
                  <Image src={'/next-nav.svg'} width={34} height={34} alt='img' />
                </Link>
              </div>
            {/* </MotionSection> */}
            {/* <MotionSection animation="zoom-out"> */}
              <PortfolioTabs tabs={portfolio} />
            {/* </MotionSection> */}
          </div>
        </div>
      </div>
    </>
  );
}
