import { IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface ClearButtonProps {
  onClick: () => void;
}

export const ClearButton = ({ onClick }: ClearButtonProps) => {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={onClick}
        sx={{
          bgcolor: "rgba(0,0,0,0.25)",
          width: "14px",
          height: "14px",
        }}
      >
        <ClearIcon sx={{ color: "#FFFFFF", fontSize: "12px" }} />
      </IconButton>
    </InputAdornment>
  );
};
