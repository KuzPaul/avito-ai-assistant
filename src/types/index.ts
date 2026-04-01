export type Category = 'electronics' | 'auto' | 'real_estate';

// Параметры для электроники
export interface ElectronicsParams {
  type?: 'phone' | 'laptop' | 'tablet' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
}

// Параметры для авто
export interface AutoParams {
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  transmission?: 'manual' | 'automatic';
  enginePower?: number;
}

// Параметры для недвижимости
export interface RealEstateParams {
  type?: 'flat' | 'house' | 'room';
  area?: number;
  floor?: number;
  rooms?: number;
  address?: string;
}

export type ItemParams = ElectronicsParams | AutoParams | RealEstateParams;

// Полное объявление
export interface Item {
  id: string;
  category: Category;
  title: string;
  description?: string;
  price: number;
  params: ItemParams;
  createdAt: string;
  imageUrl?: string;
  needsRevision?: boolean;
}

// Для списка объявлений
export interface ItemListItem {
  id: string;
  category: Category;
  title: string;
  price: number;
  needsRevision: boolean;
}

// Ответ от API
export interface ItemsResponse {
  items: ItemListItem[];
  total: number;
}