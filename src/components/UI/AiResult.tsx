import { Box, Button, Typography } from "@mui/material";
import styles from "./AiResult.module.css";

type Props = {
  value: string | number | null;
  onApply: () => void;
  onClose: () => void;
};

export const AiResult = ({ value, onApply, onClose }: Props) => {
  if (!value) return null;

  return (
    <Box className={styles.root}>
      <Typography className={styles.text}>{value}</Typography>
      <Box className={styles.actions}>
        <Button variant="contained" size="small" onClick={onApply}>
          Применить
        </Button>
        <Button size="small" onClick={onClose}>
          Закрыть
        </Button>
      </Box>
    </Box>
  );
};
