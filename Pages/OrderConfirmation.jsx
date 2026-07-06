import { useEffect, useState } from "react";
import quickServeClient from "@/api/quickServeClient";
import { useNavigate, useLocation } from "@/utils/navigation";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "bg-yellow-500" },
  preparing: { icon: Package, label: "Preparing", color: "bg-blue-500" },
  ready: { icon: CheckCircle2, label: "Ready", color: "bg-green-500" },
  delivered: { icon: Truck, label: "Delivered", color: "bg-purple-500" },
};

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search || "");
    const orderId = urlParams.get("orderId");

    if (!orderId) {
      navigate(createPageUrl("Menu"));
      return;
    }

    loadOrder(orderId);
    const interval = setInterval(() => loadOrder(orderId), 5000);
    return () => clearInterval(interval);
  }, [location.search]);

  const loadOrder = async (orderId) => {
    try {
      const orders = await quickServeClient.entities.Order.filter({
        id: orderId,
      });
      if (orders.length > 0) {
        setOrder(orders[0]);
      }
    } catch (error) {
      console.error("Error loading order:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">Order not found</p>
        <Button onClick={() => navigate(createPageUrl("Menu"))}>
          Back to Menu
        </Button>
      </div>
    );
  }

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <Card className="overflow-hidden">
        <div className={`${status.color} p-6 text-white text-center`}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <StatusIcon className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Order {status.label}!</h1>
          <p className="text-white/90">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Delivery To:</h3>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-medium">{order.customer_name}</p>
              <p className="text-gray-600">
                Section {order.seat_section}
                {order.seat_number && `, Seat ${order.seat_number}`}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Order Items:</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {order.special_instructions && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Special Instructions:
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {order.special_instructions}
              </p>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-orange-600">
                ${order.total_amount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => navigate(createPageUrl("Menu"))}
              variant="outline"
              className="flex-1"
            >
              Order More
            </Button>
            <Button
              onClick={() => navigate(createPageUrl("MyOrders"))}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              View All Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
