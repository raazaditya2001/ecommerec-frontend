import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

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
      alert("Something Went Wrong");
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
        alert("Product Successfully Deleted");
        setProducts((prev) => prev.filter((product) => product._id !== id));
      }
    } catch (error) {
      alert("Something went wrong!");
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id} className="p-8 bg-gray-800 m-6 rounded-2xl">
          Product Name : {product.name}
          Price : {product.price}
          Category : {product.category}
          Stock : {product.stock}
          <Link to={`/admin/product/${product._id}`}>Update Product</Link>
          <button onClick={() => handleDelete(product._id)}>
            {" "}
            Delete Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
