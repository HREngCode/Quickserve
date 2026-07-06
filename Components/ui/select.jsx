import React from "react";

export function Select({ children, value, onValueChange }) {
  // very small controlled wrapper; expects SelectTrigger/Content to render
  return <div>{children}</div>;
}

export function SelectTrigger({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SelectValue({ children, className = "" }) {
  return <span className={className}>{children}</span>;
}

export function SelectContent({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SelectItem({ children, value, className = "", ...props }) {
  return (
    <div role="option" data-value={value} className={className} {...props}>
      {children}
    </div>
  );
}

export default Select;
