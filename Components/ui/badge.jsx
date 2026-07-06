import React from "react";

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
