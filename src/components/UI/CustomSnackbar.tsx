import { Snackbar, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

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
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderRadius: "8px",
          minWidth: 300,
          maxWidth: 360,

          bgcolor: isSuccess ? "#F6FFED" : "#FFF2F0",
          border: `1px solid ${isSuccess ? "#B7EB8F" : "#FFCCC7"}`,
        }}
      >
        <Box sx={{ mt: "2px" }}>
          {isSuccess ? (
            <CheckCircleIcon sx={{ color: "#52C41A", fontSize: 20 }} />
          ) : (
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: "transparent",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid red",
              }}
            >
              <CloseIcon
                sx={{
                  color: "#FF4D4F",
                  fontSize: 20,
                }}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          {title && (
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "rgba(0,0,0,0.85)",
              }}
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "rgba(0,0,0,0.65)",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Snackbar>
  );
};
