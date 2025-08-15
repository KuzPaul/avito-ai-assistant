import { Box, CircularProgress } from "@mui/material";
import styles from "./Loading.module.css";

export const Loading = () => (
  <Box className={styles.root}>
    <CircularProgress />
  </Box>
);
