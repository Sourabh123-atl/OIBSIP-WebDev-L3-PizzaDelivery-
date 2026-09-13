import pepperoni from "../assets/pizzas/pepperoni.png";
import margherita from "../assets/pizzas/margherita.png";
import bbq from "../assets/pizzas/bbq.png";
import veggie from "../assets/pizzas/veggie.png";
import cheese from "../assets/pizzas/cheese.png";
import beef from "../assets/pizzas/beef.png";

const pizzaData = [
  {
    id: 1,
    name: "Pepperoni",
    image: pepperoni,
    price: 14.99,
    rating: 4.9,
    description: "Loaded with premium pepperoni and mozzarella cheese."
  },
  {
    id: 2,
    name: "Margherita",
    image: margherita,
    price: 11.99,
    rating: 4.8,
    description: "Classic Italian pizza with fresh basil and mozzarella."
  },
  {
    id: 3,
    name: "BBQ Chicken",
    image: bbq,
    price: 15.99,
    rating: 4.9,
    description: "Tender grilled chicken with smoky BBQ sauce."
  },
  {
    id: 4,
    name: "Veggie Supreme",
    image: veggie,
    price: 12.99,
    rating: 4.7,
    description: "Fresh vegetables with our signature tomato sauce."
  },
  {
    id: 5,
    name: "Cheese Burst",
    image: cheese,
    price: 13.99,
    rating: 5.0,
    description: "Extra cheese for the ultimate cheese lovers."
  },
  {
    id: 6,
    name: "Beef Feast",
    image: beef,
    price: 16.49,
    rating: 4.9,
    description: "Juicy seasoned beef topped with mozzarella and signature herbs."
  }
];

export default pizzaData;