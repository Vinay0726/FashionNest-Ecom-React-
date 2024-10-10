import React, { useState } from "react";
import {
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import { GiClothes } from "react-icons/gi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RiAdminLine } from "react-icons/ri";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import CustomersTable from "./CustomersTable";
import OrdersTables from "./OrdersTables";
import CreateProductForm from "./CreateProductForm";
import AdminDashboard from "./AdminDashboard";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <GiClothes /> },
  { name: "Customers", path: "/admin/customers", icon: <GroupIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <HistoryIcon /> },
  { name: "Add Product", path: "/admin/product/create", icon: <AddIcon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawerContent = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRight: "2px solid #e9ecef",
      }}
    >
      <List>
        <h1 className="flex text-xl p-5 font-bold gap-8">
          <RiAdminLine />
          Admin Panel
        </h1>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => {
              navigate(item.path);
              if (!isLargeScreen) setSideBarVisible(false); // Close drawer on mobile after click
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText sx={{ paddingRight: "80px" }}>
                {item.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Accounts</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="w-full bg-blue-50">
      <CssBaseline />
      {/* Top App Bar */}
      {!isLargeScreen && (
        <AppBar position="static">
          <Toolbar>
            {/* Toggle Button for Mobile */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setSideBarVisible(!sideBarVisible)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <div className="flex w-full">
        {/* Drawer for both permanent and temporary */}
        <Drawer
          variant={isLargeScreen ? "permanent" : "temporary"}
          open={sideBarVisible || isLargeScreen} // Control visibility for temporary drawer
          onClose={() => setSideBarVisible(false)} // Close when clicking outside on mobile
          ModalProps={{ keepMounted: true }} // Better performance on mobile
          sx={{
            display: { xs: sideBarVisible ? "block" : "none", lg: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Main Content */}
        <div className="w-screen lg:w-[80%] lg:ml-80">
          <div className="p-5 h-full">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/products" element={<ProductsTable />} />
              <Route path="/customers" element={<CustomersTable />} />
              <Route path="/orders" element={<OrdersTables />} />
              <Route path="/product/create" element={<CreateProductForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
