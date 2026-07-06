import { useState, useEffect } from "react";
import quickServeClient from "@/api/quickServeClient";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";
import MenuItemCard from "@/Components/menu/MenuItemCard";
import { useNavigate, useParams } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categoryLabels = {
  hot_food: "Hot Food",
  snacks: "Snacks",
  drinks: "Drinks",
  desserts: "Desserts",
  alcohol: "Alcohol",
};

export default function Menu() {
  const navigate = useNavigate();
  const { category: routeCategory } = useParams();

  // Initialize selected category from the optional path param `:category`.
  const initialCategory = routeCategory || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menuItems"],
    queryFn: () => quickServeClient.entities.MenuItem.list(),
    initialData: [],
  });

  const handleAddToCart = (item, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex((i) => i.item_id === item.id);

    if (quantity === 0) {
      // Remove item
      if (existingItemIndex !== -1) {
        cart.splice(existingItemIndex, 1);
      }
    } else {
      // Add or update item
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = quantity;
      } else {
        cart.push({
          item_id: item.id,
          name: item.name,
          price: item.price,
          quantity: quantity,
        });
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    if (quantity > 0) {
      toast.success(
        `${item.name} ${quantity > 1 ? "x" + quantity : ""} added to cart`
      );
    }
  };

  // Keep the selectedCategory in sync with the URL so navigation / deep
  // linking works and the back/forward buttons behave as expected.
  useEffect(() => {
    setSelectedCategory(routeCategory || "all");
  }, [routeCategory]);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["all", ...Object.keys(categoryLabels)];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg border-orange-200 focus:border-orange-400"
          />
        </div>

        <Tabs
          value={selectedCategory}
          onValueChange={(val) =>
            navigate(createPageUrl("Menu", { category: val }))
          }
        >
          <TabsList className="w-full justify-start overflow-x-auto bg-white/80 backdrop-blur-sm border border-orange-200 h-auto flex-wrap">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-2"
                onClick={() =>
                  navigate(createPageUrl("Menu", { category: cat }))
                }
              >
                {cat === "all" ? "All Items" : categoryLabels[cat]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-white/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
