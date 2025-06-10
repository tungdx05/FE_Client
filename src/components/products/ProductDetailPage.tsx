import { useParams } from "react-router-dom";
import { Box, Container, Typography, Rating, Chip, Button, Divider, Grid } from "@mui/material";
import { fakeProducts } from "../../data/fakeProducts";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const found = fakeProducts.find((p) => p.id === Number(id));
    setProduct(found);
  }, [id]);

  if (!product) return <Typography align="center">Không tìm thấy sản phẩm</Typography>;

  const discountedPrice = product.discountPercent
    ? product.price * (1 - product.discountPercent / 100)
    : product.price;

  const suggestedProducts = fakeProducts.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4); // lấy 4 sản phẩm cùng danh mục

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" gap={4} flexDirection={{ xs: "column", md: "row" }}>
        <Box>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: 400, height: 400, objectFit: "cover", borderRadius: 8 }}
          />
        </Box>
        <Box flex={1}>
          <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography>({product.reviews} đánh giá)</Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Danh mục: <strong>{product.category || "Chưa phân loại"}</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Trạng thái:{" "}
            <strong style={{ color: product.inStock ? "green" : "red" }}>
              {product.inStock ? "Còn hàng" : "Hết hàng"}
            </strong>
          </Typography>

          {product.discountPercent ? (
            <>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textDecoration: "line-through", mt: 2 }}
              >
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
              <Typography variant="h5" color="error">
                {discountedPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
              <Chip label={`Giảm ${product.discountPercent}%`} color="error" sx={{ mt: 1 }} />
            </>
          ) : (
            <Typography variant="h5" sx={{ mt: 2 }}>
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!product.inStock}
            onClick={() => alert(`Đã thêm ${product.name} vào giỏ hàng`)}
          >
            Thêm vào giỏ hàng
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Thông tin chi tiết
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
        {product.details || "Đang cập nhật..."}
      </Typography>

      {suggestedProducts.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>
            Sản phẩm tương tự
          </Typography>
          <Grid container spacing={2}>
            {suggestedProducts.map((p) => (
              <Grid item key={p.id} xs={12} sm={6} md={3}>
                <Box
                  onClick={() => window.location.href = `/products/${p.id}`}
                  sx={{
                    border: "1px solid #eee",
                    borderRadius: 2,
                    p: 2,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: 2 }
                  }}
                >
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <Typography variant="subtitle1" noWrap sx={{ mt: 1 }}>{p.name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {p.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
