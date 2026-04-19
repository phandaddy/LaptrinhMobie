// src/data/cartData.js

import { allProducts } from './data';

// Các sản phẩm có trong giỏ hàng (id)
const cartIds = ['1', '2', '3'];

// Tạo cart từ data gốc + thêm quantity
export const initialCartData = allProducts
  .filter(item => cartIds.includes(item.id))
  .map(item => ({
    ...item,
    quantity: 1,
  }));