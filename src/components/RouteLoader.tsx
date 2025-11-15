import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader, Center } from '@mantine/core';

export function RouteLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const showLoader = () => {
      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        timeoutRef.current = null;
      }, 300);
    };

    showLoader();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <Center className="fixed inset-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <Loader size="xl" color="blue" />
    </Center>
  );
}

