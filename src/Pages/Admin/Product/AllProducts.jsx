import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const AllProducts = () => {

    const [products , setProducts] = useState([]);
    
    const fetchProducts = async () => {
        try{

            const res = await axios.get(
                `/api/product`
            )

            if(res.data.success){
                setProducts(res.data.products);
                console.log(res.data.products)
            }

        }catch(error){
            alert("Something Went Wrong");
            console.log(error.message);
        }
    }

    useEffect( () => {
        fetchProducts();
    },[]);

  return (
    <div>
       
       {products.map( (product) => (
        
        <div key={product._id} className="p-8 bg-gray-800 m-6 rounded-2xl">
            Product Name : {product.name}
            Price : {product.price}
            Category : {product.category}
            Stock : {product.stock}

            <Link to={`/admin/product/${product._id}`}>
            Update Product
            </Link>

            <button onClick={handleDelete}>               Delete Product
                </button>

        </div>
       ))}

    </div>
  )
}

export default AllProducts
