import React, { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
import type { Product } from '../types/product.type';
import instance from '../components/apis';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await instance.get<Product[]>('/products');
        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Lỗi khi lấy sản phẩm:', error.message);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
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
          {products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Home;
