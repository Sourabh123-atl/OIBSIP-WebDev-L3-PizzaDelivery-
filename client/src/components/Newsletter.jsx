import { FaPaperPlane } from "react-icons/fa";

function Newsletter() {
  return (
    <section className="bg-white py-32">

      <div className="max-w-[1650px] mx-auto px-8 lg:px-20">

        {/* Heading */}

        <div className="flex flex-col items-center text-center">

          <span className="uppercase tracking-[6px] text-red-600 font-semibold text-sm">
            NEWSLETTER
          </span>

          <h2 className="mt-6 text-6xl font-black leading-tight text-[#252642]">
            Stay Hungry,
            <br />
            Stay Updated
          </h2>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-500 text-center">
            Be the first to know about exclusive offers, new menu items,
            seasonal specials and delicious updates delivered straight
            to your inbox.
          </p>

        </div>

        {/* Form */}

        <div className="mt-16 flex justify-center">

          <div className="flex w-full max-w-4xl border border-[#E6D8C7] bg-[#FFF8F2]">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-8 py-6 text-lg text-gray-700 placeholder:text-gray-400 outline-none"
            />

            <button className="flex items-center gap-3 bg-red-600 px-10 py-6 text-lg font-semibold text-white transition hover:bg-[#9E4E17]">

              Subscribe

              <FaPaperPlane />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;