import { AccountCircle, AttachMoney, TrendingUp } from "@mui/icons-material";
import DevicesIcon from "@mui/icons-material/Devices";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const salesData = [
  {
    stats: "353k",
    title: "Sales",
    color: "primary",
    icon: <TrendingUp sx={{ fontSize: "1.5rem" }} />,
  },
  {
    stats: "12.3k",
    title: "Customer",
    color: "success",
    icon: <AccountCircle sx={{ fontSize: "1.5rem" }} />,
  },
  {
    stats: "1.54k",
    title: "Products",
    color: "warning",
    icon: <DevicesIcon sx={{ fontSize: "1.5rem" }} />,
  },
  {
    stats: "88k",
    title: "Revenue",
    color: "primary",
    icon: <AttachMoney sx={{ fontSize: "1.5rem" }} />,
  },
];

const renderStates = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            backgroundColor: `${item.color}.main`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <Card>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Total 48.5% growth{" "}
            </Box>
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 0.8,
            lineHeight: "2rem !important",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent>
        <Grid container spacing={[5, 0]}>
          {renderStates()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
