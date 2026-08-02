import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../../utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../validations/product.schema";

const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    },
  });

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${id}`);

      if (res.data.success) {
        console.log(res.data.product);
        setProduct(res.data.product);

        reset({
          name: res.data.product.name,
          description: res.data.product.description,
          category: res.data.product.category,
          price: res.data.product.price,
          stock: res.data.product.stock,
        });
      }
    } catch (error) {
      notify.error("Something went wrong");
      console.log(error.message);
      navigate("/500");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleImg = () => {
    const image = e.target.files[0];

    if (image) {
      setImage(image);
    }
  };

  const onSubmit = async (data) => {
    e.preventDefault();

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
        notify.success("Successfully Product Updated");
        navigate("/admin/products");
      }
    } catch (error) {
      notify.error("Something went wrong");
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
            {product.imageUrl && (
              <img
                src={product.imageUrl}
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
            {isSubmitting ? "Updating..." :" Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
