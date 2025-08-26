// React e ReactDOM sono assunti essere disponibili come variabili globali,
// tipicamente caricati tramite script tag nel file index.html prima di bundle.js.
// Anche Firebase e Lucide React sono assunti essere disponibili globalmente.

// Ottiene l'elemento radice del DOM dove verrà montata l'applicazione React.
const rootElement = document.getElementById('root');
let reactRoot = null;

// Se l'elemento radice esiste, crea l'istanza di ReactDOM.createRoot una sola volta.
if (rootElement && !rootElement._reactRootContainer) {
  reactRoot = ReactDOM.createRoot(rootElement);
} else if (rootElement && rootElement._reactRootContainer) {
  reactRoot = rootElement._reactRootContainer;
} else {
  console.error("Elemento 'root' non trovato nel DOM. L'applicazione non può essere montata.");
}

// Funzione di utilità per generare URL di placeholder.
const getPlaceholderImageUrl = (width, height, text, bgColor = 'e0e0e0', textColor = 'ffffff') => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Dati fittizi per i prodotti
const mockProducts = [
  // Prodotti Archivio (18 elementi)
  {
    id: '1',
    name: 'Vintage Dolce & Gabbana Blazer',
    brand: 'Dolce & Gabbana',
    category: 'jackets',
    color: 'black',
    size: 'M',
    year: 1995,
    price: 450,
    images: [
      getPlaceholderImageUrl(300, 400, 'D&G Blazer 1'),
      getPlaceholderImageUrl(300, 400, 'D&G Blazer 2'),
      getPlaceholderImageUrl(300, 400, 'D&G Blazer 3'),
      getPlaceholderImageUrl(300, 400, 'D&G Blazer 4')
    ],
    description: 'Elegante blazer vintage Dolce & Gabbana della metà degli anni \'90. Artigianato italiano al suo meglio.',
    condition: 'excellent',
    material: '100% Wool',
    measurements: { chest: '50cm', length: '65cm' },
    featured: true,
    type: 'archive'
  },
  {
    id: '2',
    name: 'Prada Nylon Bag',
    brand: 'Prada',
    category: 'bags',
    color: 'brown',
    size: 'M',
    year: 1999,
    price: 1200,
    images: [
      getPlaceholderImageUrl(300, 400, 'Prada Bag 1'),
      getPlaceholderImageUrl(300, 400, 'Prada Bag 2'),
      getPlaceholderImageUrl(300, 400, 'Prada Bag 3'),
      getPlaceholderImageUrl(300, 400, 'Prada Bag 4')
    ],
    description: 'Iconica borsa Prada in nylon del 1999. Un pezzo del lusso minimalista degli anni \'90.',
    condition: 'very good',
    material: 'Nylon and leather',
    measurements: { width: '30cm', height: '25cm' },
    featured: true,
    type: 'archive'
  },
  {
    id: '3',
    name: 'Gucci Flora Silk Scarf',
    brand: 'Gucci',
    category: 'accessories',
    color: 'multicolor',
    size: 'one size',
    year: 1998,
    price: 180,
    images: [
      getPlaceholderImageUrl(300, 400, 'Gucci Scarf 1'),
      getPlaceholderImageUrl(300, 400, 'Gucci Scarf 2'),
      getPlaceholderImageUrl(300, 400, 'Gucci Scarf 3'),
      getPlaceholderImageUrl(300, 400, 'Gucci Scarf 4')
    ],
    description: 'Bellissima sciarpa in seta con il famoso motivo Gucci Flora.',
    condition: 'excellent',
    material: '100% Silk',
    featured: false,
    type: 'archive'
  },
  {
    id: '4',
    name: 'Roberto Cavalli Animal Print Dress',
    brand: 'Roberto Cavalli',
    category: 'dresses',
    color: 'brown',
    size: 'S',
    year: 2003,
    price: 680,
    images: [
      getPlaceholderImageUrl(300, 400, 'Cavalli Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Cavalli Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Cavalli Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Cavalli Dress 4')
    ],
    description: 'Splendido abito Roberto Cavalli con stampa animalier del 2003.',
    condition: 'good',
    material: 'Silk jersey',
    measurements: { chest: '42cm', waist: '36cm', length: '95cm' },
    featured: true,
    type: 'archive'
  },
  {
    id: '5',
    name: 'Versace Evening Dress',
    brand: 'Versace',
    category: 'dresses',
    color: 'red',
    size: 'S',
    year: 1992,
    price: 890,
    images: [
      getPlaceholderImageUrl(300, 400, 'Versace Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Versace Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Versace Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Versace Dress 4')
    ],
    description: 'Abito da sera rosso fuoco Versace con stampa barocca del 1992.',
    condition: 'excellent',
    material: '95% Silk, 5% Elastane',
    measurements: { chest: '45cm', waist: '38cm', length: '90cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '6',
    name: 'Miu Miu Pleated Skirt',
    brand: 'Miu Miu',
    category: 'skirts',
    color: 'navy blue',
    size: 'M',
    year: 2001,
    price: 320,
    images: [
      getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 1'),
      getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 2'),
      getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 3'),
      getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 4')
    ],
    description: 'Mini gonna a pieghe Miu Miu in blu navy del 2001.',
    condition: 'very good',
    material: '100% Wool',
    measurements: { waist: '38cm', length: '45cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '7',
    name: 'Ann Demeulemeester Leather Jacket',
    brand: 'Ann Demeulemeester',
    category: 'jackets',
    color: 'black',
    size: 'M',
    year: 1997,
    price: 850,
    images: [
      getPlaceholderImageUrl(300, 400, 'Ann D Jacket 1'),
      getPlaceholderImageUrl(300, 400, 'Ann D Jacket 2'),
      getPlaceholderImageUrl(300, 400, 'Ann D Jacket 3'),
      getPlaceholderImageUrl(300, 400, 'Ann D Jacket 4')
    ],
    description: 'Iconica giacca in pelle Ann Demeulemeester del 1997.',
    condition: 'excellent',
    material: 'Leather',
    measurements: { chest: '52cm', length: '58cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '8',
    name: 'Maison Martin Margiela Deconstructed Top',
    brand: 'Maison Martin Margiela',
    category: 'top',
    color: 'white',
    size: 'L',
    year: 1994,
    price: 450,
    images: [
      getPlaceholderImageUrl(300, 400, 'MMM Top 1'),
      getPlaceholderImageUrl(300, 400, 'MMM Top 2'),
      getPlaceholderImageUrl(300, 400, 'MMM Top 3'),
      getPlaceholderImageUrl(300, 400, 'MMM Top 4')
    ],
    description: 'Top bianco destrutturato di Maison Martin Margiela del 1994.',
    condition: 'very good',
    material: 'Cotton',
    measurements: { chest: '54cm', length: '62cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '9',
    name: 'Jean Paul Gaultier Cone Bra Top',
    brand: 'Jean Paul Gaultier',
    category: 'top',
    color: 'beige',
    size: 'S',
    year: 1990,
    price: 1200,
    images: [
      getPlaceholderImageUrl(300, 400, 'JPG Cone Top 1'),
      getPlaceholderImageUrl(300, 400, 'JPG Cone Top 2'),
      getPlaceholderImageUrl(300, 400, 'JPG Cone Top 3'),
      getPlaceholderImageUrl(300, 400, 'JPG Cone Top 4')
    ],
    description: 'Iconico top con reggisena a cono di Jean Paul Gaultier del 1990.',
    condition: 'excellent',
    material: 'Cotton lycra',
    measurements: { chest: '40cm', length: '55cm' },
    featured: true,
    type: 'archive'
  },
  {
    id: '10',
    name: 'Christian Dior Suit Set',
    brand: 'Christian Dior',
    category: 'set',
    color: 'grey',
    size: 'M',
    year: 2005,
    price: 1800,
    images: [
      getPlaceholderImageUrl(300, 400, 'Dior Suit 1'),
      getPlaceholderImageUrl(300, 400, 'Dior Suit 2'),
      getPlaceholderImageUrl(300, 400, 'Dior Suit 3'),
      getPlaceholderImageUrl(300, 400, 'Dior Suit 4')
    ],
    description: 'Elegante completo tailleur Christian Dior in lana grigia del 2005.',
    condition: 'excellent',
    material: '100% Wool',
    measurements: { chest: '48cm', waist: '38cm' },
    featured: true,
    type: 'archive'
  },
  {
    id: '11',
    name: 'Vivienne Westwood Tartan Pants',
    brand: 'Vivienne Westwood',
    category: 'pants',
    color: 'red',
    size: 'M',
    year: 1993,
    price: 380,
    images: [
      getPlaceholderImageUrl(300, 400, 'VW Pants 1'),
      getPlaceholderImageUrl(300, 400, 'VW Pants 2'),
      getPlaceholderImageUrl(300, 400, 'VW Pants 3'),
      getPlaceholderImageUrl(300, 400, 'VW Pants 4')
    ],
    description: 'Pantaloni Vivienne Westwood in tartan del 1993.',
    condition: 'good',
    material: 'Wool tartan',
    measurements: { waist: '40cm', length: '95cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '12',
    name: 'Helmut Lang Minimalist Dress',
    brand: 'Helmut Lang',
    category: 'dresses',
    color: 'black',
    size: 'S',
    year: 1996,
    price: 520,
    images: [
      getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 4')
    ],
    description: 'Abito minimalista nero Helmut Lang del 1996.',
    condition: 'very good',
    material: 'Viscose blend',
    measurements: { chest: '44cm', waist: '38cm', length: '88cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '13',
    name: 'Alexander McQueen Skull Dress',
    brand: 'Alexander McQueen',
    category: 'dresses',
    color: 'black',
    size: 'M',
    year: 2008,
    price: 1200,
    images: [
      getPlaceholderImageUrl(300, 400, 'McQueen Dress 1'),
      getPlaceholderImageUrl(300, 400, 'McQueen Dress 2'),
      getPlaceholderImageUrl(300, 400, 'McQueen Dress 3'),
      getPlaceholderImageUrl(300, 400, 'McQueen Dress 4')
    ],
    description: 'Abito Alexander McQueen con teschio del 2008.',
    condition: 'excellent',
    material: 'Silk chiffon',
    measurements: { chest: '46cm', waist: '40cm', length: '92cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '14',
    name: 'Thierry Mugler Power Suit',
    brand: 'Thierry Mugler',
    category: 'set',
    color: 'black',
    size: 'M',
    year: 1991,
    price: 1200,
    images: [
      getPlaceholderImageUrl(300, 400, 'Mugler Suit 1'),
      getPlaceholderImageUrl(300, 400, 'Mugler Suit 2'),
      getPlaceholderImageUrl(300, 400, 'Mugler Suit 3'),
      getPlaceholderImageUrl(300, 400, 'Mugler Suit 4')
    ],
    description: 'Tailleur Thierry Mugler del 1991.',
    condition: 'very good',
    material: 'Wool',
    measurements: { chest: '50cm', waist: '42cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '15',
    name: 'John Galliano Newspaper Dress',
    brand: 'John Galliano',
    category: 'dresses',
    color: 'multicolor',
    size: 'M',
    year: 2000,
    price: 980,
    images: [
      getPlaceholderImageUrl(300, 400, 'Galliano Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Galliano Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Galliano Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Galliano Dress 4')
    ],
    description: 'Abito John Galliano con stampa giornale del 2000.',
    condition: 'excellent',
    material: 'Silk with newspaper print',
    measurements: { chest: '44cm', waist: '40cm', length: '85cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '16',
    name: 'Alaïa Bandage Dress',
    brand: 'Alaïa',
    category: 'dresses',
    color: 'black',
    size: 'S',
    year: 1992,
    price: 1850,
    images: [
      getPlaceholderImageUrl(300, 400, 'Alaia Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Alaia Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Alaia Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Alaia Dress 4')
    ],
    description: 'Abito bandage Alaïa nero del 1992.',
    condition: 'excellent',
    material: 'Viscose elastane',
    measurements: { chest: '40cm', waist: '34cm', length: '82cm' },
    featured: true,
    type: 'archive'
  },
  {
    id: '17',
    name: 'Comme des Garçons Asymmetric Top',
    brand: 'Comme des Garçons',
    category: 'top',
    color: 'white',
    size: 'M',
    year: 1996,
    price: 380,
    images: [
      getPlaceholderImageUrl(300, 400, 'CDG Top 1'),
      getPlaceholderImageUrl(300, 400, 'CDG Top 2'),
      getPlaceholderImageUrl(300, 400, 'CDG Top 3'),
      getPlaceholderImageUrl(300, 400, 'CDG Top 4')
    ],
    description: 'Top asimmetrico bianco Comme des Garçons del 1996.',
    condition: 'very good',
    material: 'Cotton',
    measurements: { chest: '48cm', length: '58cm' },
    featured: false,
    type: 'archive'
  },
  {
    id: '18',
    name: 'Yves Saint Laurent Platform Shoes',
    brand: 'Yves Saint Laurent',
    category: 'shoes',
    color: 'black',
    size: 'XS',
    year: 2004,
    price: 680,
    images: [
      getPlaceholderImageUrl(300, 400, 'YSL Shoes 1'),
      getPlaceholderImageUrl(300, 400, 'YSL Shoes 2'),
      getPlaceholderImageUrl(300, 400, 'YSL Shoes 3'),
      getPlaceholderImageUrl(300, 400, 'YSL Shoes 4')
    ],
    description: 'Scarpe con plateau Yves Saint Laurent nere del 2004.',
    condition: 'excellent',
    material: 'Leather',
    featured: false,
    type: 'archive'
  },

  // Prodotti Collezione (33 elementi)
  {
    id: '19',
    name: 'Miss Sixty Low-Rise Jeans',
    brand: 'Miss Sixty',
    category: 'pants',
    color: 'blue',
    size: 'S',
    year: 2003,
    price: 120,
    images: [
      getPlaceholderImageUrl(300, 400, 'Miss Sixty Jeans 1'),
      getPlaceholderImageUrl(300, 400, 'Miss Sixty Jeans 2'),
      getPlaceholderImageUrl(300, 400, 'Miss Sixty Jeans 3'),
      getPlaceholderImageUrl(300, 400, 'Miss Sixty Jeans 4')
    ],
    description: 'Jeans a vita bassa Miss Sixty del 2003.',
    condition: 'very good',
    material: 'Cotton denim',
    measurements: { waist: '32cm', length: '98cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-miss-sixty-jeans',
      vestiaire: 'https://www.vestiairecollective.com/example-miss-sixty-jeans'
    }
  },
  {
    id: '20',
    name: 'Blumarine Embellished Top',
    brand: 'Blumarine',
    category: 'top',
    color: 'pink',
    size: 'M',
    year: 2004,
    price: 280,
    images: [
      getPlaceholderImageUrl(300, 400, 'Blumarine Top 1'),
      getPlaceholderImageUrl(300, 400, 'Blumarine Top 2'),
      getPlaceholderImageUrl(300, 400, 'Blumarine Top 3'),
      getPlaceholderImageUrl(300, 400, 'Blumarine Top 4')
    ],
    description: 'Top Blumarine impreziosito in rosa del 2004.',
    condition: 'excellent',
    material: 'Silk with crystals',
    measurements: { chest: '44cm', length: '54cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-blumarine-top',
      vestiaire: 'https://www.vestiairecollective.com/example-blumarine-top'
    }
  },
  {
    id: '21',
    name: 'Diesel Distressed Jacket',
    brand: 'Diesel',
    category: 'jackets',
    color: 'blue',
    size: 'L',
    year: 2002,
    price: 180,
    images: [
      getPlaceholderImageUrl(300, 400, 'Diesel Jacket 1'),
      getPlaceholderImageUrl(300, 400, 'Diesel Jacket 2'),
      getPlaceholderImageUrl(300, 400, 'Diesel Jacket 3'),
      getPlaceholderImageUrl(300, 400, 'Diesel Jacket 4')
    ],
    description: 'Giacca in denim distressed Diesel del 2002.',
    condition: 'good',
    material: 'Cotton denim',
    measurements: { chest: '58cm', length: '66cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-diesel-jacket',
      vestiaire: 'https://www.vestiairecollective.com/example-diesel-jacket'
    }
  },
  {
    id: '22',
    name: 'Emilio Pucci Silk Dress',
    brand: 'Emilio Pucci',
    category: 'dresses',
    color: 'multicolor',
    size: 'M',
    year: 2006,
    price: 890,
    images: [
      getPlaceholderImageUrl(300, 400, 'Pucci Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Pucci Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Pucci Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Pucci Dress 4')
    ],
    description: 'Abito in seta Emilio Pucci con stampa psichedelica del 2006.',
    condition: 'excellent',
    material: '100% Silk',
    measurements: { chest: '46cm', waist: '42cm', length: '90cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-pucci-dress'
    }
  },
  {
    id: '23',
    name: 'Gianni Versace Medusa Shirt',
    brand: 'Gianni Versace',
    category: 'top',
    color: 'gold',
    size: 'L',
    year: 1995,
    price: 1200,
    images: [
      getPlaceholderImageUrl(300, 400, 'Versace Medusa 1'),
      getPlaceholderImageUrl(300, 400, 'Versace Medusa 2'),
      getPlaceholderImageUrl(300, 400, 'Versace Medusa 3'),
      getPlaceholderImageUrl(300, 400, 'Versace Medusa 4')
    ],
    description: 'Camicia Gianni Versace Medusa in oro del 1995.',
    condition: 'excellent',
    material: 'Silk',
    measurements: { chest: '54cm', length: '72cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-gianni-versace'
    }
  },
  {
    id: '24',
    name: 'Marithé Francois Girbaud Cargo Pants',
    brand: 'Marithé Francois Girbaud',
    category: 'pants',
    color: 'khaki',
    size: 'M',
    year: 2001,
    price: 150,
    images: [
      getPlaceholderImageUrl(300, 400, 'Girbaud Pants 1'),
      getPlaceholderImageUrl(300, 400, 'Girbaud Pants 2'),
      getPlaceholderImageUrl(300, 400, 'Girbaud Pants 3'),
      getPlaceholderImageUrl(300, 400, 'Girbaud Pants 4')
    ],
    description: 'Pantaloni cargo Marithé François Girbaud del 2001.',
    condition: 'very good',
    material: 'Cotton twill',
    measurements: { waist: '42cm', length: '106cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-girbaud-cargo',
      vestiaire: 'https://www.vestiairecollective.com/example-girbaud-cargo'
    }
  },
  {
    id: '25',
    name: 'Plein Sud Bodycon Dress',
    brand: 'Plein Sud',
    category: 'dresses',
    color: 'black',
    size: 'S',
    year: 2003,
    price: 320,
    images: [
      getPlaceholderImageUrl(300, 400, 'Plein Sud Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Plein Sud Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Plein Sud Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Plein Sud Dress 4')
    ],
    description: 'Abito aderente Plein Sud nero del 2003.',
    condition: 'excellent',
    material: 'Viscose elastane',
    measurements: { chest: '40cm', waist: '34cm', length: '84cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-plein-sud-dress',
      vestiaire: 'https://www.vestiairecollective.com/example-plein-sud-dress'
    }
  },
  {
    id: '26',
    name: 'Faycal Amor Avant-garde Jacket',
    brand: 'Faycal Amor',
    category: 'jackets',
    color: 'grey',
    size: 'M',
    year: 2008,
    price: 280,
    images: [
      getPlaceholderImageUrl(300, 400, 'Faycal Amor Jacket 1'),
      getPlaceholderImageUrl(300, 400, 'Faycal Amor Jacket 2'),
      getPlaceholderImageUrl(300, 400, 'Faycal Amor Jacket 3'),
      getPlaceholderImageUrl(300, 400, 'Faycal Amor Jacket 4')
    ],
    description: 'Giacca Faycal Amor avant-garde del 2008.',
    condition: 'very good',
    material: 'Wool blend',
    measurements: { chest: '52cm', length: '64cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-faycal-amor-jacket',
      vestiaire: 'https://www.vestiairecollective.com/example-faycal-amor-jacket'
    }
  },
  {
    id: '27',
    name: 'Ann Demeulemeester Draped Top',
    brand: 'Ann Demeulemeester',
    category: 'top',
    color: 'white',
    size: 'M',
    year: 2010,
    price: 380,
    images: [
      getPlaceholderImageUrl(300, 400, 'Ann D Draped Top 1'),
      getPlaceholderImageUrl(300, 400, 'Ann D Draped Top 2'),
      getPlaceholderImageUrl(300, 400, 'Ann D Draped Top 3'),
      getPlaceholderImageUrl(300, 400, 'Ann D Draped Top 4')
    ],
    description: 'Top drappeggiato Ann Demeulemeester in bianco del 2010.',
    condition: 'excellent',
    material: 'Cotton jersey',
    measurements: { chest: '48cm', length: '60cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-ann-d-top',
      vestiaire: 'https://www.vestiairecollective.com/example-ann-d-top'
    }
  },
  {
    id: '28',
    name: 'Comme des Garçons Black Dress',
    brand: 'Comme des Garçons',
    category: 'dresses',
    color: 'black',
    size: 'L',
    year: 2002,
    price: 420,
    images: [
      getPlaceholderImageUrl(300, 400, 'CDG Dress 1'),
      getPlaceholderImageUrl(300, 400, 'CDG Dress 2'),
      getPlaceholderImageUrl(300, 400, 'CDG Dress 3'),
      getPlaceholderImageUrl(300, 400, 'CDG Dress 4')
    ],
    description: 'Abito nero Comme des Garçons del 2002.',
    condition: 'very good',
    material: 'Wool crepe',
    measurements: { chest: '50cm', waist: '46cm', length: '94cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-cdg-dress',
      vestiaire: 'https://www.vestiairecollective.com/example-cdg-dress'
    }
  },
  {
    id: '29',
    name: 'Jean Paul Gaultier Striped Top',
    brand: 'Jean Paul Gaultier',
    category: 'top',
    color: 'navy blue',
    size: 'S',
    year: 2008,
    price: 280,
    images: [
      getPlaceholderImageUrl(300, 400, 'JPG Striped Top 1'),
      getPlaceholderImageUrl(300, 400, 'JPG Striped Top 2'),
      getPlaceholderImageUrl(300, 400, 'JPG Striped Top 3'),
      getPlaceholderImageUrl(300, 400, 'JPG Striped Top 4')
    ],
    description: 'Top a righe Jean Paul Gaultier del 2008.',
    condition: 'excellent',
    material: 'Cotton jersey',
    measurements: { chest: '42cm', length: '58cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-jpg-striped',
      vestiaire: 'https://www.vestiairecollective.com/example-jpg-striped'
    }
  },
  {
    id: '30',
    name: 'MM6 Deconstructed Skirt',
    brand: 'MM6',
    category: 'skirts',
    color: 'grey',
    size: 'M',
    year: 2006,
    price: 180,
    images: [
      getPlaceholderImageUrl(300, 400, 'MM6 Skirt 1'),
      getPlaceholderImageUrl(300, 400, 'MM6 Skirt 2'),
      getPlaceholderImageUrl(300, 400, 'MM6 Skirt 3'),
      getPlaceholderImageUrl(300, 400, 'MM6 Skirt 4')
    ],
    description: 'Gonna destrutturata MM6 grigia del 2006.',
    condition: 'excellent',
    material: 'Cotton blend',
    measurements: { waist: '40cm', length: '62cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-mm6-skirt',
      vestiaire: 'https://www.vestiairecollective.com/example-mm6-skirt'
    }
  },
  {
    id: '31',
    name: 'Maison Martin Margiela Split-toe Shoes',
    brand: 'Maison Martin Margiela',
    category: 'shoes',
    color: 'brown',
    size: 'XS',
    year: 2009,
    price: 520,
    images: [
      getPlaceholderImageUrl(300, 400, 'MMM Shoes 1'),
      getPlaceholderImageUrl(300, 400, 'MMM Shoes 2'),
      getPlaceholderImageUrl(300, 400, 'MMM Shoes 3'),
      getPlaceholderImageUrl(300, 400, 'MMM Shoes 4')
    ],
    description: 'Scarpe a punta divisa Maison Martin Margiela del 2009.',
    condition: 'very good',
    material: 'Leather',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-mmm-shoes',
      vestiaire: 'https://www.vestiairecollective.com/example-mmm-shoes'
    }
  },
  {
    id: '32',
    name: 'John Galliano Bias Cut Dress',
    brand: 'John Galliano',
    category: 'dresses',
    color: 'burgundy',
    size: 'M',
    year: 2005,
    price: 680,
    images: [
      getPlaceholderImageUrl(300, 400, 'Galliano Bias Dress 1'),
      getPlaceholderImageUrl(300, 400, 'Galliano Bias Dress 2'),
      getPlaceholderImageUrl(300, 400, 'Galliano Bias Dress 3'),
      getPlaceholderImageUrl(300, 400, 'Galliano Bias Dress 4')
    ],
    description: 'Abito a taglio obliquo John Galliano bordeaux del 2005.',
    condition: 'excellent',
    material: 'Silk charmeuse',
    measurements: { chest: '44cm', waist: '38cm', length: '88cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-galliano-dress'
    }
  },
  {
    id: '33',
    name: 'Thierry Mugler Structured Blazer',
    brand: 'Thierry Mugler',
    category: 'jackets',
    color: 'black',
    size: 'S',
    year: 2009,
    price: 580,
    images: [
      getPlaceholderImageUrl(300, 400, 'Mugler Blazer 1'),
      getPlaceholderImageUrl(300, 400, 'Mugler Blazer 2'),
      getPlaceholderImageUrl(300, 400, 'Mugler Blazer 3'),
      getPlaceholderImageUrl(300, 400, 'Mugler Blazer 4')
    ],
    description: 'Blazer strutturato Thierry Mugler nero del 2009.',
    condition: 'very good',
    material: 'Wool',
    measurements: { chest: '46cm', length: '55cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-mugler-blazer',
      vestiaire: 'https://www.vestiairecollective.com/example-mugler-blazer'
    }
  },
  {
    id: '34',
    name: 'Versace Jeans Couture Denim',
    brand: 'Versace Jeans Couture',
    category: 'pants',
    color: 'blue',
    size: 'M',
    year: 1998,
    price: 220,
    images: [
      getPlaceholderImageUrl(300, 400, 'Versace Jeans 1'),
      getPlaceholderImageUrl(300, 400, 'Versace Jeans 2'),
      getPlaceholderImageUrl(300, 400, 'Versace Jeans 3'),
      getPlaceholderImageUrl(300, 400, 'Versace Jeans 4')
    ],
    description: 'Jeans Versace Jeans Couture in denim del 1998.',
    condition: 'good',
    material: 'Cotton denim',
    measurements: { waist: '38cm', length: '102cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-versace-jeans',
      vestiaire: 'https://www.vestiairecollective.com/example-versace-jeans'
    }
  },
  {
    id: '35',
    name: 'Roberto Cavalli Sheer Top',
    brand: 'Roberto Cavalli',
    category: 'top',
    color: 'brown',
    size: 'S',
    year: 2005,
    price: 350,
    images: [
      getPlaceholderImageUrl(300, 400, 'Cavalli Sheer Top 1'),
      getPlaceholderImageUrl(300, 400, 'Cavalli Sheer Top 2'),
      getPlaceholderImageUrl(300, 400, 'Cavalli Sheer Top 3'),
      getPlaceholderImageUrl(300, 400, 'Cavalli Sheer Top 4')
    ],
    description: 'Top trasparente Roberto Cavalli del 2005.',
    condition: 'excellent',
    material: 'Silk blend',
    measurements: { chest: '40cm', length: '56cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-rc-sheer-top',
      vestiaire: 'https://www.vestiairecollective.com/example-rc-sheer-top'
    }
  },
  {
    id: '36',
    name: 'Moschino Cheap & Chic Skirt',
    brand: 'Moschino Cheap & Chic',
    category: 'skirts',
    color: 'yellow',
    size: 'M',
    year: 2001,
    price: 180,
    images: [
      getPlaceholderImageUrl(300, 400, 'Moschino Skirt 1'),
      getPlaceholderImageUrl(300, 400, 'Moschino Skirt 2'),
      getPlaceholderImageUrl(300, 400, 'Moschino Skirt 3'),
      getPlaceholderImageUrl(300, 400, 'Moschino Skirt 4')
    ],
    description: 'Gonna Moschino Cheap & Chic gialla del 2001.',
    condition: 'very good',
    material: 'Cotton',
    measurements: { waist: '36cm', length: '48cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-moschino-skirt',
      vestiaire: 'https://www.vestiairecollective.com/example-moschino-skirt'
    }
  },
  {
    id: '37',
    name: 'Fendi Baguette Bag (Early 2000s)',
    brand: 'Fendi',
    category: 'bags',
    color: 'beige',
    size: 'one size',
    year: 2000,
    price: 950,
    images: [
      getPlaceholderImageUrl(300, 400, 'Fendi Baguette 1'),
      getPlaceholderImageUrl(300, 400, 'Fendi Baguette 2'),
      getPlaceholderImageUrl(300, 400, 'Fendi Baguette 3'),
      getPlaceholderImageUrl(300, 400, 'Fendi Baguette 4')
    ],
    description: 'Borsa Fendi Baguette degli inizi degli anni 2000.',
    condition: 'good',
    material: 'Canvas and leather',
    measurements: { width: '26cm', height: '14cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-fendi-baguette'
    }
  },
  {
    id: '38',
    name: 'Christian Dior Saddle Bag',
    brand: 'Christian Dior',
    category: 'bags',
    color: 'navy blue',
    size: 'one size',
    year: 2001,
    price: 1800,
    images: [
      getPlaceholderImageUrl(300, 400, 'Dior Saddle Bag 1'),
      getPlaceholderImageUrl(300, 400, 'Dior Saddle Bag 2'),
      getPlaceholderImageUrl(300, 400, 'Dior Saddle Bag 3'),
      getPlaceholderImageUrl(300, 400, 'Dior Saddle Bag 4')
    ],
    description: 'Iconica borsa Christian Dior Saddle in blu navy del 2001.',
    condition: 'excellent',
    material: 'Canvas',
    measurements: { width: '20cm', height: '16cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-dior-saddle'
    }
  },
  {
    id: '39',
    name: 'Louis Vuitton Monogram Pochette',
    brand: 'Louis Vuitton',
    category: 'bags',
    color: 'brown',
    size: 'one size',
    year: 1999,
    price: 750,
    images: [
      getPlaceholderImageUrl(300, 400, 'LV Pochette 1'),
      getPlaceholderImageUrl(300, 400, 'LV Pochette 2'),
      getPlaceholderImageUrl(300, 400, 'LV Pochette 3'),
      getPlaceholderImageUrl(300, 400, 'LV Pochette 4')
    ],
    description: 'Pochette Louis Vuitton con monogramma del 1999.',
    condition: 'very good',
    material: 'Canvas',
    measurements: { width: '21cm', height: '13cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-lv-pochette',
      vestiaire: 'https://www.vestiairecollective.com/example-lv-pochette'
    }
  },
  {
    id: '40',
    name: 'Balenciaga City Bag (First Edition)',
    brand: 'Balenciaga',
    category: 'bags',
    color: 'black',
    size: 'one size',
    year: 2001,
    price: 1500,
    images: [
      getPlaceholderImageUrl(300, 400, 'Balenciaga City 1'),
      getPlaceholderImageUrl(300, 400, 'Balenciaga City 2'),
      getPlaceholderImageUrl(300, 400, 'Balenciaga City 3'),
      getPlaceholderImageUrl(300, 400, 'Balenciaga City 4')
    ],
    description: 'Borsa Balenciaga City (prima edizione) nera del 2001.',
    condition: 'excellent',
    material: 'Leather',
    measurements: { width: '38cm', height: '24cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-balenciaga-city'
    }
  },
  {
    id: '41',
    name: 'Chloé Paddington Bag',
    brand: 'Chloé',
    category: 'bags',
    color: 'brown',
    size: 'one size',
    year: 2002,
    price: 850,
    images: [
      getPlaceholderImageUrl(300, 400, 'Chloe Paddington 1'),
      getPlaceholderImageUrl(300, 400, 'Chloe Paddington 2'),
      getPlaceholderImageUrl(300, 400, 'Chloe Paddington 3'),
      getPlaceholderImageUrl(300, 400, 'Chloe Paddington 4')
    ],
    description: 'Borsa Chloé Paddington marrone del 2002.',
    condition: 'very good',
    material: 'Leather',
    measurements: { width: '300px', height: '28cm' }, // Fixed typo in height
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-chloe-paddington',
      vestiaire: 'https://www.vestiairecollective.com/example-chloe-paddington'
    }
  },
  {
    id: '42',
    name: 'Yves Saint Laurent Rive Gauche Bag',
    brand: 'Yves Saint Laurent',
    category: 'bags',
    color: 'red',
    size: 'one size',
    year: 2003,
    price: 780,
    images: [
      getPlaceholderImageUrl(300, 400, 'YSL Rive Gauche 1'),
      getPlaceholderImageUrl(300, 400, 'YSL Rive Gauche 2'),
      getPlaceholderImageUrl(300, 400, 'YSL Rive Gauche 3'),
      getPlaceholderImageUrl(300, 400, 'YSL Rive Gauche 4')
    ],
    description: 'Borsa Yves Saint Laurent Rive Gauche rossa del 2003.',
    condition: 'excellent',
    material: 'Suede',
    measurements: { width: '30cm', height: '22cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-ysl-rivegauche',
      vestiaire: 'https://www.vestiairecollective.com/example-ysl-rivegauche'
    }
  },
  {
    id: '43',
    name: 'Gucci Jackie Bag',
    brand: 'Gucci',
    category: 'bags',
    color: 'black',
    size: 'one size',
    year: 2005,
    price: 1100,
    images: [
      getPlaceholderImageUrl(300, 400, 'Gucci Jackie 1'),
      getPlaceholderImageUrl(300, 400, 'Gucci Jackie 2'),
      getPlaceholderImageUrl(300, 400, 'Gucci Jackie 3'),
      getPlaceholderImageUrl(300, 400, 'Gucci Jackie 4')
    ],
    description: 'Borsa Gucci Jackie nera del 2005.',
    condition: 'excellent',
    material: 'Canvas and leather',
    measurements: { width: '33cm', height: '20cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-gucci-jackie'
    }
  },
  {
    id: '44',
    name: 'Prada Spazzolato Loafers',
    brand: 'Prada',
    category: 'shoes',
    color: 'black',
    size: 'XS',
    year: 1996,
    price: 480,
    images: [
      getPlaceholderImageUrl(300, 400, 'Prada Loafers 1'),
      getPlaceholderImageUrl(300, 400, 'Prada Loafers 2'),
      getPlaceholderImageUrl(300, 400, 'Prada Loafers 3'),
      getPlaceholderImageUrl(300, 400, 'Prada Loafers 4')
    ],
    description: 'Mocassini Prada Spazzolato neri del 1996.',
    condition: 'very good',
    material: 'Brushed leather',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-prada-loafers',
      vestiaire: 'https://www.vestiairecollective.com/example-prada-loafers'
    }
  },
  {
    id: '45',
    name: 'Manolo Blahnik Hangisi Pumps',
    brand: 'Manolo Blahnik',
    category: 'shoes',
    color: 'blue',
    size: 'XS',
    year: 2008,
    price: 890,
    images: [
      getPlaceholderImageUrl(300, 400, 'Manolo Pumps 1'),
      getPlaceholderImageUrl(300, 400, 'Manolo Pumps 2'),
      getPlaceholderImageUrl(300, 400, 'Manolo Pumps 3'),
      getPlaceholderImageUrl(300, 400, 'Manolo Pumps 4')
    ],
    description: 'Décolleté Manolo Blahnik Hangisi blu del 2008.',
    condition: 'excellent',
    material: 'Satin',
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-manolo-blahnik'
    }
  },
  {
    id: '46',
    name: 'Jimmy Choo Crystal Sandals',
    brand: 'Jimmy Choo',
    category: 'shoes',
    color: 'silver',
    size: 'XS',
    year: 2007,
    price: 720,
    images: [
      getPlaceholderImageUrl(300, 400, 'Jimmy Choo Sandals 1'),
      getPlaceholderImageUrl(300, 400, 'Jimmy Choo Sandals 2'),
      getPlaceholderImageUrl(300, 400, 'Jimmy Choo Sandals 3'),
      getPlaceholderImageUrl(300, 400, 'Jimmy Choo Sandals 4')
    ],
    description: 'Sandali Jimmy Choo con cristalli argento del 2007.',
    condition: 'excellent',
    material: 'Leather and crystals',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-jimmy-choo',
      vestiaire: 'https://www.vestiairecollective.com/example-jimmy-choo'
    }
  },
  {
    id: '47',
    name: 'Christian Louboutin Red Soles',
    brand: 'Christian Louboutin',
    category: 'shoes',
    color: 'black',
    size: 'XS',
    year: 2009,
    price: 680,
    images: [
      getPlaceholderImageUrl(300, 400, 'Louboutin Red Soles 1'),
      getPlaceholderImageUrl(300, 400, 'Louboutin Red Soles 2'),
      getPlaceholderImageUrl(300, 400, 'Louboutin Red Soles 3'),
      getPlaceholderImageUrl(300, 400, 'Louboutin Red Soles 4')
    ],
    description: 'Décolleté Christian Louboutin con suola rossa del 2009.',
    condition: 'very good',
    material: 'Patent leather',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-louboutin',
      vestiaire: 'https://www.vestiairecollective.com/example-louboutin'
    }
  },
  {
    id: '48',
    name: 'Versace Chain Reaction Sneakers',
    brand: 'Versace',
    category: 'shoes',
    color: 'black',
    size: 'M',
    year: 2010,
    price: 780,
    images: [
      getPlaceholderImageUrl(300, 400, 'Versace Sneakers 1'),
      getPlaceholderImageUrl(300, 400, 'Versace Sneakers 2'),
      getPlaceholderImageUrl(300, 400, 'Versace Sneakers 3'),
      getPlaceholderImageUrl(300, 400, 'Versace Sneakers 4')
    ],
    description: 'Sneakers Versace Chain Reaction nere del 2010.',
    condition: 'excellent',
    material: 'Mixed materials',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-versace-sneakers',
      vestiaire: 'https://www.vestiairecollective.com/example-versace-sneakers'
    }
  },
  {
    id: '49',
    name: 'Gucci Horsebit Loafers (Vintage)',
    brand: 'Gucci',
    category: 'shoes',
    color: 'brown',
    size: 'S',
    year: 1995,
    price: 550,
    images: [
      getPlaceholderImageUrl(300, 400, 'Gucci Loafers 1'),
      getPlaceholderImageUrl(300, 400, 'Gucci Loafers 2'),
      getPlaceholderImageUrl(300, 400, 'Gucci Loafers 3'),
      getPlaceholderImageUrl(300, 400, 'Gucci Loafers 4')
    ],
    description: 'Mocassini Gucci Horsebit vintage marroni del 1995.',
    condition: 'very good',
    material: 'Leather',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-gucci-horsebit',
      vestiaire: 'https://www.vestiairecollective.com/example-gucci-horsebit'
    }
  },
  {
    id: '50',
    name: 'Chanel Classic Flap Bag',
    brand: 'Chanel',
    category: 'bags',
    color: 'black',
    size: 'one size',
    year: 1990,
    price: 4500,
    images: [
      getPlaceholderImageUrl(300, 400, 'Chanel Flap Bag 1'),
      getPlaceholderImageUrl(300, 400, 'Chanel Flap Bag 2'),
      getPlaceholderImageUrl(300, 400, 'Chanel Flap Bag 3'),
      getPlaceholderImageUrl(300, 400, 'Chanel Flap Bag 4')
    ],
    description: 'Borsa Chanel Classic Flap nera del 1990.',
    condition: 'excellent',
    material: 'Lambskin leather',
    measurements: { width: '26cm', height: '16cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-chanel-flap'
    }
  },
  {
    id: '51',
    name: 'Hermès Birkin Bag (Pre-owned)',
    brand: 'Hermès',
    category: 'bags',
    color: 'tan',
    size: 'one size',
    year: 2005,
    price: 12000,
    images: [
      getPlaceholderImageUrl(300, 400, 'Hermes Birkin 1'),
      getPlaceholderImageUrl(300, 400, 'Hermes Birkin 2'),
      getPlaceholderImageUrl(300, 400, 'Hermes Birkin 3'),
      getPlaceholderImageUrl(300, 400, 'Hermes Birkin 4')
    ],
    description: 'Borsa Hermès Birkin pre-owned in pelle tan del 2005.',
    condition: 'very good',
    material: 'Togo leather',
    measurements: { width: '35cm', height: '25cm' },
    featured: true,
    type: 'product',
    purchaseLinks: {
      vestiaire: 'https://www.vestiairecollective.com/example-hermes-birkin'
    }
  },
  {
    id: '52',
    name: 'Celine Phantom Cabas',
    brand: 'Celine',
    category: 'bags',
    color: 'grey',
    size: 'one size',
    year: 2010,
    price: 1800,
    images: [
      getPlaceholderImageUrl(300, 400, 'Celine Phantom 1'),
      getPlaceholderImageUrl(300, 400, 'Celine Phantom 2'),
      getPlaceholderImageUrl(300, 400, 'Celine Phantom 3'),
      getPlaceholderImageUrl(300, 400, 'Celine Phantom 4')
    ],
    description: 'Borsa Celine Phantom Cabas grigia del 2010.',
    condition: 'excellent',
    material: 'Leather',
    measurements: { width: '30cm', height: '30cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-celine-cabas',
      vestiaire: 'https://www.vestiairecollective.com/example-celine-cabas'
    }
  },
  {
    id: '53',
    name: 'Givenchy Antigona Bag',
    brand: 'Givenchy',
    category: 'bags',
    color: 'black',
    size: 'one size',
    year: 2008,
    price: 1400,
    images: [
      getPlaceholderImageUrl(300, 400, 'Givenchy Antigona 1'),
      getPlaceholderImageUrl(300, 400, 'Givenchy Antigona 2'),
      getPlaceholderImageUrl(300, 400, 'Givenchy Antigona 3'),
      getPlaceholderImageUrl(300, 400, 'Givenchy Antigona 4')
    ],
    description: 'Borsa Givenchy Antigona nera del 2008.',
    condition: 'excellent',
    material: 'Leather',
    measurements: { width: '33cm', height: '28cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-givenchy-antigona',
      vestiaire: 'https://www.vestiairecollective.com/example-givenchy-antigona'
    }
  },
  {
    id: '54',
    name: 'Bottega Veneta Intrecciato Bag',
    brand: 'Bottega Veneta',
    category: 'bags',
    color: 'brown',
    size: 'one size',
    year: 2006,
    price: 1600,
    images: [
      getPlaceholderImageUrl(300, 400, 'Bottega Intrecciato 1'),
      getPlaceholderImageUrl(300, 400, 'Bottega Intrecciato 2'),
      getPlaceholderImageUrl(300, 400, 'Bottega Intrecciato 3'),
      getPlaceholderImageUrl(300, 400, 'Bottega Intrecciato 4')
    ],
    description: 'Borsa Bottega Veneta Intrecciato marrone del 2006.',
    condition: 'excellent',
    material: 'Leather',
    measurements: { width: '36cm', height: '26cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-bottega-intrecciato',
      vestiaire: 'https://www.vestiairecollective.com/example-bottega-intrecciato'
    }
  },
  {
    id: '55',
    name: 'Loewe Puzzle Bag',
    brand: 'Loewe',
    category: 'bags',
    color: 'blue',
    size: 'one size',
    year: 2010,
    price: 1900,
    images: [
      getPlaceholderImageUrl(300, 400, 'Loewe Puzzle 1'),
      getPlaceholderImageUrl(300, 400, 'Loewe Puzzle 2'),
      getPlaceholderImageUrl(300, 400, 'Loewe Puzzle 3'),
      getPlaceholderImageUrl(300, 400, 'Loewe Puzzle 4')
    ],
    description: 'Borsa Loewe Puzzle blu del 2010.',
    condition: 'excellent',
    material: 'Leather',
    measurements: { width: '29cm', height: '19cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-loewe-puzzle',
      vestiaire: 'https://www.vestiairecollective.com/example-loewe-puzzle'
    }
  },
  {
    id: '56',
    name: 'Proenza Schouler PS1 Bag',
    brand: 'Proenza Schouler',
    category: 'bags',
    color: 'grey',
    size: 'one size',
    year: 2008,
    price: 1200,
    images: [
      getPlaceholderImageUrl(300, 400, 'PS1 Bag 1'),
      getPlaceholderImageUrl(300, 400, 'PS1 Bag 2'),
      getPlaceholderImageUrl(300, 400, 'PS1 Bag 3'),
      getPlaceholderImageUrl(300, 400, 'PS1 Bag 4')
    ],
    description: 'Borsa Proenza Schouler PS1 grigia del 2008.',
    condition: 'excellent',
    material: 'Leather',
    measurements: { width: '32cm', height: '25cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-ps1-bag',
      vestiaire: 'https://www.vestiairecollective.com/example-ps1-bag'
    }
  },
  {
    id: '57',
    name: 'Acne Studios Canada Scarf',
    brand: 'Acne Studios',
    category: 'accessories',
    color: 'grey',
    size: 'one size',
    year: 2010,
    price: 150,
    images: [
      getPlaceholderImageUrl(300, 400, 'Acne Scarf 1'),
      getPlaceholderImageUrl(300, 400, 'Acne Scarf 2'),
      getPlaceholderImageUrl(300, 400, 'Acne Scarf 3'),
      getPlaceholderImageUrl(300, 400, 'Acne Scarf 4')
    ],
    description: 'Sciarpa Acne Studios Canada in grigio del 2010.',
    condition: 'excellent',
    material: 'Wool',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-acne-scarf',
      vestiaire: 'https://www.vestiairecollective.com/example-acne-scarf'
    }
  },
  {
    id: '58',
    name: 'Ray-Ban Wayfarer Sunglasses',
    brand: 'Ray-Ban',
    category: 'accessories',
    color: 'black',
    size: 'one size',
    year: 1990,
    price: 90,
    images: [
      getPlaceholderImageUrl(300, 400, 'Ray-Ban Wayfarer 1'),
      getPlaceholderImageUrl(300, 400, 'Ray-Ban Wayfarer 2'),
      getPlaceholderImageUrl(300, 400, 'Ray-Ban Wayfarer 3'),
      getPlaceholderImageUrl(300, 400, 'Ray-Ban Wayfarer 4')
    ],
    description: 'Occhiali da sole Ray-Ban Wayfarer neri del 1990.',
    condition: 'very good',
    material: 'Acetate',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-rayban-wayfarer',
      vestiaire: 'https://www.vestiairecollective.com/example-rayban-wayfarer'
    }
  },
  {
    id: '59',
    name: 'Oakley Frogskins Sunglasses',
    brand: 'Oakley',
    category: 'accessories',
    color: 'green',
    size: 'one size',
    year: 1990,
    price: 80,
    images: [
      getPlaceholderImageUrl(300, 400, 'Oakley Frogskins 1'),
      getPlaceholderImageUrl(300, 400, 'Oakley Frogskins 2'),
      getPlaceholderImageUrl(300, 400, 'Oakley Frogskins 3'),
      getPlaceholderImageUrl(300, 400, 'Oakley Frogskins 4')
    ],
    description: 'Occhiali da sole Oakley Frogskins verdi del 1990.',
    condition: 'good',
    material: 'Plastic',
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-oakley-frogskins',
      vestiaire: 'https://www.vestiairecollective.com/example-oakley-frogskins'
    }
  },
  {
    id: '60',
    name: 'Supreme Box Logo Tee',
    brand: 'Supreme',
    category: 'top',
    color: 'white',
    size: 'L',
    year: 1998,
    price: 600,
    images: [
      getPlaceholderImageUrl(300, 400, 'Supreme Bogo 1'),
      getPlaceholderImageUrl(300, 400, 'Supreme Bogo 2'),
      getPlaceholderImageUrl(300, 400, 'Supreme Bogo 3'),
      getPlaceholderImageUrl(300, 400, 'Supreme Bogo 4')
    ],
    description: 'T-shirt Supreme Box Logo bianca del 1998.',
    condition: 'very good',
    material: 'Cotton',
    measurements: { chest: '56cm', length: '74cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-supreme-bogo',
      vestiaire: 'https://www.vestiairecollective.com/example-supreme-bogo'
    }
  },
  {
    id: '61',
    name: 'Bape Shark Hoodie',
    brand: 'Bape',
    category: 'outerwear',
    color: 'camo',
    size: 'M',
    year: 2004,
    price: 800,
    images: [
      getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 1'),
      getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 2'),
      getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 3'),
      getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 4')
    ],
    description: 'Felpa con cappuccio Bape Shark mimetica del 2004.',
    condition: 'excellent',
    material: 'Cotton fleece',
    measurements: { chest: '58cm', length: '68cm' },
    featured: false,
    type: 'product',
    purchaseLinks: {
      vinted: 'https://www.vinted.it/example-bape-hoodie',
      vestiaire: 'https://www.vestiairecollective.com/example-bape-hoodie'
    }
  },
];

// Dati fittizi per gli articoli della Libreria
const mockLibraryItems = [
  {
    id: 'L1',
    name: 'Fashion History: From Ancient to Modern',
    author: 'Jane Doe',
    publisher: 'Fashion Books Inc.',
    year: 2015,
    category: 'history',
    images: [getPlaceholderImageUrl(300, 400, 'Book 1')],
    description: 'A comprehensive guide to the history of fashion.',
    featured: true,
    type: 'book'
  },
  {
    id: 'L2',
    name: 'The Art of Dressmaking',
    author: 'John Smith',
    publisher: 'Craft Publications',
    year: 2008,
    category: 'craft',
    images: [getPlaceholderImageUrl(300, 400, 'Book 2')],
    description: 'Techniques and tips for haute couture.',
    featured: false,
    type: 'book'
  },
  {
    id: 'L3',
    name: 'Iconic Designers of the 20th Century',
    author: 'Emily White',
    publisher: 'Style Press',
    year: 2020,
    category: 'biography',
    images: [getPlaceholderImageUrl(300, 400, 'Book 3')],
    description: 'Biographies of the most influential fashion designers.',
    featured: true,
    type: 'book'
  },
  {
    id: 'L4',
    name: 'Street Style Photography',
    author: 'Michael Brown',
    publisher: 'Photo Books Ltd.',
    year: 2018,
    category: 'photography',
    images: [getPlaceholderImageUrl(300, 400, 'Book 4')],
    description: 'Capturing the essence of urban fashion.',
    featured: false,
    type: 'book'
  },
  {
    id: 'L5',
    name: 'Sustainable Fashion: A New Era',
    author: 'Sophia Green',
    publisher: 'Eco Publishing',
    year: 2022,
    category: 'sustainability',
    images: [getPlaceholderImageUrl(300, 400, 'Book 5')],
    description: 'Exploring ethical and sustainable practices in fashion.',
    featured: true,
    type: 'book'
  },
  {
    id: 'L6',
    name: 'Vintage Clothing: Collecting and Restoring',
    author: 'Laura Adams',
    publisher: 'Collectors Guild',
    year: 2010,
    category: 'collecting',
    images: [getPlaceholderImageUrl(300, 400, 'Book 6')],
    description: 'A guide for vintage fashion enthusiasts.',
    featured: false,
    type: 'book'
  },
  {
    id: 'L7',
    name: 'The Language of Fashion',
    author: 'David Clark',
    publisher: 'Cultural Studies',
    year: 2017,
    category: 'theory',
    images: [getPlaceholderImageUrl(300, 400, 'Book 7')],
    description: 'Semiotics and meaning in fashion.',
    featured: false,
    type: 'book'
  },
  {
    id: 'L8',
    name: 'Digital Fashion and the Metaverse',
    author: 'Chloe Lee',
    publisher: 'TechStyle Publishers',
    year: 2023,
    category: 'digital',
    images: [getPlaceholderImageUrl(300, 400, 'Book 8')],
    description: 'The future of fashion in virtual worlds.',
    featured: true,
    type: 'book'
  },
  {
    id: 'L9',
    name: 'Minimalist Wardrobe Handbook',
    author: 'Sarah Chen',
    publisher: 'Lifestyle Guides',
    year: 2019,
    category: 'lifestyle',
    images: [getPlaceholderImageUrl(300, 400, 'Book 9')],
    description: 'Creating a versatile and timeless wardrobe.',
    featured: false,
    type: 'book'
  },
  {
    id: 'L10',
    name: 'Haute Couture: The Masters',
    author: 'Pierre Dubois',
    publisher: 'Art & Fashion',
    year: 2012,
    category: 'history',
    images: [getPlaceholderImageUrl(300, 400, 'Book 10')],
    description: 'A look at the most exclusive fashion houses.',
    featured: true,
    type: 'book'
  }
];

// Segregazione dei prodotti in Collezione e Archivio
const mockCollectionProducts = mockProducts.filter(p => p.type === 'product');
const mockArchiveProducts = mockProducts.filter(p => p.type === 'archive');

// Funzione di utilità per capitalizzare la prima lettera di una stringa
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Funzione per ottenere opzioni di filtro uniche
const getUniqueFilterOptions = (items, key) => {
  const options = [...new Set(items.map(item => item[key]))].filter(Boolean);
  // Ordina le opzioni, mettendo 'one size' alla fine se presente
  return options.sort((a, b) => {
    if (a === 'one size') return 1;
    if (b === 'one size') return -1;
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    return 0;
  });
};

// Generazione delle liste di opzioni per i filtri
const allBrandsCollection = getUniqueFilterOptions(mockCollectionProducts, 'brand');
const allCategoriesCollection = getUniqueFilterOptions(mockCollectionProducts, 'category');
const allColorsCollection = getUniqueFilterOptions(mockCollectionProducts, 'color');
const allSizesCollection = getUniqueFilterOptions(mockCollectionProducts, 'size');
const allYearsCollection = getUniqueFilterOptions(mockCollectionProducts, 'year').sort((a,b) => b - a); // Anni dal più recente al più vecchio

const allBrandsArchive = getUniqueFilterOptions(mockArchiveProducts, 'brand');
const allCategoriesArchive = getUniqueFilterOptions(mockArchiveProducts, 'category');
const allColorsArchive = getUniqueFilterOptions(mockArchiveProducts, 'color');
const allSizesArchive = getUniqueFilterOptions(mockArchiveProducts, 'size');
const allYearsArchive = getUniqueFilterOptions(mockArchiveProducts, 'year').sort((a,b) => b - a); // Anni dal più recente al più vecchio

const allPublishersLibrary = getUniqueFilterOptions(mockLibraryItems, 'publisher');
const allCategoriesLibrary = getUniqueFilterOptions(mockLibraryItems, 'category');
const allYearsLibrary = getUniqueFilterOptions(mockLibraryItems, 'year').sort((a,b) => b - a); // Anni dal più recente al più vecchio


// Componente generico per un modale
const Modal = ({ children, onClose, title }) => {
  // Se la lucideReact non è definita, non renderizzare il modale o gestisci l'errore.
  if (!window.lucideReact) {
    console.error("Lucide React non disponibile per il componente Modal.");
    return null;
  }
  const { X } = window.lucideReact; // Icona chiudi

  return React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4",
      onClick: onClose // Chiudi il modale cliccando fuori
    },
    React.createElement(
      "div",
      {
        className: "bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative",
        onClick: (e) => e.stopPropagation() // Impedisce la chiusura del modale quando si clicca al suo interno
      },
      React.createElement(
        "button",
        {
          className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900",
          onClick: onClose,
          "aria-label": "Chiudi"
        },
        React.createElement(X, { size: 24 })
      ),
      title && React.createElement(
        "h3",
        { className: "font-martian-mono text-xl font-bold uppercase mb-4 text-center" },
        title
      ),
      children
    )
  );
};

// Modale per la richiesta di prodotto (Contact Form)
const ContactFormModal = ({ onClose, title = "INVIA UN MESSAGGIO" }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dati del form inviati:", formData);
    // Usare un alert per la demo, in produzione un'UI personalizzata
    alert("Messaggio inviato con successo!"); 
    onClose();
  };

  const subjects = ['Richiesta prodotto', 'Richiesta di ricerca', 'Altro'];

  return React.createElement(
    Modal,
    { onClose: onClose, title: title },
    React.createElement(
      "form",
      { onSubmit: handleSubmit, className: "flex flex-col space-y-4" },
      React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "il tuo nome completo*",
        value: formData.name,
        onChange: handleChange,
        className: "p-3 border border-gray-300 rounded-md font-martian-mono text-sm focus:outline-none focus:ring-1 focus:ring-black",
        required: true
      }),
      React.createElement("input", {
        type: "email",
        name: "email",
        placeholder: "la.tua.email@esempio.com*",
        value: formData.email,
        onChange: handleChange,
        className: "p-3 border border-gray-300 rounded-md font-martian-mono text-sm focus:outline-none focus:ring-1 focus:ring-black",
        required: true
      }),
      React.createElement(
        "select",
        {
          name: "subject",
          value: formData.subject,
          onChange: handleChange,
          className: "p-3 border border-gray-300 rounded-md font-martian-mono text-sm focus:outline-none focus:ring-1 focus:ring-black",
          required: true
        },
        React.createElement("option", { value: "" }, "seleziona l'argomento del messaggio*"),
        subjects.map(sub =>
          React.createElement("option", { key: sub, value: sub }, sub)
        )
      ),
      React.createElement("textarea", {
        name: "message",
        placeholder: "scrivi qui il tuo messaggio...",
        value: formData.message,
        onChange: handleChange,
        rows: "5",
        className: "p-3 border border-gray-300 rounded-md font-martian-mono text-sm focus:outline-none focus:ring-1 focus:ring-black",
        required: true
      }),
      React.createElement(
        "button",
        {
          type: "submit",
          className: "bg-black text-white px-6 py-3 rounded-full font-bold uppercase text-sm\n                         transition-colors duration-300 ease-in-out hover:bg-dark-gray focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        },
        "INVIA MESSAGGIO"
      )
    )
  );
};

// Modale per le piattaforme di acquisto
const PlatformsModal = ({ onClose, purchaseLinks, title = "DISPONIBILE SU PIATTAFORME" }) => {
  if (!window.lucideReact) return null;
  const { ExternalLink } = window.lucideReact;

  return React.createElement(
    Modal,
    { onClose: onClose, title: title },
    React.createElement(
      "div",
      { className: "flex flex-col space-y-4" },
      purchaseLinks && Object.entries(purchaseLinks).map(([platform, link]) =>
        React.createElement(
          "a",
          {
            key: platform,
            href: link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-between p-3 border border-gray-200 rounded-md\n                               font-martian-mono uppercase text-black hover:bg-gray-50 transition-colors"
          },
          capitalizeFirstLetter(platform),
          React.createElement(ExternalLink, { size: 18 })
        )
      ),
      !purchaseLinks && React.createElement(
        "p",
        { className: "text-center text-cold-gray font-martian-mono text-sm" },
        "Nessun link di acquisto disponibile per questo articolo."
      )
    )
  );
};


// Componente per la card prodotto
const ProductCard = ({ product, navigateTo, type }) => {
  return React.createElement(
    "div",
    {
      className: "flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md\n                   transition-shadow duration-300 ease-in-out cursor-pointer group",
      onClick: () => navigateTo('productDetail', product)
    },
    React.createElement(
      "div",
      { className: "w-full h-80 overflow-hidden flex items-center justify-center bg-gray-50" }, // Altezza fissa per l'immagine
      React.createElement("img", {
        src: product.images[0],
        alt: product.name,
        className: "object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105",
        onError: (e) => {
          e.target.onerror = null;
          e.target.src = getPlaceholderImageUrl(300, 400, 'Image Error');
        }
      })
    ),
    React.createElement(
      "div",
      { className: "p-4 w-full text-left" },
      React.createElement(
        "p",
        { className: "font-martian-mono uppercase text-sm text-cold-gray mb-1" },
        product.brand || product.publisher // Per libri usa publisher, per capi usa brand
      ),
      React.createElement(
        "h3",
        { className: "font-martian-mono uppercase font-bold text-base text-black mb-2" },
        product.name
      ),
      React.createElement(
        "p",
        { className: "font-martian-mono text-xs text-cold-gray" },
        `${product.year} • ${product.category}${product.color ? ' • ' + product.color : ''}${product.size && product.size !== 'one size' ? ' • ' + product.size : ''}`
      )
    )
  );
};


// Componente per la griglia di prodotti/articoli
const ProductGrid = ({ items, navigateTo, type }) => {
  return React.createElement(
    "div",
    { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8" },
    items.map(item =>
      React.createElement(ProductCard, { key: item.id, product: item, navigateTo: navigateTo, type: type })
    )
  );
};


// Componente Navbar (per pagine interne)
const Navbar = ({ navigateTo }) => {
  if (!window.lucideReact) return null;
  const { Search } = window.lucideReact;

  return React.createElement(
    "nav",
    { className: "w-full flex flex-col sm:flex-row items-center justify-between py-6 px-4 border-b border-gray-200" },
    React.createElement(
      "div",
      { className: "flex items-center mb-4 sm:mb-0" },
      React.createElement(
        "h1",
        {
          className: "text-2xl font-bitcount-single uppercase cursor-pointer", // Modificato per coerenza con CSS
          onClick: () => navigateTo('home')
        },
        "gdarchivio"
      )
    ),
    React.createElement(
      "div",
      { className: "flex space-x-4 sm:space-x-8 mb-4 sm:mb-0" },
      React.createElement(
        "button",
        {
          className: "font-martian-mono uppercase text-dark-gray hover:text-black transition-colors",
          onClick: () => navigateTo('collection')
        },
        "Collection"
      ),
      React.createElement(
        "button",
        {
          className: "font-martian-mono uppercase text-dark-gray hover:text-black transition-colors",
          onClick: () => navigateTo('archive')
        },
        "Archive"
      ),
      React.createElement(
        "button",
        {
          className: "font-martian-mono uppercase text-dark-gray hover:text-black transition-colors",
          onClick: () => navigateTo('library')
        },
        "Library"
      ),
      React.createElement(
        "button",
        {
          className: "font-martian-mono uppercase text-dark-gray hover:text-black transition-colors",
          onClick: () => navigateTo('contact')
        },
        "Contact"
      )
    ),
    React.createElement(
      "div",
      { className: "relative w-full sm:w-auto" },
      React.createElement("input", {
        type: "text",
        placeholder: "Cerca...",
        className: "pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm font-martian-mono w-full sm:w-48 focus:outline-none focus:ring-1 focus:ring-black"
      }),
      React.createElement(Search, {
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
        size: 18
      })
    )
  );
};


// Componente Footer (per pagine interne)
const InternalFooter = ({ navigateTo }) => {
  return React.createElement(
    "footer",
    { className: "w-full bg-white text-black py-12 flex flex-col items-center justify-center border-t border-gray-200 mt-12" },
    React.createElement(
      "h3",
      {
        className: "text-2xl font-bitcount-single uppercase cursor-pointer mb-4", // Modificato per coerenza con CSS
        onClick: () => navigateTo('home')
      },
      "gdarchivio"
    ),
    React.createElement(
      "p",
      { className: "font-martian-mono text-sm uppercase text-cold-gray mb-4 text-center" },
      "curated fashion archive. authentic pieces from the world's most iconic maisons."
    ),
    React.createElement(
      "a",
      {
        href: "https://www.instagram.com/gdarchivio", // Sostituisci con il tuo link Instagram
        target: "_blank",
        rel: "noopener noreferrer",
        className: "font-martian-mono uppercase text-dark-gray hover:text-black transition-colors text-sm mb-6"
      },
      "Instagram"
    ),
    React.createElement(
      "p",
      { className: "font-martian-mono text-xs uppercase text-cold-gray text-center" },
      "© 2025 GDARCHIVIO. ALL RIGHTS RESERVED."
    )
  );
};


// Componente FilterBar
const FilterBar = ({ filters, setFilters, sort, setSort, availableFilters, availableSorts, itemCount }) => {
  if (!window.lucideReact) return null;
  const { ChevronDown } = window.lucideReact;

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => {
      const currentValues = prev[filterName] || [];
      if (currentValues.includes(value)) {
        return { ...prev, [filterName]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [filterName]: [...currentValues, value] };
      }
    });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return React.createElement(
    "div",
    { className: "w-full flex flex-col sm:flex-row items-center justify-between py-4 px-4 border-b border-gray-200 bg-gray-50" },
    React.createElement(
      "div",
      { className: "flex flex-wrap items-center gap-4 mb-4 sm:mb-0" },
      React.createElement(
        "span",
        { className: "font-martian-mono uppercase text-sm font-bold text-dark-gray" },
        "FILTER:"
      ),
      Object.entries(availableFilters).map(([filterName, options]) =>
        React.createElement(
          "div",
          { key: filterName, className: "relative group" },
          React.createElement(
            "button",
            { className: "flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full\n                                   font-martian-mono text-sm uppercase text-cold-gray hover:border-black transition-colors" },
            capitalizeFirstLetter(filterName),
            React.createElement(ChevronDown, { size: 16, className: "ml-2" })
          ),
          React.createElement(
            "div",
            { className: "absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg\n                                 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10" },
            options.map(option =>
              React.createElement(
                "label",
                { key: option, className: "flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" },
                React.createElement("input", {
                  type: "checkbox",
                  value: option,
                  checked: (filters[filterName] || []).includes(option),
                  onChange: () => handleFilterChange(filterName, option),
                  className: "mr-2 accent-black"
                }),
                React.createElement(
                  "span",
                  { className: "font-martian-mono text-sm uppercase text-dark-gray" },
                  capitalizeFirstLetter(option.toString())
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex items-center gap-4" },
      React.createElement(
        "span",
        { className: "font-martian-mono uppercase text-sm font-bold text-dark-gray" },
        `${itemCount} ITEMS`
      ),
      React.createElement(
        "div",
        { className: "relative group" },
        React.createElement(
          "select",
          {
            value: sort,
            onChange: handleSortChange,
            className: "block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-full\n                               font-martian-mono text-sm uppercase text-cold-gray appearance-none focus:outline-none focus:ring-1 focus:ring-black hover:border-black"
          },
          availableSorts.map(option =>
            React.createElement("option", { key: option.value, value: option.value }, option.label)
          )
        ),
        React.createElement(ChevronDown, {
          size: 16,
          className: "pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 top-1/2 -translate-y-1/2"
        })
      )
    )
  );
};


// Componente DetailPage per prodotti e articoli della libreria
const DetailPage = ({ item, navigateTo }) => {
  if (!window.lucideReact) return null;
  const { ArrowLeft, ExternalLink } = window.lucideReact;
  const [showPlatformsModal, setShowPlatformsModal] = React.useState(false);

  // Determina se l'articolo è un prodotto (vendibile) o un libro
  const isProduct = item.type === 'product' || item.type === 'archive';

  return React.createElement(
    "div",
    { className: "flex flex-col min-h-screen bg-white text-black font-martian-mono" },
    React.createElement(Navbar, { navigateTo: navigateTo }),
    React.createElement(
      "main",
      { className: "flex-grow container mx-auto px-4 py-8 flex flex-col items-center max-w-6xl" },
      React.createElement(
        "button",
        {
          className: "flex items-center self-start text-dark-gray hover:text-black transition-colors mb-8",
          onClick: () => navigateTo(item.type === 'book' ? 'library' : (item.type === 'product' ? 'collection' : 'archive'))
        },
        React.createElement(ArrowLeft, { size: 20, className: "mr-2" }),
        "Torna alla lista"
      ),

      React.createElement(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-2 gap-8 w-full" },
        // Colonna Immagini (sinistra)
        React.createElement(
          "div",
          { className: "flex flex-col items-center space-y-4" },
          React.createElement("img", {
            src: item.images[0],
            alt: item.name,
            className: "w-full max-w-md rounded-lg shadow-md",
            onError: (e) => {
              e.target.onerror = null;
              e.target.src = getPlaceholderImageUrl(400, 500, 'Image Error');
            }
          }),
          React.createElement(
            "div",
            { className: "flex gap-2 justify-center w-full" },
            item.images.slice(1, 4).map((img, index) =>
              React.createElement("img", {
                key: index,
                src: img,
                alt: `${item.name} - Immagine ${index + 2}`,
                className: "w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-75 transition-opacity",
                onError: (e) => {
                  e.target.onerror = null;
                  e.target.src = getPlaceholderImageUrl(100, 100, 'Error');
                }
              })
            )
          )
        ),
        // Colonna Dettagli (destra)
        React.createElement(
          "div",
          { className: "flex flex-col text-left" },
          React.createElement(
            "p",
            { className: "text-cold-gray uppercase text-sm mb-1" },
            item.brand || item.publisher // Mostra brand o publisher
          ),
          React.createElement(
            "h2",
            { className: "text-3xl font-bold uppercase mb-4" },
            item.name
          ),
          React.createElement(
            "p",
            { className: "text-lg font-bold mb-4" },
            isProduct ? `€${item.price.toFixed(2)}` : `Anno: ${item.year}`
          ),
          React.createElement(
            "p",
            { className: "text-cold-gray mb-6 leading-relaxed" },
            item.description
          ),

          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-4 text-sm mb-6" },
            item.year && React.createElement(
              "div",
              null,
              React.createElement("span", { className: "font-bold" }, "Anno: "),
              React.createElement("span", null, item.year)
            ),
            item.category && React.createElement(
              "div",
              null,
              React.createElement("span", { className: "font-bold" }, "Categoria: "),
              React.createElement("span", null, capitalizeFirstLetter(item.category))
            ),
            item.color && React.createElement(
              "div",
              null,
              React.createElement("span", { className: "font-bold" }, "Colore: "),
              React.createElement("span", null, capitalizeFirstLetter(item.color))
            ),
            item.size && React.createElement(
              "div",
              null,
              React.createElement("span", { className: "font-bold" }, "Taglia: "),
              React.createElement("span", null, item.size.toUpperCase())
            ),
            item.condition && React.createElement(
              "div",
              null,
              React.createElement("span", { className: "font-bold" }, "Condizione: "),
              React.createElement("span", null, capitalizeFirstLetter(item.condition))
            ),
            item.material && React.createElement(
              "div",
              null,
              React.createElement("span", { className: "font-bold" }, "Materiale: "),
              React.createElement("span", null, capitalizeFirstLetter(item.material))
            ),
            item.measurements && Object.entries(item.measurements).map(([key, value]) =>
              React.createElement(
                "div",
                { key: key },
                React.createElement("span", { className: "font-bold" }, `${capitalizeFirstLetter(key)}: `),
                React.createElement("span", null, value)
              )
            ),
            item.author && React.createElement(
              "div",
              null,
              React.createElement("span", { className: "font-bold" }, "Autore: "),
              React.createElement("span", null, item.author)
            )
          ),

          isProduct ?
          React.createElement(
            "div",
            { className: "flex flex-col space-y-4" },
            React.createElement(
              "button",
              {
                className: "bg-black text-white px-6 py-3 rounded-full font-bold uppercase text-sm\n                           transition-colors duration-300 ease-in-out hover:bg-dark-gray focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                onClick: () => setShowPlatformsModal(true)
              },
              "Acquista su piattaforme"
            ),
            React.createElement(
              "button",
              {
                className: "bg-transparent border border-black text-black px-6 py-3 rounded-full font-bold uppercase text-sm\n                           transition-colors duration-300 ease-in-out hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                onClick: () => navigateTo('contactForm', item)
              },
              "Richiedi questo prodotto"
            )
          )
          :
          React.createElement(
            "button",
            {
              className: "bg-black text-white px-6 py-3 rounded-full font-bold uppercase text-sm\n                         transition-colors duration-300 ease-in-out hover:bg-dark-gray focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
              onClick: () => navigateTo('contactForm', item)
            },
            "Richiedi questo libro"
          )
        )
      ),
      showPlatformsModal && React.createElement(PlatformsModal, { onClose: () => setShowPlatformsModal(false), purchaseLinks: item.purchaseLinks })
    ),
    React.createElement(InternalFooter, { navigateTo: navigateTo })
  );
};


// Pagina Home
const HomePage = ({ navigateTo }) => {
  if (!window.lucideReact) return null;
  const { ArrowRight } = window.lucideReact;

  return React.createElement(
    "div",
    { className: "flex flex-col min-h-screen bg-white text-black font-martian-mono" },
    React.createElement(
      "header",
      { className: "relative h-screen flex flex-col justify-center items-center text-white p-4" },
      React.createElement("img", {
        src: getPlaceholderImageUrl(1920, 1080, 'Fashion Archive', '1f2937', 'ffffff'),
        alt: "Hero Background",
        className: "absolute inset-0 w-full h-full object-cover z-0 filter brightness-75",
        onError: (e) => {
          e.target.onerror = null;
          e.target.src = getPlaceholderImageUrl(1920, 1080, 'Background Error', '1f2937', 'ffffff');
        }
      }),
      React.createElement(
        "div",
        { className: "relative z-10 text-center flex flex-col items-center" },
        React.createElement(
          "h1",
          { className: "text-5xl md:text-7xl font-bitcount-single uppercase mb-4 drop-shadow-lg" }, // Modificato per coerenza con CSS
          "gdarchivio"
        ),
        React.createElement(
          "p",
          { className: "text-lg md:text-xl uppercase max-w-2xl mx-auto mb-8 tracking-wide drop-shadow-md" },
          "curated fashion archive. authentic pieces from the world's most iconic maisons."
        ),
        React.createElement(
          "div",
          { className: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" },
          React.createElement(
            "button",
            {
              className: "bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-lg flex items-center justify-center\n                               transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
              onClick: () => navigateTo('collection')
            },
            "Shop Collection",
            React.createElement(ArrowRight, { size: 20, className: "ml-2" })
          ),
          React.createElement(
            "button",
            {
              className: "bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase text-lg flex items-center justify-center\n                               transition-all duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
              onClick: () => navigateTo('archive')
            },
            "Explore Archive",
            React.createElement(ArrowRight, { size: 20, className: "ml-2" })
          )
        )
      )
    ),
    React.createElement(
      "footer",
      { className: "bg-black text-white py-8 text-center" },
      React.createElement(
        "p",
        { className: "font-martian-mono text-sm uppercase text-cold-gray" },
        "© 2025 GDARCHIVIO. ALL RIGHTS RESERVED."
      )
    )
  );
};


// Pagina Collezione
const CollectionPage = ({ navigateTo }) => {
  const [filters, setFilters] = React.useState({});
  const [sort, setSort] = React.useState('newest'); // Opzione di default

  const availableFilters = {
    brand: allBrandsCollection,
    category: allCategoriesCollection,
    color: allColorsCollection,
    size: allSizesCollection,
    year: allYearsCollection
  };

  const availableSorts = [
    { label: 'Più Recente', value: 'newest' },
    { label: 'Meno Recente', value: 'oldest' },
    { label: 'Prezzo Crescente', value: 'price_asc' },
    { label: 'Prezzo Decrescente', value: 'price_desc' },
  ];

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = mockCollectionProducts.filter(product => {
      for (const key in filters) {
        if (filters[key] && filters[key].length > 0) {
          if (!filters[key].includes(product[key])) {
            return false;
          }
        }
      }
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [filters, sort]);

  return React.createElement(
    "div",
    { className: "flex flex-col min-h-screen bg-white text-black font-martian-mono" },
    React.createElement(Navbar, { navigateTo: navigateTo }),
    React.createElement(FilterBar, {
      filters: filters,
      setFilters: setFilters,
      sort: sort,
      setSort: setSort,
      availableFilters: availableFilters,
      availableSorts: availableSorts,
      itemCount: filteredAndSortedProducts.length
    }),
    React.createElement(
      "main",
      { className: "flex-grow container mx-auto px-4 py-8 flex flex-col items-center" },
      React.createElement(
        "h2",
        { className: "text-4xl font-bitcount-single uppercase mb-4" }, // Modificato per coerenza con CSS
        "Collection"
      ),
      React.createElement(
        "p",
        { className: "text-lg text-cold-gray mb-8 text-center max-w-2xl" },
        "Esplora la nostra selezione esclusiva di capi e accessori di design, disponibili per l'acquisto e pronti ad arricchire il tuo guardaroba con stile senza tempo."
      ),
      filteredAndSortedProducts.length > 0 ?
        React.createElement(ProductGrid, { items: filteredAndSortedProducts, navigateTo: navigateTo, type: 'product' }) :
        React.createElement(
          "p",
          { className: "text-center text-xl text-cold-gray mt-12" },
          "Nessun articolo trovato con i filtri selezionati."
        )
    ),
    React.createElement(InternalFooter, { navigateTo: navigateTo })
  );
};


// Pagina Archivio
const ArchivePage = ({ navigateTo }) => {
  const [filters, setFilters] = React.useState({});
  const [sort, setSort] = React.useState('newest'); // Opzione di default

  const availableFilters = {
    brand: allBrandsArchive,
    category: allCategoriesArchive,
    color: allColorsArchive,
    size: allSizesArchive,
    year: allYearsArchive
  };

  const availableSorts = [
    { label: 'Più Recente', value: 'newest' },
    { label: 'Meno Recente', value: 'oldest' },
  ];

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = mockArchiveProducts.filter(product => {
      for (const key in filters) {
        if (filters[key] && filters[key].length > 0) {
          if (!filters[key].includes(product[key])) {
            return false;
          }
        }
      }
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        default:
          return 0;
      }
    });
  }, [filters, sort]);


  return React.createElement(
    "div",
    { className: "flex flex-col min-h-screen bg-white text-black font-martian-mono" },
    React.createElement(Navbar, { navigateTo: navigateTo }),
    React.createElement(FilterBar, {
      filters: filters,
      setFilters: setFilters,
      sort: sort,
      setSort: setSort,
      availableFilters: availableFilters,
      availableSorts: availableSorts,
      itemCount: filteredAndSortedProducts.length
    }),
    React.createElement(
      "main",
      { className: "flex-grow container mx-auto px-4 py-8 flex flex-col items-center" },
      React.createElement(
        "h2",
        { className: "text-4xl font-bitcount-single uppercase mb-4" }, // Modificato per coerenza con CSS
        "Archive"
      ),
      React.createElement(
        "p",
        { className: "text-lg text-cold-gray mb-8 text-center max-w-2xl" },
        "Immergiti nella storia della moda con il nostro archivio digitale, una collezione di pezzi iconici che hanno segnato epoche e stili. Questi articoli sono presentati a scopo espositivo e di ricerca."
      ),
      filteredAndSortedProducts.length > 0 ?
        React.createElement(ProductGrid, { items: filteredAndSortedProducts, navigateTo: navigateTo, type: 'archive' }) :
        React.createElement(
          "p",
          { className: "text-center text-xl text-cold-gray mt-12" },
          "Nessun articolo trovato con i filtri selezionati."
        )
    ),
    React.createElement(InternalFooter, { navigateTo: navigateTo })
  );
};

// Pagina Libreria
const LibraryPage = ({ navigateTo }) => {
  const [filters, setFilters] = React.useState({});
  const [sort, setSort] = React.useState('newest'); // Opzione di default

  const availableFilters = {
    publisher: allPublishersLibrary,
    category: allCategoriesLibrary,
    year: allYearsLibrary
  };

  const availableSorts = [
    { label: 'Più Recente', value: 'newest' },
    { label: 'Meno Recente', value: 'oldest' },
  ];

  const filteredAndSortedItems = React.useMemo(() => {
    let filtered = mockLibraryItems.filter(item => {
      for (const key in filters) {
        if (filters[key] && filters[key].length > 0) {
          if (!filters[key].includes(item[key])) {
            return false;
          }
        }
      }
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        default:
          return 0;
      }
    });
  }, [filters, sort]);


  return React.createElement(
    "div",
    { className: "flex flex-col min-h-screen bg-white text-black font-martian-mono" },
    React.createElement(Navbar, { navigateTo: navigateTo }),
    React.createElement(FilterBar, {
      filters: filters,
      setFilters: setFilters,
      sort: sort,
      setSort: setSort,
      availableFilters: availableFilters,
      availableSorts: availableSorts,
      itemCount: filteredAndSortedItems.length
    }),
    React.createElement(
      "main",
      { className: "flex-grow container mx-auto px-4 py-8 flex flex-col items-center" },
      React.createElement(
        "h2",
        { className: "text-4xl font-bitcount-single uppercase mb-4" }, // Modificato per coerenza con CSS
        "Library"
      ),
      React.createElement(
        "p",
        { className: "text-lg text-cold-gray mb-8 text-center max-w-2xl" },
        "La nostra biblioteca digitale offre una vasta gamma di risorse, tra cui libri, riviste e articoli, per approfondire la tua conoscenza della storia e delle tendenze della moda. Questi articoli sono disponibili per la consultazione."
      ),
      filteredAndSortedItems.length > 0 ?
        React.createElement(ProductGrid, { items: filteredAndSortedItems, navigateTo: navigateTo, type: 'book' }) :
        React.createElement(
          "p",
          { className: "text-center text-xl text-cold-gray mt-12" },
          "Nessun articolo trovato con i filtri selezionati."
        )
    ),
    React.createElement(InternalFooter, { navigateTo: navigateTo })
  );
};


// Pagina Contact
const ContactPage = ({ navigateTo }) => {
  const [showContactModal, setShowContactModal] = React.useState(false);

  if (!window.lucideReact) return null;
  const { Mail, MapPin } = window.lucideReact;

  return React.createElement(
    "div",
    { className: "flex flex-col min-h-screen bg-white text-black font-martian-mono" },
    React.createElement(Navbar, { navigateTo: navigateTo }),
    React.createElement(
      "main",
      { className: "flex-grow container mx-auto px-4 py-16 flex flex-col items-center max-w-3xl" },
      React.createElement(
        "h2",
        { className: "text-4xl font-bitcount-single uppercase mb-4 text-center" }, // Modificato per coerenza con CSS
        "Contact Us"
      ),
      React.createElement(
        "p",
        { className: "text-lg text-cold-gray mb-12 text-center" },
        "Siamo a tua disposizione per qualsiasi domanda, richiesta di informazioni sui nostri capi, proposte di collaborazione o per assistenza con le tue ricerche. Compila il modulo di contatto o scrivici direttamente."
      ),
      React.createElement(
        "div",
        { className: "w-full bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center space-y-8" },
        React.createElement(
          "div",
          { className: "flex items-center space-x-4" },
          React.createElement(Mail, { size: 24, className: "text-dark-gray" }),
          React.createElement(
            "a",
            { href: "mailto:info@gdarchivio.com", className: "text-black text-lg hover:underline" },
            "info@gdarchivio.com"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center space-x-4" },
          React.createElement(MapPin, { size: 24, className: "text-dark-gray" }),
          React.createElement(
            "p",
            { className: "text-black text-lg" },
            "Prato, Toscana, Italia"
          )
        ),
        React.createElement(
          "button",
          {
            className: "bg-black text-white px-8 py-4 rounded-full font-bold uppercase text-lg\n                         transition-colors duration-300 ease-in-out hover:bg-dark-gray focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
            onClick: () => setShowContactModal(true)
          },
          "Compila il modulo di contatto"
        )
      ),
      showContactModal && React.createElement(ContactFormModal, { onClose: () => setShowContactModal(false) })
    ),
    React.createElement(InternalFooter, { navigateTo: navigateTo })
  );
};


// Componente principale dell'applicazione React (App)
const App = () => {
  const { useState, useEffect } = React;
  console.log("DEBUG: Componente App avviato per il rendering."); // Nuovo log

  // Stati per la gestione di Firebase.
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Inizializza Firebase e gestisce l'autenticazione.
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        const firebaseConfig = window.firebaseConfig;

        console.log("Firebase Config caricata da window.firebaseConfig:", firebaseConfig);

        if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_FIREBASE_API_KEY_HERE") {
          console.error("Firebase ERROR: Configurazione mancante o chiave API non valida/placeholder. Assicurati che 'apiKey' in index.html sia corretta e che le API siano abilitate in Google Cloud Console.");
          setIsAuthReady(true);
          return;
        }

        if (!window.firebase || !window.firebase.initializeApp || !window.firebase.auth || !window.firebase.firestore) {
          console.error("Firebase ERROR: SDK non completamente disponibile globalmente. Controlla i CDN compat nel file index.html.");
          setIsAuthReady(true);
          return;
        }

        let firebaseApp;
        if (firebase.apps.length === 0) {
          firebaseApp = firebase.initializeApp(firebaseConfig);
          window.firebaseApp = firebaseApp; 
        } else {
          firebaseApp = firebase.app();
        }
        
        const firebaseAuth = firebase.auth();
        const firestoreDb = firebase.firestore();

        // Aggiungi questo per la persistenza - potrebbe aiutare con l'errore di configurazione auth
        // firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // Rimosso per test
        
        setDb(firestoreDb);
        setAuth(firebaseAuth);

        if (initialAuthToken) {
          await firebaseAuth.signInWithCustomToken(initialAuthToken);
        } else {
          await firebaseAuth.signInAnonymously();
        }

        firebaseAuth.onAuthStateChanged((user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            setUserId(crypto.randomUUID());
          }
          setIsAuthReady(true);
        });
      } catch (error) {
        console.error("Errore generico durante l'inizializzazione o autenticazione Firebase:", error);
        setIsAuthReady(true);
      }
    };

    initializeFirebase();
  }, []);


  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page, item = null) => {
    setCurrentPage(page);
    setSelectedItem(item);
    window.scrollTo(0, 0); // Scrolla in cima alla pagina ad ogni navigazione
  };

  // Switch per renderizzare la pagina corretta
  switch (currentPage) {
    case 'home':
      return React.createElement(HomePage, { navigateTo: navigateTo });
    case 'collection':
      return React.createElement(CollectionPage, { navigateTo: navigateTo });
    case 'archive':
      return React.createElement(ArchivePage, { navigateTo: navigateTo });
    case 'library':
      return React.createElement(LibraryPage, { navigateTo: navigateTo });
    case 'contact':
      return React.createElement(ContactPage, { navigateTo: navigateTo });
    case 'productDetail':
    case 'bookDetail': // Entrambi usano la DetailPage
      return React.createElement(DetailPage, { item: selectedItem, navigateTo: navigateTo });
    case 'contactForm':
      return React.createElement(
        "div",
        { className: "flex flex-col min-h-screen bg-white text-black font-martian-mono" },
        React.createElement(Navbar, { navigateTo: navigateTo }),
        React.createElement(
            "main",
            { className: "flex-grow container mx-auto px-4 py-16 flex flex-col items-center max-w-3xl" },
            React.createElement(ContactFormModal, { onClose: () => navigateTo(selectedItem ? (selectedItem.type === 'book' ? 'library' : 'collection') : 'contact'), title: selectedItem ? `RICHIESTA PER: ${selectedItem.name}` : "INVIA UN MESSAGGIO" })
            ),
        React.createElement(InternalFooter, { navigateTo: navigateTo })
      );
    default:
      return React.createElement(HomePage, { navigateTo: navigateTo });
  }
};

// La funzione `renderApp` si occupa di renderizzare la componente App sulla radice React.
const renderApp = () => {
  if (reactRoot) {
    reactRoot.render(React.createElement(App));
  } else {
    console.error("Errore: la radice di React non è stata inizializzata correttamente.");
  }
};

// Avvia l'applicazione quando il DOM è completamente caricato.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp(); // Se il DOM è già pronto, renderizza immediatamente.
}

// NON ESPORTIAMO più la componente App. La rendiamo disponibile implicitamente
// al global scope per la funzione renderApp.
// export default App; // QUESTA RIGA È STATA RIMOSSA O COMMENTATA
