import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import FilterBar from './components/FilterBar';
import ListingCard from './components/ListingCard';
import ListingDetailModal from './components/ListingDetailModal';
import AddListingModal from './components/AddListingModal';
import AdminPortal from './components/AdminPortal';
import StatsBanner from './components/StatsBanner';
import Footer from './components/Footer';
import InitialIntentModal from './components/InitialIntentModal';
import InitialLanguageModal from './components/InitialLanguageModal';
import { MOCK_LISTINGS, MOCK_BOOKINGS } from './data/mockListings';
import { TRANSLATIONS } from './data/translations';
import { X, Heart, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'admin'
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'house' | 'car'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServer, setSelectedServer] = useState('All Regions & Districts');
  const [selectedType, setSelectedType] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'For Sale' | 'For Rent'
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [sortBy, setSortBy] = useState('recommended');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Bookings State Management (Persisted in localStorage)
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('soreti_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return MOCK_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem('soreti_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleDeleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Language state ('en' | 'am' | 'om')
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem('apex_lang');
    return savedLang && TRANSLATIONS[savedLang] ? savedLang : 'en';
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleLanguageChange = (newLang) => {
    if (!TRANSLATIONS[newLang]) return;
    setLang(newLang);
    localStorage.setItem('apex_lang', newLang);
    localStorage.setItem('apex_language_selected', 'true');
  };

  // Dark / Light Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('apex_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    root.style.colorScheme = theme;
    document.body.style.colorScheme = theme;
    localStorage.setItem('apex_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initial language and intent choices shown on the first page.
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(() => {
    return localStorage.getItem('apex_language_selected') !== 'true';
  });
  const [isIntentModalOpen, setIsIntentModalOpen] = useState(true);

  const handleSelectIntent = (category) => {
    setActiveTab(category);
    localStorage.setItem('apex_intent_selected', 'true');
    const section = document.getElementById('featured-listings');
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Sync browser back/forward and URL location path
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Favorites state
  const [favorites, setFavorites] = useState([]);
  
  // Modals state
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Admin CRUD handlers
  const handleUpdateListing = (updatedAsset) => {
    setListings(prev => prev.map(item => item.id === updatedAsset.id ? updatedAsset : item));
  };

  const handleDeleteListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  // Toggle Favorite Handler
  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add Listing Handler
  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
    // Switch tab to the added listing's category
    setActiveTab(newListing.category);
  };

  // Comprehensive Filter & Sorting Logic
  const filteredListings = useMemo(() => {
    let result = listings.filter(item => {
      // Category filter
      if (activeTab !== 'all' && item.category !== activeTab) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchLoc = item.location.toLowerCase().includes(query);
        const matchServer = item.server.toLowerCase().includes(query);
        const matchType = item.type.toLowerCase().includes(query);
        const matchSeller = item.seller.name.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchServer && !matchType && !matchSeller) return false;
      }

      // Server Filter
      if (selectedServer !== 'All Regions & Districts' && item.server !== selectedServer) {
        return false;
      }

      // Type Filter
      if (selectedType !== 'All Types' && item.type !== selectedType) {
        return false;
      }

      // Status Filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }

      // Price Filter
      if (item.price > maxPrice) return false;

      // Verified Seller Filter
      if (onlyVerified && !item.seller.verified) return false;

      return true;
    });

    // Sorting Logic
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'title-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [listings, activeTab, searchQuery, selectedServer, selectedType, statusFilter, maxPrice, onlyVerified, sortBy]);

  // Favorite Items objects
  const favoriteItems = useMemo(() => {
    return listings.filter(item => favorites.includes(item.id));
  }, [listings, favorites]);

  // Category select trigger from Category section
  const handleCategorySelect = (catType, subType) => {
    setActiveTab(catType);
    if (subType) {
      setSelectedType(subType);
    } else {
      setSelectedType('All Types');
    }
    const section = document.getElementById('featured-listings');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
    setSelectedServer('All Regions & Districts');
    setSelectedType('All Types');
    setStatusFilter('all');
    setMaxPrice(100000000);
    setSortBy('recommended');
    setOnlyVerified(false);
  };

  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin') || viewMode === 'admin';

  if (isAdminRoute) {
    return (
      <>
        <AdminPortal
          listings={listings}
          theme={theme}
          toggleTheme={toggleTheme}
          onAddListing={() => setIsAddListingOpen(true)}
          onUpdateListing={handleUpdateListing}
          onDeleteListing={handleDeleteListing}
          onBackToStore={() => {
            setViewMode('store');
            navigateTo('/');
          }}
          bookings={bookings}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onDeleteBooking={handleDeleteBooking}
        />
        {isAddListingOpen && (
          <AddListingModal
            onClose={() => setIsAddListingOpen(false)}
            onAddListing={handleAddListing}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Initial Intent Modal ("What are you looking for today?") */}
      <InitialLanguageModal
        isOpen={isLanguageModalOpen}
        lang={lang}
        onLanguageChange={(newLang) => {
          handleLanguageChange(newLang);
          setIsLanguageModalOpen(false);
        }}
        t={t}
      />

      <InitialIntentModal
        isOpen={isIntentModalOpen && !isLanguageModalOpen}
        onClose={() => setIsIntentModalOpen(false)}
        onSelectIntent={handleSelectIntent}
        t={t}
      />

      {/* 1. Header Navigation */}
      <Navbar
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onNavigateHome={() => navigateTo('/')}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenIntentModal={() => setIsIntentModalOpen(true)}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        t={t}
      />

      {/* 2. Clean Hero Showcase Section */}
      <HeroSection
        onExploreCategory={(cat) => {
          setActiveTab(cat);
          const section = document.getElementById('featured-listings');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenIntentModal={() => setIsIntentModalOpen(true)}
        t={t}
      />

      {/* 3. Choose by Property / Car Type Category Cards */}
      <CategorySection onSelectCategory={handleCategorySelect} t={t} />

      {/* 4. Main Featured Listings Grid with Interactive Filter Command Center */}
      <main id="featured-listings" className="py-14 sm:py-20 bg-slate-50/70 dark:bg-slate-950/70 flex-1 transition-colors duration-300">
        <div className="app-container space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                {activeTab === 'house'
                  ? (t.featuredPropertiesCatalog || "FEATURED PROPERTIES CATALOG")
                  : activeTab === 'car'
                  ? (t.featuredVehiclesCatalog || "FEATURED VEHICLES CATALOG")
                  : (t.featuredCatalog || "FEATURED ASSETS CATALOG")}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
                {activeTab === 'house'
                  ? (t.featuredPropertiesHeadline || "Handpicked Real Estate & Houses")
                  : activeTab === 'car'
                  ? (t.featuredVehiclesHeadline || "Handpicked Luxury Vehicles & Motors")
                  : (t.featuredHeadline || "Handpicked Properties & Supercars")}{' '}
                <span className="text-amber-500 dark:text-amber-400">{t.justForYou}</span>
              </h2>
            </div>
          </div>

          {/* Interactive User-Friendly Filter Command Center */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onlyVerified={onlyVerified}
            setOnlyVerified={setOnlyVerified}
            totalResults={filteredListings.length}
            onResetFilters={handleResetFilters}
            t={t}
          />

          {/* Listings Cards Grid */}
          {filteredListings.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 space-y-5 max-w-md mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">No Assets Match Your Criteria</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Try widening your price range, clearing filters, or searching for alternative titles.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-primary py-3 px-6 text-xs font-bold mx-auto"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="listings-grid">
              {filteredListings.map(item => (
                <ListingCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedDetailItem}
                  t={t}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* 5. Stats Banner */}
      <StatsBanner />

      {/* 6. Footer */}
      <Footer />

      {/* --- MODALS & DRAWERS --- */}
      
      {/* Asset Detail Modal */}
      {selectedDetailItem && (
        <ListingDetailModal
          item={selectedDetailItem}
          isFavorite={favorites.includes(selectedDetailItem.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedDetailItem(null)}
          onAddBooking={handleAddBooking}
          t={t}
        />
      )}

      {/* Add Listing Modal */}
      {isAddListingOpen && (
        <AddListingModal
          onClose={() => setIsAddListingOpen(false)}
          onAddListing={handleAddListing}
        />
      )}

      {/* Favorites Modal Drawer */}
      {isFavoritesOpen && (
        <div className="modal-backdrop">
          <div className="modal-content max-w-2xl my-auto p-4 sm:p-6 space-y-5 sm:space-y-6 animate-fade-in">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                  {t?.favorites || 'Saved Favorites'} ({favoriteItems.length})
                </h3>
              </div>
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {favoriteItems.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
                <Heart className="w-12 h-12 mx-auto stroke-1 text-slate-300 dark:text-slate-600" />
                <p className="font-bold text-slate-600 dark:text-slate-300">No saved favorites yet</p>
                <p className="text-xs">Click the heart icon on any property or car card to save it here.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {favoriteItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-amber-300 dark:hover:border-amber-500 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.images[0]} alt="" className="w-16 h-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-xs line-clamp-2">{item.title}</h4>
                        <span className="text-amber-600 dark:text-amber-400 font-extrabold text-xs block">
                          ETB {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setIsFavoritesOpen(false);
                          setSelectedDetailItem(item);
                        }}
                        className="btn-primary w-full sm:w-auto justify-center py-2.5 px-4.5 text-xs font-bold"
                      >
                        {t?.viewDetails || 'View Details'}
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
