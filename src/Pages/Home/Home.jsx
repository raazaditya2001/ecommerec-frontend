import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Link, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import api from "../../Components/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const banners = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/product`);
      console.log(data);

      setProducts(data.products?.slice(0) || []);
    } catch (error) {
      console.log(error);
      navigate("/500");
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
                  Shop electronics, fashion, home essentials, and more at
                  affordable prices with fast delivery and secure payments.
                </p>

               
              </div>

              <div className="hidden md:flex justify-center items-center p-8">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 3000 }}
                  loop
                  pagination={{ clickable: true }}
                >
                  {banners.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-[420px] object-cover rounded-xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Featured Products</h2>

            
          </div>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
