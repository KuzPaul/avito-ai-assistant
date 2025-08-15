import { Box } from "@mui/material";
import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  px?: number | string;
  py?: number | string;
}

export const Container = ({
  children,
  maxWidth = 1399,
  px = 4,
  py = 0,
}: ContainerProps) => {
  return (
    <Box
      className={styles.container}
      sx={{
        maxWidth,
        px,
        py,
      }}
    >
      {children}
    </Box>
  );
};
