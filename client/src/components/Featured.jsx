import PizzaCard from "./PizzaCard";
import pizzaData from "../data/pizzaData";

function Featured() {
  return (
    <section
      id="menu"
      className="bg-[#FFF8F2] py-28"
    >
      <div className="max-w-[1650px] mx-auto px-8 md:px-14 lg:px-20 xl:px-28">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-600">
            OUR MENU
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-[#252642]">
            Our Signature Pizzas
          </h2>

          <div className="mt-6 flex justify-center">
            <p className="max-w-xl text-center text-xl leading-9 text-gray-500">
              Freshly handcrafted pizzas prepared with premium ingredients,
              authentic recipes, and baked to perfection for an unforgettable taste.
            </p>
          </div>

        </div>

        {/* Pizza Grid */}

        <div className="mt-20 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">

          {pizzaData.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Featured;