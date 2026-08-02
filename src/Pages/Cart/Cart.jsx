import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";
import { clearCart, removeFromCart, updateCart } from "../../Redux/slices/cartSlice";

const Cart = () => {
  const {user} = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartItems);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCart = (productId, qty) => {
    if (qty < 1) return;

    dispatch(
      updateCart({
        productId,
        qty,
      }),
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handleCheckout = () => {
    if(!user){
        alert("please login first");
        navigate("/login" ,{
            state: {from: "/cart/checkout"},
        });
        return;
    }
    navigate("/cart/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Your Cart is Empty</h1>

          <p className="text-gray-400 mt-3">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Explore Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>

                    <p className="text-orange-500 font-bold mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 text-sm mt-3 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      handleUpdateCart(item.productId, item.qty - 1)
                    }
                    className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold">{item.qty}</span>

                  <button
                    onClick={() =>
                      handleUpdateCart(item.productId, item.qty + 1)
                    }
                    className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span className="text-orange-500">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <button onClick={handleCheckout}
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold transition"
            >
              Proceed to Checkout
            </button>

            {cartItems.length > 1 && (
              <button
                onClick={handleClearCart}
                className="w-full mt-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl transition"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
