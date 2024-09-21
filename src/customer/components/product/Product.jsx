import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)} // Dynamic navigation
      className="group relative sm:hover:scale-[1.02] cursor-pointer"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md border lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          alt={product.title}
          src={product.imageUrl}
          className="h-full w-full object-contain object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.discountedPrice}</p>
      </div>
    </div>
  );
}
