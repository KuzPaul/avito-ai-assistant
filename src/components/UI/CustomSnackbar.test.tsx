import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomSnackbar } from "./CustomSnackbar";

describe("CustomSnackbar", () => {
  it("shows success title when open", () => {
    render(
      <CustomSnackbar
        open
        title="Изменения сохранены"
        type="success"
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Изменения сохранены")).toBeInTheDocument();
  });

  it("shows error title and description", () => {
    render(
      <CustomSnackbar
        open
        title="Ошибка сохранения"
        description="Попробуйте ещё раз"
        type="error"
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Ошибка сохранения")).toBeInTheDocument();
    expect(screen.getByText("Попробуйте ещё раз")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    render(
      <CustomSnackbar
        open={false}
        title="Скрыто"
        type="success"
        onClose={vi.fn()}
      />,
    );

    expect(screen.queryByText("Скрыто")).not.toBeInTheDocument();
  });
});
