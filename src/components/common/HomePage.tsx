// common/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import type { Product } from '../types/product.type';
import instance from "../apis";
import ProductList from "../ProductList";
import Loading from '../Loading';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await instance.get<Product[]>('/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách sản phẩm
      </Typography>

      {loading ? (
        <Loading />
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {products.length === 0 ? (
            <Typography variant="body1">Chưa có sản phẩm nào.</Typography>
          ) : (
            products.map(product => (
              <ProductList key={product.id} product={product} />
            ))
          )}
        </Stack>
      )}
    </Container>
  );
};

export default HomePage;
