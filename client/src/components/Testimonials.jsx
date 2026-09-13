import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Regular Customer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Absolutely the best pizza in town! Fresh ingredients, amazing flavor, and super fast delivery every single time.",
  },
  {
    id: 2,
    name: "Ali Khan",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "The crust is perfectly baked, the toppings are generous, and the service is outstanding. Highly recommended!",
  },
  {
    id: 3,
    name: "Emily Smith",
    role: "Pizza Lover",
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "I've tried many pizza places, but Pizzario has become my family's favorite. Every order is consistently delicious.",
  },
];

function Testimonials() {
  return (
    <section className="bg-white py-28">

      <div className="max-w-[1650px] mx-auto px-8 md:px-14 lg:px-20 xl:px-28">

        <div className="text-center">

          <span className="inline-block rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-[#252642]">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500">
            Thousands of pizza lovers trust Pizzario for delicious food,
            quality ingredients and fast delivery.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="rounded-3xl border border-gray-200 bg-[#FFF8F2] p-10 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex text-yellow-500 gap-1">

                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} />
                ))}

              </div>

              <p className="mt-6 leading-8 text-gray-600 italic">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>

                  <h4 className="text-xl font-bold text-[#252642]">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;