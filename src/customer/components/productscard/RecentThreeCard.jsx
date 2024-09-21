import React from 'react'
import { mens_tshirts } from "../../../Data/mens_tshirt";
const RecentThreeCard = () => {

    
  return (
    <div className="mt-5 mb-5 p-16 sm:pb-60 sm:ml-5 lg:pb-24  border border-gray-300">
      <h1 className="p-5 text-2xl text-center">Latest Products</h1>
      <div className="flex-col  justify-center items-center  sm:gap-2 sm:flex sm:ml-0 sm:-m-5 sm:flex-row">
        {mens_tshirts.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="relative mt-10 ml-5 sm:ml-0   bg-slate-100 border border-gray-300"
          >
            <div className="sm:w-[50%]">
              <img src={item.imageUrl} alt="" />
            </div>

            <div className="sm:h-[70%] flex-col bg-white/40 justify-center items-center  absolute   rounded-md p-4 top-52 sm:bg-white/85 sm:top-40 sm:right-0 right-10 z-[1]">
              <h1 className="pt-5 text-2xl text-gray-400 uppercase font-semibold">
                {item.brand}
              </h1>
              <p className="pt-5 text-xl text-gray-500 ">{item.title}</p>
              <h3 className="pt-5 text-5xl text-green-800 font-bold">
                {item.discountPersent}%
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentThreeCard
