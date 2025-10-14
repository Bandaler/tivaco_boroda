// app/services/[slug]/page.tsx

import Tabs from '@/components/services/Tabs/Tabs';
// import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import MotionSection from '@/hooks/MotionSection';

interface Service {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    tabs?: {
      title: string;
      content: string;
    }[];
  };
}

interface TabPoint {
  tab_points_item: string;
}

interface ServiceTab {
  tab_name: string;
  tab_desscription?: string;
  tab_points_list?: TabPoint[];
}


export async function generateStaticParams() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/services-list?per_page=100');
  const data: Service[] = await res.json();

  return data.map(service => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `http://tivaco.borodadigital.com/wp-json/wp/v2/services-list?slug=${slug}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return { title: "Team | Tivaco" };

  const data: Service[] = await res.json();
  const service = data[0];

  if (!service) return { title: "Team not found | Tivaco" };

  return {
    title: `${service.title.rendered} | Tivaco`,
    description: service.content.rendered || "Event page",
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`http://tivaco.borodadigital.com/wp-json/wp/v2/services-list?slug=${slug}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();
  const service = data[0];

  // Преобразуем service.acf.service_tabs в нужный формат
  const tabs = (service.acf?.service_tabs || []).map((tab: ServiceTab) => {
    const pointsHtml = tab.tab_points_list
      ? `<ul>${tab.tab_points_list.map((item: TabPoint) => `<li class=${service.acf?.theme_color === 'Светлая' ? 'light-bg' : ''} >${item.tab_points_item}</li>`).join('')}</ul>`
      : '';

    const content = `
    <p>${tab.tab_desscription || ''}</p>
    ${pointsHtml}
  `;

    return {
      title: tab.tab_name,
      content,
    };
  });


  return (
    <>
      <section className={`section ${service.acf?.theme_color === 'Светлая' ? 'light' : ''}`}>
        <div className={`main-bg ${service.acf?.theme_color === 'Светлая' ? 'white' : 'sec-bg'}`}></div>
        <div className={`secondary-bg ${service.acf?.theme_color === 'Светлая' ? 'light-bg' : ''}`}></div>
        <div className="page-content">
          {/* {service.acf?.theme_color === 'Светлая' && (
            <div className="w-bg">
              <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
            </div>
          )} */}

          <div className="container padding-0">
            <div className="single-service__inner">
              <Breadcrumbs current={service.title.rendered} />
              <div className="hero-block__title">
                <MotionSection animation="fade-up">
                  <h1 className={`h1 ${service.acf?.theme_color === 'Светлая' ? 'light-bg' : ''}`} dangerouslySetInnerHTML={{ __html: service.title.rendered }} />
                </MotionSection>
              </div>
              {tabs.length > 0 && <Tabs tabs={tabs} themeColor={service.acf?.theme_color} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

