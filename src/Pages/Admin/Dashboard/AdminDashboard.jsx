import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import notify from "../../../utils/toast";
import api from "../../../Components/api";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const fetchDashboard = async () => {
    if (!user || user.role !== "admin") {
      return;
    }

    try {
      const res = await api.get(`/api/analytics`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res);
      if (res.data.success) {
        setDashboardStats(res.data.dashboardStats);
        setOrderStats(res.data.orderStats);
      }
    } catch (error) {
      notify.error("Something went wrong!");
      console.log(error.message);
      navigate("/500");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

 return (
  <div className="min-h-screen bg-zinc-950 text-white p-8">

    {/* Heading */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-zinc-400 mt-1">
        Manage your store from one place.
      </p>
    </div>

    {/* Statistics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <p className="text-zinc-400 text-sm">
          Total Orders
        </p>

        <h2 className="text-3xl font-bold mt-3">
          {dashboardStats.totalOrders}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <p className="text-zinc-400 text-sm">
          Total Users
        </p>

        <h2 className="text-3xl font-bold mt-3">
          {dashboardStats.totalUsers}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <p className="text-zinc-400 text-sm">
          Total Products
        </p>

        <h2 className="text-3xl font-bold mt-3">
          {dashboardStats.totalProducts}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <p className="text-zinc-400 text-sm">
          Revenue
        </p>

        <h2 className="text-3xl font-bold text-orange-500 mt-3">
          ₹{dashboardStats.totalRevenueData?.toLocaleString("en-IN")}
        </h2>
      </div>

    </div>

    {/* Order Status */}

    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Order Status
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div>
          <p className="text-zinc-400">Pending</p>
          <h3 className="text-2xl font-semibold mt-2">
            {orderStats.totalPendingOrder}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">Shipped</p>
          <h3 className="text-2xl font-semibold mt-2">
            {orderStats.totalShippedOrder}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">Delivered</p>
          <h3 className="text-2xl font-semibold mt-2">
            {orderStats.totalDeliveredOrder}
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">Cancelled</p>
          <h3 className="text-2xl font-semibold mt-2">
            {orderStats.totalCancelledOrder}
          </h3>
        </div>

      </div>

    </div>

    {/* Quick Actions */}

    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <Link
          to="/admin/product-add"
          className="bg-zinc-800 border border-zinc-700 hover:border-orange-500 hover:bg-zinc-700 transition rounded-lg p-5"
        >
          <h3 className="font-semibold">
            Add Product
          </h3>

          <p className="text-sm text-zinc-400 mt-1">
            Create a new product
          </p>
        </Link>

        <Link
          to="/admin/products"
          className="bg-zinc-800 border border-zinc-700 hover:border-orange-500 hover:bg-zinc-700 transition rounded-lg p-5"
        >
          <h3 className="font-semibold">
            Products
          </h3>

          <p className="text-sm text-zinc-400 mt-1">
            View all products
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-zinc-800 border border-zinc-700 hover:border-orange-500 hover:bg-zinc-700 transition rounded-lg p-5"
        >
          <h3 className="font-semibold">
            Orders
          </h3>

          <p className="text-sm text-zinc-400 mt-1">
            Manage customer orders
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-zinc-800 border border-zinc-700 hover:border-orange-500 hover:bg-zinc-700 transition rounded-lg p-5"
        >
          <h3 className="font-semibold">
            Users
          </h3>

          <p className="text-sm text-zinc-400 mt-1">
            Manage registered users
          </p>
        </Link>

      </div>

    </div>

  </div>
);
};

export default AdminDashboard;
