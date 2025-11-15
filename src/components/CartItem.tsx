import { memo } from 'react';
import { Group, Image, Text, NumberInput, Stack, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useCartStore } from '../stores/cartStore';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = memo(({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    updateQuantity(product.id, numValue);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-0 last:mb-0">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-3 flex-1 min-w-0">
          <div className="overflow-hidden rounded-xl flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              fit="cover"
              radius="xl"
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>

          <Stack gap="xs" className="flex-1 min-w-0">
            <Text fw={600} size="sm" lineClamp={2}>
              {product.name}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={1} className="hidden sm:block">
              {product.description}
            </Text>
            <Text 
              fw={700} 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >
              ${product.price.toFixed(2)}
            </Text>
          </Stack>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <Group gap="xs" wrap="nowrap" className="w-full sm:w-auto">
            <Text size="xs" c="dimmed" className="hidden sm:block">
              Qty:
            </Text>
            <NumberInput
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={99}
              size="sm"
              w={70}
              radius="xl"
            />
          </Group>

          <Group gap="xs" justify="space-between" className="w-full sm:w-auto">
            <Text 
              fw={700} 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >
              ${(product.price * quantity).toFixed(2)}
            </Text>

            <ActionIcon
              color="red"
              variant="light"
              onClick={() => removeItem(product.id)}
              aria-label="Remove item"
              radius="xl"
              className="transition-all hover:scale-110"
              size="md"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

