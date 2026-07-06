// Minimal in-memory mock of the `quickServeClient` used by the app.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let _menu = [
  {
    id: "m1",
    name: "Hot Dog",
    price: 5.0,
    category: "hot_food",
    image_url: "",
    available: true,
    description: "A tasty hot dog",
  },
  {
    id: "m2",
    name: "Chips",
    price: 2.5,
    category: "snacks",
    image_url: "",
    available: true,
  },
  {
    id: "m3",
    name: "Soda",
    price: 3.0,
    category: "drinks",
    image_url: "",
    available: true,
  },
];

let _orders = [];

const quickServeClient = {
  auth: {
    me: async () => ({ email: "guest@example.com", name: "Guest" }),
  },
  entities: {
    MenuItem: {
      list: async () => {
        await sleep(20);
        return _menu;
      },
    },
    Order: {
      create: async (order) => {
        await sleep(40);
        const id = Math.random().toString(36).slice(2, 10);
        const created_date = new Date().toISOString();
        const saved = { ...order, id, created_date };
        _orders.push(saved);
        return saved;
      },
      filter: async (criteria = {}) => {
        await sleep(20);
        if (criteria.id) {
          return _orders.filter((o) => o.id === criteria.id);
        }
        if (criteria.created_by) {
          return _orders.filter((o) => o.created_by === criteria.created_by);
        }
        return _orders.slice().reverse();
      },
      // List returns all orders optionally sorted by a field name. The app
      // calls `Order.list("-created_date")` so we support a simple sort
      // spec where a leading `-` means descending.
      list: async (sortSpec) => {
        await sleep(20);
        let out = _orders.slice();
        if (sortSpec) {
          const desc = sortSpec.startsWith("-");
          const field = desc ? sortSpec.slice(1) : sortSpec;
          out.sort((a, b) => {
            if (a[field] < b[field]) return desc ? 1 : -1;
            if (a[field] > b[field]) return desc ? -1 : 1;
            return 0;
          });
        }
        return out;
      },
      // Update an order by id with partial fields and return the updated order.
      update: async (id, patch) => {
        await sleep(20);
        const idx = _orders.findIndex((o) => o.id === id);
        if (idx === -1) throw new Error("order not found");
        _orders[idx] = { ..._orders[idx], ...patch };
        return _orders[idx];
      },
    },
  },
};

export default quickServeClient;
