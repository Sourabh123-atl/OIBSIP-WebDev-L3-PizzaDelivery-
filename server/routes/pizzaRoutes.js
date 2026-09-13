const express = require("express");
const router = express.Router();
const {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzaController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getAllPizzas);
router.get("/:id", getPizzaById);

// Admin Protected Routes
router.post("/", protect, adminOnly, createPizza);
router.put("/:id", protect, adminOnly, updatePizza);
router.delete("/:id", protect, adminOnly, deletePizza);

module.exports = router;
