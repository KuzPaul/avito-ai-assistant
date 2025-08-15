import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { filtersActions } from "../../store";
import { type Category } from "../../types";
import { ThemeToggle } from "../UI/ThemeToggle";
import styles from "./Sidebar.module.css";

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
    <Box className={styles.root}>
      <Box className={styles.filtersCard}>
        <Typography className={styles.filtersTitle}>Фильтры</Typography>

        <Accordion elevation={0} square className={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={styles.accordionSummary}
          >
            <Typography className={styles.accordionLabel}>Категория</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            {CATEGORIES.map((cat) => (
              <FormControlLabel
                key={cat.value}
                control={
                  <Checkbox
                    className={styles.checkbox}
                    checked={categories.includes(cat.value)}
                    onChange={() => handleCategoryChange(cat.value)}
                  />
                }
                className={styles.categoryLabel}
                label={cat.label}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        <Divider />

        <FormControlLabel
          labelPlacement="start"
          className={styles.revisionSwitch}
          control={
            <Switch
              checked={onlyNeedsRevision}
              onChange={(e) =>
                dispatch(filtersActions.setOnlyNeedsRevision(e.target.checked))
              }
              className={styles.switch}
            />
          }
          label={
            <Typography className={styles.revisionLabel}>
              Только требующие доработок
            </Typography>
          }
        />

        <Box className={styles.themeRow}>
          <Typography className={styles.themeLabel}>Тема оформления</Typography>
          <ThemeToggle />
        </Box>
      </Box>

      <Button
        fullWidth
        className={styles.resetBtn}
        onClick={() => dispatch(filtersActions.resetFilters())}
      >
        Сбросить фильтры
      </Button>
    </Box>
  );
};
