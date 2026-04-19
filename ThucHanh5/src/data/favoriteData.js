// src/data/favoriteData.js

import { allProducts } from './data';

// Danh sách ID muốn làm favorite
const favoriteIds = ['2', '3', '8', '10'];

// Tạo data mới kế thừa từ allProducts
export const productsWithFavorite = allProducts.map(item => ({
  ...item,
  isFavorite: favoriteIds.includes(item.id),
}));

// Lấy riêng danh sách favorite
export const favoriteItems = productsWithFavorite.filter(item => item.isFavorite);