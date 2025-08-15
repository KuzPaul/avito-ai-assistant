import {
  Pagination as MuiPagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import styles from "./Pagination.module.css";

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

  if (total === 0) return null;

  return (
    <Stack spacing={2} alignItems="flex-start" className={styles.stack}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_e, value) => onChange(value)}
        className={styles.pagination}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            className={styles.item}
            key={item.type === "page" ? `page-${item.page}` : item.type}
          />
        )}
      />
    </Stack>
  );
};
