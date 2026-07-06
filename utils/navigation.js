// Re-export the JSX-based navigation helpers so imports like
// `@/utils/navigation` resolve to the JSX implementation. This file is
// intentionally plain JS to avoid Vite trying to parse JSX from a .js
// file during import analysis.
export { Link, useNavigate, useLocation } from "./navigation.jsx";
