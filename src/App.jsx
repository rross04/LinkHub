import { useEffect, useMemo, useState } from 'react';
import LinkCard from './components/LinkCard';
import AddLinkModal from './components/AddLinkModal';
import ThemeToggle from './components/ThemeToggle';
import { categories, links as defaultLinks } from './data/links';

export default function App() {

  // ── UI ──────────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // ── PWA instalación ───────────────────────────────────────────────────────
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsStandalone(standalone);

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  // ── Links ────────────────────────────────────────
  const [userLinks, setUserLinks] = useState(() => {
    const saved = localStorage.getItem('userLinks');
    return saved ? JSON.parse(saved) : [];
  });

  const allLinks = useMemo(() => [...defaultLinks, ...userLinks], [userLinks]);

  const handleAddLink = (newLink) => {
    const updated = [...userLinks, { ...newLink, id: Date.now() }];
    setUserLinks(updated);
    localStorage.setItem('userLinks', JSON.stringify(updated));
    setShowModal(false);
  };

  const filteredLinks = useMemo(() => {
    return allLinks.filter((link) => {
      const matchesCategory = activeCategory === 'Todos' || link.category === activeCategory;
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        link.title.toLowerCase().includes(normalizedQuery) ||
        link.description.toLowerCase().includes(normalizedQuery) ||
        link.category.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [allLinks, activeCategory, query]);

    const handleDeleteLink = (id) => {
    // permite borrar links agregados por el usuario
    const updated = userLinks.filter(link => link.id !== id);
    setUserLinks(updated);
    localStorage.setItem('userLinks', JSON.stringify(updated));
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main className="app-shell">

      {/* boton tema oscuro-claro */}
      <ThemeToggle />

      {/* solo visible fuera de modo PWA */}
      {!isStandalone && (
        <section className="hero">
          <div>
            <div className="hero__eyebrow flex items-center gap-2 w-fit">
              <span style={{ fontSize: '14px', marginLeft: '0.5rem' }}>Bienvenido a LinkHub!</span>
            </div>
            <h1>Accesos rápidos para el día-a-día</h1>
            <p>
              Centraliza las herramientas que utiliza frecuentemente en una sola ventana. Útil
              para anclar a la barra de tareas o instalar en su dispositivo móvil.
            </p>
          </div>
          <div className="hero__actions">
            <button className="primary-btn" onClick={handleInstall} disabled={!installPrompt}>
              {installPrompt ? 'Instalar app' : 'App instalada o no disponible'}
            </button>
            <span className="helper-text">
              En IOS, use el botón "Compartir" y luego "Agregar a pantalla de inicio".
            </span>
          </div>
        </section>
      )}

      {/* Barra de búsqueda + botón agregar */}
      <section className="toolbar">
        <div className="toolbar__search">
          <img src="/icons/logo1.png" alt="Logo" className="toolbar__search-icon" />
          <input
            type="search"
            placeholder="Buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="add-link-btn" onClick={() => setShowModal(true)}>
            + Agregar
          </button>
        </div>
      </section>

      {/* Filtros por categoría */}
      <div className="chips" role="tablist" aria-label="Filtrar por categoría">
        {categories.map((category) => (
          <button
            key={category}
            className={category === activeCategory ? 'chip chip--active' : 'chip'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de links */}
      <section className="grid">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link) => <LinkCard key={link.id} {...link} onDelete={handleDeleteLink} />)
        ) : (
          <div className="empty-state">
            <h2>No se encontraron resultados</h2>
            <p>Pruebe con otra palabra o cambie la categoría seleccionada.</p>
          </div>
        )}
      </section>

      {/* Modal para agregar link personalizado */}
      {showModal && (
        <AddLinkModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddLink}
          categories={categories.filter((c) => c !== 'Todos')}
        />
      )}

    </main>
  );
}