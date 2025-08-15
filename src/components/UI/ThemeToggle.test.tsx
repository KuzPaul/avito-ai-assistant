import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeToggle } from "./ThemeToggle";
import { uiReducer, uiActions } from "../../store";

const createStore = () =>
  configureStore({
    reducer: { ui: uiReducer },
    preloadedState: {
      ui: {
        isLoading: false,
        error: null,
        layout: "grid" as const,
        theme: "light" as const,
      },
    },
  });

describe("ThemeToggle", () => {
  it("renders accessible theme button", () => {
    render(
      <Provider store={createStore()}>
        <ThemeToggle />
      </Provider>,
    );

    expect(
      screen.getByRole("button", { name: /переключить тему/i }),
    ).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const store = createStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>,
    );

    await user.click(screen.getByRole("button", { name: /переключить тему/i }));
    expect(store.getState().ui.theme).toBe("dark");

    store.dispatch(uiActions.toggleTheme());
    expect(store.getState().ui.theme).toBe("light");
  });
});
