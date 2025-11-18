import { getProductsByPage, generateProductAtIndex } from '../utils/fakeData';
import type { Product } from '../types';

let cachedProducts: Product[] | null = null;

function getProducts(): Product[] {
  if (cachedProducts !== null) return cachedProducts;
  const products: Product[] = [];
  for (let i = 0; i < 10000; i++) {
    products.push(generateProductAtIndex(i));
  }
  cachedProducts = products;
  return products;
}

export const productsApi = {
  getAllProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getProducts());
      }, 300);
    });
  },

  getProductsByPage: (page: number, pageSize: number = 20): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getProductsByPage(getProducts(), page, pageSize);
        resolve(products);
      }, 200);
    });
  },

  getProductById: (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const match = id.match(/product-(\d+)/);
        if (match) {
          const index = parseInt(match[1], 10) - 1;
          if (index >= 0 && index < 10000) {
            resolve(generateProductAtIndex(index));
            return;
          }
        }
        resolve(undefined);
      }, 150);
    });
  },

  searchProducts: (query: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) {
          resolve([]);
          return;
        }
        
        const results: Product[] = [];
        const products = getProducts(); // Use cached products instead of generating
        
        if (lowerQuery.length < 2) {
          resolve([]);
          return;
        }
        
        const searchLimit = Math.min(5000, products.length);
        for (let i = 0; i < searchLimit; i++) {
          const product = products[i];
          if (
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
          ) {
            results.push(product);
            if (results.length >= 100) break;
          }
        }
        
        resolve(results);
      }, 150); 
    });
  },
};

