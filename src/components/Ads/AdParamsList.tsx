import { Box, Typography } from "@mui/material";
import type { ItemParams } from "../../types";
import { PARAM_LABELS } from "../../utils/getMissingFields";
import styles from "./AdParamsList.module.css";

interface AdParamsListProps {
  params: ItemParams;
}

export const AdParamsList = ({ params }: AdParamsListProps) => {
  const filledParams = Object.entries(params).filter(([, value]) => value);

  if (filledParams.length === 0) return null;

  return (
    <>
      <Typography className={styles.sectionTitle}>Характеристики</Typography>
      <Box className={styles.paramsList}>
        {filledParams.map(([key, value]) => {
          const label = PARAM_LABELS[key] || key;
          return (
            <Box key={key} className={styles.paramRow}>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.paramLabel}
              >
                {label}:
              </Typography>
              <Typography variant="body2">{String(value)}</Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
