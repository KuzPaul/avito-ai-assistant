import { useState, useEffect } from "react";
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
import { filtersActions, uiActions } from "../store";
import { getItems } from "../api/items";
import { Header } from "../components/Layout/Header";
import { Sidebar } from "../components/Layout/Sidebar";
import { AdCard } from "../components/Ads/AdCard";
import { Pagination } from "../components/UI/Pagination";
import { Loading } from "../components/UI/Loading";
import { ErrorAlert } from "../components/UI/ErrorAlert";
import { type ItemListItem } from "../types";

export const AdsListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { search, categories, onlyNeedsRevision, sortBy, sortOrder, page } =
    useAppSelector((state) => state.filters);
  const { layout, isLoading, error } = useAppSelector((state) => state.ui);

  const [items, setItems] = useState<ItemListItem[]>([]);
  const [total, setTotal] = useState(0);

  const LIMIT = 10;

  useEffect(() => {
    loadItems();
  }, [search, categories, onlyNeedsRevision, sortBy, sortOrder, page]);

  const loadItems = async () => {
    dispatch(uiActions.setLoading(true));
    dispatch(uiActions.setError(null));

    try {
      const response = await getItems({
        q: search || undefined,
        categories: categories.length > 0 ? categories.join(",") : undefined,
        needsRevision: onlyNeedsRevision || undefined,
        sortColumn: sortBy,
        sortDirection: sortOrder,
        limit: LIMIT,
        skip: (page - 1) * LIMIT,
      });

      setItems(response.items);
      setTotal(response.total);
    } catch (err) {
      dispatch(
        uiActions.setError(
          err instanceof Error ? err.message : "Ошибка загрузки",
        ),
      );
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/ads/${id}`);
  };

  if (isLoading && items.length === 0) {
    return <Loading />;
  }

  if (error && items.length === 0) {
    return <ErrorAlert message={error} onRetry={loadItems} />;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header total={total} />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid size={{ xs: 12, md: 3 }}>
              <Sidebar />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 9 }}>
            {items.length === 0 && !isLoading ? (
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
