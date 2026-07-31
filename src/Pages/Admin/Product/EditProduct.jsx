import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [productForm, setProductForm] = useState({});

  const [image, setImage] = useState(null);

  console.log(user);
  console.log(id);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${id}`);

      if (res.data.success) {
        console.log(res.data.product);
        setProductForm(res.data.product);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProductForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImg = (e) => {
    const image = e.target.files[0];

    if (image) {
      setImage(image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", productForm.name);
    formData.append("description", productForm.description);
    formData.append("price", productForm.price);
    formData.append("category", productForm.category);
    formData.append("stock", productForm.stock);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.put(
        `/api/product/${id}`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (res.data.success) {
        alert("Successfully Product Updated");
        navigate("/admin/products");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-950 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Update Product Details
          </h1>

          <p className="text-gray-400 mt-2">
            Fill in the product details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-300 mb-2">Product Name</label>

            <input
              type="text"
              name="name"
              value={productForm.name}
              onChange={handleChange}
              placeholder="e.g. Samsung Galaxy S26 Ultra"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>

            <textarea
              rows={4}
              name="description"
              value={productForm.description}
              onChange={handleChange}
              placeholder="Enter product description..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-300 mb-2">Category</label>

            <select
              name="category"
              value={productForm.category}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Category</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Laptops">Laptops</option>
              <option value="Tablets">Tablets</option>
              <option value="Headphones">Headphones</option>
              <option value="Smart Watches">Smart Watches</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Price & Stock */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-300 mb-2">Price (₹)</label>

              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Stock</label>

              <input
                type="number"
                name="stock"
                value={productForm.stock}
                onChange={handleChange}
                placeholder="Available quantity"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            {productForm.imageUrl && (
              <img
                src={productForm.imageUrl}
                alt="Product Preview"
                className="w-40 h-40 object-cover rounded-lg mb-4 border border-gray-700"
              />
            )}

            <label className="block text-gray-300 mb-2">Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImg}
              className="w-full text-gray-300 file:bg-orange-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
