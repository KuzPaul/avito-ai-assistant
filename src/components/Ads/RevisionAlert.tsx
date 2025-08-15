import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import styles from "./RevisionAlert.module.css";

interface RevisionAlertProps {
  missingFields: string[];
}

export const RevisionAlert = ({ missingFields }: RevisionAlertProps) => {
  if (missingFields.length > 0) {
    return (
      <Box className={styles.warningBox}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          className={styles.warningTitle}
        >
          Требуются доработки
        </Typography>
        <Typography variant="body2">
          У объявления не заполнены поля:
        </Typography>
        <Box component="ul" className={styles.warningList}>
          {missingFields.map((field) => (
            <Typography component="li" key={field} variant="body2">
              {field}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Alert severity="success" className={styles.successAlert}>
      <AlertTitle>Всё заполнено</AlertTitle>
      <Typography fontWeight={500}>Объявление полностью заполнено.</Typography>
    </Alert>
  );
};
