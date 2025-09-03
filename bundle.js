// React e ReactDOM sono assunti essere disponibili come variabili globali.
// Firebase è assunto essere disponibile globalmente.
// Lucide React è ora caricato globalmente tramite CDN.

// ===================== CORREZIONE PER LE ICONE =====================
const IconWrapper = (iconName) => {
    return (props) => {
        // FIX: Controlla window.LucideReact (con "L" maiuscola).
        if (window.LucideReact && window.LucideReact[iconName]) {
            return React.createElement(window.LucideReact[iconName], props);
        }
        
        console.warn(`Icona Lucide "${iconName}" non trovata. Verrà mostrato un fallback.`);
        const fallbackStyle = {
            width: props.size || 24, height: props.size || 24, display: 'inline-block',
            textAlign: 'center', lineHeight: `${props.size || 24}px`, fontSize: '12px',
            color: 'red', border: '1px solid red', borderRadius: '50%'
        };
        const fallbackText = {
            X: '×', ExternalLink: '↗', Search: '⚲', ArrowLeft: '←',
            ChevronDown: '▼', Mail: '✉', MapPin: '📍', ArrowRight: '→'
        }[iconName] || '?';
        return React.createElement('span', { style: fallbackStyle, 'aria-label': iconName }, fallbackText);
    };
};

const { X, ExternalLink, Search, ArrowLeft, ChevronDown, Mail, MapPin, ArrowRight } = {
    X: IconWrapper('X'),
    ExternalLink: IconWrapper('ExternalLink'),
    Search: IconWrapper('Search'),
    ArrowLeft: IconWrapper('ArrowLeft'),
    ChevronDown: IconWrapper('ChevronDown'),
    Mail: IconWrapper('Mail'),
    MapPin: IconWrapper('MapPin'),
    ArrowRight: IconWrapper('ArrowRight')
};
// ===================== FINE DELLA CORREZIONE =====================

const rootElement = document.getElementById('root');
let reactRoot = null;

if (rootElement) {
  if (!rootElement._reactRoot) { 
    rootElement._reactRoot = ReactDOM.createRoot(rootElement);
  }
  reactRoot = rootElement._reactRoot;
} else {
  console.error("Elemento 'root' non trovato nel DOM. L'applicazione non può essere montata.");
}

const getPlaceholderImageUrl = (width, height, text, bgColor = 'e0e0e0', textColor = 'ffffff') => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

const mockProducts = [
  { id: '1', name: 'Vintage Dolce & Gabbana Blazer', brand: 'Dolce & Gabbana', category: 'jackets', color: 'black', size: 'M', year: 1995, price: 450, images: [getPlaceholderImageUrl(300, 400, 'D&G Blazer 1'), getPlaceholderImageUrl(300, 400, 'D&G Blazer 2'), getPlaceholderImageUrl(300, 400, 'D&G Blazer 3'), getPlaceholderImageUrl(300, 400, 'D&G Blazer 4')], description: 'Elegante blazer vintage Dolce & Gabbana della metà degli anni \'90. Artigianato italiano al suo meglio.', condition: 'excellent', material: '100% Wool', measurements: { chest: '50cm', length: '65cm' }, featured: true, type: 'archive' },
  { id: '2', name: 'Prada Nylon Bag', brand: 'Prada', category: 'bags', color: 'brown', size: 'M', year: 1999, price: 1200, images: [getPlaceholderImageUrl(300, 400, 'Prada Bag 1'), getPlaceholderImageUrl(300, 400, 'Prada Bag 2'), getPlaceholderImageUrl(300, 400, 'Prada Bag 3'), getPlaceholderImageUrl(300, 400, 'Prada Bag 4')], description: 'Iconica borsa Prada in nylon del 1999. Un pezzo del lusso minimalista degli anni \'90.', condition: 'very good', material: 'Nylon and leather', measurements: { width: '30cm', height: '25cm' }, featured: true, type: 'archive' },
  { id: '3', name: 'Gucci Flora Silk Scarf', brand: 'Gucci', category: 'accessories', color: 'multicolor', size: 'one size', year: 1998, price: 180, images: [getPlaceholderImageUrl(300, 400, 'Gucci Scarf 1'), getPlaceholderImageUrl(300, 400, 'Gucci Scarf 2'), getPlaceholderImageUrl(300, 400, 'Gucci Scarf 3'), getPlaceholderImageUrl(300, 400, 'Gucci Scarf 4')], description: 'Bellissima sciarpa in seta con il famoso motivo Gucci Flora.', condition: 'excellent', material: '100% Silk', featured: false, type: 'archive' },
  { id: '4', name: 'Roberto Cavalli Animal Print Dress', brand: 'Roberto Cavalli', category: 'dresses', color: 'brown', size: 'S', year: 2003, price: 680, images: [getPlaceholderImageUrl(300, 400, 'Cavalli Dress 1'), getPlaceholderImageUrl(300, 400, 'Cavalli Dress 2'), getPlaceholderImageUrl(300, 400, 'Cavalli Dress 3'), getPlaceholderImageUrl(300, 400, 'Cavalli Dress 4')], description: 'Splendido abito Roberto Cavalli con stampa animalier del 2003.', condition: 'good', material: 'Silk jersey', measurements: { chest: '42cm', waist: '36cm', length: '95cm' }, featured: true, type: 'archive' },
  { id: '5', name: 'Versace Evening Dress', brand: 'Versace', category: 'dresses', color: 'red', size: 'S', year: 1992, price: 890, images: [getPlaceholderImageUrl(300, 400, 'Versace Dress 1'), getPlaceholderImageUrl(300, 400, 'Versace Dress 2'), getPlaceholderImageUrl(300, 400, 'Versace Dress 3'), getPlaceholderImageUrl(300, 400, 'Versace Dress 4')], description: 'Abito da sera rosso fuoco Versace con stampa barocca del 1992.', condition: 'excellent', material: '95% Silk, 5% Elastane', measurements: { chest: '45cm', waist: '38cm', length: '90cm' }, featured: false, type: 'archive' },
  { id: '6', name: 'Miu Miu Pleated Skirt', brand: 'Miu Miu', category: 'skirts', color: 'navy blue', size: 'M', year: 2001, price: 320, images: [getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 1'), getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 2'), getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 3'), getPlaceholderImageUrl(300, 400, 'Miu Miu Skirt 4')], description: 'Mini gonna a pieghe Miu Miu in blu navy del 2001.', condition: 'very good', material: '100% Wool', measurements: { waist: '38cm', length: '45cm' }, featured: false, type: 'archive' },
  { id: '7', name: 'Ann Demeulemeester Leather Jacket', brand: 'Ann Demeulemeester', category: 'jackets', color: 'black', size: 'M', year: 1997, price: 850, images: [getPlaceholderImageUrl(300, 400, 'Ann D Jacket 1'), getPlaceholderImageUrl(300, 400, 'Ann D Jacket 2'), getPlaceholderImageUrl(300, 400, 'Ann D Jacket 3'), getPlaceholderImageUrl(300, 400, 'Ann D Jacket 4')], description: 'Iconica giacca in pelle Ann Demeulemeester del 1997.', condition: 'excellent', material: 'Leather', measurements: { chest: '52cm', length: '58cm' }, featured: false, type: 'archive' },
  { id: '8', name: 'Maison Martin Margiela Deconstructed Top', brand: 'Maison Martin Margiela', category: 'top', color: 'white', size: 'L', year: 1994, price: 450, images: [getPlaceholderImageUrl(300, 400, 'MMM Top 1'), getPlaceholderImageUrl(300, 400, 'MMM Top 2'), getPlaceholderImageUrl(300, 400, 'MMM Top 3'), getPlaceholderImageUrl(300, 400, 'MMM Top 4')], description: 'Top bianco destrutturato di Maison Martin Margiela del 1994.', condition: 'very good', material: 'Cotton', measurements: { chest: '54cm', length: '62cm' }, featured: false, type: 'archive' },
  { id: '9', name: 'Jean Paul Gaultier Cone Bra Top', brand: 'Jean Paul Gaultier', category: 'top', color: 'beige', size: 'S', year: 1990, price: 1200, images: [getPlaceholderImageUrl(300, 400, 'JPG Cone Top 1'), getPlaceholderImageUrl(300, 400, 'JPG Cone Top 2'), getPlaceholderImageUrl(300, 400, 'JPG Cone Top 3'), getPlaceholderImageUrl(300, 400, 'JPG Cone Top 4')], description: 'Iconico top con reggisena a cono di Jean Paul Gaultier del 1990.', condition: 'excellent', material: 'Cotton lycra', measurements: { chest: '40cm', length: '55cm' }, featured: true, type: 'archive' },
  { id: '10', name: 'Christian Dior Suit Set', brand: 'Christian Dior', category: 'set', color: 'grey', size: 'M', year: 2005, price: 1800, images: [getPlaceholderImageUrl(300, 400, 'Dior Suit 1'), getPlaceholderImageUrl(300, 400, 'Dior Suit 2'), getPlaceholderImageUrl(300, 400, 'Dior Suit 3'), getPlaceholderImageUrl(300, 400, 'Dior Suit 4')], description: 'Elegante completo tailleur Christian Dior in lana grigia del 2005.', condition: 'excellent', material: '100% Wool', measurements: { chest: '48cm', waist: '38cm' }, featured: true, type: 'archive' },
  { id: '11', name: 'Vivienne Westwood Tartan Pants', brand: 'Vivienne Westwood', category: 'pants', color: 'red', size: 'M', year: 1993, price: 380, images: [getPlaceholderImageUrl(300, 400, 'VW Pants 1'), getPlaceholderImageUrl(300, 400, 'VW Pants 2'), getPlaceholderImageUrl(300, 400, 'VW Pants 3'), getPlaceholderImageUrl(300, 400, 'VW Pants 4')], description: 'Pantaloni Vivienne Westwood in tartan del 1993.', condition: 'good', material: 'Wool tartan', measurements: { waist: '40cm', length: '95cm' }, featured: false, type: 'archive' },
  { id: '12', name: 'Helmut Lang Minimalist Dress', brand: 'Helmut Lang', category: 'dresses', color: 'black', size: 'S', year: 1996, price: 520, images: [getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 1'), getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 2'), getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 3'), getPlaceholderImageUrl(300, 400, 'Helmut Lang Dress 4')], description: 'Abito minimalista nero Helmut Lang del 1996.', condition: 'very good', material: 'Viscose blend', measurements: { chest: '44cm', waist: '38cm', length: '88cm' }, featured: false, type: 'archive' },
  { id: '13', name: 'Alexander McQueen Skull Dress', brand: 'Alexander McQueen', category: 'dresses', color: 'black', size: 'M', year: 2008, price: 1200, images: [getPlaceholderImageUrl(300, 400, 'McQueen Dress 1'), getPlaceholderImageUrl(300, 400, 'McQueen Dress 2'), getPlaceholderImageUrl(300, 400, 'McQueen Dress 3'), getPlaceholderImageUrl(300, 400, 'McQueen Dress 4')], description: 'Abito Alexander McQueen con teschio del 2008.', condition: 'excellent', material: 'Silk chiffon', measurements: { chest: '46cm', waist: '40cm', length: '92cm' }, featured: false, type: 'archive' },
  { id: '14', name: 'Thierry Mugler Power Suit', brand: 'Thierry Mugler', category: 'set', color: 'black', size: 'M', year: 1991, price: 1200, images: [getPlaceholderImageUrl(300, 400, 'Mugler Suit 1'), getPlaceholderImageUrl(300, 400, 'Mugler Suit 2'), getPlaceholderImageUrl(300, 400, 'Mugler Suit 3'), getPlaceholderImageUrl(300, 400, 'Mugler Suit 4')], description: 'Tailleur Thierry Mugler del 1991.', condition: 'very good', material: 'Wool', measurements: { chest: '50cm', waist: '42cm' }, featured: false, type: 'archive' },
  { id: '15', name: 'John Galliano Newspaper Dress', brand: 'John Galliano', category: 'dresses', color: 'multicolor', size: 'M', year: 2000, price: 980, images: [getPlaceholderImageUrl(300, 400, 'Galliano Dress 1'), getPlaceholderImageUrl(300, 400, 'Galliano Dress 2'), getPlaceholderImageUrl(300, 400, 'Galliano Dress 3'), getPlaceholderImageUrl(300, 400, 'Galliano Dress 4')], description: 'Abito John Galliano con stampa giornale del 2000.', condition: 'excellent', material: 'Silk with newspaper print', measurements: { chest: '44cm', waist: '40cm', length: '85cm' }, featured: false, type: 'archive' },
  { id: '16', name: 'Alaïa Bandage Dress', brand: 'Alaïa', category: 'dresses', color: 'black', size: 'S', year: 1992, price: 1850, images: [getPlaceholderImageUrl(300, 400, 'Alaia Dress 1'), getPlaceholderImageUrl(300, 400, 'Alaia Dress 2'), getPlaceholderImageUrl(300, 400, 'Alaia Dress 3'), getPlaceholderImageUrl(300, 400, 'Alaia Dress 4')], description: 'Abito bandage Alaïa nero del 1992.', condition: 'excellent', material: 'Viscose elastane', measurements: { chest: '40cm', waist: '34cm', length: '82cm' }, featured: true, type: 'archive' },
  { id: '17', name: 'Comme des Garçons Asymmetric Top', brand: 'Comme des Garçons', category: 'top', color: 'white', size: 'M', year: 1996, price: 380, images: [getPlaceholderImageUrl(300, 400, 'CDG Top 1'), getPlaceholderImageUrl(300, 400, 'CDG Top 2'), getPlaceholderImageUrl(300, 400, 'CDG Top 3'), getPlaceholderImageUrl(300, 400, 'CDG Top 4')], description: 'Top asimmetrico bianco Comme des Garçons del 1996.', condition: 'very good', material: 'Cotton', measurements: { chest: '48cm', length: '58cm' }, featured: false, type: 'archive' },
  { id: '18', name: 'Yves Saint Laurent Platform Shoes', brand: 'Yves Saint Laurent', category: 'shoes', color: 'black', size: 'XS', year: 2004, price: 680, images: [getPlaceholderImageUrl(300, 400, 'YSL Shoes 1'), getPlaceholderImageUrl(300, 400, 'YSL Shoes 2'), getPlaceholderImageUrl(300, 400, 'YSL Shoes 3'), getPlaceholderImageUrl(300, 400, 'YSL Shoes 4')], description: 'Scarpe con plateau Yves Saint Laurent nere del 2004.', condition: 'excellent', material: 'Leather', featured: false, type: 'archive' },
  { id: '19', name: 'Miss Sixty Low-Rise Jeans', brand: 'Miss Sixty', category: 'pants', color: 'blue', size: 'S', year: 2003, price: 120, images: [getPlaceholderImageUrl(300, 400, 'Miss Sixty Jeans 1')], description: 'Jeans a vita bassa Miss Sixty del 2003.', condition: 'very good', material: 'Cotton denim', measurements: { waist: '32cm', length: '98cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-miss-sixty-jeans', vestiaire: 'https://www.vestiairecollective.com/example-miss-sixty-jeans' } },
  { id: '20', name: 'Blumarine Embellished Top', brand: 'Blumarine', category: 'top', color: 'pink', size: 'M', year: 2004, price: 280, images: [getPlaceholderImageUrl(300, 400, 'Blumarine Top 1')], description: 'Top Blumarine impreziosito in rosa del 2004.', condition: 'excellent', material: 'Silk with crystals', measurements: { chest: '44cm', length: '54cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-blumarine-top', vestiaire: 'https://www.vestiairecollective.com/example-blumarine-top' } },
  { id: '21', name: 'Diesel Distressed Jacket', brand: 'Diesel', category: 'jackets', color: 'blue', size: 'L', year: 2002, price: 180, images: [getPlaceholderImageUrl(300, 400, 'Diesel Jacket 1')], description: 'Giacca in denim distressed Diesel del 2002.', condition: 'good', material: 'Cotton denim', measurements: { chest: '58cm', length: '66cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-diesel-jacket', vestiaire: 'https://www.vestiairecollective.com/example-diesel-jacket' } },
  { id: '22', name: 'Emilio Pucci Silk Dress', brand: 'Emilio Pucci', category: 'dresses', color: 'multicolor', size: 'M', year: 2006, price: 890, images: [getPlaceholderImageUrl(300, 400, 'Pucci Dress 1')], description: 'Abito in seta Emilio Pucci con stampa psichedelica del 2006.', condition: 'excellent', material: '100% Silk', measurements: { chest: '46cm', waist: '42cm', length: '90cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-pucci-dress' } },
  { id: '23', name: 'Gianni Versace Medusa Shirt', brand: 'Gianni Versace', category: 'top', color: 'gold', size: 'L', year: 1995, price: 1200, images: [getPlaceholderImageUrl(300, 400, 'Versace Medusa 1')], description: 'Camicia Gianni Versace Medusa in oro del 1995.', condition: 'excellent', material: 'Silk', measurements: { chest: '54cm', length: '72cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-gianni-versace' } },
  { id: '24', name: 'Marithé Francois Girbaud Cargo Pants', brand: 'Marithé Francois Girbaud', category: 'pants', color: 'khaki', size: 'M', year: 2001, price: 150, images: [getPlaceholderImageUrl(300, 400, 'Girbaud Pants 1')], description: 'Pantaloni cargo Marithé François Girbaud del 2001.', condition: 'very good', material: 'Cotton twill', measurements: { waist: '42cm', length: '106cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-girbaud-cargo', vestiaire: 'https://www.vestiairecollective.com/example-girbaud-cargo' } },
  { id: '25', name: 'Plein Sud Bodycon Dress', brand: 'Plein Sud', category: 'dresses', color: 'black', size: 'S', year: 2003, price: 320, images: [getPlaceholderImageUrl(300, 400, 'Plein Sud Dress 1')], description: 'Abito aderente Plein Sud nero del 2003.', condition: 'excellent', material: 'Viscose elastane', measurements: { chest: '40cm', waist: '34cm', length: '84cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-plein-sud-dress', vestiaire: 'https://www.vestiairecollective.com/example-plein-sud-dress' } },
  { id: '26', name: 'Faycal Amor Avant-garde Jacket', brand: 'Faycal Amor', category: 'jackets', color: 'grey', size: 'M', year: 2008, price: 280, images: [getPlaceholderImageUrl(300, 400, 'Faycal Amor Jacket 1')], description: 'Giacca Faycal Amor avant-garde del 2008.', condition: 'very good', material: 'Wool blend', measurements: { chest: '52cm', length: '64cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-faycal-amor-jacket', vestiaire: 'https://www.vestiairecollective.com/example-faycal-amor-jacket' } },
  { id: '27', name: 'Ann Demeulemeester Draped Top', brand: 'Ann Demeulemeester', category: 'top', color: 'white', size: 'M', year: 2010, price: 380, images: [getPlaceholderImageUrl(300, 400, 'Ann D Draped Top 1')], description: 'Top drappeggiato Ann Demeulemeester in bianco del 2010.', condition: 'excellent', material: 'Cotton jersey', measurements: { chest: '48cm', length: '60cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-ann-d-top', vestiaire: 'https://www.vestiairecollective.com/example-ann-d-top' } },
  { id: '28', name: 'Comme des Garçons Black Dress', brand: 'Comme des Garçons', category: 'dresses', color: 'black', size: 'L', year: 2002, price: 420, images: [getPlaceholderImageUrl(300, 400, 'CDG Dress 1')], description: 'Abito nero Comme des Garçons del 2002.', condition: 'very good', material: 'Wool crepe', measurements: { chest: '50cm', waist: '46cm', length: '94cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-cdg-dress', vestiaire: 'https://www.vestiairecollective.com/example-cdg-dress' } },
  { id: '29', name: 'Jean Paul Gaultier Striped Top', brand: 'Jean Paul Gaultier', category: 'top', color: 'navy blue', size: 'S', year: 2008, price: 280, images: [getPlaceholderImageUrl(300, 400, 'JPG Striped Top 1')], description: 'Top a righe Jean Paul Gaultier del 2008.', condition: 'excellent', material: 'Cotton jersey', measurements: { chest: '42cm', length: '58cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-jpg-striped', vestiaire: 'https://www.vestiairecollective.com/example-jpg-striped' } },
  { id: '30', name: 'MM6 Deconstructed Skirt', brand: 'MM6', category: 'skirts', color: 'grey', size: 'M', year: 2006, price: 180, images: [getPlaceholderImageUrl(300, 400, 'MM6 Skirt 1')], description: 'Gonna destrutturata MM6 grigia del 2006.', condition: 'excellent', material: 'Cotton blend', measurements: { waist: '40cm', length: '62cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-mm6-skirt', vestiaire: 'https://www.vestiairecollective.com/example-mm6-skirt' } },
  { id: '31', name: 'Maison Martin Margiela Split-toe Shoes', brand: 'Maison Martin Margiela', category: 'shoes', color: 'brown', size: 'XS', year: 2009, price: 520, images: [getPlaceholderImageUrl(300, 400, 'MMM Shoes 1')], description: 'Scarpe a punta divisa Maison Martin Margiela del 2009.', condition: 'very good', material: 'Leather', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-mmm-shoes', vestiaire: 'https://www.vestiairecollective.com/example-mmm-shoes' } },
  { id: '32', name: 'John Galliano Bias Cut Dress', brand: 'John Galliano', category: 'dresses', color: 'burgundy', size: 'M', year: 2005, price: 680, images: [getPlaceholderImageUrl(300, 400, 'Galliano Bias Dress 1')], description: 'Abito a taglio obliquo John Galliano bordeaux del 2005.', condition: 'excellent', material: 'Silk charmeuse', measurements: { chest: '44cm', waist: '38cm', length: '88cm' }, featured: false, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-galliano-dress' } },
  { id: '33', name: 'Thierry Mugler Structured Blazer', brand: 'Thierry Mugler', category: 'jackets', color: 'black', size: 'S', year: 2009, price: 580, images: [getPlaceholderImageUrl(300, 400, 'Mugler Blazer 1')], description: 'Blazer strutturato Thierry Mugler nero del 2009.', condition: 'very good', material: 'Wool', measurements: { chest: '46cm', length: '55cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-mugler-blazer', vestiaire: 'https://www.vestiairecollective.com/example-mugler-blazer' } },
  { id: '34', name: 'Versace Jeans Couture Denim', brand: 'Versace Jeans Couture', category: 'pants', color: 'blue', size: 'M', year: 1998, price: 220, images: [getPlaceholderImageUrl(300, 400, 'Versace Jeans 1')], description: 'Jeans Versace Jeans Couture in denim del 1998.', condition: 'good', material: 'Cotton denim', measurements: { waist: '38cm', length: '102cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-versace-jeans', vestiaire: 'https://www.vestiairecollective.com/example-versace-jeans' } },
  { id: '35', name: 'Roberto Cavalli Sheer Top', brand: 'Roberto Cavalli', category: 'top', color: 'brown', size: 'S', year: 2005, price: 350, images: [getPlaceholderImageUrl(300, 400, 'Cavalli Sheer Top 1')], description: 'Top trasparente Roberto Cavalli del 2005.', condition: 'excellent', material: 'Silk blend', measurements: { chest: '40cm', length: '56cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-rc-sheer-top', vestiaire: 'https://www.vestiairecollective.com/example-rc-sheer-top' } },
  { id: '36', name: 'Moschino Cheap & Chic Skirt', brand: 'Moschino Cheap & Chic', category: 'skirts', color: 'yellow', size: 'M', year: 2001, price: 180, images: [getPlaceholderImageUrl(300, 400, 'Moschino Skirt 1')], description: 'Gonna Moschino Cheap & Chic gialla del 2001.', condition: 'very good', material: 'Cotton', measurements: { waist: '36cm', length: '48cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-moschino-skirt', vestiaire: 'https://www.vestiairecollective.com/example-moschino-skirt' } },
  { id: '37', name: 'Fendi Baguette Bag (Early 2000s)', brand: 'Fendi', category: 'bags', color: 'beige', size: 'one size', year: 2000, price: 950, images: [getPlaceholderImageUrl(300, 400, 'Fendi Baguette 1')], description: 'Borsa Fendi Baguette degli inizi degli anni 2000.', condition: 'good', material: 'Canvas and leather', measurements: { width: '26cm', height: '14cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-fendi-baguette' } },
  { id: '38', name: 'Christian Dior Saddle Bag', brand: 'Christian Dior', category: 'bags', color: 'navy blue', size: 'one size', year: 2001, price: 1800, images: [getPlaceholderImageUrl(300, 400, 'Dior Saddle Bag 1')], description: 'Iconica borsa Christian Dior Saddle in blu navy del 2001.', condition: 'excellent', material: 'Canvas', measurements: { width: '20cm', height: '16cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-dior-saddle' } },
  { id: '39', name: 'Louis Vuitton Monogram Pochette', brand: 'Louis Vuitton', category: 'bags', color: 'brown', size: 'one size', year: 1999, price: 750, images: [getPlaceholderImageUrl(300, 400, 'LV Pochette 1')], description: 'Pochette Louis Vuitton con monogramma del 1999.', condition: 'very good', material: 'Canvas', measurements: { width: '21cm', height: '13cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-lv-pochette', vestiaire: 'https://www.vestiairecollective.com/example-lv-pochette' } },
  { id: '40', name: 'Balenciaga City Bag (First Edition)', brand: 'Balenciaga', category: 'bags', color: 'black', size: 'one size', year: 2001, price: 1500, images: [getPlaceholderImageUrl(300, 400, 'Balenciaga City 1')], description: 'Borsa Balenciaga City (prima edizione) nera del 2001.', condition: 'excellent', material: 'Leather', measurements: { width: '38cm', height: '24cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-balenciaga-city' } },
  { id: '41', name: 'Chloé Paddington Bag', brand: 'Chloé', category: 'bags', color: 'brown', size: 'one size', year: 2002, price: 850, images: [getPlaceholderImageUrl(300, 400, 'Chloe Paddington 1')], description: 'Borsa Chloé Paddington marrone del 2002.', condition: 'very good', material: 'Leather', measurements: { width: '300px', height: '28cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-chloe-paddington', vestiaire: 'https://www.vestiairecollective.com/example-chloe-paddington' } },
  { id: '42', name: 'Yves Saint Laurent Rive Gauche Bag', brand: 'Yves Saint Laurent', category: 'bags', color: 'red', size: 'one size', year: 2003, price: 780, images: [getPlaceholderImageUrl(300, 400, 'YSL Rive Gauche 1')], description: 'Borsa Yves Saint Laurent Rive Gauche rossa del 2003.', condition: 'excellent', material: 'Suede', measurements: { width: '30cm', height: '22cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-ysl-rivegauche', vestiaire: 'https://www.vestiairecollective.com/example-ysl-rivegauche' } },
  { id: '43', name: 'Gucci Jackie Bag', brand: 'Gucci', category: 'bags', color: 'black', size: 'one size', year: 2005, price: 1100, images: [getPlaceholderImageUrl(300, 400, 'Gucci Jackie 1')], description: 'Borsa Gucci Jackie nera del 2005.', condition: 'excellent', material: 'Canvas and leather', measurements: { width: '33cm', height: '20cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-gucci-jackie' } },
  { id: '44', name: 'Prada Spazzolato Loafers', brand: 'Prada', category: 'shoes', color: 'black', size: 'XS', year: 1996, price: 480, images: [getPlaceholderImageUrl(300, 400, 'Prada Loafers 1')], description: 'Mocassini Prada Spazzolato neri del 1996.', condition: 'very good', material: 'Brushed leather', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-prada-loafers', vestiaire: 'https://www.vestiairecollective.com/example-prada-loafers' } },
  { id: '45', name: 'Manolo Blahnik Hangisi Pumps', brand: 'Manolo Blahnik', category: 'shoes', color: 'blue', size: 'XS', year: 2008, price: 890, images: [getPlaceholderImageUrl(300, 400, 'Manolo Pumps 1')], description: 'Décolleté Manolo Blahnik Hangisi blu del 2008.', condition: 'excellent', material: 'Satin', featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-manolo-blahnik' } },
  { id: '46', name: 'Jimmy Choo Crystal Sandals', brand: 'Jimmy Choo', category: 'shoes', color: 'silver', size: 'XS', year: 2007, price: 720, images: [getPlaceholderImageUrl(300, 400, 'Jimmy Choo Sandals 1')], description: 'Sandali Jimmy Choo con cristalli argento del 2007.', condition: 'excellent', material: 'Leather and crystals', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-jimmy-choo', vestiaire: 'https://www.vestiairecollective.com/example-jimmy-choo' } },
  { id: '47', name: 'Christian Louboutin Red Soles', brand: 'Christian Louboutin', category: 'shoes', color: 'black', size: 'XS', year: 2009, price: 680, images: [getPlaceholderImageUrl(300, 400, 'Louboutin Red Soles 1')], description: 'Décolleté Christian Louboutin con suola rossa del 2009.', condition: 'very good', material: 'Patent leather', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-louboutin', vestiaire: 'https://www.vestiairecollective.com/example-louboutin' } },
  { id: '48', name: 'Versace Chain Reaction Sneakers', brand: 'Versace', category: 'shoes', color: 'black', size: 'M', year: 2010, price: 780, images: [getPlaceholderImageUrl(300, 400, 'Versace Sneakers 1')], description: 'Sneakers Versace Chain Reaction nere del 2010.', condition: 'excellent', material: 'Mixed materials', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-versace-sneakers', vestiaire: 'https://www.vestiairecollective.com/example-versace-sneakers' } },
  { id: '49', name: 'Gucci Horsebit Loafers (Vintage)', brand: 'Gucci', category: 'shoes', color: 'brown', size: 'S', year: 1995, price: 550, images: [getPlaceholderImageUrl(300, 400, 'Gucci Loafers 1')], description: 'Mocassini Gucci Horsebit vintage marroni del 1995.', condition: 'very good', material: 'Leather', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-gucci-horsebit', vestiaire: 'https://www.vestiairecollective.com/example-gucci-horsebit' } },
  { id: '50', name: 'Chanel Classic Flap Bag', brand: 'Chanel', category: 'bags', color: 'black', size: 'one size', year: 1990, price: 4500, images: [getPlaceholderImageUrl(300, 400, 'Chanel Flap Bag 1')], description: 'Borsa Chanel Classic Flap nera del 1990.', condition: 'excellent', material: 'Lambskin leather', measurements: { width: '26cm', height: '16cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-chanel-flap' } },
  { id: '51', name: 'Hermès Birkin Bag (Pre-owned)', brand: 'Hermès', category: 'bags', color: 'tan', size: 'one size', year: 2005, price: 12000, images: [getPlaceholderImageUrl(300, 400, 'Hermes Birkin 1')], description: 'Borsa Hermès Birkin pre-owned in pelle tan del 2005.', condition: 'very good', material: 'Togo leather', measurements: { width: '35cm', height: '25cm' }, featured: true, type: 'product', purchaseLinks: { vestiaire: 'https://www.vestiairecollective.com/example-hermes-birkin' } },
  { id: '52', name: 'Celine Phantom Cabas', brand: 'Celine', category: 'bags', color: 'grey', size: 'one size', year: 2010, price: 1800, images: [getPlaceholderImageUrl(300, 400, 'Celine Phantom 1')], description: 'Borsa Celine Phantom Cabas grigia del 2010.', condition: 'excellent', material: 'Leather', measurements: { width: '30cm', height: '30cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-celine-cabas', vestiaire: 'https://www.vestiairecollective.com/example-celine-cabas' } },
  { id: '53', name: 'Givenchy Antigona Bag', brand: 'Givenchy', category: 'bags', color: 'black', size: 'one size', year: 2008, price: 1400, images: [getPlaceholderImageUrl(300, 400, 'Givenchy Antigona 1')], description: 'Borsa Givenchy Antigona nera del 2008.', condition: 'excellent', material: 'Leather', measurements: { width: '33cm', height: '28cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-givenchy-antigona', vestiaire: 'https://www.vestiairecollective.com/example-givenchy-antigona' } },
  { id: '54', name: 'Bottega Veneta Intrecciato Bag', brand: 'Bottega Veneta', category: 'bags', color: 'brown', size: 'one size', year: 2006, price: 1600, images: [getPlaceholderImageUrl(300, 400, 'Bottega Intrecciato 1')], description: 'Borsa Bottega Veneta Intrecciato marrone del 2006.', condition: 'excellent', material: 'Leather', measurements: { width: '36cm', height: '26cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-bottega-intrecciato', vestiaire: 'https://www.vestiairecollective.com/example-bottega-intrecciato' } },
  { id: '55', name: 'Loewe Puzzle Bag', brand: 'Loewe', category: 'bags', color: 'blue', size: 'one size', year: 2010, price: 1900, images: [getPlaceholderImageUrl(300, 400, 'Loewe Puzzle 1')], description: 'Borsa Loewe Puzzle blu del 2010.', condition: 'excellent', material: 'Leather', measurements: { width: '29cm', height: '19cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-loewe-puzzle', vestiaire: 'https://www.vestiairecollective.com/example-loewe-puzzle' } },
  { id: '56', name: 'Proenza Schouler PS1 Bag', brand: 'Proenza Schouler', category: 'bags', color: 'grey', size: 'one size', year: 2008, price: 1200, images: [getPlaceholderImageUrl(300, 400, 'PS1 Bag 1')], description: 'Borsa Proenza Schouler PS1 grigia del 2008.', condition: 'excellent', material: 'Leather', measurements: { width: '32cm', height: '25cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-ps1-bag', vestiaire: 'https://www.vestiairecollective.com/example-ps1-bag' } },
  { id: '57', name: 'Acne Studios Canada Scarf', brand: 'Acne Studios', category: 'accessories', color: 'grey', size: 'one size', year: 2010, price: 150, images: [getPlaceholderImageUrl(300, 400, 'Acne Scarf 1')], description: 'Sciarpa Acne Studios Canada in grigio del 2010.', condition: 'excellent', material: 'Wool', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-acne-scarf', vestiaire: 'https://www.vestiairecollective.com/example-acne-scarf' } },
  { id: '58', name: 'Ray-Ban Wayfarer Sunglasses', brand: 'Ray-Ban', category: 'accessories', color: 'black', size: 'one size', year: 1990, price: 90, images: [getPlaceholderImageUrl(300, 400, 'Ray-Ban Wayfarer 1')], description: 'Occhiali da sole Ray-Ban Wayfarer neri del 1990.', condition: 'very good', material: 'Acetate', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-rayban-wayfarer', vestiaire: 'https://www.vestiairecollective.com/example-rayban-wayfarer' } },
  { id: '59', name: 'Oakley Frogskins Sunglasses', brand: 'Oakley', category: 'accessories', color: 'green', size: 'one size', year: 1990, price: 80, images: [getPlaceholderImageUrl(300, 400, 'Oakley Frogskins 1')], description: 'Occhiali da sole Oakley Frogskins verdi del 1990.', condition: 'good', material: 'Plastic', featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-oakley-frogskins', vestiaire: 'https://www.vestiairecollective.com/example-oakley-frogskins' } },
  { id: '60', name: 'Supreme Box Logo Tee', brand: 'Supreme', category: 'top', color: 'white', size: 'L', year: 1998, price: 600, images: [getPlaceholderImageUrl(300, 400, 'Supreme Bogo 1')], description: 'T-shirt Supreme Box Logo bianca del 1998.', condition: 'very good', material: 'Cotton', measurements: { chest: '56cm', length: '74cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-supreme-bogo', vestiaire: 'https://www.vestiairecollective.com/example-supreme-bogo' } },
  { id: '61', name: 'Bape Shark Hoodie', brand: 'Bape', category: 'outerwear', color: 'camo', size: 'M', year: 2004, price: 800, images: [getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 1')], description: 'Felpa con cappuccio Bape Shark mimetica del 2004.', condition: 'excellent', material: 'Cotton fleece', measurements: { chest: '58cm', length: '68cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-bape-hoodie', vestiaire: 'https://www.vestiairecollective.com/example-bape-hoodie' } },
];

const mockLibraryItems = [
  { id: 'L1', name: 'Fashion History: From Ancient to Modern', author: 'Jane Doe', publisher: 'Fashion Books Inc.', year: 2015, category: 'history', images: [getPlaceholderImageUrl(300, 400, 'Book 1')], description: 'A comprehensive guide to the history of fashion.', featured: true, type: 'book' },
  { id: 'L2', name: 'The Art of Dressmaking', author: 'John Smith', publisher: 'Craft Publications', year: 2008, category: 'craft', images: [getPlaceholderImageUrl(300, 400, 'Book 2')], description: 'Techniques and tips for haute couture.', featured: false, type: 'book' },
  { id: 'L3', name: 'Iconic Designers of the 20th Century', author: 'Emily White', publisher: 'Style Press', year: 2020, category: 'biography', images: [getPlaceholderImageUrl(300, 400, 'Book 3')], description: 'Biographies of the most influential fashion designers.', featured: true, type: 'book' },
  { id: 'L4', name: 'Street Style Photography', author: 'Michael Brown', publisher: 'Photo Books Ltd.', year: 2018, category: 'photography', images: [getPlaceholderImageUrl(300, 400, 'Book 4')], description: 'Capturing the essence of urban fashion.', featured: false, type: 'book' },
  { id: 'L5', name: 'Sustainable Fashion: A New Era', author: 'Sophia Green', publisher: 'Eco Publishing', year: 2022, category: 'sustainability', images: [getPlaceholderImageUrl(300, 400, 'Book 5')], description: 'Exploring ethical and sustainable practices in fashion.', featured: true, type: 'book' },
  { id: 'L6', name: 'Vintage Clothing: Collecting and Restoring', author: 'Laura Adams', publisher: 'Collectors Guild', year: 2010, category: 'collecting', images: [getPlaceholderImageUrl(300, 400, 'Book 6')], description: 'A guide for vintage fashion enthusiasts.', featured: false, type: 'book' },
  { id: 'L7', name: 'The Language of Fashion', author: 'David Clark', publisher: 'Cultural Studies', year: 2017, category: 'theory', images: [getPlaceholderImageUrl(300, 400, 'Book 7')], description: 'Semiotics and meaning in fashion.', featured: false, type: 'book' },
  { id: 'L8', name: 'Digital Fashion and the Metaverse', author: 'Chloe Lee', publisher: 'TechStyle Publishers', year: 2023, category: 'digital', images: [getPlaceholderImageUrl(300, 400, 'Book 8')], description: 'The future of fashion in virtual worlds.', featured: true, type: 'book' },
  { id: 'L9', name: 'Minimalist Wardrobe Handbook', author: 'Sarah Chen', publisher: 'Lifestyle Guides', year: 2019, category: 'lifestyle', images: [getPlaceholderImageUrl(300, 400, 'Book 9')], description: 'Creating a versatile and timeless wardrobe.', featured: false, type: 'book' },
  { id: 'L10', name: 'Haute Couture: The Masters', author: 'Pierre Dubois', publisher: 'Art & Fashion', year: 2012, category: 'history', images: [getPlaceholderImageUrl(300, 400, 'Book 10')], description: 'A look at the most exclusive fashion houses.', featured: true, type: 'book' }
];

const App = () => {
  const { useState, useEffect } = React;
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    try {
      if (window.firebase && firebase.apps.length === 0) {
        firebase.initializeApp(window.firebaseConfig);
      }
      const auth = firebase.auth();
      const unsubscribe = auth.onAuthStateChanged(user => {
        setIsAuthReady(true);
      });
      auth.signInAnonymously().catch(error => {
          console.error("Login anonimo fallito:", error);
          setIsAuthReady(true);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Errore inizializzazione Firebase:", e);
      setIsAuthReady(true);
    }
  }, []);

  const navigateTo = (page, item = null) => {
    setCurrentPage(page);
    setSelectedItem(item);
    window.scrollTo(0, 0); 
  };
  
  if (!isAuthReady) {
    return React.createElement('div', {style: {textAlign: 'center', paddingTop: '50px', fontFamily: 'monospace'}}, 'Caricamento...');
  }
  
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
    case 'bookDetail':
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

const renderApp = () => {
  if (reactRoot) {
    reactRoot.render(React.createElement(App));
  } else {
    console.error("Errore: la radice di React non è stata inizializzata correttamente.");
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}