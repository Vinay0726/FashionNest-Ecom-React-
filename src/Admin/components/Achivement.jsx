import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";


// Styling for TriangleImg
const TriangleImg = styled("img")({
  right: 0,
  position: "absolute",
  bottom: 0, 
  height: 170,
});

// Styling for TrophyImg
const TrophyImg = styled("img")({
  right: 36,
  bottom: 20, 
  position: "absolute",
  height: 98,
});

const Achievement = () => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop with FashionNest
        </Typography>
        <Typography>Congratulations 🥳</Typography>
        <Typography sx={{fontSize:"20px",padding:"5px"}}>430.6k</Typography>
        <Button size="small" style={{ marginTop: "15px" }} variant="contained">
          View Sales
        </Button>
        <TriangleImg src="" />
        <TrophyImg src="./dashboard/cup.jpg" />
      </CardContent>
    </Card>
  );
};

export default Achievement;
