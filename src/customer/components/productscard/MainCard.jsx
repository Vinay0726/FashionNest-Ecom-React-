import React from 'react'
import { useNavigate } from 'react-router-dom';

const MainCard = ({ product }) => {
  const navigate=useNavigate();
  return (
    <div  className="w-[18rem] ml-10  border border-gray-200 h-[300px]">
      <div className="w-full h-[80%] ">
        <img
          src={product.imageUrl}
          className="object-cover object-top w-full h-full"
          alt=""
        />
      </div>
      <div>
        <h3 className="pt-2 pl-3 text-sm font-semibold ">{product.brand}</h3>
        <p className="pt-1 pl-3 text-xs text-gray-500">
        {product.title}
        </p>
      </div>
    </div>
  );
};

export default MainCard
