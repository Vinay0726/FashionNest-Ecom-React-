import { Grid } from "@mui/material";
import React from "react";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  return (
    <div className="mt-40">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} md={2.5} lg={2.5}>
          <div className="h-auto ml-1 lg:ml-10 shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>

            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>

              {orderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    id={option.value}
                    value={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          {[1, 1, 1, 1, 1].map((item) => (
            <OrderCard />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
