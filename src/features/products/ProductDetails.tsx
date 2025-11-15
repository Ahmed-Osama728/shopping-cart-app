import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Image, Text, Button, Group, Badge, Rating, Paper, Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconShoppingCart, IconCheck } from '@tabler/icons-react';
import { useProduct } from '../../hooks/useProducts';
import { useCartStore } from '../../stores/cartStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useProduct(id || '');
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !product) {
    return <ErrorMessage message={error?.message || 'Product not found'} />;
  }

  const handleAddToCart = () => {
    addItem(product);
    notifications.show({
      title: 'Added to cart',
      message: `${product.name} has been added to your cart`,
      color: 'green',
      icon: <IconCheck size={18} />,
    });
  };

  return (
    <Stack gap="lg">
      <Button
        leftSection={<IconArrowLeft size={18} />}
        variant="subtle"
        onClick={() => navigate(-1)}
        radius="xl"
        className="transition-all hover:scale-105"
      >
        Back to Products
      </Button>

      <Paper 
        shadow="xl" 
        p="xl" 
        radius="xl" 
        className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0"
      >
        <Group align="flex-start" gap="xl" wrap="wrap" className="md:flex-nowrap">
          <div className="overflow-hidden rounded-xl flex-shrink-0 w-full md:w-[400px]">
            <Image
              src={product.image}
              alt={product.name}
              w={400}
              h={400}
              fit="cover"
              radius="xl"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <Stack gap="md" className="flex-1">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs" className="flex-1">
                <Text 
                  fw={700} 
                  size="xl"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
                >
                  {product.name}
                </Text>
                <Group gap="xs">
                  <Rating value={product.rating} fractions={2} readOnly size="md" />
                  <Text size="sm" c="dimmed">
                    {product.rating} / 5.0
                  </Text>
                </Group>
              </Stack>
              <Badge 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'teal', deg: 90 }}
                size="lg"
                radius="xl"
              >
                {product.category}
              </Badge>
            </Group>

            <Text 
              fw={700} 
              size="2rem"
              className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >
              ${product.price.toFixed(2)}
            </Text>

            {!product.inStock && (
              <Alert color="red" title="Out of Stock" radius="xl">
                This product is currently unavailable.
              </Alert>
            )}

            <Text size="md" lineClamp={10}>
              {product.description}
            </Text>

            <Group mt="md">
              <Button
                leftSection={<IconShoppingCart size={18} />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                variant="gradient"
                gradient={{ from: 'blue', to: 'teal', deg: 90 }}
                radius="xl"
                className="transition-all hover:scale-105"
              >
                Add to Cart
              </Button>
            </Group>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
}

