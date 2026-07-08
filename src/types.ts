export interface MenuItem {
  id: string;
  name: string;
  nameKz: string;
  description: string;
  descriptionKz: string;
  price: number;
  category: 'appetizers' | 'mains' | 'tea' | 'desserts';
  image?: string;
  isSignature?: boolean;
  isTraditional?: boolean;
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  zone: 'main' | 'vip' | 'terrace';
  x: number; // percentage coordinate for floor plan SVG
  y: number; // percentage coordinate for floor plan SVG
  width?: number;
  height?: number;
  shape?: 'circle' | 'rect';
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  tableNumber: number;
  zone: 'main' | 'vip' | 'terrace';
  code: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  commentKz?: string;
  date: string;
  tag?: string; // e.g. "Любитель бешбармака", "Ценитель чая"
}

export interface Landmark {
  id: string;
  name: string;
  nameKz: string;
  type: 'piala' | 'park' | 'river' | 'square' | 'station';
  x: number; // custom SVG map X percentage
  y: number; // custom SVG map Y percentage
  description: string;
  descriptionKz: string;
}

export type Language = 'ru' | 'kz';
