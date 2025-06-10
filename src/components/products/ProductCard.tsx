import { Box, Button, Chip, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Product"; // đảm bảo có kiểu Product

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  const discountedPrice = product.discountPercent
    ? product.price * (1 - product.discountPercent / 100)
    : product.price;

  return (
    <Box
      onClick={() => navigate(`/products/${product.id}`)}
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
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
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
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />
      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" noWrap gutterBottom>
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
          onClick={(e) => {
            e.stopPropagation();
            alert(`Đã thêm ${product.name} vào giỏ hàng`);
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
