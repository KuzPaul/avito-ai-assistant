import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, uiActions } from "./index";

const createUiStore = (theme: "light" | "dark" = "light") =>
  configureStore({
    reducer: { ui: uiReducer },
    preloadedState: {
      ui: {
        isLoading: false,
        error: null,
        layout: "grid" as const,
        theme,
      },
    },
  });

describe("uiSlice toggleTheme", () => {
  it("switches light to dark", () => {
    const store = createUiStore("light");
    store.dispatch(uiActions.toggleTheme());
    expect(store.getState().ui.theme).toBe("dark");
  });

  it("switches dark to light", () => {
    const store = createUiStore("dark");
    store.dispatch(uiActions.toggleTheme());
    expect(store.getState().ui.theme).toBe("light");
  });
});
