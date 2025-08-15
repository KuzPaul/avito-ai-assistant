import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

export const useThemeSync = () => {
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
};
