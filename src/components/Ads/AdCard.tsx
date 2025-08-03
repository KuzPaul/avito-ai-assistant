import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { type Category } from "../../types";
import { useAppSelector } from "../../store/hooks";

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
  const { layout } = useAppSelector((state) => state.ui);
  return (
    <Card
      sx={{
        display: "flex",
        ...(layout === "grid"
          ? { flexDirection: "column" }
          : { flexDirection: "row" }),
        height: "100%",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "none",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      onClick={() => onClick(id)}
    >
      <CardMedia
        component="img"
        height="150"
        image={imageUrl || ""}
        alt={title}
        sx={{
          ...(layout === "list" ? { height: "100%", maxWidth: "179px" } : ""),
          objectFit: "cover",
          bgcolor: "#FAFAFA",
        }}
      />
      <CardContent
        sx={{
          ...(layout === "grid" ? { p: "16px 24px" } : ""),
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          position: "relative",
          p: "22px 16px 16px 16px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            ...(layout === "grid"
              ? {
                  color: "rgba(0, 0, 0, 0.85)",
                  position: "absolute",
                  top: "-10px",
                  left: "12px",
                  bgcolor: "#ffffff",
                  p: "0 12px",
                  border: "1px solid rgba(217, 217, 217, 1)",
                  borderRadius: "6px",
                }
              : {
                  color: "#848388",
                }),
            lineHeight: "22px",
          }}
        >
          {CATEGORY_LABELS[category]}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            letterSpacing: 0,
            m: 0,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: "rgba(0, 0, 0, 0.45)", fontWeight: "600" }}
        >
          {price.toLocaleString()} ₽
        </Typography>
        {needsRevision && (
          <Chip
            label="Требует доработок"
            sx={{
              p: "2px",
              fontSize: "14px",
              lineHeight: "22px",
              maxHeight: "26px",
              bgcolor: "#F9F1E6",
              color: "#FAAD14",

              alignSelf: "flex-start",
              "& .MuiChip-label": {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                pl: "8px",
                mt: "auto",
                "&::before": {
                  content: '""',
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "100px",
                  backgroundColor: "#FAAD14",
                  flexShrink: 0,
                },
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
