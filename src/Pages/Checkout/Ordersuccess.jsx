
import { Link } from "react-router-dom";

const Ordersuccess = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center text-4xl text-white">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-white mt-6">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-400 mt-4 leading-7">
          Thank you for your purchase. Your order has been securely received
          and is now being processed.
        </p>

        <p className="text-gray-400 mt-2">
          We'll notify you once your order has been shipped.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <Link
            to="/profile"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            View My Orders
          </Link>

          <Link
            to="/"
            className="flex-1 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 text-white py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Ordersuccess;
  
