import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { business, services } from "@/content/business";

// Tells Google and AI answer engines the plain facts about the business.
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  telephone: business.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Colorado" },
  founder: { "@type": "Person", name: "Lou Fohn" },
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name },
  })),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to the page
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <a className="callbar" href={business.phoneHref}>
        Call {business.phone}
      </a>
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
    </>
  );
}
