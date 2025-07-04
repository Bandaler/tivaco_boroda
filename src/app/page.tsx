

import Advantages from "@/components/homepage/advantages/advantages";
import Mainscreen from "@/components/homepage/mainscreen/mainscreen";
import Services from "@/components/homepage/services/services";
import Reviews from "@/components/homepage/reviews/reviews";
import Workflow from "@/components/homepage/workflow/workflow";
import WhyWe from "@/components/homepage/whywe/whywe";
import TeamHomepage from "@/components/homepage/team/team";
import News from "./news-articles/page";
import NewsScreen from "@/components/homepage/news/news";

export default async function Home() {
  return (
    <>
      <main className="scroll-container">

        <section className="section">
          <Mainscreen />
        </section>
        <section className="section">
          <Services />
        </section>
         <section className="section light">
          <Advantages />
        </section>
        <section className="section">
          <Workflow />
        </section>
        <section className="section light">
          <Reviews />
        </section>
        <section className="section light">
          <WhyWe />
        </section>
        <section className="section">
          <TeamHomepage />
        </section>
        <section className="section light">
          <NewsScreen />
        </section>
      </main>
    </>
  );
}
