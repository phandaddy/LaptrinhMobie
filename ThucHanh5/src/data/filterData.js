import { allProducts } from './data';

// Lấy danh sách category không trùng
export const FILTER_CATEGORIES = [
  ...new Set(allProducts.map(item => item.itemCategory))
];

// Lấy danh sách brand không trùng
export const FILTER_BRANDS = [
  ...new Set(allProducts.map(item => item.brand))
];