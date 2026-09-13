import { FaTruck, FaLeaf, FaClock, FaUtensils } from "react-icons/fa";
const features = [
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    description:
      "Your favorite pizzas delivered hot and fresh within 30 minutes.",
  },
  {
    icon: <FaUtensils />,
    title: "Master Chefs",
    description:
      "Every pizza is handcrafted by experienced chefs using authentic recipes.",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh Ingredients",
    description:
      "Premium vegetables, quality meats, rich mozzarella and homemade sauces.",
  },
  {
    icon: <FaClock />,
    title: "Always Fresh",
    description:
      "Every order is prepared fresh after you place it—never pre-made.",
  },
];

function WhyChoose() {
  return (
    <section id="about" className="bg-white py-28">

      <div className="max-w-[1650px] mx-auto px-8 md:px-14 lg:px-20 xl:px-28">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-600">
            WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-[#252642]">
            Why Choose Pizzario?
          </h2>

          <div className="mt-6 flex justify-center">

            <p className="max-w-2xl text-center text-xl leading-9 text-gray-500">
              We don't just deliver pizzas—we deliver quality, freshness and
              unforgettable taste in every bite.
            </p>

          </div>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-3xl bg-[#FFF8F2] px-10 py-12 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >

              <div className="mx-auto -mt-16 flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-4xl text-white shadow-lg">

                {feature.icon}

              </div>

              <h3 className="mt-8 text-3xl font-bold text-[#252642]">

                {feature.title}

              </h3>

              <p className="mt-5 leading-8 text-gray-500">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;