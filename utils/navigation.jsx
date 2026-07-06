import React from "react";

// Lightweight navigation helpers to avoid importing `react-router-dom` in
// components that render early during app initialization. These are simple
// wrappers around the browser history API and provide a minimal `Link`
// component and `useNavigate` / `useLocation` hooks used across the app.

export function Link({ to, children, className = "", ...props }) {
  const handleClick = (e) => {
    // Let modifier keys open new tabs/windows
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    window.history.pushState({}, "", to);
    // Notify listeners (like our useLocation hook) that the location changed
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function useNavigate() {
  return React.useCallback((to) => {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);
}

export function useLocation() {
  const [pathname, setPathname] = React.useState(
    () =>
      window.location.pathname + window.location.search + window.location.hash
  );

  React.useEffect(() => {
    const onPop = () =>
      setPathname(
        window.location.pathname + window.location.search + window.location.hash
      );
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return { pathname };
}

export default {
  Link,
  useNavigate,
  useLocation,
};
