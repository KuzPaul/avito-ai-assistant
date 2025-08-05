import { useNavigate } from "react-router-dom";
import { Grid, Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { filtersActions } from "../store";
import { getItems } from "../api/items";
import { Header } from "../components/Layout/Header";
import { Sidebar } from "../components/Layout/Sidebar";
import { AdCard } from "../components/Ads/AdCard";
import { Pagination } from "../components/UI/Pagination";
import { ErrorAlert } from "../components/UI/ErrorAlert";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../components/Layout/Container";
import { useCallback, useMemo } from "react";

export const AdsListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { search, categories, onlyNeedsRevision, sortBy, sortOrder, page } =
    useAppSelector((state) => state.filters);
  const { layout } = useAppSelector((state) => state.ui);

  const LIMIT = 10;

  const { data, isError, error } = useQuery({
    queryKey: [
      "items",
      search,
      categories,
      onlyNeedsRevision,
      sortBy,
      sortOrder,
      page,
    ],
    queryFn: () =>
      getItems({
        q: search || undefined,
        categories: categories.length > 0 ? categories.join(",") : undefined,
        needsRevision: onlyNeedsRevision || undefined,
        sortColumn: sortBy !== "price" ? sortBy : undefined,
        sortDirection: sortBy !== "price" ? sortOrder : undefined,
        limit: sortBy === "price" ? 1000 : LIMIT,
        skip: sortBy === "price" ? 0 : (page - 1) * LIMIT,
      }),
    placeholderData: (previousData) => previousData,
  });

  //TODO на беке нет сортировки по цене сделал на фронте
  const { items, total } = useMemo(() => {
    if (sortBy !== "price") {
      return { items: data?.items || [], total: data?.total || 0 };
    }

    const sorted = [...(data?.items || [])].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price,
    );

    const start = (page - 1) * LIMIT;
    return {
      items: sorted.slice(start, start + LIMIT),
      total: sorted.length,
    };
  }, [data, sortBy, sortOrder, page, LIMIT]);

  const handleCardClick = useCallback(
    (id: number) => navigate(`/ads/${id}`),
    [navigate],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(filtersActions.setPage(newPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch],
  );

  if (isError)
    return (
      <ErrorAlert
        message={error?.message}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        minHeight: "100vh",
        bgcolor: "background.default",
        gap: 0,
      }}
    >
      <Header total={total} />
      <Container>
        <Box sx={{ display: "flex", mt: 2, gap: 3 }}>
          {!isMobile && (
            <Box sx={{ width: 256, flexShrink: 0 }}>
              <Sidebar />
            </Box>
          )}

          <Grid size={{ xs: 12, md: 9 }} sx={{ p: 0 }}>
            {items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Объявления не найдены
                </Typography>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: layout === "grid" ? "repeat(2, 1fr)" : "1fr",
                      md: layout === "grid" ? "repeat(3, 1fr)" : "1fr",
                      lg: layout === "grid" ? "repeat(5, 1fr)" : "1fr",
                    },
                    gap: 2,
                  }}
                >
                  {items.map((item, index) => (
                    <AdCard
                      key={item.id || `item-${index}`}
                      id={index + 1}
                      title={item.title}
                      price={item.price}
                      category={item.category}
                      needsRevision={item.needsRevision}
                      onClick={handleCardClick}
                    />
                  ))}
                </Box>

                <Pagination
                  total={total}
                  page={page}
                  limit={LIMIT}
                  onChange={(newPage) => {
                    handlePageChange(newPage);
                  }}
                />
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
