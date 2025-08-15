import { Snackbar, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./CustomSnackbar.module.css";

export type SnackbarState = {
  open: boolean;
  title?: string;
  description?: string;
  type: "success" | "error";
};

export interface CustomSnackbarProps extends SnackbarState {
  onClose: () => void;
}

export const CustomSnackbar = ({
  open,
  title,
  description,
  type = "success",
  onClose,
}: CustomSnackbarProps) => {
  const isSuccess = type === "success";

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box
        className={`${styles.content} ${isSuccess ? styles.contentSuccess : styles.contentError}`}
      >
        <Box className={styles.iconWrap}>
          {isSuccess ? (
            <CheckCircleIcon className={styles.successIcon} />
          ) : (
            <Box className={styles.errorIconWrap}>
              <CloseIcon className={styles.errorIcon} />
            </Box>
          )}
        </Box>

        <Box className={styles.body}>
          {title && <Typography className={styles.title}>{title}</Typography>}
          {description && (
            <Typography className={styles.description}>{description}</Typography>
          )}
        </Box>
      </Box>
    </Snackbar>
  );
};
