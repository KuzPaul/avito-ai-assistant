import { Box, Button, Typography } from "@mui/material";

type Props = {
  value: string | number | null;
  onApply: () => void;
  onClose: () => void;
};

export const AiResult = ({ value, onApply, onClose }: Props) => {
  if (!value) return null;

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: "8px",
        bgcolor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "450px",
        position: "absolute",
        right: "600px",
        top: "-100px",
      }}
    >
      <Typography sx={{ mb: 1 }}>{value}</Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
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
