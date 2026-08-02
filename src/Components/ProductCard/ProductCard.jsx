import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div
  className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden
             shadow-lg hover:shadow-blue-500/10
             transition-all duration-300 hover:-translate-y-2"
>
  {/* Product Image */}
  <div className="overflow-hidden">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Product Info */}
  <div className="p-5">
    <h3 className="text-lg font-semibold text-white line-clamp-1">
      {product.name}
    </h3>

    <p className="mt-2 text-2xl font-bold text-blue-400">
      ${product.price.toFixed(2)}
    </p>

    <Link
      to={`/product/${product._id}`}
      className="mt-5 inline-flex items-center justify-center w-full
                 bg-blue-600 hover:bg-blue-700
                 text-white font-medium
                 py-3 rounded-xl
                 transition-all duration-300"
    >
      View Details
    </Link>
  </div>
</div>
   
  )
}

export default ProductCard
