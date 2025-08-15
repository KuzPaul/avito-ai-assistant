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
import styles from "./AdsListPage.module.css";

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
  }, [data, sortBy, sortOrder, page]);

  const handleCardClick = useCallback(
    (id: string) => navigate(`/ads/${id}`),
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

  const gridClass =
    layout === "grid" ? styles.itemsGridGrid : styles.itemsGridList;

  return (
    <Box className={styles.page}>
      <Header total={total} />
      <Container>
        <Box className={styles.content}>
          {!isMobile && (
            <Box className={styles.sidebar}>
              <Sidebar />
            </Box>
          )}

          <Grid size={{ xs: 12, md: 9 }} className={styles.grid}>
            {items.length === 0 ? (
              <Box className={styles.empty}>
                <Typography variant="h6" color="text.secondary">
                  Объявления не найдены
                </Typography>
              </Box>
            ) : (
              <>
                <Box className={`${styles.itemsGrid} ${gridClass}`}>
                  {items.map((item) => (
                    <AdCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      category={item.category}
                      layout={layout}
                      needsRevision={item.needsRevision}
                      onClick={handleCardClick}
                    />
                  ))}
                </Box>

                <Pagination
                  total={total}
                  page={page}
                  limit={LIMIT}
                  onChange={handlePageChange}
                />
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
