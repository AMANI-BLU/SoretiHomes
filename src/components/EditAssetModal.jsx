import React, { useState } from 'react';
import { X, Save, Building2, Car } from 'lucide-react';
import { SERVERS } from '../data/mockListings';

export default function EditAssetModal({ item, onClose, onSaveAsset }) {
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);
  const [rentPrice, setRentPrice] = useState(item.rentPrice);
  const [location, setLocation] = useState(item.location);
  const [server, setServer] = useState(item.server);
  const [status, setStatus] = useState(item.status);
  const [badge, setBadge] = useState(item.badge || '');
  const [type, setType] = useState(item.type);
  const [description, setDescription] = useState(item.description);
  const [imageUrl, setImageUrl] = useState(item.images[0]);

  // Specs
  const isCar = item.category === 'car';
  const [beds, setBeds] = useState(item.specs.beds || 3);
  const [baths, setBaths] = useState(item.specs.baths || 2);
  const [sqft, setSqft] = useState(item.specs.sqft || 2500);

  const [topSpeed, setTopSpeed] = useState(item.specs.topSpeed || '200 MPH');
  const [horsepower, setHorsepower] = useState(item.specs.horsepower || '800 HP');
  const [acceleration, setAcceleration] = useState(item.specs.acceleration || '0-60 in 2.5s');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAsset = {
      ...item,
      title,
      price: Number(price),
      rentPrice: Number(rentPrice),
      location,
      server,
      status,
      badge,
      type,
      description,
      images: [imageUrl, ...(item.images.slice(1))],
      specs: isCar ? {
        ...item.specs,
        topSpeed,
        horsepower,
        acceleration
      } : {
        ...item.specs,
        beds: Number(beds),
        baths: Number(baths),
        sqft: Number(sqft)
      }
    };

    onSaveAsset(updatedAsset);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-scale-up max-w-2xl my-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Save className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-xl text-slate-900">
              Admin Edit Asset #{item.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title & Server */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                City District / Region
              </label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {SERVERS.filter(s => s !== 'All Game Servers').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Rent & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Selling Price ($)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Rent / Mo ($)
              </label>
              <input
                type="number"
                required
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Listing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Sold">Sold</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Location & Badge Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Highlight Tag Badge
              </label>
              <input
                type="text"
                placeholder="e.g. Featured, Hot Deal, Verified"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Main Image URL
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Specs */}
          {!isCar ? (
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Beds</label>
                <input type="number" value={beds} onChange={e => setBeds(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Baths</label>
                <input type="number" value={baths} onChange={e => setBaths(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">SqFt</label>
                <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Top Speed</label>
                <input type="text" value={topSpeed} onChange={e => setTopSpeed(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Horsepower</label>
                <input type="text" value={horsepower} onChange={e => setHorsepower(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">0-60</label>
                <input type="text" value={acceleration} onChange={e => setAcceleration(e.target.value)} className="w-full p-2 text-xs font-bold rounded-lg border" />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 text-xs font-bold justify-center shadow-lg shadow-blue-600/30"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}
