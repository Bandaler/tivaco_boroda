import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";

// interface Policy {
//   title: string;
//   description: string;
// }

export default async function Consultation() {
  const res = await fetch(
    "http://tivaco.borodadigital.com/wp-json/wp/v2/pages/255",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch contacts data");
  }

  const data = await res.json();

  return (
    <section className="section contacts-section policy-section">
      <div className="main-bg light"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="container">
          <div className="contacts-inner">
            <Breadcrumbs />
            <h1 className="h1">{data.title.rendered || "Contact us"}</h1>
            <div
              className="content-privacy"
              dangerouslySetInnerHTML={{ __html: data.content.rendered }}
            />

            <Link href={"/consult"} className="back-consult">
              <Image src={'/back.svg'} width={34} height={34} alt="img" />
              <span>
                back
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
