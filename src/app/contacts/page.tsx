import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Marquee from "@/components/contacts/marquee/Marquee"
import Link from "next/link"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts | Tivaco",
  description: "our contacts",
};



interface Contact {
  contacts_city: string;
  contacts_phone: string;
  contacts_mail: string;
  contacts_address: string;
}

export default async function Consultation() {
  const res = await fetch(
    "http://tivaco.borodadigital.com/wp-json/wp/v2/pages/34",
    { next: { revalidate: 60 } } // чтобы всегда брать актуальные данные
  )

  if (!res.ok) {
    throw new Error("Failed to fetch contacts data")
  }

  const data = await res.json()
  const contacts: Contact[] = data.acf.contacts;

  return (
    <section className="section contacts-section">
      <div className="main-bg sec-bg"></div>
      <div className="secondary-bg"></div>
      <div className="page-content">
        <div className="container">
          
          <div className="contacts-inner">
            <Breadcrumbs />
            <h1 className="h1">{data.acf?.hm_title || "Contact us"}</h1>

            <div className="contacts-items">
              {contacts.map((contact, index) => (
                <div className="contact-item" key={index}>
                  <div className="contact-item__city">{contact.contacts_city}</div>
                  <div className="contact-item__phone">{contact.contacts_phone}</div>
                  <div className="contact-item__mail">{contact.contacts_mail}</div>
                  <div className="contact-item__address">{contact.contacts_address}</div>
                </div>
              ))}
            </div>

            <div className="service-btns events-btns">
              <Link className="consultation blue-btn" href="/#consult">
                request a consultation
              </Link>
            </div>
          </div>
        </div>
        <Marquee />
      </div>
    </section>
  )
}
