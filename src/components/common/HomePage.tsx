// common/HomePage.tsx
import { useNavigate } from "react-router-dom";
import { fakeProducts } from "../../data/fakeProducts";// đường dẫn đúng file
import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from "@mui/material";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  stock: number;
  discountPercent?: number;
};



const Loading = () => (
  <Typography variant="h6" align="center" sx={{ mt: 4 }}>
    Đang tải sản phẩm...
  </Typography>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate(); // 👈 Thêm dòng này

  const discountedPrice = product.discountPercent
    ? product.price * (1 - product.discountPercent / 100)
    : product.price;

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        width: 280,
      }}
    >
      {product.discountPercent && (
        <Chip
          label={`Giảm ${product.discountPercent}%`}
          color="error"
          size="small"
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
        />
      )}
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: 180, objectFit: "cover", cursor: "pointer" }}
        onClick={() => navigate(`/products/${product.id}`)} // 👈 Click ảnh cũng chuyển trang
      />
      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          noWrap
          gutterBottom
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/product/${product.id}`)} // 👈 Click tên cũng chuyển
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="caption" color="text.secondary">
            ({product.reviews} đánh giá)
          </Typography>
        </Box>
        <Box sx={{ mt: 1, mb: 1 }}>
          {product.discountPercent ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
              <Typography variant="h6" sx={{ color: "#d32f2f" }}>
                {discountedPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
            </>
          ) : (
            <Typography variant="h6">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: "auto", textTransform: "none" }}
          onClick={() => alert(`Đã thêm ${product.name} vào giỏ hàng`)} // 👈 Giữ lại chức năng giỏ hàng
        >
          Thêm vào giỏ hàng
        </Button>
      </Box>
    </Box>
  );
};


const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(fakeProducts);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Sản phẩm Quần Áo & Giày Dép Hot Nhất
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 3,
              justifyItems: "center",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
