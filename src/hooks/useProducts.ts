import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { queryKeys } from '../api/queryKeys';

const PAGE_SIZE = 20;

export function useProductsInfinite() {
  return useInfiniteQuery({
    queryKey: queryKeys.products.lists(),
    queryFn: ({ pageParam = 1 }) => productsApi.getProductsByPage(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

