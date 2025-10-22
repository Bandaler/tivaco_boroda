// app/services/[slug]/page.tsx

import Tabs from '@/components/team/Tabs/Tabs';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
// import { Metadata } from "next";



interface Team {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    team_tabs?: TeamTab[];
    team_photo?: string;
    position?: string;
    theme_color?: string;
  };
}

interface TeamTabPoint {
  team_tab_col_single: string;
}

interface TeamTab {
  team_tab_title: string;
  team_tab_lg_descr?: string;
  team_tab_col_descr?: TeamTabPoint[];
}



export async function generateStaticParams() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_TEAM;
  const res = await fetch(`${API_URL}?per_page=100`);
  const data: Team[] = await res.json();

  return data.map(team => ({
    slug: team.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_TEAM;
  const { slug } = await params;
  

  const res = await fetch(
    `${API_URL}?slug=${slug}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return { title: "Team | Tivaco" };

  const data: Team[] = await res.json();
  const team = data[0];

  if (!team) return { title: "Team not found | Tivaco" };

  return {
    title: `${team.title.rendered} | Tivaco`,
    description: team.acf?.position || "Team page",
  };
}



export default async function TeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
   const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_TEAM;
  const { slug } = await params;


  const res = await fetch(
    `${API_URL}?slug=${slug}`,
    { cache: 'force-cache' }
  );


  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();
  const team = data[0];
  

  if (!team) return notFound();

    // Получаем список всех записей
  const allRes = await fetch(
    `${API_URL}?per_page=100&order=asc&orderby=date`,
    { cache: 'force-cache' }
  );
  const allData: Team[] = await allRes.json();

  const currentIndex = allData.findIndex(item => item.slug === slug);

  // const prevTeam = currentIndex > 0 ? allData[currentIndex - 1] : null;
  const nextTeam = currentIndex < allData.length - 1 ? allData[currentIndex + 1] : null;

  // Преобразуем team.acf.team_tabs в формат для Tabs
  const tabs = (team.acf?.team_tabs || []).map((tab: TeamTab) => {
    const pointsHtml = tab.team_tab_col_descr
      ? `<ul>${tab.team_tab_col_descr
        .map(
          (item: TeamTabPoint) =>
            `<li class=${team.acf?.theme_color === 'Светлая' ? 'light-bg' : ''}>${item.team_tab_col_single}</li>`
        )
        .join('')}</ul>`
      : '';

    const content = `
      <p>${tab.team_tab_lg_descr || ''}</p>
      ${pointsHtml}
    `;

    return {
      title: tab.team_tab_title,
      content,
    };
  });



  return (
    <section className={`section ${team.acf?.theme_color === 'Светлая' ? 'light' : ''}`}>
      <div className={`main-bg sec-bg`}></div>
      <div className={`secondary-bg ${team.acf?.theme_color === 'Светлая' ? 'light-bg' : ''}`}></div>
      <div className="page-content">
        {team.acf?.theme_color === 'Светлая' && (
          <div className="w-bg">
            <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
          </div>
        )}

        <div className="container padding-0">
          <div className="single-service__inner team-inner">
            <Breadcrumbs current={team.title.rendered} />
            <div className="hero-block__title team-head">
              <div className="team-photo">
                <Image src={team.acf?.team_photo || '/placeholder.png'} width={203} height={203} alt="img" />
              </div>
              <div className="team-head__info">
                <h1
                  className={`h1 ${team.acf?.theme_color === 'Светлая' ? 'light-bg' : ''}`}
                  dangerouslySetInnerHTML={{ __html: team.title.rendered }}
                />
                <div className={`position ${team.acf?.theme_color === 'Светлая' ? 'light-bg' : ''}`}>
                  {team.acf?.position}
                </div>
              </div>
            </div>
            {tabs.length > 0 && <Tabs tabs={tabs} themeColor={team.acf?.theme_color} />}
            <div className="navigation-team">
              <Link href={'/about/team/'} className='navigation-team-arr navigation-team__prev'>
                <Image src={'/prev-m.svg'} width={34} height={34} alt='img' />
                <span>
                  Member list
                </span>
              </Link>
              {nextTeam && (
                <Link href={`/about/team/${nextTeam.slug}`} className='navigation-team-arr navigation-team__next'>
                <span>
                  next team member
                </span>
                <Image src={'/next-m.svg'} width={34} height={34} alt='img' />
              </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
