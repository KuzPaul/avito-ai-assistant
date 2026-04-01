import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  ViewList,
  ViewModule,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filtersActions, uiActions } from "../../store";

interface HeaderProps {
  total: number;
}

export const Header = ({ total }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { search, sortBy, sortOrder } = useAppSelector(
    (state) => state.filters,
  );
  const { layout, theme } = useAppSelector((state) => state.ui);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: { xs: 1, sm: 0 }, mr: 2 }}>
          Мои объявления ({total})
        </Typography>

        <TextField
          size="small"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => dispatch(filtersActions.setSearch(e.target.value))}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Сортировка</InputLabel>
          <Select
            value={`${sortBy}-${sortOrder}`}
            label="Сортировка"
            onChange={(e) => {
              const [by, order] = e.target.value.split("-") as [
                "title" | "createdAt",
                "asc" | "desc",
              ];
              dispatch(filtersActions.setSort({ by, order }));
            }}
          >
            <MenuItem value="createdAt-desc">Сначала новые</MenuItem>
            <MenuItem value="createdAt-asc">Сначала старые</MenuItem>
            <MenuItem value="title-asc">По названию (А-Я)</MenuItem>
            <MenuItem value="title-desc">По названию (Я-А)</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <IconButton
            onClick={() =>
              dispatch(uiActions.setLayout(layout === "grid" ? "list" : "grid"))
            }
          >
            {layout === "grid" ? <ViewList /> : <ViewModule />}
          </IconButton>
          <IconButton onClick={() => dispatch(uiActions.toggleTheme())}>
            {theme === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
