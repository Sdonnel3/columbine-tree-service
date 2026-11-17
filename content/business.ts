// The basic facts about the business. Change them here and every page updates.
// Anything written as [CONFIRM WITH LOU: ...] shows on the site as a black tag
// until Lou or Tim confirms it. See OPEN_QUESTIONS.md for the full list.

export const business = {
  // [CONFIRM WITH LOU: which business name leads the site]
  name: "Columbine Tree Service & Transplanting",
  legalName: "Columbine Tree Service & Transplanting Inc",
  shortName: "Columbine Tree",
  phone: "(303) 979-5330",
  phoneHref: "tel:+13039795330",
  phoneE164: "+13039795330",
  address: {
    street: "5790 W Coal Mine Ave",
    city: "Littleton",
    state: "CO",
    zip: "80123",
  },
  serviceArea: "All of Colorado",
  cta: "We're always open to the conversation. Reach out today.",
  // Search links for now. Swap for the exact listing links once we know
  // who holds the logins.
  reviews: {
    google:
      "https://www.google.com/search?q=Columbine+Tree+Service+%26+Transplanting+Littleton+CO",
    yelp: "https://www.yelp.com/biz/columbine-tree-transplanting-littleton",
  },
};

export const nav = [
  { href: "/for-businesses", label: "For businesses" },
  { href: "/tree-farm", label: "Tree farm" },
  { href: "/services", label: "Services" },
  { href: "/ask-lou", label: "Ask Lou" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    name: "Tree transplanting",
    need: "transplanting",
    text: "We move established trees with our own tree spades. Across the yard or across the state.",
  },
  {
    name: "Tree sales from the farm",
    need: "buying a tree",
    text: "Deciduous, coniferous and some fruit trees, grown on our five acres in Littleton. Come pick yours.",
  },
  {
    name: "Pruning and cleanup",
    need: "pruning",
    text: "Mostly winter work. Call ahead and we will get you on the list.",
  },
  {
    name: "Tree removal",
    need: "removal",
    text: "When a tree has to go, we take it out.",
  },
  {
    name: "Stump grinding",
    need: "stump grinding",
    text: "What a removal leaves behind, ground out.",
  },
];
