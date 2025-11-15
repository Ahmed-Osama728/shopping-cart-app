import type { Product } from '../types';

const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Beauty',
  'Automotive',
  'Food',
  'Health',
];

const PRODUCT_COUNT = 10000;

export function generateProductAtIndex(index: number): Product {
  const category = PRODUCT_CATEGORIES[index % PRODUCT_CATEGORIES.length];
  
  return {
    id: `product-${index + 1}`,
    name: `${category}`,
    description: `High-quality ${category.toLowerCase()} product designed for modern needs`,
    price: 10 + (index % 990),
    image: `https://picsum.photos/seed/${category}-${index}/400/400`,
    rating: 1 + (index % 40) / 10,
    category,
    inStock: index % 6 !== 0,
  };
}

export function getProductsByPage(
  products: Product[] | null,
  page: number,
  pageSize: number = 20
): Product[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  if (!products) {
    const pageProducts: Product[] = [];
    for (let i = start; i < end && i < PRODUCT_COUNT; i++) {
      pageProducts.push(generateProductAtIndex(i));
    }
    return pageProducts;
  }
  
  return products.slice(start, end);
}

