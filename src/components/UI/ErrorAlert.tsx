import { Alert, AlertTitle, Box } from "@mui/material";
import styles from "./ErrorAlert.module.css";

interface ErrorAlertProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => (
  <Box className={styles.root}>
    <Alert
      severity="error"
      variant="filled"
      action={
        onRetry && (
          <button type="button" onClick={onRetry} className={styles.retryBtn}>
            Повторить
          </button>
        )
      }
    >
      <AlertTitle>Ошибка</AlertTitle>
      {message}
    </Alert>
  </Box>
);
