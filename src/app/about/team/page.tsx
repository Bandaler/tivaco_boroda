import Mainscreen from "@/components/team/mainscreen/mainscreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our team | TIVACO experts",
  description: "page team",
};


export default async function Team() {


  return (
    <>
      <main className="scroll-container">
        <section className="section">
          
          <Mainscreen />
        </section>
      </main>
    </>
  );
}
