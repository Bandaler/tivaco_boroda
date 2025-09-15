import Mainscreen from "@/components/portfolio/mainscreen/mainscreen";



export default async function Portfolio() {
  // const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/26', { cache: 'force-cache' });
  // const page = await res.json();

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
