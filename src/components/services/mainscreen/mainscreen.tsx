// app/services/page.tsx

import Link from "next/link";
// import Image from "next/image";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Marquee from "../marquee/Marquee";
// import MotionSection from "@/hooks/MotionSection";

interface Service {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
}

export default async function Mainscreen() {
  const API_URL = process.env.API_SECRET_URL_SERVICES;
  const res = await fetch(
    `${API_URL}?per_page=100&orderby=date&order=asc`,
    { cache: "force-cache" }
  );

  const services: Service[] = await res.json();

  return (
    <>
      <div className="main-bg white"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">

        {/* <div className="w-bg">
          <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
        </div> */}
        <div className="container padding-0">
          <div className="services-page__inner">
            <Breadcrumbs />
            <div className="hero-block__title">
              <h1 className="h1">OUR SERVICES</h1>
            </div>
            {/* <MotionSection animation="zoom-out"> */}
              <ul className="services-list">
                {services.map((service) => (
                  <li key={service.id} className="service-item">
                    <Link href={`/services/${service.slug}`}>
                      <span
                        dangerouslySetInnerHTML={{ __html: service.title.rendered }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            {/* </MotionSection> */}

          </div>
        </div>
        <Marquee />
      </div>
    </>
  );
}
