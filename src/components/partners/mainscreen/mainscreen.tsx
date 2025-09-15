import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PartnersSlider from "../slider/PartnersSlider";

export default async function PartnersHomepage() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/218?_embed', { cache: 'force-cache' });

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
