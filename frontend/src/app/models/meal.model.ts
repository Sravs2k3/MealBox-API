export interface Meal {
  id: number;
  name: string;
  price: number;
  category: string;
  categoryId: number;
  tags: string[];
  type: 'Veg' | 'Non-Veg';
  imageUrl: string;
  description?: string;
  rating?: number;
  isSpecial?: boolean;
}
