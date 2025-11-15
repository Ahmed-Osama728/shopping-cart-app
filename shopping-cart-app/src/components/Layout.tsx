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
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <Container size="xl" h="100%">
          <div className="flex flex-row items-center justify-between w-full h-full px-2 sm:px-4 gap-2 sm:gap-4">
            <Link to="/" className="no-underline flex-shrink-0">
              <Text 
                fw={700} 
                size="lg"
                className="text-base sm:text-xl bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 bg-clip-text text-transparent"
              >
                Shopping Cart App
              </Text>
            </Link>

            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
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

      <AppShell.Main className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-teal-950/30 min-h-screen">
        <Container size="xl">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}

