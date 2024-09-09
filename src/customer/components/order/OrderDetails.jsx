import React from "react";
import AddressCard from "../address/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { deepPurple } from "@mui/material/colors";

const OrderDetails = () => {
  return (
    <div>
      <div className="ml-5 sm:ml-20 mt-40 border p-5 w-[92%]">
        <h1 className="font-bold text-xl py-2">Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="ml-5 sm:ml-20 mt-5 border p-5 w-[92%]">
        <OrderTracker activeStep={3} />
      </div>

      {[1, 1, 1, 1].map(() => (
        <Grid className="ml-5 sm:ml-20 mt-5 space-x-5" container>
          <Grid
            item
            xs={{ alignItems: "center", justifyContent: "space-between" }}
            className="w-[92%] flex hover:shadow-xl sm:justify-between sm:items-center p-5 rounded-md shadow-md border border-gray-200"
          >
            <Grid item xs={6}>
              <div className="flex cursor-pointer">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://rukminim1.
flixcart.com/image/612/612/xif0q/jean/2/q/g/
30-jeans-kneecut-black-crishtaliyo-2fashion-original-imagqy6gzmpwqkge.jpeg?q=70"
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p className="">Men Slim Mid Rise Black Jeans</p>
                  <div className="flex space-x-2">
                    {" "}
                    <p className="opacity-50 text-sm font-semibold">Size: M</p>
                    <p className="opacity-50 text-sm font-semibold">
                      Color: Black
                    </p>
                  </div>
                  <p className="opacity-80 text-sm font-semibold">
                    Seller : linaeia
                  </p>
                  <p className="text-sm">₹1099</p>
                </div>
              </div>
            </Grid>

            <Grid item className="text-sm sm:text-lg">
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon
                  sx={{ fontSize: "2rem" }}
                  className="px-2 text-xl"
                />
                <span>Rate and Review Product</span>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default OrderDetails;
