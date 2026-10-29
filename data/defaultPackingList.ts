import { PackingItem } from '../types';

export const DEFAULT_PACKING_ITEMS: PackingItem[] = [
  // Documents
  { id: 'pack-doc-1', category: 'Documents', label: 'Passport & Photocopies', packed: true },
  { id: 'pack-doc-2', category: 'Documents', label: 'Flight / Train Boarding Passes', packed: true },
  { id: 'pack-doc-3', category: 'Documents', label: 'Hotel / Airbnb Booking Confirmations', packed: false },
  { id: 'pack-doc-4', category: 'Documents', label: 'Travel Insurance Certificate', packed: false },
  { id: 'pack-doc-5', category: 'Documents', label: 'Driver License / International Permit', packed: false },

  // Essentials
  { id: 'pack-ess-1', category: 'Essentials', label: 'Wallet with Local Cash & Credit Cards', packed: true },
  { id: 'pack-ess-2', category: 'Essentials', label: 'House & Luggage Keys', packed: true },
  { id: 'pack-ess-3', category: 'Essentials', label: 'Prescription Medications & First Aid Kit', packed: false },
  { id: 'pack-ess-4', category: 'Essentials', label: 'Reusable Water Bottle', packed: false },
  { id: 'pack-ess-5', category: 'Essentials', label: 'Comfortable Walking Shoes', packed: false },

  // Electronics
  { id: 'pack-elec-1', category: 'Electronics', label: 'Smartphone & Charger Cable', packed: true },
  { id: 'pack-elec-2', category: 'Electronics', label: 'Portable Power Bank (10,000mAh+)', packed: false },
  { id: 'pack-elec-3', category: 'Electronics', label: 'Universal Travel Plug Adapter', packed: false },
  { id: 'pack-elec-4', category: 'Electronics', label: 'Noise-Cancelling Headphones / Earbuds', packed: false },
  { id: 'pack-elec-5', category: 'Electronics', label: 'Camera, SD Cards & Battery Charger', packed: false },

  // Clothing
  { id: 'pack-clth-1', category: 'Clothing', label: 'Versatile T-shirts & Casual Tops', packed: false },
  { id: 'pack-clth-2', category: 'Clothing', label: 'Comfortable Trousers / Jeans / Shorts', packed: false },
  { id: 'pack-clth-3', category: 'Clothing', label: 'Lightweight Weatherproof Jacket / Raincoat', packed: false },
  { id: 'pack-clth-4', category: 'Clothing', label: 'Underwear & Breathable Socks (5-7 pairs)', packed: false },
  { id: 'pack-clth-5', category: 'Clothing', label: 'Sleepwear & Sunglasses', packed: false },

  // Toiletries
  { id: 'pack-toil-1', category: 'Toiletries', label: 'Toothbrush & Travel Toothpaste', packed: false },
  { id: 'pack-toil-2', category: 'Toiletries', label: 'Sunscreen (SPF 50+) & Lip Balm', packed: false },
  { id: 'pack-toil-3', category: 'Toiletries', label: 'Travel Shampoo, Conditioner & Body Wash', packed: false },
  { id: 'pack-toil-4', category: 'Toiletries', label: 'Hand Sanitizer & Disinfectant Wipes', packed: true },
  { id: 'pack-toil-5', category: 'Toiletries', label: 'Deodorant & Comb / Hairbrush', packed: false }
];
