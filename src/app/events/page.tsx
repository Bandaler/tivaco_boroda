import EventsHomepage from "@/components/events/mainscreen/Mainscreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Tivaco",
  description: "page events",
};




export default async function Events() {
  return (
    <>
      <main className="o-hidden">
        <section className="section light">
          
          <EventsHomepage />
        </section>
      </main>
    </>
  );
}
