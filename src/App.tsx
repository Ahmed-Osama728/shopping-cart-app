import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Layout } from './components/Layout';
import { RouteLoader } from './components/RouteLoader';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ThemeProvider } from './contexts/ThemeContext';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const ProductListing = lazy(() => import('./features/products/ProductListing').then(module => ({ default: module.ProductListing })));
const ProductDetails = lazy(() => import('./features/products/ProductDetails').then(module => ({ default: module.ProductDetails })));
const ShoppingCart = lazy(() => import('./features/cart/ShoppingCart').then(module => ({ default: module.ShoppingCart })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MantineProvider>
          <Notifications />
          <BrowserRouter>
            <RouteLoader />
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
        </MantineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
