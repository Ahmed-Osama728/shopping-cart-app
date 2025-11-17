import { useState } from 'react';
import { Stack, Text, Button, Paper, Group, Divider, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconShoppingCart, IconTrash, IconCheck } from '@tabler/icons-react';
import { useCartStore } from '../../stores/cartStore';
import { CartItem } from '../../components/CartItem';
import { useNavigate } from 'react-router-dom';

export function ShoppingCart() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  const [checkoutModalOpened, setCheckoutModalOpened] = useState(false);

  const handleCheckout = () => {
    setCheckoutModalOpened(true);
    notifications.show({
      title: 'Order Placed!',
      message: `Your order of $${totalPrice.toFixed(2)} has been placed successfully!`,
      color: 'green',
      icon: <IconCheck size={18} />,
    });
    
    setTimeout(() => {
      clearCart();
      setCheckoutModalOpened(false);
      navigate('/');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <Stack align="center" gap="md" py="xl">
        <IconShoppingCart size={64} stroke={1.5} className="text-gray-400 dark:text-gray-600" />
        <Text size="xl" fw={600} c="dimmed">
          Your cart is empty
        </Text>
        <Button 
          onClick={() => navigate('/')} 
          size="lg" 
          variant="gradient"
          gradient={{ from: 'blue', to: 'teal', deg: 90 }}
          radius="xl"
          className="transition-all hover:scale-105"
        >
          Continue Shopping
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center" wrap="wrap" gap="sm">
        <Text
          fw={700}
          size="lg"
          className="text-lg sm:text-xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
        >
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </Text>
        <Button
          leftSection={<IconTrash size={16} />}
          variant="light"
          color="red"
          onClick={clearCart}
          radius="xl"
          size="sm"
          className="transition-all hover:scale-105 text-xs sm:text-sm"
        >
          Clear Cart
        </Button>
      </Group>

      <Paper
        shadow="md"
        p="lg"
        radius="xl"
        className="backdrop-blur-sm bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 sm:p-6"
      >
        <Stack gap="md">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </Stack>
      </Paper>

      <Paper
        shadow="xl"
        p="xl"
        radius="xl"
        className="backdrop-blur-sm bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 sm:p-6"
      >
        <Stack gap="md">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Subtotal:
            </Text>
            <Text size="lg" fw={700}>
              ${totalPrice.toFixed(2)}
            </Text>
          </Group>

          <Divider />

          <Group justify="space-between">
            <Text size="xl" fw={700}>
              Total:
            </Text>
            <Text
              size="xl"
              fw={700}
              className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
            >
              ${totalPrice.toFixed(2)}
            </Text>
          </Group>

          <Button 
            size="lg" 
            fullWidth 
            variant="gradient"
            gradient={{ from: 'blue', to: 'teal', deg: 90 }}
            mt="md"
            radius="xl"
            className="transition-all hover:scale-[1.02]"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>

          <Modal
            opened={checkoutModalOpened}
            onClose={() => setCheckoutModalOpened(false)}
            title="Processing Your Order..."
            centered
            radius="xl"
          >
            <Stack gap="md" align="center" py="xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <Text size="lg" ta="center">
                Your order is being processed. You will be redirected shortly...
              </Text>
            </Stack>
          </Modal>

          <Button
            variant="subtle"
            onClick={() => navigate('/')}
            fullWidth
            size="md"
            radius="xl"
            className="transition-all hover:scale-105"
          >
            Continue Shopping
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

