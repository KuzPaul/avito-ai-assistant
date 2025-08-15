import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders nothing when total is 0", () => {
    const { container } = render(
      <Pagination total={0} page={1} onChange={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls onChange with selected page number", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination total={30} page={1} limit={10} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Go to page 2" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
