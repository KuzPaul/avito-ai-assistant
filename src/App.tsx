import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { useAppSelector } from "./store/hooks";
import { AdsListPage } from "./pages/AdsListPage";
import { AdDetailsPage } from "./pages/AdDetailsPage";

function App() {
  const { theme: mode } = useAppSelector((state) => state.ui);

  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: "#F7F5F8",
        paper: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to="/ads" replace />} />
        <Route path="/ads" element={<AdsListPage />} />
        <Route path="/ads/:id" element={<AdDetailsPage />} />
        <Route
          path="/ads/:id/edit"
          element={<div>Страница редактирования</div>}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
