import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DragTip } from "@/widgets/DragTip";

const SEEN_KEY = "kex03-drag-tip-seen-v2";

describe("DragTip", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("appears after a short delay, and closing it is remembered", () => {
    const onDismiss = vi.fn();
    const { unmount } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByRole("status")).toHaveTextContent("psst… these files move");

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(SEEN_KEY)).toBe("1");
    unmount();

    render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("comes back next visit if it timed out unnoticed", () => {
    const onDismiss = vi.fn();
    const { unmount } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(1700));
    act(() => vi.advanceTimersByTime(7100));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(SEEN_KEY)).toBeNull();
    unmount();

    render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("stays open while hovered", () => {
    render(<DragTip discovered={false} onDismiss={vi.fn()} />);
    act(() => vi.advanceTimersByTime(1700));
    fireEvent.mouseEnter(screen.getByRole("status"));
    act(() => vi.advanceTimersByTime(20000));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("hides without the wiggle once the visitor drags something", () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(1700));
    rerender(<DragTip discovered onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(10000));
    expect(onDismiss).not.toHaveBeenCalled();
    expect(localStorage.getItem(SEEN_KEY)).toBe("1");
  });
});
