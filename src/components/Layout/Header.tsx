import { useState } from "react";
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

export const Header = ({ total }: { total: number }) => {
  const dispatch = useAppDispatch();
  const { search, sortBy, sortOrder } = useAppSelector(
    (state) => state.filters,
  );
  const { layout } = useAppSelector((state) => state.ui);

  // Состояние для активного элемента
  const [activeSort, setActiveSort] = useState(sortBy);

  const handleSortChange = (value: string) => {
    if (value === "newest") {
      dispatch(filtersActions.setSort({ by: "createdAt", order: "desc" }));
      setActiveSort("createdAt");
    } else if (value === "title-asc") {
      dispatch(filtersActions.setSort({ by: "title", order: "asc" }));
      setActiveSort("title");
    } else if (value === "title-desc") {
      dispatch(filtersActions.setSort({ by: "title", order: "desc" }));
      setActiveSort("title");
    } else if (value === "price-asc") {
      dispatch(filtersActions.setSort({ by: "price", order: "asc" }));
      setActiveSort("price");
    } else if (value === "price-desc") {
      dispatch(filtersActions.setSort({ by: "price", order: "desc" }));
      setActiveSort("price");
    }
  };

  const handleLayoutChange = (
    _e: React.MouseEvent<HTMLElement>,
    newLayout: "grid" | "list" | null,
  ) => {
    if (newLayout !== null) {
      dispatch(uiActions.setLayout(newLayout));
    }
  };

  // Определяем значение селекта
  const selectValue = () => {
    if (sortBy === "createdAt" && sortOrder === "desc") return "newest";
    if (sortBy === "title" && sortOrder === "asc") return "title-asc";
    if (sortBy === "title" && sortOrder === "desc") return "title-desc";
    if (sortBy === "price" && sortOrder === "asc") return "price-asc";
    if (sortBy === "price" && sortOrder === "desc") return "price-desc";
    return "newest";
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ bgcolor: "inherit" }}
    >
      <Toolbar
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          px: { xs: 2, md: 4 },
          py: 3,
        }}
      >
        {/* Заголовок */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Мои объявления
        </Typography>

        {/* Количество объявлений */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {total} объявления
        </Typography>

        {/* Белый блок с поиском и селектом */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            bgcolor: "white",
            p: "12px",
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {/* Поле поиска с иконкой */}
          <TextField
            size="small"
            placeholder="Найти объявление...."
            value={search}
            onChange={(e) => dispatch(filtersActions.setSearch(e.target.value))}
            sx={{
              flex: 1,
              borderRadius: "8px",
              cursor: "pointer",
              bgcolor: "#F7F5F8",
              "& fieldset": {
                border: "none",
              },
              "& input": { cursor: "pointer" },
            }}
            slotProps={{
              input: {
                sx: { cursor: "pointer" },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon
                      sx={{
                        color: "text.secondary",
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box
            sx={{ padding: "7px 8px", bgcolor: "#F7F5F8", borderRadius: "8px" }}
          >
            <ToggleButtonGroup
              value={layout}
              exclusive
              onChange={handleLayoutChange}
              size="small"
              sx={{
                "& .MuiToggleButton-root.Mui-selected": {
                  color: "#1976d2", // синий цвет иконки
                  backgroundColor: "transparent",
                },
              }}
            >
              <ToggleButton
                value="grid"
                sx={{
                  border: "none",
                  padding: "0 10px 0 8px",
                  borderRight: "3px solid white",
                  cursor: "pointer",
                }}
              >
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton
                value="list"
                sx={{
                  border: "none",
                  padding: "0 8px 0 10px",
                  cursor: "pointer",
                }}
              >
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>{" "}
          </Box>

          <Box sx={{ padding: "5px", bgcolor: "#F7F5F8", borderRadius: "8px" }}>
            <FormControl
              size="small"
              sx={{
                minWidth: 180,
                bgcolor: "white",
                "& fieldset": {
                  border: "none",
                },
              }}
            >
              <Select
                value={selectValue()}
                onChange={(e) => handleSortChange(e.target.value)}
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                  height: "32px",
                }}
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
