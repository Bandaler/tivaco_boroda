import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policy | Tivaco",
  description: "page policy",
};



// interface Policy {
//   title: string;
//   description: string;
// }

export default async function Consultation() {
  const API_URL = process.env.API_SECRET_URL_PAGES;
  const res = await fetch(
    `${API_URL}/255`,
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

            <Link href={"/"} className="back-consult">
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
