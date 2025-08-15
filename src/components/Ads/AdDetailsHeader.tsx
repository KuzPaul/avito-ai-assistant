import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "../../assets/editIcon.svg?react";
import { ThemeToggle } from "../UI/ThemeToggle";
import { formatDate } from "../../utils/convertData";
import type { Item } from "../../types";
import styles from "./AdDetailsHeader.module.css";

interface AdDetailsHeaderProps {
  item: Item;
  onBack: () => void;
  onEdit: () => void;
}

export const AdDetailsHeader = ({
  item,
  onBack,
  onEdit,
}: AdDetailsHeaderProps) => (
  <AppBar position="sticky" color="inherit" elevation={0} className={styles.appBar}>
    <Toolbar className={styles.toolbar}>
      <Box className={styles.headerTop}>
        <Typography className={styles.title}>{item.title}</Typography>
        <Box className={styles.headerActions}>
          <ThemeToggle />
          <Typography className={styles.price}>
            {item.price.toLocaleString()} ₽
          </Typography>
        </Box>
      </Box>

      <Box className={styles.actionsRow}>
        <Box className={styles.headerActions}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            className={styles.backBtn}
          >
            К списку
          </Button>
          <Button
            endIcon={<EditIcon />}
            onClick={onEdit}
            className={styles.editBtn}
            variant="contained"
          >
            Редактировать
          </Button>
        </Box>
        <Box className={styles.dates}>
          <Typography className={styles.dateText}>
            Опубликовано: {formatDate(item.createdAt)}
          </Typography>
          {item.updatedAt && (
            <Typography className={styles.dateText}>
              Отредактировано: {formatDate(item.updatedAt)}
            </Typography>
          )}
        </Box>
      </Box>
      <Box className={styles.divider} />
    </Toolbar>
  </AppBar>
);
