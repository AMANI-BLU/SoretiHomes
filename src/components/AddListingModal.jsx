import React, { useState } from 'react';
import { X, PlusCircle, Building2, Car, MapPin, DollarSign, Upload, Sparkles } from 'lucide-react';
import { SERVERS } from '../data/mockListings';

export default function AddListingModal({ onClose, onAddListing }) {
  const [category, setCategory] = useState('house');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Villa');
  const [location, setLocation] = useState('Vinewood Hills');
  const [server, setServer] = useState(SERVERS[1]);
  const [price, setPrice] = useState(500000);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [description, setDescription] = useState('');
  
  // House specs
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2);
  const [sqft, setSqft] = useState(2500);

  // Car specs
  const [topSpeed, setTopSpeed] = useState('180 MPH');
  const [horsepower, setHorsepower] = useState('750 HP');
  const [acceleration, setAcceleration] = useState('0-60 in 3.0s');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      id: 'custom-' + Date.now(),
      category,
      type,
      title: title || (category === 'house' ? 'Custom Player Estate' : 'Tuned Player Supercar'),
      location,
      server,
      price: Number(price),
      rentPrice: Math.round(Number(price) * 0.003),
      status: 'For Sale',
      badge: 'Player Listed',
      featured: false,
      rating: 5.0,
      seller: {
        name: 'Player User',
        role: 'Verified Gamer Seller',
        phone: '#555-' + Math.floor(1000 + Math.random() * 9000),
        verified: true
      },
      images: [
        imageUrl || (category === 'house' 
          ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
          : 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80')
      ],
      specs: category === 'house' ? {
        beds: Number(beds),
        baths: Number(baths),
        sqft: Number(sqft),
        garageSlots: 4,
        pool: 'Heated Pool',
        security: 'Standard Alarm',
        helicopterPad: false,
        interiorType: 'Modern Custom'
      } : {
        topSpeed,
        horsepower,
        acceleration,
        drivetrain: 'RWD Performance',
        armor: 'Reinforced',
        seats: 2,
        engineSound: 'Tuned Sports Engine',
        customs: 'Full Performance Engine Swap'
      },
      description: description || 'Player listed asset in prime condition. Ready for immediate server key handover.'
    };

    onAddListing(newListing);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-scale-up max-w-2xl my-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
              List Your Car or House for Sale
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Category Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setCategory('house');
                setType('Villa');
                setImageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
              }}
              className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                category === 'house' ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 shadow-sm' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Property (House / Villa)
            </button>
            <button
              type="button"
              onClick={() => {
                setCategory('car');
                setType('Supercar');
                setImageUrl('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80');
              }}
              className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                category === 'car' ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 shadow-sm' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Car className="w-4 h-4" />
              Vehicle (Supercar / SUV)
            </button>
          </div>

          {/* Title & Server */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Listing Title
              </label>
              <input
                type="text"
                required
                placeholder={category === 'house' ? 'e.g. Modern Vinewood Mansion' : 'e.g. Pegassi Zentorno Twin Turbo'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                City District / Region
              </label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {SERVERS.filter(s => s !== 'All Game Servers').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Asking Price ($ USD)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                In-Game Location
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rockford Hills / Pillbox Hill"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Specs Inputs */}
          {category === 'house' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Beds</label>
                <input type="number" value={beds} onChange={e => setBeds(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Baths</label>
                <input type="number" value={baths} onChange={e => setBaths(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">SqFt</label>
                <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Top Speed</label>
                <input type="text" value={topSpeed} onChange={e => setTopSpeed(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Horsepower</label>
                <input type="text" value={horsepower} onChange={e => setHorsepower(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">0-60</label>
                <input type="text" value={acceleration} onChange={e => setAcceleration(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Description / Notes
            </label>
            <textarea
              rows={3}
              placeholder="Describe your asset, tunes, security tier..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 text-xs font-bold justify-center shadow-lg shadow-blue-600/30"
          >
            <Sparkles className="w-4 h-4" />
            Publish Asset Listing
          </button>

        </form>

      </div>
    </div>
  );
}
