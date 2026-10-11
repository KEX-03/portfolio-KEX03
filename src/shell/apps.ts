/** The "apps" that live in the dock. Each route is presented as a macOS app. */
export type AppRoute = {
  path: string;
  label: string;
  /** App name shown in bold in the menu bar while the route is open. */
  appName: string;
};

export const APP_ROUTES: AppRoute[] = [
  { path: "/", label: "Home", appName: "Finder" },
  { path: "/projects", label: "Projects", appName: "App Store" },
  { path: "/experience", label: "Experience", appName: "Calendar" },
  { path: "/open-source", label: "Open Source", appName: "Terminal" },
];

export function appForPath(pathname: string): AppRoute {
  return APP_ROUTES.find((a) => a.path !== "/" && pathname.startsWith(a.path)) ?? APP_ROUTES[0];
}
