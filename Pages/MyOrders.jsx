import quickServeClient from "@/api/quickServeClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Clock, Package, CheckCircle2, Truck, Calendar } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "bg-yellow-500" },
  preparing: { icon: Package, label: "Preparing", color: "bg-blue-500" },
  ready: {
    icon: CheckCircle2,
    label: "Ready for Pickup",
    color: "bg-green-500",
  },
  delivered: { icon: Truck, label: "Delivered", color: "bg-purple-500" },
  cancelled: { icon: Clock, label: "Cancelled", color: "bg-gray-500" },
};

export default function MyOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const user = await quickServeClient.auth.me();
      return quickServeClient.entities.Order.filter(
        { created_by: user.email },
        "-created_date"
      );
    },
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-500">Your order history will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <Card
                key={order.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-1">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(order.created_date), "PPp")}
                      </div>
                    </div>
                    <Badge
                      className={`${status.color} text-white flex items-center gap-1`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery to:</span>
                      <span className="font-medium">
                        Section {order.seat_section}
                        {order.seat_number && `, Seat ${order.seat_number}`}
                      </span>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold text-orange-600">
                        ${order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
