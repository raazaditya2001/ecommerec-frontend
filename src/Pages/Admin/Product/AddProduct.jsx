import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import notify from "../../../utils/toast";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {productSchema} from "../../../validations/product.schema"

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors , isSubmitting},
  } = useForm ( {
    resolver: zodResolver(productSchema),
    defaultValues : {
      name : "",
      description: "",
      price : 0,
      category : "",
      stock: 0,
    }
  });
  
  

  console.log(user);

  const [image, setImage] = useState(null);

  

  const handleImg = (e) => {
    const image = e.target.files[0];

    if (image) {
      setImage(image);
    }
  };

  const onSubmit = async (data) => {

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock", data.stock);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        `/api/product`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (res.data.success) {
        notify.success("Successfully Product Added");
        navigate("/admin/products");
        console.log(res.data);
      }
    } catch (error) {
      notify.error("Something went wrong");
       console.log(error.response);
  console.log(error.response?.data);
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-950 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>

          <p className="text-gray-400 mt-2">
            Fill in the product details below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-300 mb-2">Product Name</label>

            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Samsung Galaxy S26 Ultra"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
          </div>
          

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>

            <textarea
              rows={4}
              {...register("description")}
              placeholder="Enter product description..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
             {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}

          </div>

          
          {/* Category */}
          <div>
            <label className="block text-gray-300 mb-2">Category</label>

            <select
             {...register("category")}
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
             {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
          </div>

          

          {/* Price & Stock */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-300 mb-2">Price (₹)</label>

              <input
                type="number"
                {...register("price")}
                placeholder="Enter price"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
               {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
            </div>
            

            <div>
              <label className="block text-gray-300 mb-2">Stock</label>

              <input
                type="number"
                {...register("stock")}
                placeholder="Available quantity"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
               {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
            </div>
          </div>
        

          {/* Image */}
          <div>
            <label className="block text-gray-300 mb-2">Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImg}
              className="w-full text-gray-300 file:bg-orange-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer cursor-pointer"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
             {isSubmitting ? "Adding..." :" Add Product"}
            </button>

            <Link
              to="/admin/dashboard"
              className="flex-1 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              ← Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
