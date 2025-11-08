
import Mainscreen from "@/components/services/mainscreen/mainscreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | TIVACO experts",
  description: "page services",
};




export default async function Services() {


  return (
    <>
      <main className="scroll-container">
        <section className="section light">
          <Mainscreen />
        </section>
      </main>
    </>
  );
}
