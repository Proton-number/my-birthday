interface Birthday {
  formattedDate: string;
  formattedTime: string;
  formattedYear: string;
  updateFormattedDate: () => void;
}

// for sanity

interface Image {
  asset?: {
    _id: string;
    url: string;
  };
  alt: string;
}
interface PortableTextSpan {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
}

interface PortableTextImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  caption?: string;
  alt?: string;
}

// Mark definition types
interface LinkMarkDef {
  _key: string;
  _type: "link";
  href: string;
  blank?: boolean;
}

interface InternalLinkMarkDef {
  _key: string;
  _type: "internalLink";
  reference: {
    _ref: string;
    _type: "reference";
  };
}

type MarkDef = LinkMarkDef | InternalLinkMarkDef;

// Block types
interface PortableTextBlock {
  _key: string;
  _type: "block";
  children: Array<PortableTextSpan>;
  markDefs: MarkDef[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote" | "code";
  listItem?: "bullet" | "number";
  level?: number;
}

// Main content types
type PortableTextContent = PortableTextBlock | PortableTextImage;

interface Reviews {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  mainImage?: Image;
  body: PortableTextContent[];
  _id: string;
}

interface SanityStore {
  error: null | string;
  reviews: Array<Reviews> | null;
  fetchReviews: () => Promise<void>;
  singleReview: Reviews | null;
  fetchSingleReview: (yearId: string) => Promise<void>;
}
