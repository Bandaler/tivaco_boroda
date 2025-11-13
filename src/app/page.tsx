

// import Advantages from "@/components/homepage/advantages/advantages";
// import Mainscreen from "@/components/homepage/mainscreen/mainscreen";
// import Services from "@/components/homepage/services/services";
// import Reviews from "@/components/homepage/reviews/reviews";
// import Workflow from "@/components/homepage/workflow/workflow";
// import WhyWe from "@/components/homepage/whywe/whywe";
// import TeamHomepage from "@/components/homepage/team/team";
// import NewsScreen from "@/components/homepage/news/news";
// import Consultation from "@/components/homepage/consultation/consultation";

// export default async function Home() {
//   return (
//     <>
//       <main className="scroll-container">

//         <section className="section">
//           <Mainscreen />
//         </section>
//         <section className="section">
//           <Services />
//         </section>
//          <section className="section light">
//           <Advantages />
//         </section>
//         <section className="section">
//           <Workflow />
//         </section>
//         <section className="section light">
//           <Reviews />
//         </section>
//         <section className="section light">
//           <WhyWe />
//         </section>
//         <section className="section">
//           <TeamHomepage />
//         </section>
//         <section className="section light">
//           <NewsScreen />
//         </section>
//         <section className="section">
//           <Consultation />
//         </section>
//       </main>
//     </>
//   );
// }

import FullPageScrollWrapper from "@/components/FullPageWrapper/FullPageWrapper";
import Advantages from "@/components/homepage/advantages/advantages";
import Mainscreen from "@/components/homepage/mainscreen/mainscreen";
import Services from "@/components/homepage/services/services";
import Reviews from "@/components/homepage/reviews/reviews";
import Workflow from "@/components/homepage/workflow/workflow";
import WhyWe from "@/components/homepage/whywe/whywe";
import TeamHomepage from "@/components/homepage/team/team";
import NewsScreen from "@/components/homepage/news/news";
import Consultation from "@/components/homepage/consultation/consultation";
import { Metadata } from "next";
import PortfolioSection from "@/components/homepage/portfolio/portfolioSection";

export const metadata: Metadata = {
  title: "TIVACO Experts",
  description: "page 404",
};



export default async function Home() {
  return (
    <FullPageScrollWrapper>
      <section className="section"><Mainscreen /></section>
      <section className="section"><Services /></section>
      <section className="section light" id="advantages"><Advantages /></section>
      <section className="section"><Workflow /></section>
      <section className="section light"><Reviews /></section>
      <section className="section light"><WhyWe /></section>
      <section className="section"><TeamHomepage /></section>
      <section className="section light"><PortfolioSection /></section>
      <section className="section light"><NewsScreen /></section>
      <section className="section" id="consult"><Consultation /></section>
    </FullPageScrollWrapper>
  );
}
