import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import notify from "../../../utils/toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  console.log(user);

  const fetchOrders = async () => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    try {
      const res = await axios.get(`/api/orders`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      notify.error("Something went wrong");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
      console.log(orders);
    }
  }, [user]);

  const handleUpdateStatus = async (id) => {
    console.log("update handler");
    try {
      const res = await axios.put(
        `/api/orders/${id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (res.data.success) {
        notify.success("Status Successfully Updated !");
        fetchOrders();
      }
    } catch (error) {
      notify.error("something went wrong");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Manage Orders</h1>

          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-lg border border-zinc-700 transition-all duration-200"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold">No Orders Found</h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-zinc-800 pb-5">
                <div>
                  <h2 className="text-xl font-bold">{order.user.name}</h2>

                  <p className="text-gray-400">{order.user.email}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">Order ID</p>

                  <p className="text-sm break-all">{order._id}</p>
                </div>
              </div>

              {/* Products */}
              <div className="mt-5">
                <h3 className="text-lg font-semibold mb-3">Products</h3>

                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b border-zinc-700 py-3"
                  >
                    <img
                      src={item.product?.imageUrl}
                      alt={item.product?.name}
                      className="w-20 h-20 object-contain bg-white rounded-lg p-2"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product?.name}</h4>

                      <p className="text-orange-500">
                        ₹{item.product?.price?.toLocaleString("en-IN")}
                      </p>

                      <p className="text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping */}
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Shipping Address
                  </h3>

                  <div className="space-y-1 text-gray-300">
                    <p>{order.address.fullName}</p>

                    <p>{order.address.street}</p>

                    <p>
                      {order.address.city}, {order.address.state}
                    </p>

                    <p>{order.address.postalCode}</p>

                    <p>{order.address.country}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Payment Details
                  </h3>

                  <div className="space-y-2 text-gray-300">
                    <p>
                      <span className="font-semibold">Payment ID :</span>{" "}
                      {order.paymentId}
                    </p>

                    <p>
                      <span className="font-semibold">Total Amount :</span> ₹
                      {order.totalAmount.toLocaleString("en-IN")}
                    </p>

                    <p>
                      <span className="font-semibold">Ordered On :</span>{" "}
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-5 border-t border-zinc-800 pt-6">
                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Shipped"
                          ? "bg-blue-600"
                          : order.status === "Cancelled"
                            ? "bg-red-600"
                            : "bg-yellow-500 text-black"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <form
                  className="flex gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateStatus(order._id);
                  }}
                >
                  <select
                    defaultValue={order.status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition"
                  >
                    Update Status
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
