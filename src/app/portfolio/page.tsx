import Mainscreen from "@/components/portfolio/mainscreen/mainscreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Tivaco",
  description: "page events",
};





export default async function Portfolio() {


  return (
    <>
      <main className="scroll-container">
        <section className="section portfolio-section__parent">
          <Mainscreen />
        </section>
      </main>
    </>
  );
}
