import Mainscreen from "@/components/news/mainscreen/Mainscreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Articles | Tivaco",
  description: "page news",
};




export default async function News() {

  return (
    <>
      <main className="scroll-container">
        <section className="section light portfolio-section__parent">
          <Mainscreen />
          
        </section>
      </main>
    </>
  );
}
