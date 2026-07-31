import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../utils/toast";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/product`);

      if (res.data.success) {
        setProducts(res.data.products);
        console.log(res.data.products);
      }
    } catch (error) {
      notify.error("Something Went Wrong");
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") {
      return;
    }

    try {
      const res = await axios.delete(`/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.data.success) {
        notify.success("Product Successfully Deleted");
        setProducts((prev) => prev.filter((product) => product._id !== id));
      }
    } catch (error) {
      notify.error("Something went wrong!");
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-zinc-950 min-h-screen p-6">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-zinc-400 mt-1">Manage all products</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/dashboard"
            className="px-5 py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition"
          >
            Back
          </Link>

          <Link
            to="/admin/product-add"
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Desktop Table */}

      <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr className="text-left">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-white"
                    />

                    <div>
                      <p className="font-medium text-white">{product.name}</p>

                      <p className="text-sm text-zinc-400">
                        ID: {product._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-zinc-300">{product.category}</td>

                <td className="px-6 py-4 text-zinc-300">
                  ₹{product.price.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 10
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/product/${product._id}`}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="grid gap-4 md:hidden">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            <div className="flex gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover bg-white"
              />

              <div className="flex-1">
                <h3 className="text-white font-semibold">{product.name}</h3>

                <p className="text-zinc-400 text-sm mt-1">{product.category}</p>

                <p className="text-white mt-2">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                <p className="text-zinc-400 text-sm">Stock : {product.stock}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <Link
                to={`/admin/product/${product._id}`}
                className="text-center py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(product._id)}
                className="py-2 rounded-lg bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
