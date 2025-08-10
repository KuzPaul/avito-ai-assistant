import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import Star from "../../assets/starRed.svg?react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  value?: any;
  onChange?: (e: any) => void;
  type?: string;
  multiline?: boolean;
  rows?: number;
  select?: boolean;
  options?: string[];
  width?: string;
  showWarning?: boolean;
  slotProps?: any;
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
  const fieldSx = {
    "& .MuiInputBase-input": {
      py: "6px",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#FFFFFF",
      py: 0,
      "& fieldset": {
        borderColor: showWarning ? "#FFA940" : "#D9D9D9",
        borderWidth: "1px",
        borderRadius: "8px",
      },
      "&:hover fieldset": { borderColor: showWarning ? "#FFA940" : "#D9D9D9" },
      "&.Mui-focused fieldset": {
        borderColor: showWarning ? "#FFA940" : "#D9D9D9",
      },
    },
  };

  return (
    <Box sx={{ width, maxWidth: "100%" }}>
      <Typography
        component="label"
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: 1.4,
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
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
          sx={fieldSx}
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
          value={value || ""}
          onChange={onChange}
          error={error}
          multiline={multiline}
          rows={rows}
          sx={fieldSx}
          slotProps={slotProps}
        />
      )}

      {helperText && (
        <Typography
          variant="caption"
          sx={{
            color: "rgba(0, 0, 0, 0.25)",
            mt: "2px",
            display: "block",
            mx: "left",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
