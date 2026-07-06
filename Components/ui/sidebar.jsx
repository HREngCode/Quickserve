import React from "react";

export function Sidebar({ children, className = "", ...props }) {
  return (
    <aside className={`w-64 p-2 ${className}`} {...props}>
      {children}
    </aside>
  );
}

export function SidebarContent({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroup({ children, className = "", ...props }) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
}

export function SidebarGroupContent({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SidebarMenu({ children, className = "", ...props }) {
  return (
    <ul className={className} {...props}>
      {children}
    </ul>
  );
}

export function SidebarMenuItem({ children, className = "", ...props }) {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
}

export function SidebarMenuButton({
  children,
  className = "",
  asChild = false,
  ...props
}) {
  // If caller wants to render a child element as the button, clone it and
  // forward props (but avoid passing `asChild` into the DOM).
  if (asChild && React.isValidElement(children)) {
    const childProps = { className, ...props };
    return React.cloneElement(children, childProps);
  }

  // Don't forward `asChild` into the DOM — React will warn about unknown
  // attributes on DOM elements. Spread remaining props normally.
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SidebarHeader({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SidebarProvider({ children }) {
  return <div>{children}</div>;
}

export function SidebarTrigger({ className = "", ...props }) {
  return (
    <button className={className} {...props}>
      ☰
    </button>
  );
}

export default Sidebar;
