import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import type { Product } from '../types/product.type';

interface ProductListProps {
  product: Product;
}

const ProductList: React.FC<ProductListProps> = ({ product }) => (
  <Card sx={{ width: 250 }}>
    <CardMedia
      component="img"
      height="140"
      image={product.imageUrl}
      alt={product.name}
    />
    <CardContent>
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
      <Typography variant="subtitle1" color="primary">
        Giá: {product.price.toLocaleString()} VND
      </Typography>
    </CardContent>
  </Card>
);

export default ProductList;
