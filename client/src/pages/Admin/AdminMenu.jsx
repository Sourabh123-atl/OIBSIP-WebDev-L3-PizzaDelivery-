import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaStar,
  FaTimes,
  FaPizzaSlice,
  FaCheck,
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL, parseJsonResponse } from "../../config/api";
import { toast } from "react-toastify";

const CATEGORIES = ["Pizza", "Burger", "Pasta", "Sides", "Drinks", "Desserts"];

function AdminMenu() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Pizza",
    price: "",
    description: "",
    image: "/src/assets/pizzas/pepperoni.png",
    rating: "4.8",
    inStock: true,
    isFeatured: false,
  });

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/pizzas`);
      const data = await parseJsonResponse(res);
      if (data.success && data.data) {
        setItems(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: "Pizza",
      price: "",
      description: "",
      image: "/src/assets/pizzas/pepperoni.png",
      rating: "4.8",
      inStock: true,
      isFeatured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || "",
      image: item.image,
      rating: item.rating || "4.8",
      inStock: item.inStock !== false,
      isFeatured: Boolean(item.isFeatured),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      toast.error("Name and Price are required.");
      return;
    }

    try {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const itemId = editingItem?._id || editingItem?.id;
      const url = editingItem
        ? `${API_BASE_URL}/pizzas/${itemId}`
        : `${API_BASE_URL}/pizzas`;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      const data = await parseJsonResponse(res);
      if (data.success) {
        toast.success(
          editingItem ? "Item updated successfully!" : "New item added to menu!"
        );
        setModalOpen(false);
        fetchMenu();
      } else {
        toast.error(data.message || "Operation failed.");
      }
    } catch (err) {
      toast.error("Failed to save menu item.");
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const itemId = item._id || item.id;
      const res = await fetch(`${API_BASE_URL}/pizzas/${itemId}`, {
        method: "DELETE",
        headers,
      });

      const data = await parseJsonResponse(res);
      if (data.success) {
        toast.success(`"${item.name}" deleted from menu.`);
        fetchMenu();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Failed to delete item.");
    }
  };

  return (
    <AdminLayout>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Menu & Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, or adjust pricing and stock for your pizzas and food items.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-200 transition cursor-pointer"
        >
          <FaPlus />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-gray-400">
          Loading menu items...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const itemId = item._id || item.id;
            return (
              <div
                key={itemId}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 rounded-2xl bg-orange-50/40 p-4 flex items-center justify-center mb-4 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full object-contain"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-700 shadow-xs">
                      {item.category}
                    </span>
                    {item.isFeatured && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                      <FaStar />
                      <span>{item.rating || 4.8}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xl font-black text-red-600">
                    ${Number(item.price).toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                      title="Edit Item"
                    >
                      <FaEdit />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Delete Item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-black text-gray-900">
                {editingItem ? "Edit Menu Product" : "Add New Menu Product"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 text-lg"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Truffle Mushroom Pizza"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-red-600 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="14.99"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Ingredients and delicious details..."
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="/src/assets/pizzas/pepperoni.png"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) =>
                      setFormData({ ...formData, inStock: e.target.checked })
                    }
                    className="h-4 w-4 accent-red-600 rounded"
                  />
                  In Stock
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="h-4 w-4 accent-red-600 rounded"
                  />
                  Feature on Homepage
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-1/2 py-3 rounded-xl border border-gray-200 font-bold text-xs text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-red-600 font-bold text-xs text-white shadow-md hover:bg-red-700"
                >
                  {editingItem ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminMenu;
