import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type Category } from "../types";

// === Фильтры ===
interface FiltersState {
  search: string;
  categories: Category[];
  onlyNeedsRevision: boolean;
  sortBy: "title" | "createdAt";
  sortOrder: "asc" | "desc";
  page: number;
}

const initialFilters: FiltersState = {
  search: "",
  categories: [],
  onlyNeedsRevision: false,
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFilters,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.page = 1;
    },
    setOnlyNeedsRevision: (state, action: PayloadAction<boolean>) => {
      state.onlyNeedsRevision = action.payload;
      state.page = 1;
    },
    setSort: (
      state,
      action: PayloadAction<{
        by: "title" | "createdAt";
        order: "asc" | "desc";
      }>,
    ) => {
      state.sortBy = action.payload.by;
      state.sortOrder = action.payload.order;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: () => {
      return { ...initialFilters, page: 1 };
    },
  },
});

// === UI состояния ===
interface UIState {
  isLoading: boolean;
  error: string | null;
  layout: "grid" | "list";
  theme: "light" | "dark";
}

const initialUI: UIState = {
  isLoading: false,
  error: null,
  layout: "grid",
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUI,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLayout: (state, action: PayloadAction<"grid" | "list">) => {
      state.layout = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const filtersActions = filtersSlice.actions;
export const uiActions = uiSlice.actions;

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
