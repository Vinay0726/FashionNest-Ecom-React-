import React, { useEffect } from 'react'
import AddressCard from '../address/AddressCard'
import CartItem from '../cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../Store/Order/Action';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
   const dispatch = useDispatch();
   const location=useLocation();
   const {order}=useSelector(store=>store)
   const searchPrams=new URLSearchParams(location.search)
   const orderId = searchPrams.get("order_id")
   console.log("orderjsjsjjsj",orderId)

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  return (
    <div>
      <div className="p-5 mt-10  sm:ml-10 shadow-lg rounded-s-md border">
        <AddressCard address={order.order?.shippingAddress} />
      </div>
      <div>
        <div className="sm:flex  items-center ">
          <div className="sm:w-[65%]  w-[90%]  sm:mt-9">
            {order.order?.orderItems?.map((item) => (
              <CartItem item={item} />
            ))}
          </div>
          <div className="w-[90%] ml-5 mt-5 sm:w-[30%] sm:ml-20 border p-5">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-4 font-semibold">
              <div className="flex justify-between pt-3 Otext-black">
                <span>Price</span>
                <span>₹{order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">-₹{order.order?.discount}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Total Amount</span>
                <span className="text-green-600">₹{order.order?.totalDiscountedPrice}</span>
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
