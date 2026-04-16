export type ProductType = 'Mayorista' | 'Minorista';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  type: ProductType;
  vendorId: string;
  image: string;
  images?: string[];
}

export interface Provider {
  id: string;
  name: string;
  province: string;
  isOfficial: boolean;
  logo: string;
}

export const PROVIDERS_MOCK: Provider[] = [
  {
    id: 'p1',
    name: 'Glow Supplies',
    province: 'Buenos Aires',
    isOfficial: true,
    logo: 'https://images.unsplash.com/photo-1616248981607-cc6234eb89e6?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'p2',
    name: 'TechNail',
    province: 'Chaco',
    isOfficial: false,
    logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200&auto=format&fit=crop',
  },
];

export const PRODUCTS_MOCK: Product[] = [
  {
    id: '1',
    name: 'Base Coat Rubber 15ml',
    category: 'Esmaltes',
    price: 6000,
    type: 'Minorista',
    vendorId: 'p1',
    image: 'https://images.unsplash.com/photo-1582245999557-41400bcfa434?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '1_may',
    name: 'Pack x12 Base Coat Rubber',
    category: 'Esmaltes',
    price: 58000,
    type: 'Mayorista',
    vendorId: 'p1',
    image: 'https://images.unsplash.com/photo-1582245999557-41400bcfa434?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Cabina UV/LED 48W Profesional',
    category: 'Maquinaría',
    price: 45000,
    type: 'Minorista',
    vendorId: 'p2',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Torno Profesional 35000 RPM',
    category: 'Maquinaría',
    price: 85000,
    type: 'Minorista',
    vendorId: 'p2',
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Limas Cebra 100/180 x50u',
    category: 'Descartables',
    price: 15000,
    type: 'Mayorista',
    vendorId: 'p1',
    image: 'https://images.unsplash.com/photo-1632009249622-c3fbe6520ae6?q=80&w=200&auto=format&fit=crop',
  },
];
