import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { filtersActions } from "../store";
import { getItems } from "../api/items";
import { Header } from "../components/Layout/Header";
import { Sidebar } from "../components/Layout/Sidebar";
import { AdCard } from "../components/Ads/AdCard";
import { Pagination } from "../components/UI/Pagination";
import { Loading } from "../components/UI/Loading";
import { ErrorAlert } from "../components/UI/ErrorAlert";
import { useQuery } from "@tanstack/react-query";

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
  let items = data?.items || [];
  let total = data?.total || 0;

  if (sortBy === "price" && data?.items) {
    const sorted = [...data.items].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    const start = (page - 1) * LIMIT;
    items = sorted.slice(start, start + LIMIT);
    total = data.items.length;
  }

  const handleCardClick = (id: string) => {
    navigate(`/ads/${id}`);
  };

  if (isError)
    return (
      <ErrorAlert
        message={error?.message}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header total={total} />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={2}>
          {!isMobile && (
            <Grid size={{ xs: 12, md: 3 }}>
              <Sidebar />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 9 }}>
            {items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Объявления не найдены
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {items.map((item) => (
                    <Grid
                      size={{
                        xs: 12,
                        sm: layout === "grid" ? 6 : 12,
                        md: layout === "grid" ? 4 : 12,
                      }}
                      key={item.id}
                    >
                      <AdCard
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        category={item.category}
                        needsRevision={item.needsRevision}
                        onClick={handleCardClick}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Pagination
                  total={total}
                  page={page}
                  limit={LIMIT}
                  onChange={(newPage) =>
                    dispatch(filtersActions.setPage(newPage))
                  }
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
