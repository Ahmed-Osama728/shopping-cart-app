import { useState, useMemo, useEffect, useRef } from 'react';
import { SimpleGrid, Button, Center, Text, Stack, TextInput, Group } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useProductsInfinite } from '../../hooks/useProducts';
import { useSearch } from '../../hooks/useSearch';
import { ProductCard } from '../../components/ProductCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export function ProductListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const { results: searchResults, isLoading: isSearching } = useSearch(searchQuery);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useProductsInfinite();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const allProducts = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults;
    }
    return data?.pages.flatMap((page) => page) ?? [];
  }, [data, searchQuery, searchResults]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage || searchQuery.trim()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery]);

  if (isLoading && !searchQuery) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center" wrap="wrap">
        <Text fw={700} size="xl" c={'cyan'} className="bg-gradient-to-rbg-clip-text text-transparent">
          {searchQuery.trim() 
            ? `Search Results (${allProducts.length})` 
            : `Products (${allProducts.length.toLocaleString()}+)`}
        </Text>
        
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftSection={<IconSearch size={18} />}
          rightSection={
            searchQuery && (
              <IconX
                size={18}
                className="cursor-pointer hover:opacity-70"
                onClick={() => setSearchQuery('')}
              />
            )
          }
          className="w-full sm:w-80"
          size="md"
          radius="xl"
        />
      </Group>

      {isSearching && searchQuery.trim() ? (
        <LoadingSpinner />
      ) : allProducts.length === 0 && searchQuery.trim() ? (
        <Center py="xl">
          <Stack align="center" gap="md">
            <Text size="lg" c="dimmed">
              No products found for "{searchQuery}"
            </Text>
            <Button
              variant="light"
              onClick={() => setSearchQuery('')}
              radius="xl"
            >
              Clear Search
            </Button>
          </Stack>
        </Center>
      ) : (
        <>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>

          {!searchQuery.trim() && hasNextPage && (
            <Center ref={loadMoreRef}>
              <Button
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                size="lg"
                variant="gradient"
                gradient={{ from: 'blue', to: 'teal', deg: 90 }}
                radius="xl"
                className="transition-all hover:scale-105"
              >
                {isFetchingNextPage ? 'Loading more...' : 'Load More Products'}
              </Button>
            </Center>
          )}

          {!searchQuery.trim() && !hasNextPage && allProducts.length > 0 && (
            <Center>
              <Text c="dimmed" size="sm">
                All products loaded
              </Text>
            </Center>
          )}
        </>
      )}
    </Stack>
  );
}

