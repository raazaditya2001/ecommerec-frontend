import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product`);
      console.log(data);

      setProducts(data.products?.slice(0) || []);
    } catch (error) {
      console.log(error);
      navigate("/500")
      
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="bg-zinc-950 min-h-screen text-white">

  {/* Hero Banner */}
  <section className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-linear-to-r from-zinc-900 to-zinc-800 rounded-3xl overflow-hidden">

      <div className="grid md:grid-cols-2 items-center">

        <div className="p-8 md:p-14">

          <p className="text-orange-500 font-semibold uppercase tracking-widest">
            New Collection
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            Everything You Need,
            <br />
            One Click Away.
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            Shop electronics, fashion, home essentials, and more at affordable
            prices with fast delivery and secure payments.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 px-7 py-3 rounded-lg font-semibold transition"
          >
            Shop Now
          </Link>

        </div>

        <div className="hidden md:flex justify-center">
          <img
            src="/banner.png"
            alt="Shopping Banner"
            className="h-105 object-contain"
          />
        </div>

      </div>

    </div>
  </section>

  {/* Products */}
  <section className="max-w-7xl mx-auto px-4 py-8">

    <div className="flex justify-between items-center mb-6">

      <h2 className="text-3xl font-bold">
        Featured Products
      </h2>

      <Link
        to="/shop"
        className="text-orange-500 hover:underline"
      >
        View All
      </Link>

    </div>

    {loading ? (
      <div className="text-center py-10">Loading...</div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    )}

  </section>

</div>
    </>
  );
};

export default Home;
