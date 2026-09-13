import React, { useState } from 'react';
import { X, Save, Building2, Car, AlertCircle, Loader2 } from 'lucide-react';

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

export default function EditAssetModal({ item, onClose, onSaveAsset }) {
  const isCar = item.category === 'car';

  const [title, setTitle] = useState(item.title || '');
  const [type, setType] = useState(item.type || (isCar ? 'Luxury SUV' : 'Villa'));
  const [price, setPrice] = useState(item.price || 0);
  const [rentPrice, setRentPrice] = useState(item.rentPrice || '');
  const [location, setLocation] = useState(item.location || '');
  const [server, setServer] = useState(item.server || 'Bole & Atlas');
  const [status, setStatus] = useState(item.status || 'For Sale');
  const [badge, setBadge] = useState(item.badge || 'Featured');
  const [featured, setFeatured] = useState(Boolean(item.featured));
  const [description, setDescription] = useState(item.description || '');
  const [imageUrl, setImageUrl] = useState(item.images?.[0] || '');
  const [additionalImages, setAdditionalImages] = useState(
    item.images && item.images.length > 1 ? item.images.slice(1).join(', ') : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // House specs
  const [beds, setBeds] = useState(item.specs?.beds || 4);
  const [baths, setBaths] = useState(item.specs?.baths || 3);
  const [sqft, setSqft] = useState(item.specs?.sqft || 350);
  const [garageSlots, setGarageSlots] = useState(item.specs?.garageSlots || 3);

  // Car specs
  const [year, setYear] = useState(item.specs?.year || '2024');
  const [mileage, setMileage] = useState(item.specs?.mileage || '0 KM');
  const [transmission, setTransmission] = useState(item.specs?.transmission || 'Automatic');
  const [fuelType, setFuelType] = useState(item.specs?.fuelType || 'Petrol');
  const [engine, setEngine] = useState(item.specs?.engine || '3.5L Twin Turbo');
  const [dutyStatus, setDutyStatus] = useState(item.specs?.dutyStatus || 'Customs Cleared');

  const validateForm = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Asset title is required.';
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters.';
    }

    if (!location.trim()) {
      errs.location = 'Specific address / location is required.';
    }

    if (price === '' || price === null || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = 'Please enter a valid price greater than 0 ETB.';
    }

    if (!imageUrl.trim()) {
      errs.imageUrl = 'Primary photo URL is required.';
    } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      errs.imageUrl = 'Image URL must start with http:// or https://';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const otherImgs = additionalImages
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(s => s.startsWith('http'));

    const allImages = [imageUrl, ...otherImgs];

    const updatedAsset = {
      ...item,
      title: title.trim(),
      type,
      price: Number(price) || 0,
      rentPrice: rentPrice ? Number(rentPrice) : undefined,
      location: location.trim(),
      server,
      status,
      badge,
      featured,
      description,
      images: allImages.length > 0 ? allImages : item.images,
      specs: isCar ? {
        ...item.specs,
        year,
        mileage,
        transmission,
        fuelType,
        engine,
        dutyStatus
      } : {
        ...item.specs,
        beds: Number(beds) || 0,
        baths: Number(baths) || 0,
        sqft: Number(sqft) || 0,
        garageSlots: Number(garageSlots) || 0
      }
    };

    try {
      await onSaveAsset(updatedAsset);
      onClose();
    } catch (err) {
      console.error('Failed to update listing in Supabase:', err);
      setErrors(prev => ({
        ...prev,
        submit: err.message || 'Failed to update listing in Supabase database.'
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
              <Save className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                Edit Asset #{item.id}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updating record live in Supabase Cloud
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

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          
          {/* Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors(prev => ({ ...prev, title: null }));
                }}
                className={`w-full p-2.5 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
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
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {(isCar ? VEHICLE_TYPES : REAL_ESTATE_TYPES).map(t => (
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
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {ETHIOPIAN_DISTRICTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Specific Location *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors(prev => ({ ...prev, location: null }));
                }}
                className={`w-full p-2.5 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
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
                className={`w-full p-2.5 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
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
                Rent / Mo (Optional ETB)
              </label>
              <input
                type="number"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Listing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Sold">Sold</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Highlight Badge & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Highlight Badge
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Featured">Featured</option>
                <option value="Verified">Verified</option>
                <option value="Hot Deal">Hot Deal</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Brand New">Brand New</option>
              </select>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Feature on Homepage Catalog
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
                className={`w-full p-2.5 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
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
                Additional Gallery Image URLs
              </label>
              <textarea
                rows={2}
                value={additionalImages}
                onChange={(e) => setAdditionalImages(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Specs */}
          {!isCar ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
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
                <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Parking Slots</label>
                <input type="number" value={garageSlots} onChange={e => setGarageSlots(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
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
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-3.5 text-xs font-bold justify-center shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Supabase...</span>
              </span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes to Supabase</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
