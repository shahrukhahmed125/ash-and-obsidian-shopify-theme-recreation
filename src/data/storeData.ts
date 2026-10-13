export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  cats: string[];
  colors: Array<'black' | 'ash' | 'blood' | 'bone'>;
  description: string;
}

export interface ColorDef {
  name: string;
  hex: string;
  filter: string;
}

export const COLORS: Record<string, ColorDef> = {
  black: {
    name: 'Obsidian',
    hex: '#1a1817',
    filter: 'none',
  },
  ash: {
    name: 'Ash',
    hex: '#6b6560',
    filter: 'grayscale(1) brightness(1.75) contrast(.85)',
  },
  blood: {
    name: 'Blood',
    hex: '#7a1a1d',
    filter: 'sepia(1) saturate(4) hue-rotate(-38deg) brightness(.72)',
  },
  bone: {
    name: 'Bone',
    hex: '#cfc6b8',
    filter: 'grayscale(1) invert(.82) contrast(.9)',
  },
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Obsidian Tee',
    price: 69,
    img: '/assets/p1-tee.jpg',
    cats: ['Men', 'Unisex'],
    colors: ['black', 'ash', 'blood'],
    description: '320 GSM heavyweight combed cotton, garment-dyed for a worn-in feel. Dropped shoulders with custom puff print crest.',
  },
  {
    id: 'p2',
    name: 'Obsidian Crown Hoodie',
    price: 99,
    img: '/assets/p2-hoodie.jpg',
    cats: ['Women', 'Unisex'],
    colors: ['black', 'ash', 'blood'],
    description: '450 GSM French terry fleece. Oversized structured hood, ribbed cuffs, and high-density metallic crown embroidery.',
  },
  {
    id: 'p3',
    name: 'Thorn Vest',
    price: 59,
    img: '/assets/p3-vest.jpg',
    cats: ['Men'],
    colors: ['black', 'ash', 'bone'],
    description: 'Double-layered cotton rib knit with reinforced armholes and subtle distressed thorn silhouette graphics.',
  },
  {
    id: 'p4',
    name: 'Heritage Tee',
    price: 69,
    img: '/assets/p4-heritage.jpg',
    cats: ['Women', 'Unisex'],
    colors: ['black', 'ash', 'blood'],
    description: 'Vintage-washed charcoal base with tonal Ash & Obsidian script across the back yoke and chest crest.',
  },
  {
    id: 'p5',
    name: 'Pomegranate Crop Tee',
    price: 65,
    img: '/assets/p5-crop.jpg',
    cats: ['Women'],
    colors: ['black', 'ash', 'blood'],
    description: 'Boxy cropped silhouette crafted from medium-heavy luxury jersey. Front features The Choice symbol emblem.',
  },
];

export interface SymbolItem {
  id: number;
  name: string;
  numeral: string;
  meaning: string;
  lore: string;
  img: string;
}

export const SYMBOLS: SymbolItem[] = [
  {
    id: 0,
    name: 'Pomegranate',
    numeral: 'I',
    meaning: 'The Choice',
    lore: 'Once tasted, there is no return. The pomegranate marks the moment you decide who you will be.',
    img: '/assets/s1-pomegranate.png',
  },
  {
    id: 1,
    name: 'Thorns',
    numeral: 'II',
    meaning: 'The Cost',
    lore: 'Nothing worth holding comes without blood. The thorns remember every price you paid.',
    img: '/assets/s2-thorns.png',
  },
  {
    id: 2,
    name: 'Ash',
    numeral: 'III',
    meaning: 'What You Leave Behind',
    lore: 'Everything you burned to get here. Ash is proof that you did not stay the same.',
    img: '/assets/s3-ash.png',
  },
  {
    id: 3,
    name: 'Obsidian',
    numeral: 'IV',
    meaning: 'What You Become',
    lore: 'Glass born from fire and cooled in the dark. Sharp, quiet, unbreakable.',
    img: '/assets/s4-obsidian.png',
  },
  {
    id: 4,
    name: 'Crown',
    numeral: 'V',
    meaning: 'What You Earn',
    lore: 'Not given. Not inherited. Forged piece by piece by the one who wears it.',
    img: '/assets/s5-crown.png',
  },
  {
    id: 5,
    name: 'Cerberus',
    numeral: 'VI',
    meaning: 'The Gate You Must Pass',
    lore: 'Three heads, three trials. Every kingdom is guarded, and the guard is often yourself.',
    img: '/assets/s6-cerberus.png',
  },
  {
    id: 6,
    name: 'Kingdom',
    numeral: 'VII',
    meaning: 'The Life You Choose to Build',
    lore: 'The final symbol. Walls you raised, rules you wrote, a place that answers only to you.',
    img: '/assets/s7-kingdom.png',
  },
];

export interface ReviewItem {
  id: string;
  author: string;
  quote: string;
  product: string;
  rating: number;
  verified: boolean;
  row: 1 | 2;
}

export const REVIEWS: ReviewItem[] = [
  // ROW 1: Right-to-left
  {
    id: 'r1',
    author: 'Marcus V.',
    quote: 'The 320 GSM weight is unreal. It holds structure like armor without feeling stiff. Nothing else compares in this category.',
    product: 'Obsidian Crown Hoodie',
    rating: 5,
    verified: true,
    row: 1,
  },
  {
    id: 'r2',
    author: 'Elena R.',
    quote: 'The wax seal packaging and the lore card made unboxing this an unforgettable ritual. The crop tee fit is immaculate.',
    product: 'Pomegranate Crop Tee',
    rating: 5,
    verified: true,
    row: 1,
  },
  {
    id: 'r3',
    author: 'Julian M.',
    quote: 'Subtle puff print detailing that catches light in all the right ways. Truly an instant grail piece in my rotation.',
    product: 'Obsidian Tee',
    rating: 5,
    verified: true,
    row: 1,
  },
  {
    id: 'r4',
    author: 'Nathan S.',
    quote: 'Heavyweight cotton drape is supreme. The collar never sags even after constant wear. Worth every single penny.',
    product: 'Thorn Vest',
    rating: 5,
    verified: true,
    row: 1,
  },
  {
    id: 'r5',
    author: 'Vesper C.',
    quote: 'Obsidian colorway has a rich dark obsidian depth that cheap blacks never achieve. Outstanding garment dye process.',
    product: 'Obsidian Tee',
    rating: 5,
    verified: true,
    row: 1,
  },
  // ROW 2: Left-to-right
  {
    id: 'r6',
    author: 'Soren B.',
    quote: 'You can immediately feel this was crafted with true conviction. Dark aesthetic done right with uncompromising weight.',
    product: 'Heritage Tee',
    rating: 5,
    verified: true,
    row: 2,
  },
  {
    id: 'r7',
    author: 'Kaelen T.',
    quote: 'The Seven Symbols concept gives real meaning to what you are wearing. Heavy, structured, and commands respect.',
    product: 'Obsidian Crown Hoodie',
    rating: 5,
    verified: true,
    row: 2,
  },
  {
    id: 'r8',
    author: 'Rowan H.',
    quote: 'Washed it multiple times and the color depth hasn’t shifted an inch. Unmatched craftsmanship and stitch tension.',
    product: 'Obsidian Tee',
    rating: 5,
    verified: true,
    row: 2,
  },
  {
    id: 'r9',
    author: 'Zane L.',
    quote: 'Clean drop-shoulder cut. Gets compliments every single time I step out. You feel like you are wearing a fortress.',
    product: 'Thorn Vest',
    rating: 5,
    verified: true,
    row: 2,
  },
  {
    id: 'r10',
    author: 'Lyra M.',
    quote: 'The collectible symbol card is currently framed on my wall. This brand is a complete artistic experience.',
    product: 'Pomegranate Crop Tee',
    rating: 5,
    verified: true,
    row: 2,
  },
];

export const MODAL_DATA: Record<string, { kicker: string; title: string; lines: string[] }> = {
  details: {
    kicker: 'Crafted for the real ones',
    title: 'The details',
    lines: [
      '320 GSM heavyweight combed cotton, garment-dyed for a worn-in hand and deep pigment permanence.',
      'Oversized drop-shoulder fit engineered for natural drape. Size down for a standard athletic fit.',
      'Raised puff crest and metallic prints, cured and hand-finished in small numbered batches.',
    ],
  },
  packaging: {
    kicker: 'More than the garment',
    title: 'The packaging',
    lines: [
      'Matte black rigid box sealed with a hand-poured custom wax crest stamp.',
      'A bespoke parchment lore card detailing the history and mythology of your chosen symbol.',
      'One collectible heavy cardstock symbol card, individually numbered per drop.',
    ],
  },
  account: {
    kicker: 'Account',
    title: 'Enter the kingdom',
    lines: [
      'Sign in to track orders, manage addresses, and view your collected symbols archive.',
      'Account authentication will connect directly to your Shopify Customer accounts upon theme deployment.',
    ],
  },
  checkout: {
    kicker: 'Checkout',
    title: 'Almost yours',
    lines: [
      'Your bag is preserved. In your live Shopify store, clicking checkout navigates seamlessly to Shopify’s PCI-compliant secure checkout.',
      'Complimentary express shipping is automatically applied on all orders reaching $100.',
    ],
  },
};

export interface FAQItem {
  id: string;
  category: 'Orders & Shipping' | 'Garments & Fit' | 'Rituals & Lore';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Orders & Shipping',
    question: 'How does complimentary shipping work?',
    answer: 'Orders reaching $100 or more automatically unlock complimentary express global shipping. For all orders under $100, standard tracked courier rates apply at checkout.',
  },
  {
    id: 'faq-2',
    category: 'Garments & Fit',
    question: 'What is the silhouette and fit of the 320 GSM tees?',
    answer: 'All tees are tailored with a contemporary drop-shoulder oversized silhouette. The heavy 320 GSM combed cotton holds its drape naturally. If you prefer a traditional standard fitted look, we recommend sizing down one size.',
  },
  {
    id: 'faq-3',
    category: 'Rituals & Lore',
    question: 'What comes inside the custom packaging?',
    answer: 'Every garment is presented in a rigid matte-black presentation box sealed with a hand-poured red wax crest. Inside you will find your garment, a parchment lore card of your symbol, and an individually numbered collectible card from Drop I.',
  },
  {
    id: 'faq-4',
    category: 'Orders & Shipping',
    question: 'What is your returns and exchange policy?',
    answer: 'We honor a 30-day ritual return and size exchange window from delivery date. Items must remain unwashed and in pristine unworn condition with original tags and collector box intact.',
  },
  {
    id: 'faq-5',
    category: 'Garments & Fit',
    question: 'How should I care for garment-dyed pieces with puff print?',
    answer: 'Turn garments inside out, wash with cold water on a gentle cycle with like dark colors, and hang dry in the shade. Do not iron directly on the raised puff print or metallic embellishments.',
  },
  {
    id: 'faq-6',
    category: 'Rituals & Lore',
    question: 'Will Drop I symbols be restocked once sold out?',
    answer: 'Each numbered drop is strictly finite. Once a symbol release cap is reached, that exact garment-dye iteration is retired to the archives. The next drop will introduce new artifact forms.',
  },
];
