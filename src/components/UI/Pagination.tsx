import { Pagination as MuiPagination, Stack } from "@mui/material";

interface PaginationProps {
  total: number;
  page: number;
  limit?: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  total,
  page,
  limit = 10,
  onChange,
}: PaginationProps) => {
  const count = Math.ceil(total / limit);

  if (count <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};
