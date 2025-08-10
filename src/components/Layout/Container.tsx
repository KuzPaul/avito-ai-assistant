import { Box } from "@mui/material";

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
      sx={{
        width: "100%",
        mx: "auto",
        maxWidth,
        px,
        py,
      }}
    >
      {children}
    </Box>
  );
};
