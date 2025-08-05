import {
  Pagination as MuiPagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { useEffect } from "react";

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
    <Stack spacing={2} alignItems="flex-start" sx={{ mt: "10px" }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_e, value) => onChange(value)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              border: "1px solid #D9D9D9",
              borderRadius: "8px",
              minWidth: "32px",
              height: "32px",
              padding: "1px 7px",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "32px",
              textAlign: "center",
              color: "#000000",
              backgroundColor: "#FFFFFF",
              "&.Mui-selected": {
                borderColor: "#1890FF",
                color: "#1890FF",
                backgroundColor: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#F0F7FF",
                  borderColor: "#1890FF",
                },
              },
              "&:hover": {
                backgroundColor: "#F5F5F5",
                borderColor: "#1890FF",
              },
              "&.Mui-disabled": {
                borderColor: "#D9D9D9",
                color: "#D9D9D9",
                cursor: "not-allowed",
                backgroundColor: "#FFFFFF",
              },
            }}
            key={item.type === "page" ? `page-${item.page}` : item.type}
          />
        )}
        sx={{
          "& .MuiPagination-ul": {
            gap: "8px",
          },
        }}
      />
    </Stack>
  );
};
