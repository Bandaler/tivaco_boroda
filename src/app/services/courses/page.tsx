import CoursesHomepage from "@/components/courses/mainscreen/mainscreen";



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
