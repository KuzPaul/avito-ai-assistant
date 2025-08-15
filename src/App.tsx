import { lazy, Suspense, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "./store/hooks";
import { useThemeSync } from "./hooks/useThemeSync";
import { createAppTheme } from "./theme/createAppTheme";
import { Loading } from "./components/UI/Loading";

const AdsListPage = lazy(() =>
  import("./pages/AdsListPage").then((m) => ({ default: m.AdsListPage })),
);
const AdDetailsPage = lazy(() =>
  import("./pages/AdDetailsPage").then((m) => ({ default: m.AdDetailsPage })),
);
const AdEditPage = lazy(() =>
  import("./pages/AdEditPage").then((m) => ({ default: m.AdEditPage })),
);

function App() {
  const { theme: mode } = useAppSelector((state) => state.ui);
  useThemeSync();

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/ads" replace />} />
          <Route path="/ads" element={<AdsListPage />} />
          <Route path="/ads/:id" element={<AdDetailsPage />} />
          <Route path="/ads/:id/edit" element={<AdEditPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
