import { IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./ClearButton.module.css";

interface ClearButtonProps {
  onClick: () => void;
}

export const ClearButton = ({ onClick }: ClearButtonProps) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClick} className={styles.btn} size="small">
        <ClearIcon className={styles.icon} />
      </IconButton>
    </InputAdornment>
  );
};
