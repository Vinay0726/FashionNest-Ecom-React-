import React from 'react'
import AddressCard from '../address/AddressCard'
import CartItem from '../cart/CartItem';

const OrderSummary = () => {
  return (
    <div>
      <div className="p-5 mt-10  ml-10 shadow-lg rounded-s-md border">
        <AddressCard />
      </div>
      <div>
        <div className="sm:flex  items-center ">
          <div className="sm:w-[65%]  w-[90%]  sm:mt-9">
            {[1, 1, 1, 1, 1].map((item) => (
              <CartItem />
            ))}
          </div>
          <div className="w-[90%] ml-5 sm:w-[30%] sm:ml-20 border p-5">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-4 font-semibold">
              <div className="flex justify-between pt-3 Otext-black">
                <span>Price</span>
                <span>₹4697</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Disccount</span>
                <span className="text-green-600">-₹3419</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Total Amount</span>
                <span className="text-green-600">₹1219</span>
              </div>

              <button className="bg-indigo-500 w-full text-gray-300 text-2xl p-3  rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary
