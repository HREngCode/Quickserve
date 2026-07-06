export function createPageUrl(name, params = {}) {
  // Create URLs for named pages. Supports optional `params`.
  // Special-case `Menu` so categories can be path-based: /menu/:category?
  const routes = {
    Menu: "/menu",
    Cart: "/cart",
    MyOrders: "/my-orders",
    ManageMenu: "/manage-menu",
    ViewOrders: "/view-orders",
    OrderConfirmation: "/order-confirmation",
  };

  if (!name) return "/";
  const base = name;
  const basePath = routes[base] || "/";

  // If this is the Menu route and a category is provided, use path-style URL.
  if (base === "Menu") {
    const category = params.category;
    return category && category !== "all"
      ? `${basePath}/${encodeURIComponent(category)}`
      : basePath;
  }

  // For other routes, support query params (e.g. OrderConfirmation?orderId=...)
  const qsEntries = Object.entries(params).filter(([, v]) => v != null);
  if (qsEntries.length === 0) return basePath;
  const qs = new URLSearchParams(Object.fromEntries(qsEntries)).toString();
  return `${basePath}?${qs}`;
}
