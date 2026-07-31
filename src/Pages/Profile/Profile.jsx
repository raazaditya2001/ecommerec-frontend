import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import notify from "../../utils/toast";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(user);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`api/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
        console.log(res.data);
      }
    } catch (error) {
      notify.error("Something wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Name</p>
              <h3 className="text-lg font-semibold">{user.name}</h3>
            </div>

            <div>
              <p className="text-gray-400">Email</p>
              <h3 className="text-lg font-semibold">{user.email}</h3>
            </div>

            <div>
              <p className="text-gray-400">Account Type</p>
              <span className="inline-block mt-1 bg-orange-500 px-3 py-1 rounded-full text-sm">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <h2 className="text-2xl font-bold mb-6">Order History</h2>

        {orders.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-semibold">No Orders Yet</h3>

            <p className="text-gray-400 mt-3">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          orders?.map((order) => (
            <div
              key={order._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8"
            >
              {/* Order Details */}
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Order ID</p>
                  <p>{order._id}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Placed On</p>
                  <p>{new Date(order.updatedAt).toLocaleDateString("en-IN")}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Payment ID</p>
                  <p>{order.paymentId}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Status</p>

                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Total</p>

                  <p className="text-orange-500 font-bold">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <hr className="border-zinc-700 mb-6" />

              {/* Products */}
              <div className="space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-5 border border-zinc-800 rounded-xl p-4"
                  >
                    {item.product ? (
                      <>
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                        />

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {item.product.name}
                          </h3>

                          <p className="text-gray-400">
                            {item.product.description ||
                              "No description available"}
                          </p>

                          <div className="flex gap-6 mt-2">
                            <span>
                              Price:
                              <span className="text-orange-500 ml-2">
                                ₹{item.product.price.toLocaleString("en-IN")}
                              </span>
                            </span>

                            <span>
                              Qty:
                              <span className="ml-2">{item.quantity}</span>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full">
                        <h3 className="text-red-500 font-semibold">
                          Product Removed
                        </h3>

                        <p className="text-gray-400">
                          This product is no longer available.
                        </p>

                        <p className="mt-2">
                          Quantity: <span>{item.quantity}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
