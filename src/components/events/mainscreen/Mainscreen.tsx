import EventsSlider from "../slider/EventsSlider";
import Image from "next/image";

export default async function EventsHomepage() {
  const API_URL = process.env.NEXT_PUBLIC_API_SECRET_URL_EVENTS;
  const res = await fetch(`${API_URL}?_embed`, { cache: 'force-cache' });


  const eventsList = await res.json();

  return (
    <>
      <div className="main-bg light"></div>
      <div className="secondary-bg light-bg"></div>
      <div className="page-content events-content">
        <div className="w-bg">
          <Image src="/w-bg.png" width={4000} height={4000} alt="bg" />
        </div>
        <div className="container custom-container">
          <EventsSlider eventsList={eventsList} />
        </div>

      </div>
    </>
  );
}
