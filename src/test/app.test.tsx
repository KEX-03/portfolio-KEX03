import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DesktopShell } from "@/App";
import { GitHubWidget } from "@/widgets/GitHubWidget";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <DesktopShell />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("routes", () => {
  it("renders the desktop at /", async () => {
    renderAt("/");
    expect(await screen.findByRole("heading", { name: "Vivek Sharma, Software Engineer" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open resume.pdf" })).toBeInTheDocument();
  });

  it.each([
    ["/projects", "App Store"],
    ["/experience", "Calendar"],
    ["/open-source", "Terminal — zsh"],
  ])("renders %s as the %s window", async (path, title) => {
    renderAt(path);
    expect(await screen.findByRole("heading", { level: 1, name: title })).toBeInTheDocument();
  });

  it("shows a Finder 404 for unknown paths", async () => {
    renderAt("/nope");
    expect(await screen.findByText("Finder can't find that page.")).toBeInTheDocument();
  });
});

describe("dock", () => {
  it("links each app to its route", () => {
    renderAt("/");
    const dock = within(screen.getByRole("navigation", { name: "Dock" }));
    expect(dock.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(dock.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(dock.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/experience");
    expect(dock.getByRole("link", { name: "Open Source" })).toHaveAttribute("href", "/open-source");
    expect(dock.getByRole("link", { name: "Mail" })).toHaveAttribute("href", "mailto:viveksharma03@yahoo.com");
  });
});

describe("GitHubWidget", () => {
  it("keeps the saved snapshot when the GitHub API fails", async () => {
    render(<GitHubWidget />);
    expect(screen.getByText("taskflow")).toBeInTheDocument();
    expect(screen.getByText("28")).toBeInTheDocument();
    expect(await screen.findByTitle("Saved snapshot")).toBeInTheDocument();
  });
});
