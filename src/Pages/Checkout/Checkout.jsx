import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../../Redux/slices/cartSlice";
import notify from "../../utils/toast";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handlePayment = async () => {
    try {
      const OrderRes = await axios.post(
        "/api/payment",
        {
          amount: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      console.log(OrderRes);

      if (!OrderRes.data.success) {
        // razorpay unconfig exception handler
        const fallback = window.confirm(
          "Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order",
        );

        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const orderData = OrderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        name: "NexCart",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: async (response) => {
          const verifyRes = await axios.post(
            "/api/payment/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            },
          );

          console.log(verifyRes);

          if (verifyRes.data.success) {
            try {
              notify.success("Payment Successfully Done!")
              const saveOrderRes = await axios.post(
                "/api/orders",
                {
                  items: cartItems.map((item) => ({
                    product: item.productId,
                    quantity: item.qty,
                  })),
                  totalAmount: totalPrice,
                  address,
                  paymentId: response.razorpay_payment_id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                },
              );

              console.log(saveOrderRes);

              if (saveOrderRes.data.success) {
                dispatch(clearCart());
                navigate("/ordersuccess");
              }
            } catch (error) {
              notify.error("Order saving failed", error);
            }
          } else {
            notify.error("Payment verification failed");
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: user?.phone || "9999999999",
        },
        theme: {
          color: "#f97316",
        },
      };

      if (!window.Razorpay) {
        notify.error("Razorpay SDK failed to load.");
        return;
      }

      const rzp = new window.Razorpay(options);
      console.log(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await axios.post(
      "/api/orders",
      {
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: "bypass_" + Date.now(),
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    console.log(saveOrderRes);
    if (saveOrderRes.data.success) {
      dispatch(clearCart());
      notify.success("Order Placed Successfully");
      navigate("/ordersuccess");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      notify.error("Please login first");
      navigate("/login");
      return;
    }
    handlePayment();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8">Checkout</h2>

          <form onSubmit={handleSubmit} id="checkoutform" className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-300">Full Name</label>

              <input
                type="text"
                value={address.fullName}
                required
                onChange={(e) =>
                  setAddress({
                    ...address,
                    fullName: e.target.value,
                  })
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Street Address</label>

              <input
                type="text"
                value={address.street}
                required
                onChange={(e) =>
                  setAddress({
                    ...address,
                    street: e.target.value,
                  })
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-gray-300">City</label>

                <input
                  type="text"
                  value={address.city}
                  required
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      city: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300"> State </label>

                <input
                  type="text"
                  value={address.state}
                  required
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      state: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Postal Code</label>

                <input
                  type="number"
                  value={address.postalCode}
                  required
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Country</label>

                <input
                  type="text"
                  value={address.country}
                  required
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      country: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
          <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

          <div className="flex justify-between mb-4">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold mb-6">
            <span>Total</span>
            <span className="text-orange-500">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="submit"
            form="checkoutform"
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
