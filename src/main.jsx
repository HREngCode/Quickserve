// Suppress the React Router future-flag console warnings that are emitted
// when the `react-router-dom` module is imported before the app has a
// chance to opt-in programmatically. The warnings are informational only
// (they don't break the app) but can be noisy during development. We
// filter them here so they don't clutter the console. If you'd prefer to
// keep them visible, remove this suppression.
const _originalConsoleWarn = console.warn.bind(console);
console.warn = (...args) => {
  try {
    const msg = String(args[0] || "");
    if (msg.includes("React Router Future Flag Warning")) return;
  } catch (e) {
    /* fall through */
  }
  _originalConsoleWarn(...args);
};

import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App, { routes } from "./App.jsx";
import "./styles.css";

const queryClient = new QueryClient();

// Create a router with the v7 future flags enabled to silence the
// deprecation warnings and opt-in to the stable behaviors early.
const router = createBrowserRouter(createRoutesFromElements(routes), {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<App />} />
    </QueryClientProvider>
  </React.StrictMode>
);
