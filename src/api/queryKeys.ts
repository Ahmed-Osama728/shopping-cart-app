export const queryKeys = {
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (page: number, pageSize: number) =>
      [...queryKeys.products.lists(), page, pageSize] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    search: (query: string) => [...queryKeys.products.all, 'search', query] as const,
  },
};

