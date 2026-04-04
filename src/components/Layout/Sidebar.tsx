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
    <Box sx={{ width: "100%", maxWidth: 256, p: 0, m: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FFFFFF",
          p: 2,
          borderRadius: "8px",
          gap: "10px",
          mb: 1,
        }}
      >
        <Typography
          sx={{
            m: 0,
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          Фильтры
        </Typography>

        <Accordion
          elevation={0}
          square
          sx={{
            boxShadow: "none",
            "&:before": { display: "none" },
            margin: 0,
            "&.Mui-expanded": { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: 0,
              minHeight: 0,
              "& .MuiAccordionSummary-content": {
                m: 0,
                minHeight: 0,
              },
              "&.Mui-expanded": {
                minHeight: 0,
                "& .MuiAccordionSummary-content": { m: 0, minHeight: 0 },
              },
            }}
          >
            <Typography sx={{ fontSize: "14px", lineHeight: "22px", mb: 1 }}>
              Категория
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              p: 0,
              m: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {CATEGORIES.map((cat) => (
              <FormControlLabel
                key={cat.value}
                control={
                  <Checkbox
                    sx={{
                      p: 0,
                    }}
                    checked={categories.includes(cat.value)}
                    onChange={() => handleCategoryChange(cat.value)}
                  />
                }
                sx={{
                  m: 0,
                  gap: "8px",
                }}
                label={cat.label}
              />
            ))}
          </AccordionDetails>
        </Accordion>

        <Divider />

        <FormControlLabel
          labelPlacement="start"
          sx={{ justifyContent: "space-between", width: "100%", m: 0 }}
          control={
            <Switch
              checked={onlyNeedsRevision}
              onChange={(e) =>
                dispatch(filtersActions.setOnlyNeedsRevision(e.target.checked))
              }
              sx={{
                width: 44,
                height: 22,
                p: 0,
                "& .MuiSwitch-switchBase": {
                  p: 0,
                  m: "2px",
                  "&.Mui-checked": {
                    transform: "translateX(22px)",
                    "& + .MuiSwitch-track": {
                      backgroundColor: "#1976d2",
                      opacity: 1,
                    },
                  },
                },
                "& .MuiSwitch-thumb": {
                  width: 18,
                  height: 18,
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                },
                "& .MuiSwitch-track": {
                  width: 44,
                  height: 22,
                  borderRadius: 16,
                  backgroundColor: "#BFBFBF",
                  opacity: 1,
                },
              }}
            />
          }
          label={
            <Typography
              sx={{ fontWeight: 600, fontSize: "16px", lineHeight: "24px" }}
            >
              Только требующие доработок
            </Typography>
          }
        />
      </Box>

      <Button
        fullWidth
        sx={{
          bgcolor: "#FFFFFF",
          p: 1.5,
          textAlign: "center",
          color: "#848388",
          fontSize: "14px",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          "&:hover": { bgcolor: "#E0E0E0", color: "#1976d2" },
        }}
        onClick={() => dispatch(filtersActions.resetFilters())}
      >
        Сбросить фильтры
      </Button>
    </Box>
  );
};
