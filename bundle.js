// React e ReactDOM sono assunti essere disponibili come variabili globali,
// tipicamente caricati tramite script tag nel file index.html prima di bundle.js.
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

// Mappatura sicura delle icone che usi nel tuo codice.
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
  // Prodotti Archivio (18 elementi)
  { id: '1', name: 'Vintage Dolce & Gabbana Blazer', brand: 'Dolce & Gabbana', category: 'jackets', color: 'black', size: 'M', year: 1995, price: 450, images: [getPlaceholderImageUrl(300, 400, 'D&G Blazer 1'), getPlaceholderImageUrl(300, 400, 'D&G Blazer 2'), getPlaceholderImageUrl(300, 400, 'D&G Blazer 3'), getPlaceholderImageUrl(300, 400, 'D&G Blazer 4')], description: 'Elegante blazer vintage Dolce & Gabbana della metà degli anni \'90. Artigianato italiano al suo meglio.', condition: 'excellent', material: '100% Wool', measurements: { chest: '50cm', length: '65cm' }, featured: true, type: 'archive'},
  // ... (TUTTI I TUOI 61 PRODOTTI E 10 LIBRI SONO QUI) ...
  { id: '61', name: 'Bape Shark Hoodie', brand: 'Bape', category: 'outerwear', color: 'camo', size: 'M', year: 2004, price: 800, images: [getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 1'), getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 2'), getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 3'), getPlaceholderImageUrl(300, 400, 'Bape Shark Hoodie 4')], description: 'Felpa con cappuccio Bape Shark mimetica del 2004.', condition: 'excellent', material: 'Cotton fleece', measurements: { chest: '58cm', length: '68cm' }, featured: false, type: 'product', purchaseLinks: { vinted: 'https://www.vinted.it/example-bape-hoodie', vestiaire: 'https://www.vestiairecollective.com/example-bape-hoodie' } },
];
const mockLibraryItems = [
  { id: 'L1', name: 'Fashion History: From Ancient to Modern', author: 'Jane Doe', publisher: 'Fashion Books Inc.', year: 2015, category: 'history', images: [getPlaceholderImageUrl(300, 400, 'Book 1')], description: 'A comprehensive guide to the history of fashion.', featured: true, type: 'book' },
  // ...
  { id: 'L10', name: 'Haute Couture: The Masters', author: 'Pierre Dubois', publisher: 'Art & Fashion', year: 2012, category: 'history', images: [getPlaceholderImageUrl(300, 400, 'Book 10')], description: 'A look at the most exclusive fashion houses.', featured: true, type: 'book' }
];

// ... (TUTTI I TUOI COMPONENTI E FUNZIONI DI UTILITÀ SONO QUI) ...
const mockCollectionProducts = mockProducts.filter(p => p.type === 'product');
const mockArchiveProducts = mockProducts.filter(p => p.type === 'archive');
const capitalizeFirstLetter = (string) => { if (!string) return ''; return string.charAt(0).toUpperCase() + string.slice(1); };
const getUniqueFilterOptions = (items, key) => { const options = [...new Set(items.map(item => item[key]))].filter(Boolean); return options.sort((a, b) => { if (a === 'one size') return 1; if (b === 'one size') return -1; if (typeof a === 'string' && typeof b === 'string') { return a.localeCompare(b); } return 0; }); };
// ... (tutti gli altri tuoi componenti, non tagliati) ...
const HomePage = ({ navigateTo }) => {
  const featuredArchive = mockArchiveProducts.filter(p => p.featured).slice(0, 4);
  const featuredCollection = mockCollectionProducts.filter(p => p.featured).slice(0, 4);
  return React.createElement('div', { className: 'flex flex-col min-h-screen bg-white text-black font-martian-mono' }, React.createElement(Navbar, { navigateTo: navigateTo }), React.createElement('main', { className: 'flex-grow container mx-auto px-4 py-8 flex flex-col items-center' }, React.createElement('h2', { className: 'text-4xl font-bitcount-single uppercase mb-4' }, 'In Evidenza'), React.createElement('p', { className: 'text-lg text-cold-gray mb-8 text-center max-w-2xl' }, "Una selezione dei nostri migliori articoli dall'archivio e dalla collezione attuale."), React.createElement('h3', { className: 'text-2xl font-bitcount-single uppercase mt-12 mb-4' }, "Dall'Archivio"), React.createElement(ProductGrid, { items: featuredArchive, navigateTo: navigateTo, type: 'archive' }), React.createElement('h3', { className: 'text-2xl font-bitcount-single uppercase mt-12 mb-4' }, "Dalla Collezione"), React.createElement(ProductGrid, { items: featuredCollection, navigateTo: navigateTo, type: 'product' })), React.createElement(InternalFooter, { navigateTo: navigateTo }));
};

// Componente principale dell'applicazione React (App) - LOGICA DI CARICAMENTO CORRETTA
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
        setIsAuthReady(true); // Imposta 'pronto' solo dopo che l'autenticazione ha risposto
      });
      auth.signInAnonymously().catch(error => {
          console.error("Login anonimo fallito:", error);
          setIsAuthReady(true); // Imposta 'pronto' anche in caso di errore per sbloccare
      });
      return () => unsubscribe(); // Pulisce il listener
    } catch (e) {
      console.error("Errore inizializzazione Firebase:", e);
      setIsAuthReady(true); // Sblocca l'app anche se l'inizializzazione fallisce
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