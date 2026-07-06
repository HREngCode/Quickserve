import React from "react";

export function Tabs({ children, value, onValueChange }) {
  // Simplified: ignore controlled value and just render children
  return <div>{children}</div>;
}

export function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ children, className = "", value }) {
  return (
    <button className={className} data-value={value}>
      {children}
    </button>
  );
}

export default Tabs;
