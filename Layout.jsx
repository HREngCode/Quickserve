import React from "react";
import { Link, useLocation } from "@/utils/navigation";
import { createPageUrl } from "@/utils";
import { ShoppingCart, Home, Clock, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Badge } from "@/Components/ui/badge";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const customerNav = [
    { title: "Menu", url: createPageUrl("Menu"), icon: Home },
    { title: "My Orders", url: createPageUrl("MyOrders"), icon: Clock },
  ];

  const adminNav = [
    { title: "Manage Menu", url: createPageUrl("ManageMenu"), icon: Settings },
    { title: "View Orders", url: createPageUrl("ViewOrders"), icon: Clock },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Sidebar className="border-r border-orange-200/50 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-orange-200/50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">QuickServe</h2>
                <p className="text-xs text-gray-500">Concession Orders</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarGroup>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Customer
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {customerNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-orange-100 hover:text-orange-700 transition-colors rounded-lg ${
                          location.pathname === item.url
                            ? "bg-orange-100 text-orange-700"
                            : ""
                        }`}
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mt-4">
                Admin
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-orange-100 hover:text-orange-700 transition-colors rounded-lg ${
                          location.pathname === item.url
                            ? "bg-orange-100 text-orange-700"
                            : ""
                        }`}
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 px-4 py-3 md:px-6 md:py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-orange-100 p-2 rounded-lg transition-colors" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {currentPageName}
                </h1>
              </div>
              <Link to={createPageUrl("Cart")}>
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 hover:bg-orange-600">
                      {cartCount}
                    </Badge>
                  )}
                </div>
              </Link>
            </div>
          </header>

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
