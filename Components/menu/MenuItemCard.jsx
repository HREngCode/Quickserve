import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function MenuItemCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = React.useState(0);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
  };

  const handleSubtract = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart(item, newQuantity);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${
          !item.available
            ? "opacity-60"
            : "border-orange-100 hover:border-orange-300"
        }`}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-200 to-amber-100">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🍔</span>
            </div>
          )}
          {!item.available && (
            <Badge className="absolute top-3 right-3 bg-red-500">
              Sold Out
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">
              ${item.price.toFixed(2)}
            </span>
            {item.available && (
              <div className="flex items-center gap-2">
                {quantity > 0 && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleSubtract}
                    className="h-9 w-9 rounded-full border-orange-300 hover:bg-orange-100"
                  >
                    <Minus className="h-4 w-4 text-orange-600" />
                  </Button>
                )}
                {quantity > 0 && (
                  <span className="font-semibold text-lg w-8 text-center">
                    {quantity}
                  </span>
                )}
                <Button
                  size="icon"
                  onClick={handleAdd}
                  className="h-9 w-9 rounded-full bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
