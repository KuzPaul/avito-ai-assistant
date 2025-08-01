import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { useAppSelector } from "./store/hooks";
import { AdsListPage } from "./pages/AdsListPage";

function App() {
  const { theme: mode } = useAppSelector((state) => state.ui);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to="/ads" replace />} />
        <Route path="/ads" element={<AdsListPage />} />
        <Route path="/ads/:id" element={<div>Страница просмотра</div>} />
        <Route
          path="/ads/:id/edit"
          element={<div>Страница редактирования</div>}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
