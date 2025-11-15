import { memo } from 'react';
import { Card, Image, Text, Badge, Group, Stack, Button, Rating } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="xl"
      className="h-full flex flex-col backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-800/90"
    >
      <Card.Section>
        <Link to={`/product/${product.id}`}>
          <div className="overflow-hidden rounded-t-xl">
            <Image
              src={product.image}
              alt={product.name}
              height={200}
              fit="cover"
              className="cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Link>
      </Card.Section>

      <Stack gap="xs" mt="md" className="flex-1">
        <Group justify="space-between" mt="xs" mb="xs">
          <Text fw={600} lineClamp={2} className="flex-1">
            {product.name}
          </Text>
          {!product.inStock && (
            <Badge color="red" variant="light" radius="xl">
              Out of Stock
            </Badge>
          )}
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {product.description}
        </Text>

        <Group gap="xs">
          <Rating value={product.rating} fractions={2} readOnly size="sm" />
          <Text size="sm" c="dimmed">
            {product.rating}
          </Text>
        </Group>

        <Badge 
          variant="gradient" 
          gradient={{ from: 'blue', to: 'teal', deg: 90 }}
          className="w-fit"
          radius="xl"
        >
          {product.category}
        </Badge>

        <Group justify="space-between" mt="auto">
          <Text 
            fw={700} 
            size="xl"
            className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
          >
            ${product.price.toFixed(2)}
          </Text>
          <Button
            component={Link}
            to={`/product/${product.id}`}
            variant="gradient"
            gradient={{ from: 'blue', to: 'teal', deg: 90 }}
            size="sm"
            radius="xl"
            className="transition-all hover:scale-105"
          >
            View Details
          </Button>
        </Group>
      </Stack>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

