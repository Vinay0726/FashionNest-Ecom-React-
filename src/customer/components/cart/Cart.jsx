import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../Store/Cart/Action'

const Cart = () => {

  const navigate=useNavigate();
  const {cart}=useSelector(store=>store)
  const dispatch=useDispatch();
  const handleCheckout=()=>{
navigate("/checkout/?step=2")
  }
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, cart.updateCartItem, cart.deleteCartItem]);
  return (
    <div>
      <div className="sm:flex mt-20 items-center ">
        <div className="sm:w-[65%]  w-[90%]  sm:mt-9">
          {cart.cart?.cartItems?.map((item) => (
            <CartItem item={item}/>
          ))}
        </div>
        <div className="w-[90%] ml-5 mt-20 sm:w-[25%] sm:ml-20 border p-5">
          <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
          <hr />
          <div className="space-y-4 font-semibold">
            <div className="flex justify-between pt-3 Otext-black">
              <span>Price</span>
              <span>₹{cart.cart?.totalPrice}</span>
            </div>
            <div className="flex justify-between pt-3 ">
              <span>Disccount</span>
              <span className="text-green-600">-₹{cart.cart?.discount}</span>
            </div>
            <div className="flex justify-between pt-3 ">
              <span>Delivery Charge</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between pt-3 ">
              <span>Total Amount</span>
              <span className="text-green-600">
                ₹{cart.cart?.totalDiscountedPrice}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-indigo-500 w-full text-gray-300 text-2xl p-3  rounded-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart
