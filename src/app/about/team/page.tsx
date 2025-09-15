import Mainscreen from "@/components/team/mainscreen/mainscreen";



export default async function Team() {
  // const res = await fetch('http://tivaco.borodadigital.com/wp-json/wp/v2/pages/26', { cache: 'force-cache' });
  // const page = await res.json();

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
