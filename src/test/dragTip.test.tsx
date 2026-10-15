import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DragTip, PhoneTip } from "@/widgets/DragTip";

const LEARNED_KEY = "kex03-drag-tip-learned";
const SHOWN_KEY = "kex03-home-tip-shown";

describe("DragTip", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("appears after a short delay and only once per tab session", () => {
    const onDismiss = vi.fn();
    const { unmount } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByRole("status")).toHaveTextContent("psst… these files move");

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    unmount();

    // Coming back to Home in the same tab doesn't pop it again...
    const second = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    second.unmount();

    // ...but a new visit does, since closing it isn't the same as learning to drag.
    sessionStorage.clear();
    render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("auto-hides after a while", () => {
    const onDismiss = vi.fn();
    render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(1700));
    act(() => vi.advanceTimersByTime(7100));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(SHOWN_KEY)).toBe("1");
  });

  it("stays open while hovered", () => {
    render(<DragTip discovered={false} onDismiss={vi.fn()} />);
    act(() => vi.advanceTimersByTime(1700));
    fireEvent.mouseEnter(screen.getByRole("status"));
    act(() => vi.advanceTimersByTime(20000));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("hides for good, without the wiggle, once the visitor drags something", () => {
    const onDismiss = vi.fn();
    const { rerender, unmount } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(1700));
    rerender(<DragTip discovered onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(10000));
    expect(onDismiss).not.toHaveBeenCalled();
    expect(localStorage.getItem(LEARNED_KEY)).toBe("1");
    unmount();

    sessionStorage.clear();
    render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("PhoneTip", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("drops in after a short delay, once per tab session", () => {
    const { unmount } = render(<PhoneTip />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByRole("status")).toHaveTextContent("hey, welcome");
    unmount();

    render(<PhoneTip />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
