import React from 'react'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate=useNavigate()
  const handleCheckout=()=>{
navigate("/checkout/?step=2")
  }
  return (
    <div>
      <div className="sm:flex mt-20 items-center ">
        <div className="sm:w-[65%]  w-[90%]  sm:mt-9">
          {[1, 1, 1, 1,1].map((item) => (
            <CartItem />
          ))}
        </div>
        <div className="w-[90%] ml-5 sm:w-[25%] sm:ml-20 border p-5">
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

            <button onClick={handleCheckout} className="bg-indigo-500 w-full text-gray-300 text-2xl p-3  rounded-lg">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart
