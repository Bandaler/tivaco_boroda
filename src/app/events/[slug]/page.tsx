// app/services/[slug]/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    event_date?: string;
    event_time?: string;
    event_location?: string;
    short_ppreview?: string;
    event_speakers?: { event_speacker_photo: string; event_speacker_name: string; event_speacker_position: string }[];
  };
}

export async function generateStaticParams() {
  const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/events-list?per_page=100');
  const data: Event[] = await res.json();

  return data.map(event => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `http://tivaco.borodadigital.com/wp-json/wp/v2/events-list?slug=${slug}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return { title: "Team | Tivaco" };

  const data: Event[] = await res.json();
  const event = data[0];

  if (!event) return { title: "Team not found | Tivaco" };

  return {
    title: `${event.title.rendered} | Tivaco`,
    description: event.content.rendered || "Event page",
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`http://tivaco.borodadigital.com/wp-json/wp/v2/events-list?slug=${slug}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const data: Event[] = await res.json();
  const event = data[0];

  const speackers = event.acf?.event_speakers;

  // Получаем список всех записей
  const allRes = await fetch(
    'http://tivaco.borodadigital.com/wp-json/wp/v2/events-list?per_page=100&order=asc&orderby=date',
    { cache: 'force-cache' }
  );
  const allData: Event[] = await allRes.json();

  const currentIndex = allData.findIndex(item => item.slug === slug);

  const prevEvent = currentIndex > 0 ? allData[currentIndex - 1] : null;
  const nextEvent = currentIndex < allData.length - 1 ? allData[currentIndex + 1] : null;


  return (

    <section className={`section portfolio-section events-section`}>
      <div className="main-bg light"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content">
        <div className="w-bg">
          <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
        </div>
        <div className="container padding-0">
          <div className="single-service__inner portfolio-page__inner events-page__inner">
            <Breadcrumbs current={event.title.rendered} />
            <div className="detail-events__inner">
              <h1 className="h1" dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
              <div className="detail-events__content" dangerouslySetInnerHTML={{ __html: event.content.rendered }} />
              <div className="events-speakers">
                <div className="h2">
                  Speakers
                </div>
                <div className="event-speakers__items">
                  {speackers && speackers.map((speacker, index) => (
                    <div className="event-speakers__item" key={index}>
                      <div className="speacker-photo">
                        <Image src={speacker.event_speacker_photo} width={98} height={98} alt={speacker.event_speacker_name} />
                      </div>
                      <div className="speackers-info">
                        <div className="speacker-name">
                          {speacker.event_speacker_name}
                        </div>
                        <div className="speacker-position">
                          {speacker.event_speacker_position}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="service-btns events-btns">
                  <Link className="learn-more green-btn" href={'javascript:void(0)'} >sign up for an event</Link>
                  <Link className="consultation blue-btn" href={'/events/'}> view upcoming events </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="events-pagination">
            {prevEvent && (
              <Link href={`/events/${prevEvent.slug}`}>
                <Image src={'/prev-nav-dark.svg'} width={34} height={34} alt='img' />
                <span>
                  Previous event
                </span>
              </Link>
            )}
            {nextEvent && (
              <Link href={`/events/${nextEvent.slug}`}>
                <span>
                  Next event
                </span>
                <Image src={'/next-nav-dark.svg'} width={34} height={34} alt='img' />
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>


  );
}


