import React from "react";

// Re-export the JSX-based helpers from the project utils navigation.jsx
// so imports using either alias resolve and Vite doesn't try to parse JSX
// from a .js file.
export { Link, useNavigate, useLocation } from "../../utils/navigation.jsx";
