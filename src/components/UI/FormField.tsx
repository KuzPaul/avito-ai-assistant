import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import Star from "../../assets/starRed.svg?react";
import styles from "./FormField.module.css";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  value?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  type?: string;
  multiline?: boolean;
  rows?: number;
  select?: boolean;
  options?: string[];
  width?: string;
  showWarning?: boolean;
  slotProps?: object;
  name?: string;
  id?: string;
}

export const FormField = ({
  label,
  required,
  error,
  helperText,
  value,
  onChange,
  type = "text",
  multiline = false,
  rows,
  select = false,
  options = [],
  width = "456px",
  showWarning = false,
  slotProps,
  id,
  name,
}: FormFieldProps) => {
  const fieldClass = `${styles.field} ${showWarning ? styles.fieldWarning : styles.fieldDefault}`;

  return (
    <Box className={styles.wrapper} style={{ width }}>
      <Typography component="label" className={styles.label}>
        {required && <Star />}
        {label}
      </Typography>

      {select ? (
        <Select
          id={id || name}
          name={name}
          fullWidth
          value={value || ""}
          onChange={onChange}
          error={error}
          className={fieldClass}
        >
          <MenuItem value="">Не выбрано</MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          id={id || name}
          name={name}
          fullWidth
          type={type}
          value={value ?? ""}
          onChange={onChange}
          error={error}
          multiline={multiline}
          rows={rows}
          className={fieldClass}
          slotProps={slotProps}
        />
      )}

      {helperText && (
        <Typography variant="caption" className={styles.helperText}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
