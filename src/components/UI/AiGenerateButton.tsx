import { Button, CircularProgress } from "@mui/material";
import IconGenerate from "../../assets/iconGenerate.svg?react";
import styles from "./AiGenerateButton.module.css";

interface AiGenerateButtonProps {
  label: string;
  loadingLabel?: string;
  isLoading: boolean;
  disabled?: boolean;
  onClick: () => void;
  progressSize?: number;
}

export const AiGenerateButton = ({
  label,
  isLoading,
  disabled,
  onClick,
  progressSize = 20,
}: AiGenerateButtonProps) => (
  <Button
    startIcon={<IconGenerate />}
    onClick={onClick}
    disabled={disabled || isLoading}
    className={styles.btn}
  >
    {isLoading ? <CircularProgress size={progressSize} /> : label}
  </Button>
);
