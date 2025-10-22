import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PartnersSlider from "../slider/PartnersSlider";

export default async function PartnersHomepage() {
  const API_URL = process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_SECRET_URL_PAGES;
  const res = await fetch(`${API_URL}/218?_embed`, { cache: 'force-cache' });

  const pageData = await res.json();

  // предполагаем, что массив партнёров лежит в pageData.acf.partners_logos
  const partnersList = pageData.acf?.partners_logos ?? [];

  return (
    <>
      <div className="main-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content events-content partners-content">
        <div className="container">
          <Breadcrumbs current={pageData.title.rendered} />
          <PartnersSlider partnersList={partnersList} />
        </div>
      </div>
    </>
  );
}
