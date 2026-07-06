import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/Layout.jsx";
import Menu from "@/Pages/Menu.jsx";
import Cart from "@/Pages/Cart.jsx";
import MyOrders from "@/Pages/MyOrders.jsx";
import ManageMenu from "@/Pages/ManageMenu.jsx";
import ViewOrders from "@/Pages/ViewOrders.jsx";
import OrderConfirmation from "@/Pages/OrderConfirmation.jsx";
import { createPageUrl } from "@/utils";

function PageWrapper({ children, title }) {
  return <Layout currentPageName={title}>{children}</Layout>;
}

// Export the route elements so the app can build a router with future flags
// from `createBrowserRouter`. We keep the default App for backwards
// compatibility which simply renders the Routes.
export const routes = (
  <>
    <Route path="/" element={<Navigate to={createPageUrl("Menu")} replace />} />
    <Route
      path="/menu/:category?"
      element={
        <PageWrapper title="Menu">
          <Menu />
        </PageWrapper>
      }
    />
    <Route
      path={createPageUrl("Cart")}
      element={
        <PageWrapper title="Cart">
          <Cart />
        </PageWrapper>
      }
    />
    <Route
      path={createPageUrl("MyOrders")}
      element={
        <PageWrapper title="My Orders">
          <MyOrders />
        </PageWrapper>
      }
    />
    <Route
      path={createPageUrl("ManageMenu")}
      element={
        <PageWrapper title="Manage Menu">
          <ManageMenu />
        </PageWrapper>
      }
    />
    <Route
      path={createPageUrl("ViewOrders")}
      element={
        <PageWrapper title="View Orders">
          <ViewOrders />
        </PageWrapper>
      }
    />
    <Route
      path={createPageUrl("OrderConfirmation")}
      element={
        <PageWrapper title="Order Confirmation">
          <OrderConfirmation />
        </PageWrapper>
      }
    />
  </>
);

export default function App() {
  return <Routes>{routes}</Routes>;
}
