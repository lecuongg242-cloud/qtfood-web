export type Hotline = { number: string; display: string; contact: string };

export type Company = {
  legalName: string;
  brand: string;
  slogan: string;
  tagline: string;
  positioning: string;
  taxCode: string;
  address: string;
  geo: { lat: number; lng: number };
  email: string;
  hotlines: Hotline[];
  social: {
    facebook: { label: string; url: string };
    tiktok: { label: string; url: string };
    zalo: { label: string; url: string }[];
  };
  ceo: { name: string; title: string; photo: string; quote: { keyword: string; text: string }[] };
};

export type ProductSpecs = {
  netWeight?: string;
  shelfLife?: string;
  storage?: string;
  usage?: string;
  price?: number;
  priceUnit?: string;
};

export type Product = {
  slug: string;
  category: string;
  name: string;
  headline: string;
  summary: string;
  highlights?: string[];
  specs?: ProductSpecs;
  images: string[];
};

export type Commitment = { title: string; subtitle: string; text: string; icon: string };

export type CoreValue = { key: string; meaning: string; text: string };

export type Certification = {
  standard: string;
  name: string;
  holder: string;
  number: string;
  decision: string;
  issuer: string;
  scope: string;
  location: string;
  issued: string;
  expires: string;
  surveillance: string;
  documents: { title: string; image: string }[];
};

export type SiteContent = {
  company: Company;
  certifications: Certification[];
  home: {
    banner: string;
    featured: { product: string; title: string; text: string; image: string }[];
    commitments: Commitment[];
  };
  about: {
    intro: string;
    teamPhoto: string;
    landscape: string;
    businessLines: { title: string; intro: string; items: { title: string; text: string }[] };
    vision: string;
    coreValues: { intro: string; items: CoreValue[] };
  };
  productCategories: { slug: string; name: string; note: string }[];
  products: Product[];
  franchise: {
    title: string;
    stats: { value: number; suffix: string; label: string }[];
    intro: string;
    sections: { title: string; paragraphs: string[]; items?: { title: string; text: string }[] }[];
    process: { title: string; text: string }[];
    gallery: { dir: string; count: number };
  };
  franchisePolicy: {
    title: string;
    intro: string;
    sections: {
      title: string;
      intro?: string;
      items?: { title: string; text: string }[];
      cta?: { label: string; href: string };
    }[];
  };
  forms: { provinces: string[]; budgets: string[]; contactTopics: string[] };
};
