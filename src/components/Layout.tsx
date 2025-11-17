import { AppShell, Text, Badge, Button, Container, ActionIcon, Tooltip } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconShoppingCart, IconSun, IconMoon } from '@tabler/icons-react';
import { useCartStore } from '../stores/cartStore';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useTheme();

  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <Container  h="100%" maw="100%">
          <div className="flex flex-row flex-wrap items-center justify-center w-full h-full px-2 sm:px-4 sm:justify-between gap-2 sm:gap-4">
            <Link to="/" className="no-underline shrink-0">
              <Text 
                fw={700} 
                size="lg"
                c={'cyan'}
                className="text-base sm:text-xl bg-linear-to-rbg-clip-text text-transparent"
              >
                Shopping Cart App
              </Text>
            </Link>

            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              <Button
                component={Link}
                to="/"
                variant={location.pathname === '/' ? 'gradient' : 'subtle'}
                gradient={{ from: 'blue', to: 'teal', deg: 90 }}
                size="sm"
                radius="xl"
                className="transition-all hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
              >
                Products
              </Button>
              <Button
                component={Link}
                to="/cart"
                variant={location.pathname === '/cart' ? 'gradient' : 'subtle'}
                gradient={{ from: 'blue', to: 'teal', deg: 90 }}
                leftSection={<IconShoppingCart size={14} className="sm:w-4 sm:h-4" />}
                size="sm"
                radius="xl"
                className="transition-all hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
              >
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <Badge
                    color="red"
                    size="sm"
                    variant="filled"
                    ml="xs"
                    radius="xl"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <Tooltip label={colorScheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                <ActionIcon
                  variant="subtle"
                  size="md"
                  radius="xl"
                  onClick={toggleColorScheme}
                  className="transition-all hover:scale-110"
                >
                  {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
                </ActionIcon>
              </Tooltip>
            </div>
          </div>
        </Container>
      </AppShell.Header>

      <AppShell.Main className="min-h-screen">
        <Container maw="100%">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}

