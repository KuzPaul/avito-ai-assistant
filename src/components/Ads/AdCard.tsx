import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { type Category } from "../../types";

const CATEGORY_LABELS: Record<Category, string> = {
  electronics: "Электроника",
  auto: "Транспорт",
  real_estate: "Недвижимость",
};

interface AdCardProps {
  id: string;
  title: string;
  price: number;
  category: Category;
  imageUrl?: string;
  needsRevision: boolean;
  onClick: (id: string) => void;
}

export const AdCard = ({
  id,
  title,
  price,
  category,
  imageUrl,
  needsRevision,
  onClick,
}: AdCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      onClick={() => onClick(id)}
    >
      <CardMedia
        component="img"
        height="160"
        image={
          imageUrl ||
          "https://placehold.co/400x300/e0e0e0/666?text=Нет+изображения"
        }
        alt={title}
        sx={{ objectFit: "cover", bgcolor: "#f5f5f5" }}
      />
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          {CATEGORY_LABELS[category]}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: 48,
          }}
        >
          {title}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          {price.toLocaleString()} ₽
        </Typography>
        {needsRevision && (
          <Chip
            label="Требует доработок"
            color="warning"
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
};
