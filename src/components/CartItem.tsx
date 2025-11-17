import { memo } from 'react';
import { Group, Image, Text, NumberInput, ActionIcon, AspectRatio } from '@mantine/core';
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
    <div className='flex flex-col sm:flex-row gap-4 rounded-2xl  dark:bg-gray-900 shadow-lg justify-between py-3 px-4 sm:px-5 sm:py-5 border  dark:border-gray-800'>
      <AspectRatio
        ratio={1}
        className='overflow-hidden rounded-xl shrink-0 w-24 sm:w-28 bg-gray-100 dark:bg-gray-800'
      >
        <Image
          src={product.image}
          alt={product.name}
          fit='cover'
          radius='xl'
          className='h-full w-full object-cover'
          loading='lazy'
        />
      </AspectRatio>
      <div className='flex flex-col justify-between gap-1 sm:gap-2'>
        <Text fw={600} size='sm' lineClamp={2}>
          {product.name}
        </Text>
        <Text size='xs' c='dimmed' lineClamp={1} className='hidden sm:block'>
          {product.description}
        </Text>
        <Text
          fw={700}
          size='sm'
          className='bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent'
        >
          ${product.price.toFixed(2)}
        </Text>
      </div>
      <div className='flex flex-row sm:flex-col gap-2 sm:gap-3 items-start sm:items-end'>
        <NumberInput
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={99}
          size='sm'
          w={70}
          radius='xl'
        />

        <Group gap='xs' justify='space-between' className='w-full sm:w-auto'>
          <Text
            fw={700}
            size='sm'
            className='bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent'
          >
            ${(product.price * quantity).toFixed(2)}
          </Text>

          <ActionIcon
            color='red'
            variant='light'
            onClick={() => removeItem(product.id)}
            aria-label='Remove item'
            radius='xl'
            className='transition-all hover:scale-110'
            size='md'
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';
