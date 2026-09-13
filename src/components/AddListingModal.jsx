import React, { useState } from 'react';
import { X, PlusCircle, Building2, Car, MapPin, DollarSign, Upload, Sparkles, CheckCircle, Image as ImageIcon, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { SERVERS } from '../data/mockListings';

const REAL_ESTATE_TYPES = ['Villa', 'Penthouse', 'Apartment', 'Mansion', 'Townhouse', 'Commercial Building', 'Duplex'];
const VEHICLE_TYPES = ['Luxury SUV', 'Executive Sedan', 'Electric / EV', '4WD / Off-Road', 'Supercar', 'Commercial Truck'];

const ETHIOPIAN_DISTRICTS = [
  'Bole & Atlas',
  'Kazanchis & Kirkos',
  'Old Airport & Bisrate Gabriel',
  'CMC & Summit',
  'Sarbet & Gotera',
  'Ayat & Tafo',
  'Megnagna & Lem Hotel',
  'Lebu & Jomo',
  'Piassa & Arat Kilo'
];

export default function AddListingModal({ onClose, onAddListing }) {
  const [category, setCategory] = useState('house');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Villa');
  const [location, setLocation] = useState('Bole Atlas, Addis Ababa');
  const [server, setServer] = useState('Bole & Atlas');
  const [price, setPrice] = useState(35000000);
  const [rentPrice, setRentPrice] = useState('');
  const [status, setStatus] = useState('For Sale');
  const [badge, setBadge] = useState('Featured');
  const [featured, setFeatured] = useState(true);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
  const [additionalImages, setAdditionalImages] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // House specs
  const [beds, setBeds] = useState(5);
  const [baths, setBaths] = useState(4);
  const [area, setArea] = useState(450);
  const [garageSlots, setGarageSlots] = useState(4);
  const [generator, setGenerator] = useState('Automatic Backup Generator');
  const [waterTank, setWaterTank] = useState('5,000L Underground Tank');

  // Car specs
  const [year, setYear] = useState('2024');
  const [mileage, setMileage] = useState('0 KM (Brand New)');
  const [transmission, setTransmission] = useState('Automatic');
  const [fuelType, setFuelType] = useState('Petrol');
  const [engine, setEngine] = useState('3.5L Twin Turbo');
  const [dutyStatus, setDutyStatus] = useState('Customs Cleared & Paid');

  // Broker Contact
  const [brokerPhone, setBrokerPhone] = useState('0998 635 499 / 0948 002 510');

  const handleCategorySwitch = (newCat) => {
    setCategory(newCat);
    setErrors({});
    if (newCat === 'house') {
      setType('Villa');
      setImageUrl('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
      setLocation('Bole Atlas, Addis Ababa');
      setPrice(35000000);
    } else {
      setType('Luxury SUV');
      setImageUrl('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80');
      setLocation('Bole Medhanialem, Addis Ababa');
      setPrice(18500000);
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Listing title is required.';
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters long.';
    }

    if (!location.trim()) {
      errs.location = 'Specific address / street location is required.';
    }

    if (price === '' || price === null || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = 'Please enter a valid price greater than 0 ETB.';
    }

    if (!imageUrl.trim()) {
      errs.imageUrl = 'Primary photo URL is required.';
    } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      errs.imageUrl = 'Image URL must start with http:// or https://';
    }

    if (!brokerPhone.trim()) {
      errs.brokerPhone = 'Contact phone number is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Parse additional image URLs
    const otherImgs = additionalImages
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(s => s.startsWith('http'));

    const allImages = [imageUrl, ...otherImgs];

    const newListing = {
      id: `${category}-${Date.now()}`,
      category,
      type,
      title: title.trim(),
      location: location.trim(),
      server,
      price: Number(price) || 0,
      rentPrice: rentPrice ? Number(rentPrice) : undefined,
      status,
      badge: badge || 'New',
      featured,
      rating: 5.0,
      seller: {
        name: 'Soreti Homes (የቤት ሸያጭ ብቻ)',
        role: 'Certified Addis Estate Broker',
        phone: brokerPhone || '0998 635 499 / 0948 002 510',
        verified: true
      },
      images: allImages,
      specs: category === 'house' ? {
        beds: Number(beds) || 0,
        baths: Number(baths) || 0,
        sqft: Number(area) || 0,
        garageSlots: Number(garageSlots) || 0,
        generator,
        waterTank,
        security: '24/7 Security Guard & Perimeter Fence',
        interiorType: 'European Finish & Modern Architecture'
      } : {
        year,
        mileage,
        transmission,
        fuelType,
        engine,
        dutyStatus,
        seats: 5,
        condition: 'Mint / Brand New Condition'
      },
      description: description || `Premium ${type} available for ${status.toLowerCase()} through Soreti Homes. Located in prime ${server}, Addis Ababa.`
    };

    try {
      await onAddListing(newListing);
      onClose();
    } catch (err) {
      console.error('Failed to add listing:', err);
      setErrors(prev => ({
        ...prev,
        submit: err.message || 'Failed to save listing to Supabase database.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-scale-up max-w-3xl my-auto p-5 sm:p-7 space-y-5 sm:space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center border border-amber-500/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                Post New Asset to Supabase
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Soreti Homes (የቤት ሸያጭ ብቻ) • Live Cloud Database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Submit Error Banner */}
        {errors.submit && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-semibold leading-relaxed">{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
          {/* Category Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleCategorySwitch('house')}
              className={`p-3.5 rounded-2xl border font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all ${
                category === 'house'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 shadow-sm ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Real Estate / House</span>
            </button>

            <button
              type="button"
              onClick={() => handleCategorySwitch('car')}
              className={`p-3.5 rounded-2xl border font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all ${
                category === 'car'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 shadow-sm ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Vehicle / Luxury Motor</span>
            </button>
          </div>

          {/* Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                placeholder={category === 'house' ? 'e.g. Bole Atlas G+2 Luxury Modern Villa' : 'e.g. 2024 Toyota Land Cruiser 300 V8 Twin Turbo'}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors(prev => ({ ...prev, title: null }));
                }}
                className={`w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all ${
                  errors.title
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                }`}
              />
              {errors.title && (
                <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Asset Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {(category === 'house' ? REAL_ESTATE_TYPES : VEHICLE_TYPES).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* District & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Addis Sub-city / District *
              </label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {ETHIOPIAN_DISTRICTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Specific Location / Street *
              </label>
              <input
                type="text"
                placeholder="e.g. Near Edna Mall, Bole, Addis Ababa"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors(prev => ({ ...prev, location: null }));
                }}
                className={`w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all ${
                  errors.location
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                }`}
              />
              {errors.location && (
                <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.location}</span>
                </p>
              )}
            </div>
          </div>

          {/* Price, Rent & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Selling Price (ETB) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) setErrors(prev => ({ ...prev, price: null }));
                }}
                className={`w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                  errors.price
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                }`}
              />
              {errors.price && (
                <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.price}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Rent / Month (Optional ETB)
              </label>
              <input
                type="number"
                placeholder="Leave blank if sale only"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Availability Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
          </div>

          {/* Badge & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Highlight Badge
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Featured">Featured</option>
                <option value="Hot">Hot</option>
                <option value="Verified">Verified</option>
                <option value="Diplomatic">Diplomatic</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            <div className="pt-5">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Feature prominently on Homepage Catalog
                </span>
              </label>
            </div>
          </div>

          {/* Image URLs */}
          <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Main Image URL *
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (errors.imageUrl) setErrors(prev => ({ ...prev, imageUrl: null }));
                }}
                className={`w-full p-2.5 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all ${
                  errors.imageUrl
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                }`}
              />
              {errors.imageUrl && (
                <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.imageUrl}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Additional Gallery Images (Comma or Newline Separated URLs)
              </label>
              <textarea
                rows={2}
                placeholder="https://... , https://..."
                value={additionalImages}
                onChange={(e) => setAdditionalImages(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {imageUrl && !errors.imageUrl && (
              <div className="flex items-center gap-3 pt-1">
                <img src={imageUrl} alt="Preview" className="w-16 h-12 rounded-lg object-cover border border-slate-300 dark:border-slate-700" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Primary preview ready
                </span>
              </div>
            )}
          </div>

          {/* Dynamic Specifications based on Category */}
          {category === 'house' ? (
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                Property Specifications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Beds</label>
                  <input type="number" value={beds} onChange={e => setBeds(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Baths</label>
                  <input type="number" value={baths} onChange={e => setBaths(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Area (m²)</label>
                  <input type="number" value={area} onChange={e => setArea(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Parking Slots</label>
                  <input type="number" value={garageSlots} onChange={e => setGarageSlots(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                Vehicle Specifications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Year</label>
                  <input type="text" value={year} onChange={e => setYear(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mileage</label>
                  <input type="text" value={mileage} onChange={e => setMileage(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Transmission</label>
                  <select value={transmission} onChange={e => setTransmission(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fuel Type</label>
                  <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Engine</label>
                  <input type="text" value={engine} onChange={e => setEngine(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Duty / Customs</label>
                  <input type="text" value={dutyStatus} onChange={e => setDutyStatus(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe the asset, architecture, features, security, compound, views..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Broker Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Contact Phone Numbers *
            </label>
            <input
              type="text"
              value={brokerPhone}
              onChange={(e) => {
                setBrokerPhone(e.target.value);
                if (errors.brokerPhone) setErrors(prev => ({ ...prev, brokerPhone: null }));
              }}
              className={`w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                errors.brokerPhone
                  ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
              }`}
            />
            {errors.brokerPhone && (
              <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.brokerPhone}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-4 text-xs sm:text-sm font-extrabold justify-center shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing to Supabase...</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Publish Asset Directly to Supabase</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
