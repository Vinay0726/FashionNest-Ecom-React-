import { Avatar, Box, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 5,
        alignItems: "center",
      }}
    >
      {" "}
      {/* Using CSS Grid */}
      <Box>
        <Avatar
          className="text-white"
          sx={{ width: 46,marginLeft:3, height: 46, bgcolor: "#9155fd" }}
        >
          R
        </Avatar>
      </Box>
      <Box>
        <Box className="space-y-2">
          <Box>
            <p className="font-medium text-xl text-purple-900">Ram</p>
            <p className="opacity-60">April 5, 2023</p>
          </Box>
        </Box>
        <Rating name="half-rating" defaultValue={4.5} precision={0.5} readOnly/>
        <p>Nice product, I love this shirt.</p>
      </Box>
    </Box>
  );
};

export default ProductReviewCard;
