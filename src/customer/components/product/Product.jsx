
import { useNavigate } from "react-router-dom";
import { mens_tshirts } from "../../../Data/mens_tshirt";
export default function Product() {
const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/product/${5}`)} className=" sm:-mt-6">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
        <div className="-mt-6 sm:-mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {mens_tshirts.slice(0, 16).map((product) => (
            <div
              key={product.id}
              className="group relative sm:hover:scale-[1.02]"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75  lg:h-80">
                <img
                  alt=""
                  src={product.imageUrl}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
