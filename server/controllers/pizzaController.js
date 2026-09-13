const Pizza = require("../models/Pizza");
const defaultMenu = require("../data/defaultMenu");

// In-memory mirror for offline development
let memoryPizzas = defaultMenu.map((item, index) => ({
  _id: "pizza_" + (index + 1),
  id: "pizza_" + (index + 1),
  ...item,
}));

// Helper to seed if DB is empty
const seedIfEmpty = async () => {
  try {
    const count = await Pizza.countDocuments();
    if (count === 0) {
      console.log("🌱 Seeding default menu items into database...");
      await Pizza.insertMany(defaultMenu);
      console.log("✅ Menu items seeded successfully.");
    }
  } catch (err) {
    // Database offline or query error
  }
};

// Auto seed on boot
seedIfEmpty();

// Get all menu items
const getAllPizzas = async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }
    if (featured === "true") {
      query.isFeatured = true;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    try {
      let pizzas = await Pizza.find(query).sort({ createdAt: -1 });

      if (!pizzas || pizzas.length === 0) {
        // If DB collection was empty, try seeding once
        await seedIfEmpty();
        pizzas = await Pizza.find(query).sort({ createdAt: -1 });
      }

      if (pizzas && pizzas.length > 0) {
        return res.status(200).json({
          success: true,
          count: pizzas.length,
          data: pizzas,
        });
      }
    } catch (dbErr) {
      // Offline fallback
    }

    // Return in-memory items
    let filtered = [...memoryPizzas];
    if (category && category !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (featured === "true") {
      filtered = filtered.filter((p) => p.isFeatured);
    }
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch menu items.",
    });
  }
};

// Get single item by ID
const getPizzaById = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const pizza = await Pizza.findById(id);
      if (pizza) {
        return res.status(200).json({
          success: true,
          data: pizza,
        });
      }
    } catch (dbErr) {
      // Offline fallback
    }

    const memItem = memoryPizzas.find((p) => p._id === id || p.id === id);
    if (memItem) {
      return res.status(200).json({
        success: true,
        data: memItem,
      });
    }

    res.status(404).json({
      success: false,
      message: "Menu item not found.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new item (Admin)
const createPizza = async (req, res) => {
  try {
    const { name, description, price, category, image, rating, inStock, isFeatured } =
      req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required.",
      });
    }

    const newItemData = {
      name: name.trim(),
      description: description || "Freshly handcrafted with love.",
      price: Number(price),
      category: category || "Pizza",
      image: image || "/src/assets/pizzas/margherita.png",
      rating: rating ? Number(rating) : 4.8,
      inStock: inStock !== undefined ? inStock : true,
      isFeatured: Boolean(isFeatured),
    };

    try {
      const created = await Pizza.create(newItemData);
      memoryPizzas.unshift(created);
      return res.status(201).json({
        success: true,
        message: "Menu item added successfully!",
        data: created,
      });
    } catch (dbErr) {
      const memItem = {
        _id: "pizza_" + Date.now(),
        id: "pizza_" + Date.now(),
        ...newItemData,
        createdAt: new Date(),
      };
      memoryPizzas.unshift(memItem);

      return res.status(201).json({
        success: true,
        message: "Menu item added successfully! (Memory mode)",
        data: memItem,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create menu item.",
    });
  }
};

// Update item (Admin)
const updatePizza = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const updated = await Pizza.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (updated) {
        return res.status(200).json({
          success: true,
          message: "Menu item updated successfully!",
          data: updated,
        });
      }
    } catch (dbErr) {
      // fallback
    }

    const index = memoryPizzas.findIndex((p) => p._id === id || p.id === id);
    if (index !== -1) {
      memoryPizzas[index] = { ...memoryPizzas[index], ...req.body };
      return res.status(200).json({
        success: true,
        message: "Menu item updated successfully!",
        data: memoryPizzas[index],
      });
    }

    res.status(404).json({
      success: false,
      message: "Menu item not found.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete item (Admin)
const deletePizza = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Pizza.findByIdAndDelete(id);
    } catch (dbErr) {
      // fallback
    }

    memoryPizzas = memoryPizzas.filter((p) => p._id !== id && p.id !== id);

    res.status(200).json({
      success: true,
      message: "Menu item removed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
};
