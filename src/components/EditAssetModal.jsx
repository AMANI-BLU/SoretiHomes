import React, { useEffect, useState } from 'react';
import { X, Save, Building2, Car, AlertCircle, Loader2 } from 'lucide-react';
import { getListingSaveErrorMessage, uploadListingImage, validateListingImageFile } from '../lib/supabase';

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
  const initialServer = item.server || 'Bole & Atlas';
  const hasKnownServer = ETHIOPIAN_DISTRICTS.includes(initialServer);

  const [title, setTitle] = useState(item.title || '');
  const [type, setType] = useState(item.type || (isCar ? 'Luxury SUV' : 'Villa'));
  const [price, setPrice] = useState(item.price || 0);
  const [rentPrice, setRentPrice] = useState(item.rentPrice || '');
  const [location, setLocation] = useState(item.location || '');
  const [server, setServer] = useState(hasKnownServer ? initialServer : '__other__');
  const [customServer, setCustomServer] = useState(hasKnownServer ? '' : initialServer);
  const [status, setStatus] = useState(item.status || 'For Sale');
  const [badge, setBadge] = useState(item.badge || 'Featured');
  const [featured, setFeatured] = useState(Boolean(item.featured));
  const [description, setDescription] = useState(item.description || '');
  const currentImageUrl = item.images?.[0] || '';
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handlePrimaryImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateListingImageFile(file);
    if (validationError) {
      setImageFile(null);
      setImagePreview('');
      setErrors(prev => ({ ...prev, image: validationError }));
      event.target.value = '';
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, image: null }));
  };

  const handleGalleryImagesChange = (event) => {
    const files = Array.from(event.target.files || []);
    const invalidFile = files.find(file => validateListingImageFile(file));
    if (invalidFile) {
      setGalleryFiles([]);
      setErrors(prev => ({ ...prev, gallery: validateListingImageFile(invalidFile) }));
      event.target.value = '';
      return;
    }

    setGalleryFiles(files);
    setErrors(prev => ({ ...prev, gallery: null }));
  };

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
      errs.title = 'Listing title is required.';
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters.';
    }

    if (server === '__other__' && !customServer.trim()) {
      errs.server = 'Enter a sub-city or district.';
    }

    if (price === '' || price === null || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = 'Please enter a valid price greater than 0 ETB.';
    }

    if (!imageFile && !currentImageUrl.trim()) {
      errs.image = 'This listing needs a primary image. Upload one to continue.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const selectedServer = server === '__other__' ? customServer.trim() : server;
      const uploadedImages = await Promise.all(galleryFiles.map(uploadListingImage));
      const primaryImage = imageFile ? await uploadListingImage(imageFile) : currentImageUrl;
      const existingGalleryImages = item.images?.slice(1) || [];
      const allImages = [primaryImage, ...existingGalleryImages, ...uploadedImages];
      const updatedAsset = {
        ...item,
        title: title.trim(),
        type,
        price: Number(price) || 0,
        rentPrice: rentPrice ? Number(rentPrice) : undefined,
        location: location.trim(),
        server: selectedServer,
        status,
        badge,
        featured,
        description,
        images: allImages,
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
      await onSaveAsset(updatedAsset);
      onClose();
    } catch (err) {
      console.error('Failed to update listing in Supabase:', err);
      setErrors(prev => ({
        ...prev,
        submit: getListingSaveErrorMessage(err, 'updated')
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
                Edit Listing #{item.id}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updating listing online
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
                Listing Type *
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
                onChange={(e) => {
                  const value = e.target.value;
                  setServer(value);
                  if (value !== '__other__') setCustomServer('');
                  if (errors.server) setErrors(prev => ({ ...prev, server: null }));
                }}
                className={`w-full p-2.5 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer ${
                  errors.server
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                {ETHIOPIAN_DISTRICTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
                <option value="__other__">+ Add other</option>
              </select>
              {server === '__other__' && (
                <input
                  type="text"
                  value={customServer}
                  onChange={(e) => {
                    setCustomServer(e.target.value);
                    if (errors.server) setErrors(prev => ({ ...prev, server: null }));
                  }}
                  placeholder="Enter sub-city or district"
                  className={`w-full p-2.5 mt-2 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all ${
                    errors.server
                      ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                      : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                  }`}
                />
              )}
              {errors.server && (
                <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.server}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Specific Location / Street (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Near Edna Mall, Bole, Addis Ababa (optional)"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
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

          {/* Image Uploads */}
          <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Replace Main Image (Optional)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePrimaryImageChange}
                className={`w-full p-2.5 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white file:mr-3 file:rounded-lg file:border-0 file:bg-amber-500 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-slate-950 focus:outline-none transition-all ${
                  errors.image
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                }`}
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Leave empty to keep the current image. New files are uploaded to secure storage when saved.
              </p>
              {errors.image && (
                <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.image}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Add Gallery Images (Optional)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleGalleryImagesChange}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white file:mr-3 file:rounded-lg file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-slate-700 focus:outline-none focus:border-amber-500"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Select multiple files to append more listing photos.</p>
              {errors.gallery && (
                <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.gallery}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <img
                src={imagePreview || currentImageUrl}
                alt="Current listing preview"
                className="w-20 h-14 rounded-lg object-cover border border-slate-300 dark:border-slate-700"
              />
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <p>{imageFile ? imageFile.name : 'Current primary image'}</p>
                {galleryFiles.length > 0 && (
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    {galleryFiles.length} additional image{galleryFiles.length === 1 ? '' : 's'} selected
                  </p>
                )}
              </div>
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
                <span>Saving listing...</span>
              </span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Listing Changes</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
