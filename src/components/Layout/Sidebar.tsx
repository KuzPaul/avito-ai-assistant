import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filtersActions } from "../../store";
import { type Category } from "../../types";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "electronics", label: "Электроника" },
  { value: "auto", label: "Транспорт" },
  { value: "real_estate", label: "Недвижимость" },
];

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { categories, onlyNeedsRevision } = useAppSelector(
    (state) => state.filters,
  );

  const handleCategoryChange = (category: Category) => {
    if (categories.includes(category)) {
      dispatch(
        filtersActions.setCategories(categories.filter((c) => c !== category)),
      );
    } else {
      dispatch(filtersActions.setCategories([...categories, category]));
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>

      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
        Категории
      </Typography>
      {CATEGORIES.map((cat) => (
        <FormControlLabel
          key={cat.value}
          control={
            <Checkbox
              checked={categories.includes(cat.value)}
              onChange={() => handleCategoryChange(cat.value)}
            />
          }
          label={cat.label}
        />
      ))}

      <Divider sx={{ my: 2 }} />

      <FormControlLabel
        control={
          <Checkbox
            checked={onlyNeedsRevision}
            onChange={(e) =>
              dispatch(filtersActions.setOnlyNeedsRevision(e.target.checked))
            }
          />
        }
        label="Только требующие доработок"
      />

      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => dispatch(filtersActions.resetFilters())}
      >
        Сбросить фильтры
      </Button>
    </Box>
  );
};
