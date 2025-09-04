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
        const fallbackText = { X: '×', ExternalLink: '↗', Search: '⚲', ArrowLeft: '←', ChevronDown: '▼', Mail: '✉', MapPin: '📍', ArrowRight: '→' }[iconName] || '?';
        return React.createElement('span', { style: fallbackStyle, 'aria-label': iconName }, fallbackText);
    };
};

const { X, ExternalLink, Search, ArrowLeft, ChevronDown, Mail, MapPin, ArrowRight } = {
    X: IconWrapper('X'), ExternalLink: IconWrapper('ExternalLink'), Search: IconWrapper('Search'), ArrowLeft: IconWrapper('ArrowLeft'),
    ChevronDown: IconWrapper('ChevronDown'), Mail: IconWrapper('Mail'), MapPin: IconWrapper('MapPin'), ArrowRight: IconWrapper('ArrowRight')
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

// ... [TUTTO IL TUO CODICE, INCLUSI I DATI E I COMPONENTI, VIENE INSERITO QUI SENZA TAGLI] ...
// PER ESEMPIO:
const mockProducts = [
  // ... i tuoi 61 prodotti ...
];
const mockLibraryItems = [
  // ... i tuoi 10 libri ...
];
// ... tutti i tuoi componenti (Modal, ProductCard, Navbar, etc.) ...
const HomePage = ({ navigateTo }) => {
  // ... codice della HomePage ...
};

// --- INIZIO LOGICA CORRETTA PER L'APP ---
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
    // ... tutti gli altri 'case' ...
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