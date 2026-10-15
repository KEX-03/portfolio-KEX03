import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type * as DragTipModule from "@/widgets/DragTip";

let DragTip: typeof DragTipModule.DragTip;
let PhoneTip: typeof DragTipModule.PhoneTip;

/** A fresh copy of the module, the same as the visitor reloading the page. */
async function reloadPage() {
  vi.resetModules();
  ({ DragTip, PhoneTip } = await import("@/widgets/DragTip"));
}

describe("DragTip", () => {
  beforeEach(async () => {
    await reloadPage();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("appears after a short delay, once per page load", async () => {
    const onDismiss = vi.fn();
    const { unmount } = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1700));
    expect(screen.getByRole("status")).toHaveTextContent("psst… these files move");

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    unmount();

    // Coming back to Home without reloading doesn't pop it again...
    const second = render(<DragTip discovered={false} onDismiss={onDismiss} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    second.unmount();

    // ...but a fresh page load does.
    await reloadPage();
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
  });
});

describe("PhoneTip", () => {
  beforeEach(async () => {
    await reloadPage();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("drops in after a short delay, once per page load", () => {
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
