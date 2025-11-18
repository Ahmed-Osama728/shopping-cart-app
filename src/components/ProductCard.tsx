import { memo } from 'react';
import { Card, Image, Text, Badge, Group, Stack, Button, Rating, AspectRatio } from '@mantine/core';
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
      className="h-full flex flex-col backdrop-blur-sm bg-white dark:bg-gray-900  hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:bg-white dark:hover:bg-gray-900"
    >
      <Card.Section>
        <Link to={`/product/${product.id}`}>
          <AspectRatio
            ratio={4 / 3}
            className="overflow-hidden rounded-t-xl dark:bg-gray-100"
          >
            <Image
              src={product.image}
              alt={product.name}
              fit="cover"
              className="cursor-pointer transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
          </AspectRatio>
        </Link>
      </Card.Section>

      <Stack gap="xs" mt="md" className="flex-1 border-none">
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
            className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
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

