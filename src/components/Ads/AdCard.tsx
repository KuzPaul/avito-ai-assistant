import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { type Category } from "../../types";
import { memo } from "react";
import styles from "./AdCard.module.css";

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
  layout: "grid" | "list";
  onClick: (id: string) => void;
}

export const AdCard = memo(
  ({
    id,
    title,
    price,
    category,
    imageUrl,
    needsRevision,
    layout,
    onClick,
  }: AdCardProps) => {
    const isGrid = layout === "grid";

    return (
      <Card
        className={`${styles.card} ${isGrid ? styles.cardGrid : styles.cardList}`}
        onClick={() => onClick(id)}
      >
        <CardMedia
          component="img"
          loading="lazy"
          height="150"
          image={imageUrl || ""}
          alt={title}
          className={`${styles.media} ${!isGrid ? styles.mediaList : ""}`}
        />
        <CardContent
          className={`${styles.content} ${isGrid ? styles.contentGrid : styles.contentList}`}
        >
          <Typography
            variant="body2"
            className={isGrid ? styles.categoryGrid : styles.categoryList}
          >
            {CATEGORY_LABELS[category]}
          </Typography>
          <Typography variant="subtitle1" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="h6" className={styles.price}>
            {price.toLocaleString()} ₽
          </Typography>
          {needsRevision && (
            <Chip label="Требует доработок" className={styles.chip} />
          )}
        </CardContent>
      </Card>
    );
  },
);

AdCard.displayName = "AdCard";
