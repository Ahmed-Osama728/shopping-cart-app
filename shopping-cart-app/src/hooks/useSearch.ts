import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { queryKeys } from '../api/queryKeys';

export function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.products.search(debouncedQuery),
    queryFn: () => productsApi.searchProducts(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 2 * 60 * 1000,
  });

  return {
    results: data ?? [],
    isLoading,
    isError,
    error,
  };
}

