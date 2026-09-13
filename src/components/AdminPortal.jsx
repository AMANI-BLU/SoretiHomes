import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Building2, 
  Star, 
  PlusCircle, 
  MapPin, 
  ArrowLeft, 
  Search, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Check, 
  DollarSign, 
  Layers, 
  Menu, 
  X,
  LogOut,
  Calendar,
  Phone,
  User,
  Moon,
  Sun,
  Database,
  AlertCircle,
  KeyRound
} from 'lucide-react';
import EditAssetModal from './EditAssetModal';
import ConfirmModal from './ConfirmModal';
import ChangePasswordModal from './ChangePasswordModal';

export default function AdminPortal({
  listings,
  theme = 'dark',
  toggleTheme,
  onAddListing,
  onUpdateListing,
  onDeleteListing,
  onBackToStore,
  bookings = [],
  onUpdateBookingStatus,
  onDeleteBooking,
  supabaseStatus = { configured: false, connected: false, tablesExist: false, message: '' },
  adminUser = null,
  onSignOut
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'house' | 'car' | 'featured' | 'bookings'
  const [searchFilter, setSearchFilter] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter listings based on sidebar active tab & search query
  const filteredListings = listings.filter(item => {
    if (activeTab === 'house' && item.category !== 'house') return false;
    if (activeTab === 'car' && item.category !== 'car') return false;
    if (activeTab === 'featured' && !item.featured) return false;

    if (searchFilter.trim() !== '') {
      const q = searchFilter.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchServer = item.server.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      if (!matchTitle && !matchServer && !matchLoc) return false;
    }
    return true;
  });

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    if (searchFilter.trim() !== '') {
      const q = searchFilter.toLowerCase();
      return (
        b.customerName?.toLowerCase().includes(q) ||
        b.customerPhone?.includes(q) ||
        b.assetTitle?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Metric stats
  const totalVolume = listings.reduce((sum, item) => sum + item.price, 0);
  const totalHouses = listings.filter(i => i.category === 'house').length;
  const totalCars = listings.filter(i => i.category === 'car').length;
  const featuredCount = listings.filter(i => i.featured).length;

  const handleToggleFeatured = (item) => {
    onUpdateListing({
      ...item,
      featured: !item.featured
    });
    showNotification(`Updated featured status for "${item.title}"`);
  };

  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    isProcessing: false,
    onConfirm: () => {}
  });

  const handleDeleteListingClick = (id, title) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Delete Listing',
      message: `Are you sure you want to delete listing "${title}"?`,
      type: 'danger',
      confirmText: 'Delete Listing',
      cancelText: 'Cancel',
      isProcessing: false,
      onConfirm: async () => {
        setConfirmConfig(prev => ({ ...prev, isProcessing: true }));
        try {
          await onDeleteListing(id);
          showNotification(`Deleted listing "${title}"`);
          setConfirmConfig(prev => ({ ...prev, isOpen: false, isProcessing: false }));
        } catch (err) {
          showNotification('The listing could not be deleted. Please try again.');
          setConfirmConfig(prev => ({ ...prev, isProcessing: false }));
        }
      }
    });
  };

  const handleDeleteBookingClick = (id, customerName) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Delete Booking',
      message: `Are you sure you want to delete the booking for "${customerName}"?`,
      type: 'danger',
      confirmText: 'Delete Booking',
      cancelText: 'Cancel',
      isProcessing: false,
      onConfirm: async () => {
        setConfirmConfig(prev => ({ ...prev, isProcessing: true }));
        try {
          await onDeleteBooking(id);
          showNotification(`Deleted booking for "${customerName}"`);
          setConfirmConfig(prev => ({ ...prev, isOpen: false, isProcessing: false }));
        } catch (err) {
          showNotification('The booking could not be deleted. Please try again.');
          setConfirmConfig(prev => ({ ...prev, isProcessing: false }));
        }
      }
    });
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(val);
  };

  const NAV_ITEMS = [
    { id: 'all', label: 'Dashboard Overview', icon: LayoutDashboard, count: listings.length },
    { id: 'bookings', label: 'Client Bookings', icon: Calendar, count: bookings.length },
    { id: 'car', label: 'Vehicles & Supercars', icon: Car, count: totalCars },
    { id: 'house', label: 'Properties & Estates', icon: Building2, count: totalHouses },
    { id: 'featured', label: 'Featured Highlights', icon: Star, count: featuredCount },
  ];

  return (
    <div className={`admin-portal min-h-screen bg-slate-950 text-slate-100 flex font-sans transition-colors duration-300 ${theme === 'dark' ? 'admin-dark' : 'admin-light'}`}>
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-amber-500 text-slate-950 font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-400 animate-fade-in">
          <Check className="w-4 h-4 text-slate-950" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="p-6 space-y-8">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0">
                <img src="/soreti-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white tracking-tight leading-none">
                  SORETI ADMIN
                </h1>
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block mt-1">
                  የቤት ሸያጭ ብቻ Portal
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block px-3 mb-2">
              Menu Navigation
            </span>

            {NAV_ITEMS.map((nav) => {
              const IconComp = nav.icon;
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => {
                    setActiveTab(nav.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4" />
                    <span>{nav.label}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {nav.count}
                  </span>
                </button>
              );
            })}

            <div className="pt-4 space-y-1.5">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block px-3 mb-2">
                Actions
              </span>

              <button
                onClick={() => {
                  onAddListing();
                  setMobileSidebarOpen(false);
                }}
                className="w-full px-3.5 py-3 rounded-xl text-xs font-bold flex items-center gap-3 text-emerald-400 hover:bg-emerald-950/40 border border-emerald-800/40 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Listing</span>
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {adminUser && (
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5 text-slate-300 text-xs">
              <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="min-w-0">
                <span className="block font-bold text-white text-[11px] truncate">{adminUser.email}</span>
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">Verified Admin</span>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setIsPasswordModalOpen(true);
              setMobileSidebarOpen(false);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-slate-800 hover:bg-amber-950/50 hover:text-amber-300 text-slate-300 transition-all border border-slate-700"
          >
            <KeyRound className="w-4 h-4" />
            <span>Change Password</span>
          </button>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-all border border-rose-800/60"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Admin</span>
            </button>
          )}
          <button
            onClick={onBackToStore}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Return to Storefront</span>
          </button>
        </div>

      </aside>

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top App Header */}
        <header className="min-h-20 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 sm:py-0 flex items-center justify-between gap-3 sticky top-0 z-30">
          
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <h2 className="font-extrabold text-base sm:text-xl text-white tracking-tight capitalize truncate">
                {activeTab === 'all' ? 'Dashboard Overview' : activeTab === 'bookings' ? 'Client Inspection Bookings' : `${activeTab} Management`}
              </h2>
              <p className="hidden sm:block text-xs text-slate-400 font-medium truncate">
                Soreti Homes (የቤት ሸያጭ ብቻ) • Addis Ababa Management Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-amber-950/50 hover:text-amber-300 transition-all border border-slate-700"
              title="Change administrator password"
              aria-label="Change administrator password"
            >
              <KeyRound className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={onAddListing}
              className="btn-primary py-2.5 px-2.5 sm:px-4 text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post Listing</span>
              <span className="sm:hidden">Post</span>
            </button>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-800 transition-all border border-slate-700"
                title="Sign Out Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

        </header>

        {/* Dashboard Main Content */}
        <main className="p-4 sm:p-6 space-y-6 sm:space-y-8 flex-1 overflow-y-auto">
          
          {/* Listing Service Status Banner */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            supabaseStatus.connected && supabaseStatus.tablesExist
              ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
              : supabaseStatus.connected && !supabaseStatus.tablesExist
              ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  supabaseStatus.connected && supabaseStatus.tablesExist
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : supabaseStatus.connected && !supabaseStatus.tablesExist
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      Online Listing Service
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                      supabaseStatus.connected && supabaseStatus.tablesExist
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : supabaseStatus.connected && !supabaseStatus.tablesExist
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {supabaseStatus.connected && supabaseStatus.tablesExist
                        ? 'Ready'
                        : supabaseStatus.connected && !supabaseStatus.tablesExist
                        ? 'Setup Required'
                        : 'Preview Mode'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {supabaseStatus.message || (supabaseStatus.connected ? 'Everything is ready to use.' : 'Using preview mode.')}
                  </p>
                  {supabaseStatus.connected && !supabaseStatus.tablesExist && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950/80 border border-amber-900/40 text-[11px] text-amber-200/90 space-y-1">
                      <p className="font-bold flex items-center gap-1.5 text-amber-300">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Setup Needed:
                      </p>
                      <p>
                        Ask the site owner to finish setting up the online listing service, then refresh this page.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                {adminUser && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300 font-semibold truncate max-w-[200px]">
                      {adminUser.email}
                    </span>
                  </div>
                )}
                {onSignOut && (
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-800 text-slate-300 border border-slate-700 flex items-center gap-2 transition-all"
                    title="Sign Out of Admin Portal"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Top Metric Cards Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Total Listings
                </span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  {listings.length}
                </span>
                <span className="text-[11px] font-semibold text-amber-400 block mt-1">
                  {totalHouses} Properties • {totalCars} Vehicles
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                <Layers className="w-6 h-6" />
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Client Bookings
                </span>
                <span className="text-3xl font-extrabold text-amber-400 mt-1 block">
                  {bookings.length}
                </span>
                <span className="text-[11px] font-semibold text-amber-400 block mt-1">
                  {bookings.filter(b => b.status === 'Pending').length} Pending Inspections
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between gap-3 min-w-0">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Market Valuation
                </span>
                <span className="admin-metric-value text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1 block leading-tight tabular-nums">
                  {formatPrice(totalVolume)}
                </span>
                <span className="text-[11px] font-semibold text-emerald-500 block mt-1">
                  Total Active Inventory
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Addis Districts
                </span>
                <span className="text-3xl font-extrabold text-indigo-400 mt-1 block">
                  5 Regions
                </span>
                <span className="text-[11px] font-semibold text-indigo-400 block mt-1">
                  Bole, Kazanchis, CMC
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <MapPin className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Admin Table Controls Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder={activeTab === 'bookings' ? "Search client name, phone or listing..." : "Search listing title, region or details..."}
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs font-bold bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <span className="text-xs font-bold text-slate-400">
              Showing <span className="text-white">{activeTab === 'bookings' ? filteredBookings.length : filteredListings.length}</span> items
            </span>
          </div>

          {/* TAB CONTENT: BOOKINGS TABLE OR LISTINGS TABLE */}
          {activeTab === 'bookings' ? (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-extrabold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Customer Info</th>
                      <th className="p-4">Requested Listing</th>
                      <th className="p-4">Inspection Date & Time</th>
                      <th className="p-4">Customer Notes</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-semibold text-slate-200">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 font-bold">
                          No client inspection bookings recorded yet.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map(b => (
                        <tr key={b.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                                <User className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="font-extrabold text-white text-xs block">{b.customerName}</span>
                                <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                                  <Phone className="w-3 h-3" />
                                  {b.customerPhone}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {b.assetImage && (
                                <img src={b.assetImage} alt="" className="w-12 h-9 rounded-lg object-cover border border-slate-700 shrink-0" />
                              )}
                              <div>
                                <span className="font-extrabold text-white text-xs block line-clamp-1">{b.assetTitle}</span>
                                <span className="text-[10px] text-slate-400">{b.assetLocation}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 font-bold text-slate-300">
                            <div className="flex items-center gap-1.5 text-xs text-amber-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{b.inspectionDate}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-0.5">{b.inspectionTime}</span>
                          </td>

                          <td className="p-4 max-w-xs text-slate-300 font-normal italic text-[11px]">
                            {b.notes || "No special request"}
                          </td>

                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                              b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              b.status === 'Completed' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                              'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}>
                              {b.status}
                            </span>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {b.status === 'Pending' && (
                                <button
                                  onClick={() => {
                                    if (onUpdateBookingStatus) onUpdateBookingStatus(b.id, 'Confirmed');
                                    showNotification(`Confirmed booking for ${b.customerName}`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-bold hover:bg-emerald-900"
                                >
                                  Confirm
                                </button>
                              )}
                              {b.status === 'Confirmed' && (
                                <button
                                  onClick={() => {
                                    if (onUpdateBookingStatus) onUpdateBookingStatus(b.id, 'Completed');
                                    showNotification(`Marked booking completed for ${b.customerName}`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 text-[11px] font-bold hover:bg-blue-900"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBookingClick(b.id, b.customerName)}
                                className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                                title="Delete booking"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Asset Management Table */
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-extrabold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Listing Details</th>
                      <th className="p-4">Category / Type</th>
                      <th className="p-4">City District / Region</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-semibold text-slate-200">
                    {filteredListings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-slate-400 space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                            <Building2 className="w-6 h-6" />
                          </div>
                          <p className="font-bold text-white text-sm">No Listings Yet</p>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            Add your first property or vehicle to start building your listings.
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={onAddListing}
                              className="btn-primary py-2.5 px-5 text-xs font-bold mx-auto inline-flex items-center gap-2"
                            >
                              <PlusCircle className="w-4 h-4" />
                              Post New Listing
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredListings.map(item => (
                        <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                          
                          {/* Title & Image */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'}
                                alt=""
                                className="w-14 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                              />
                              <div>
                                <span className="font-extrabold text-white text-xs block">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium block">
                                  {item.location}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              item.category === 'car' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60' : 'bg-amber-900/60 text-amber-200 border border-amber-700/60'
                            }`}>
                              {item.category === 'car' ? <Car className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                              {item.type}
                            </span>
                          </td>

                          {/* Region */}
                          <td className="p-4 font-bold text-slate-300">
                            {item.server}
                          </td>

                          {/* Price */}
                          <td className="p-4 font-extrabold text-emerald-400 break-words [overflow-wrap:anywhere]">
                            {formatPrice(item.price)}
                          </td>

                          {/* Status */}
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              item.status === 'For Sale' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>

                          {/* Featured Toggle */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleFeatured(item)}
                              className={`p-2 rounded-lg transition-all ${
                                item.featured ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-600 hover:text-slate-300'
                              }`}
                              title="Toggle Featured Highlight"
                            >
                              <Star className={`w-4 h-4 ${item.featured ? 'fill-amber-400' : ''}`} />
                            </button>
                          </td>

                          {/* Row Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingItem(item)}
                                className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:bg-amber-600 hover:text-slate-950 transition-all"
                                title="Edit Listing"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteListingClick(item.id, item.title)}
                                className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                                title="Delete Listing"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>

      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}

      {/* Edit Modal */}
      {editingItem && (
        <EditAssetModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSaveAsset={(updated) => {
            onUpdateListing(updated);
            showNotification(`Successfully updated "${updated.title}"`);
          }}
        />
      )}

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
        confirmText={confirmConfig.confirmText}
        cancelText={confirmConfig.cancelText}
        isProcessing={confirmConfig.isProcessing}
        onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
      />

    </div>
  );
}
