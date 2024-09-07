import { Button, IconButton } from "@material-tailwind/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";

const CartItem = () => {
  return (
    <div className="p-5 w-[100%] mt-10 lg:mt-5 sm:mt-5 ml-5 sm:ml-10  shadow-1g border rounded-md">
      <div className="flex items-center ">
        <div className="w-[5rem]  h-[5rem] 1g:w-[9rem] 1g:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src="https://rukminim1.
flixcart.com/image/612/612/xif0q/jean/2/q/g/
30-jeans-kneecut-black-crishtaliyo-2fashion-original-imagqy6gzmpwqkge.jpeg?q=70"
            alt=""
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">Men Slim Mid Rise Black Jeans</p>
          <p className="opacity-70">Size: L,White</p>
          <p className="opacity-70 mt-2">Seller: Crishtaliyo 2fashion</p>
          <div className="flex space-x-5 items-center text-1g 1g:text-x1 text-gray-900 mt-6">
            <p className="font-semibold">₹199</p>
            <p className="opacity-50 line-through">₹211 </p>
            <p className="text-green-600 font-semibold">5% Off</p>
          </div>
        </div>
      </div>
      <div className="flex lg:flex items-center lg:space-x-10 pt-5">
        <div className="flex items-center space-x-10">
          <IconButton className="bg-transparent shadow-none">
            <RemoveCircleOutlineIcon
              sx={{ color: "#ff4d4d", marginTop: -1, fontSize: "20px" }}
            />{" "}
            {/* Light red color */}
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">3</span>
          <IconButton className="bg-transparent shadow-none">
            <AddCircleOutlineIcon
              sx={{
                color: "green",
                marginTop: -1,
                fontSize: "20px",
                marginLeft: -4,
              }}
            />{" "}
            {/* Green color */}
          </IconButton>
        </div>

        <div>
          <Button
            className="bg-transparent font-normal  text-lg text-red-500 shadow-none p-1 mt-2 lg:-ml-10"
            sx={{
              backgroundColor: "transparent",
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
