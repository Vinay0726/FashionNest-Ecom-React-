import { Button, IconButton } from "@material-tailwind/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../Store/Cart/Action";
import { VscNoNewline } from "react-icons/vsc";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
const handleUpdateCartItem = (num) => {
  // Prevent negative quantities
  if (item.quantity + num <= 0) return;

  // Prepare the data to send to the updateCartItem action
  const data = {
    data: {
      quantity: item.quantity + num, // Update the quantity
    },
    cartItemId: item?.id, // Ensure the cartItemId is passed
  };

  console.log("after click update", data); // Debugging log

  // Dispatch the action to update the cart item
  dispatch(updateCartItem(data))
    .then(() => {
      console.log("Cart item updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating cart item:", error);
    });
};


  const handleRemoveCartItem = () => {
    console.log("Removing cart item with ID:", item.id); // Debugging log
    dispatch(removeCartItem(item.id))
      .then(() => {
        console.log("Cart item removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing cart item:", error);
      });
  };

  return (
    <div className="p-5 w-[100%] mt-10 lg:mt-5 sm:mt-5 ml-5 sm:ml-10 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item.product.imageUrl}
            alt={item.product.title}
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product.title}</p>
          <p className="opacity-70">
            Size: {item.size}, {item.product.color}
          </p>
          <p className="opacity-70 mt-2">Seller: {item.product.brand}</p>
          <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
            <p className="font-semibold">₹{item.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item.product.price}</p>
            <p className="text-green-600 font-semibold">
              {item.product.discountPercent}% Off
            </p>
          </div>
        </div>
      </div>
      <div className="flex lg:flex items-center lg:space-x-10 pt-5">
        <div className="flex items-center space-x-10">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item.quantity <= 1}
            className="bg-transparent shadow-none"
          >
            <RemoveCircleOutlineIcon
              sx={{ color: "#ff4d4d", marginTop: -1, fontSize: "20px" }}
            />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            className="bg-transparent shadow-none"
          >
            <AddCircleOutlineIcon
              sx={{
                color: "green",
                marginTop: -1,
                fontSize: "20px",
                marginLeft: -4,
              }}
            />
          </IconButton>
        </div>

        <div>
          <Button
            onClick={handleRemoveCartItem}
            className="bg-transparent font-normal text-lg text-red-500 shadow-none p-1 mt-2 lg:-ml-10"
            sx={{ backgroundColor: "transparent" }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
