import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filtersActions, uiActions } from "../../store";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useCallback, useMemo } from "react";
import { ThemeToggle } from "../UI/ThemeToggle";
import styles from "./Header.module.css";

type SortValue =
  | "newest"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc";

export const Header = ({ total }: { total: number }) => {
  const dispatch = useAppDispatch();
  const { search, sortBy, sortOrder } = useAppSelector(
    (state) => state.filters,
  );
  const { layout } = useAppSelector((state) => state.ui);

  const handleSortChange = useCallback((value: SortValue) => {
    switch (value) {
      case "newest":
        return dispatch(
          filtersActions.setSort({ by: "createdAt", order: "desc" }),
        );
      case "title-asc":
        return dispatch(filtersActions.setSort({ by: "title", order: "asc" }));
      case "title-desc":
        return dispatch(filtersActions.setSort({ by: "title", order: "desc" }));
      case "price-asc":
        return dispatch(filtersActions.setSort({ by: "price", order: "asc" }));
      case "price-desc":
        return dispatch(filtersActions.setSort({ by: "price", order: "desc" }));
      default:
        return;
    }
  }, [dispatch]);

  const handleLayoutChange = (
    _e: React.MouseEvent<HTMLElement>,
    newLayout: "grid" | "list" | null,
  ) => {
    if (newLayout !== null) {
      dispatch(uiActions.setLayout(newLayout));
    }
  };

  const value = useMemo((): SortValue => {
    if (sortBy === "createdAt") return "newest";
    if (sortBy === "title")
      return sortOrder === "asc" ? "title-asc" : "title-desc";
    if (sortBy === "price")
      return sortOrder === "asc" ? "price-asc" : "price-desc";
    return "newest";
  }, [sortBy, sortOrder]);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      className={styles.appBar}
    >
      <Toolbar disableGutters className={styles.toolbar}>
        <Box className={styles.toolbarRow}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Мои объявления
          </Typography>
          <ThemeToggle />
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          className={styles.subtitle}
        >
          {total} объявления
        </Typography>

        <Box className={styles.searchPanel}>
          <TextField
            size="small"
            placeholder="Найти объявление...."
            value={search}
            onChange={(e) => dispatch(filtersActions.setSearch(e.target.value))}
            className={styles.searchField}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className={styles.searchIcon} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box className={styles.controlGroup}>
            <ToggleButtonGroup
              value={layout}
              exclusive
              onChange={handleLayoutChange}
              size="small"
              className={styles.toggleGroup}
            >
              <ToggleButton
                value="grid"
                className={`${styles.toggleBtn} ${styles.toggleBtnGrid}`}
              >
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton
                value="list"
                className={`${styles.toggleBtn} ${styles.toggleBtnList}`}
              >
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box className={styles.sortWrapper}>
            <FormControl size="small" className={styles.sortControl}>
              <Select
                value={value}
                onChange={(e) => handleSortChange(e.target.value as SortValue)}
                className={styles.sortSelect}
              >
                <MenuItem value="newest">Сначала новые</MenuItem>
                <MenuItem value="title-asc">По названию (А-Я)</MenuItem>
                <MenuItem value="title-desc">По названию (Я-А)</MenuItem>
                <MenuItem value="price-asc">Дешевле</MenuItem>
                <MenuItem value="price-desc">Дороже</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
