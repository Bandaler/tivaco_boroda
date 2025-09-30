import CoursesHomepage from "@/components/courses/mainscreen/mainscreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Tivaco",
  description: "page courses",
};




export default async function Courses() {
  return (
    <>
      <main className="scroll-container">
        <section className="section light">
          
          <CoursesHomepage />
        </section>
      </main>
    </>
  );
}
