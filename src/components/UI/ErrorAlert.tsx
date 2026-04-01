import { Alert, AlertTitle, Box } from "@mui/material";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => (
  <Box sx={{ p: 2 }}>
    <Alert
      severity="error"
      variant="filled"
      action={
        onRetry && (
          <button
            onClick={onRetry}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
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
