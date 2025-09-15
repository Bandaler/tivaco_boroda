import Mainscreen from "@/components/news/mainscreen/Mainscreen";



export default async function News() {
  // const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/26', { cache: 'force-cache' });
  // const page = await res.json();

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
