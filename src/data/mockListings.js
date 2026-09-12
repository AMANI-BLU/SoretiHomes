export const MOCK_LISTINGS = [
  // --- HOUSES ---
  {
    id: "h1",
    category: "house",
    type: "Villa",
    title: "Luxury Gated Modern Villa in Bole Atlas",
    location: "Bole Atlas, Addis Ababa",
    server: "Bole & Atlas",
    price: 45000000,
    rentPrice: 150000,
    status: "For Sale",
    badge: "Featured",
    featured: true,
    rating: 4.9,
    seller: {
      name: "Soreti Homes (የቤት ሸያጭ ብቻ)",
      role: "Certified Addis Estate Broker",
      phone: "0998 635 499 / 0948 002 510",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      beds: 5,
      baths: 4,
      sqft: 5200,
      garageSlots: 6,
      pool: "Heated Swimming Pool",
      security: "24/7 Guard & High Security Perimeter",
      helicopterPad: true,
      interiorType: "European Italian Marble Finish"
    },
    description: "Architectural masterpiece located in prime Bole Atlas. Features spacious living salons, private garden, 6-car paved subterranean parking, generator backup, and high-security perimeter fencing."
  },
  {
    id: "h2",
    category: "house",
    type: "Penthouse",
    title: "Kazanchis Executive Luxury Penthouse",
    location: "Kazanchis, Kirkos Sub-city, Addis Ababa",
    server: "Kazanchis & Kirkos",
    price: 28000000,
    rentPrice: 95000,
    status: "For Rent",
    badge: "Verified",
    featured: true,
    rating: 4.8,
    seller: {
      name: "Soreti Homes (የቤት ሸያጭ ብቻ)",
      role: "Soreti Homes Broker",
      phone: "0998 635 499 / 0948 002 510",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      beds: 3,
      baths: 3,
      sqft: 3400,
      garageSlots: 4,
      pool: "Rooftop Terrace Spa",
      security: "Card Elevator & Concierge Guard",
      helicopterPad: true,
      interiorType: "Modern Glass & Teak Wood Finish"
    },
    description: "Top-floor executive penthouse offering panoramic vistas over Kazanchis commercial hub and Mount Entoto skyline. Fully furnished with Italian leather decor, private spa terrace, and reserved basement spots."
  },
  {
    id: "h3",
    category: "house",
    type: "Mansion",
    title: "Old Airport Ambassador Gated Estate",
    location: "Old Airport, Nifas Silk Lafto, Addis Ababa",
    server: "Old Airport & Bisrate Gabriel",
    price: 85000000,
    rentPrice: 280000,
    status: "For Sale",
    badge: "Hot Deal",
    featured: true,
    rating: 5.0,
    seller: {
      name: "Tewodros Kassahun",
      role: "VIP Addis Estates",
      phone: "+251 911 900 100",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      beds: 7,
      baths: 6,
      sqft: 8500,
      garageSlots: 10,
      pool: "Resort Style Lagoon Pool",
      security: "CCTV & Dual Guard Gates",
      helicopterPad: true,
      interiorType: "Classic Neoclassical Hardwood"
    },
    description: "Expansive diplomat-style residence in Old Airport neighborhood. Boasts 7 ensuite bedrooms, lush private grounds, 10-car garage complex, dual staff quarters, and industrial standby generator."
  },
  {
    id: "h4",
    category: "house",
    type: "Apartment",
    title: "Modern 3-Bedroom Apartment in CMC Summit",
    location: "CMC Real Estate Compound, Yeka Sub-city",
    server: "CMC & Summit",
    price: 16500000,
    rentPrice: 45000,
    status: "For Sale",
    badge: "Best Value",
    featured: false,
    rating: 4.7,
    seller: {
      name: "Bethlehem Tilahun",
      role: "Summit Heights Realty",
      phone: "+251 911 341 250",
      verified: false
    },
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      beds: 3,
      baths: 2,
      sqft: 1950,
      garageSlots: 2,
      pool: "Compound Clubhouse Access",
      security: "Gated Entrance & Intercom",
      helicopterPad: false,
      interiorType: "Contemporary Open Layout"
    },
    description: "Sunlit 3-bedroom apartment located in modern CMC residential township. Close to light rail transit, shopping plazas, international schools, with secure basement parking."
  },
  {
    id: "h5",
    category: "house",
    type: "Cottage",
    title: "Spacious Family Residence in Sarbet",
    location: "Sarbet, Near AU Headquarters, Addis Ababa",
    server: "Sarbet & Gotera",
    price: 22000000,
    rentPrice: 65000,
    status: "For Sale",
    badge: "Cozy",
    featured: false,
    rating: 4.6,
    seller: {
      name: "Yared Zeleke",
      role: "Sarbet Properties",
      phone: "+251 911 667 788",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      beds: 4,
      baths: 3,
      sqft: 2800,
      garageSlots: 3,
      pool: "Private Courtyard Garden",
      security: "Perimeter Wall & Electric Fence",
      helicopterPad: false,
      interiorType: "Warm Oak & Fireplace Lounge"
    },
    description: "Quiet sanctuary near African Union headquarters in Sarbet. Features mature fruit gardens, paved driveway, traditional service kitchen, and backup water tank system."
  },

  // --- CARS ---
  {
    id: "c-toyota-chr-2021",
    category: "car",
    type: "Crossover",
    title: "Toyota C-HR (2021 European Standard)",
    location: "Addis Ababa, Ethiopia",
    server: "Bole & Atlas",
    price: 6100000,
    rentPrice: 45000,
    status: "For Sale",
    badge: "Verified Listing",
    featured: true,
    rating: 5.0,
    seller: {
      name: "Soreti Homes (የቤት ሸያጭ ብቻ)",
      role: "Certified Car & Real Estate Brokerage",
      phone: "0998 635 499 / 0948 002 510",
      verified: true
    },
    images: [
      "/toyota-chr/chr-1.jpg",
      "/toyota-chr/chr-2.jpg",
      "/toyota-chr/chr-3.jpg",
      "/toyota-chr/chr-4.jpg",
      "/toyota-chr/chr-5.jpg"
    ],
    specs: {
      topSpeed: "190 km/h",
      horsepower: "144 HP",
      acceleration: "0-100 in 8.2s",
      drivetrain: "Automatic - Front Wheel Drive",
      armor: "Excellent EDB Condition",
      seats: 5,
      mileage: "49,000 Km",
      plate: "Code 2 B***",
      standard: "Europe 🇪🇺",
      commission: "2%"
    },
    description: "Toyota C-HR (2021 Model) - European Standard 🇪🇺. Automatic transmission, 49,000 km mileage, Plate Code 2 B***. Excellent EDB condition (fitesha verified). Price: 6,100,000 ETB (2% commission). Trust with Quality - Sell & Buy any Cars and any home. Contact: 0998 635 499 / 0948 002 510."
  },
  {
    id: "c1",
    category: "car",
    type: "Hypercar",
    title: "Mercedes-Benz G 63 AMG V8 Biturbo (Brabus Pack)",
    location: "Bole Road Luxury Motors, Addis Ababa",
    server: "Bole & Atlas",
    price: 35000000,
    rentPrice: 120000,
    status: "For Sale",
    badge: "V8 Power",
    featured: true,
    rating: 4.95,
    seller: {
      name: "Dawit Yohannes",
      role: "Addis Exotic Motors",
      phone: "+251 911 998 877",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      topSpeed: "240 km/h",
      horsepower: "700 HP",
      acceleration: "0-100 in 4.1s",
      drivetrain: "AWD 4MATIC+ V8 Biturbo",
      armor: "Level B6 Armored Glass",
      seats: 5,
      engineSound: "Deep AMG V8 Exhaust Roar",
      customs: "Brabus Body Kit, 23-inch Forged Rims, Night Package"
    },
    description: "The ultimate status symbol on Addis Ababa streets. Features twin-turbo V8 powertrain, custom Brabus carbon accents, Burmester surround sound, and B6 armor protection."
  },
  {
    id: "c2",
    category: "car",
    type: "SUV",
    title: "Toyota Land Cruiser 300 VXR VIP Edition",
    location: "Gotera Auto Hub, Nifas Silk, Addis Ababa",
    server: "Sarbet & Gotera",
    price: 26000000,
    rentPrice: 85000,
    status: "For Sale",
    badge: "Popular",
    featured: true,
    rating: 4.9,
    seller: {
      name: "Elias Tadesse",
      role: "Habesha Auto Import",
      phone: "+251 911 001 234",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      topSpeed: "210 km/h",
      horsepower: "409 HP",
      acceleration: "0-100 in 6.7s",
      drivetrain: "Full-Time 4WD Twin-Turbo V6",
      armor: "Factory Reinforced",
      seats: 7,
      engineSound: "Smooth Twin-Turbo V6",
      customs: "Modellista Aerokit, Executive Rear Seats, Cool Box"
    },
    description: "The undisputed king of Ethiopian roads. LC300 VXR with 3.5L Twin-Turbo V6, Modellista exterior styling, JBL 14-speaker audio, and multi-terrain crawl control."
  },
  {
    id: "c3",
    category: "car",
    type: "Supercar",
    title: "Porsche 911 Turbo S Cabriolet",
    location: "Kazanchis Showroom, Addis Ababa",
    server: "Kazanchis & Kirkos",
    price: 42000000,
    rentPrice: 150000,
    status: "For Sale",
    badge: "Top Speed",
    featured: true,
    rating: 4.95,
    seller: {
      name: "Solomon Worku",
      role: "Prestige Addis Cars",
      phone: "+251 911 443 322",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      topSpeed: "330 km/h",
      horsepower: "640 HP",
      acceleration: "0-100 in 2.7s",
      drivetrain: "AWD PDK 8-Speed",
      armor: "Standard",
      seats: 2,
      engineSound: "Screaming Flat-6 Twin-Turbo",
      customs: "Sport Chrono Package, PCCB Ceramic Brakes"
    },
    description: "Breathtaking precision convertible. 3.8L twin-turbo Flat-6 engine delivering sub-3-second acceleration, active aerodynamics, and ceramic matrix brakes."
  },
  {
    id: "c4",
    category: "car",
    type: "Supercar",
    title: "Range Rover Autobiography Long Wheelbase",
    location: "Old Airport Motors, Addis Ababa",
    server: "Old Airport & Bisrate Gabriel",
    price: 38000000,
    rentPrice: 130000,
    status: "For Sale",
    badge: "Executive VIP",
    featured: false,
    rating: 4.85,
    seller: {
      name: "Tigist Alemu",
      role: "Imperial Motors Addis",
      phone: "+251 911 771 122",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      topSpeed: "250 km/h",
      horsepower: "523 HP",
      acceleration: "0-100 in 4.6s",
      drivetrain: "AWD 4.4L Twin-Turbo V8",
      armor: "Factory Armored Doors",
      seats: 4,
      engineSound: "Refined Whispering V8",
      customs: "Executive Class Comfort Rear Seats, Meridian Signature Sound"
    },
    description: "Ultimate luxury SUV tailored for executive travel across Addis Ababa. Long wheelbase layout with massage seating, rear entertainment screens, and air suspension."
  },
  {
    id: "c5",
    category: "car",
    type: "SUV",
    title: "Lexus LX 600 VIP Kuro Edition",
    location: "CMC Auto Hub, Addis Ababa",
    server: "CMC & Summit",
    price: 29500000,
    rentPrice: 95000,
    status: "For Sale",
    badge: "Clean Title",
    featured: false,
    rating: 4.8,
    seller: {
      name: "Biniam Gebre",
      role: "Summit Auto Sales",
      phone: "+251 911 221 100",
      verified: true
    },
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      topSpeed: "215 km/h",
      horsepower: "409 HP",
      acceleration: "0-100 in 6.9s",
      drivetrain: "4WD Twin-Turbo V6",
      armor: "Level 3 Security Glass",
      seats: 4,
      engineSound: "Whisper Quiet Twin-Turbo V6",
      customs: "Kuro Blackout Package, Mark Levinson 25-Speaker Audio"
    },
    description: "Sophisticated 4-seater VIP luxury SUV. Features Ottoman rear seating, rear console touch panel, height-adjustable suspension, and Kuro midnight exterior."
  }
];

export const SERVERS = [
  "All Sub-cities & Districts",
  "Bole & Atlas",
  "Kazanchis & Kirkos",
  "Old Airport & Bisrate Gabriel",
  "CMC & Summit",
  "Sarbet & Gotera"
];

export const HOUSE_TYPES = ["All Types", "Villa", "Penthouse", "Mansion", "Apartment", "Cottage"];
export const CAR_TYPES = ["All Types", "Hypercar", "Supercar", "SUV", "Classic"];

export const CATEGORIES_CONFIG = [
  {
    id: "apartments",
    title: "Apartments & Penthouses",
    subtitle: "Modern residences in Kazanchis & Bole",
    count: "450+ Listed",
    icon: "Building",
    type: "house",
    filterType: "Apartment",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "houses",
    title: "Villas & Gated Mansions",
    subtitle: "Luxury family estates in Old Airport & Bole",
    count: "620+ Listed",
    icon: "Home",
    type: "house",
    filterType: "Villa",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "supercars",
    title: "Luxury SUVs & V8 Motors",
    subtitle: "G 63, Land Cruiser 300 & Porsche models",
    count: "890+ Listed",
    icon: "Car",
    type: "car",
    filterType: "Hypercar",
    img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "suvs",
    title: "Armored VIP Transports",
    subtitle: "Bulletproof Range Rover & Lexus LX models",
    count: "340+ Listed",
    icon: "Shield",
    type: "car",
    filterType: "SUV",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
  }
];

export const MOCK_BOOKINGS = [
  {
    id: "BK-1001",
    assetId: "h1",
    assetTitle: "Luxury Gated Modern Villa in Bole Atlas",
    assetCategory: "house",
    assetPrice: 45000000,
    assetImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    assetLocation: "Bole Atlas, Addis Ababa",
    customerName: "Abebe Kebede",
    customerPhone: "0911234567",
    inspectionDate: "2026-09-15",
    inspectionTime: "10:00 AM - 12:00 PM",
    notes: "Interested in purchasing the villa. Would like to bring an engineer for site inspection.",
    status: "Pending",
    createdAt: "Sep 10, 2026"
  },
  {
    id: "BK-1002",
    assetId: "c1",
    assetTitle: "2024 Toyota Land Cruiser 300 V8 Twin Turbo",
    assetCategory: "car",
    assetPrice: 18500000,
    assetImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    assetLocation: "Bole Medhanialem, Addis Ababa",
    customerName: "Bethlehem Tadesse",
    customerPhone: "0912987654",
    inspectionDate: "2026-09-14",
    inspectionTime: "02:00 PM - 04:00 PM",
    notes: "Requesting test drive around Bole and verification of customs clearance papers.",
    status: "Confirmed",
    createdAt: "Sep 11, 2026"
  },
  {
    id: "BK-1003",
    assetId: "h2",
    assetTitle: "Kazanchis Executive Luxury Penthouse",
    assetCategory: "house",
    assetPrice: 28000000,
    assetImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    assetLocation: "Kazanchis, Kirkos Sub-city, Addis Ababa",
    customerName: "Tigist Alemu",
    customerPhone: "0920112233",
    inspectionDate: "2026-09-16",
    inspectionTime: "11:00 AM - 01:00 PM",
    notes: "Looking to rent for long-term diplomatic staff lodging.",
    status: "Pending",
    createdAt: "Sep 12, 2026"
  }
];
