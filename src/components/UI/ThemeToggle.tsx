import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { uiActions } from "../../store";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const isDark = theme === "dark";

  return (
    <Tooltip title={isDark ? "Светлая тема" : "Тёмная тема"}>
      <IconButton
        className={styles.toggle}
        onClick={() => dispatch(uiActions.toggleTheme())}
        aria-label="Переключить тему"
        size="small"
      >
        {isDark ? (
          <LightModeIcon className={styles.icon} />
        ) : (
          <DarkModeIcon className={styles.icon} />
        )}
      </IconButton>
    </Tooltip>
  );
};
