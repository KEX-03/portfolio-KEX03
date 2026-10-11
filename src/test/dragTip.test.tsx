import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DragTip } from "@/widgets/DragTip";

describe("DragTip", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("appears after a short delay, and dismissing it is remembered", () => {
    const onDismiss = vi.fn();
    const { unmount } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByRole("status")).toHaveTextContent("psst… these files move");

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    unmount();

    render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("hides without the wiggle once the visitor drags something", () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(1700));
    rerender(<DragTip discovered onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(10000));
    expect(onDismiss).not.toHaveBeenCalled();
    expect(localStorage.getItem("kex03-drag-tip-seen")).toBe("1");
  });
});
