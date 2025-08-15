import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdCard } from "./AdCard";

describe("AdCard", () => {
  it("renders title, price and category", () => {
    render(
      <AdCard
        id="1"
        title="iPhone 15"
        price={75000}
        category="electronics"
        layout="grid"
        needsRevision={false}
        onClick={() => {}}
      />,
    );

    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByText(/75[,\s]000/)).toBeInTheDocument();
    expect(screen.getByText("Электроника")).toBeInTheDocument();
  });

  it("shows revision chip when needsRevision is true", () => {
    render(
      <AdCard
        id="2"
        title="BMW"
        price={1000000}
        category="auto"
        layout="list"
        needsRevision
        onClick={() => {}}
      />,
    );

    expect(screen.getByText("Требует доработок")).toBeInTheDocument();
  });

  it("calls onClick with id when card is clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <AdCard
        id="abc-123"
        title="Квартира"
        price={5000000}
        category="real_estate"
        layout="grid"
        needsRevision={false}
        onClick={onClick}
      />,
    );

    await user.click(screen.getByText("Квартира"));
    expect(onClick).toHaveBeenCalledWith("abc-123");
  });
});
