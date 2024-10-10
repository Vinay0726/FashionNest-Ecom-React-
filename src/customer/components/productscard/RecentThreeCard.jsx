import React from "react";
import { useNavigate } from "react-router-dom";

const RecentThreeCard = ({ products }) => {
  console.log("products in RecentThreeCard", products);
  const navigate=useNavigate()

  return (
    <div className="sm:w-[96%] ml-10 mb-5 p-5 border border-gray-300">
      <h1 className=" text-2xl p-5 text-center">Latest Products</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10 p-10 ">
        {products.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/product/${item.id}`)}
            className="flex h-full border relative"
          >
            <div className="h-full">
              <img
                className="h-[350px] w-[300px] "
                src={item.imageUrl}
                alt={item.title}
              />
            </div>
            <div className="absolute p-5 bg-slate-50/90 bottom-0 w-full">
              <h1 className="pt-5 text-2xl text-gray-400 uppercase font-semibold">
                {item.brand}
              </h1>
              <p className="pt-5 text-xl text-gray-500">{item.title}</p>
              <h3 className="pt-5 text-3xl text-green-600 font-bold">
                {item.discountPercent}%
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentThreeCard;
