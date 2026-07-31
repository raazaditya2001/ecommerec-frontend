import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice"; // Update the path
import notify from "../../utils/toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${id}`);
      setProduct(res.data.product);
      console.log(res.data.product);
    } catch (error) {
      console.error(error);
      notify.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddCart = () => {
    if(!product) return

    const exists = cartItems.some((item) => item.productId === product._id);
    if (exists) {
      notify.alert("This product is already added");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      }),
    );

    notify.success("Successfully added to your cart!");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="p-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-2xl flex items-center justify-center h-[550px]"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <span className="text-orange-500 font-medium">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-yellow-400">⭐ {product.rating}</span>

            <span className="text-gray-400">({product.numReview} Reviews)</span>
          </div>

          <h2 className="text-4xl font-bold text-orange-500 mt-6">
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p className="text-gray-300 mt-6 leading-7">{product.description}</p>

          <div className="mt-6">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                product.stock > 0 ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <button
            onClick={handleAddCart}
            className="mt-8 w-full md:w-56 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
