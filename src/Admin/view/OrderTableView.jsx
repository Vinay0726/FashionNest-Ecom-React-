import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../Store/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
  IconButton,
  Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const OrderTableView = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const adminOrder = useSelector((state) => state.adminOrder);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [ordersPerPage] = useState(10); // Orders per page (adjust as needed)

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [
    dispatch,
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deletedOrder,
  ]);

  const handleShipped = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };

  const handleConfirmed = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };

  const handleDelivered = (orderId) => {
    dispatch(deliveredOrder(orderId));
    handleClose();
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  // Filter orders based on search query
  const filteredOrders = adminOrder.orders?.filter((order) =>
    order.orderItems.some((item) =>
      item.product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Get current orders based on pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Card
        className="mt-2"
        sx={{ padding: "16px" }}
      >
        <CardHeader className="text-center " title="All Orders" />
        {/* Search Input */}
        {/* <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            width: "100%",
            gap: "16px",
            paddingBottom: "16px",
          }}
        >
          <TextField
            label="Search by Title"
            variant="outlined"
            size="small"
            sx={{ width: isMobile ? "100%" : "300px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
            }}
            aria-label="orders table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "bold", padding: "8px" }}
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "bold", padding: "8px" }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "bold", padding: "8px" }}
                  align="right"
                >
                  Order ID
                </TableCell>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "bold", padding: "8px" }}
                  align="right"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ fontSize: "14px", fontWeight: "bold", padding: "8px" }}
                  align="right"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders?.slice(0,6).reverse().map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ padding: "8px" }}>
                    <AvatarGroup max={3}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar
                          key={orderItem.product.id}
                          src={orderItem.product.imageUrl}
                          sx={{ width: 30, height: 30 }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    {item.orderItems.map((orderItem) => (
                      <div key={orderItem.product.id}>
                        {orderItem.product.title}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right" sx={{ padding: "8px" }}>
                    {item.id}
                  </TableCell>
                  <TableCell align="right" sx={{ padding: "8px" }}>
                    ₹{item.totalPrice}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      padding: "8px",
                      fontWeight: "bold",
                      color:
                        item.orderStatus === "SHIPPED"
                          ? "blue"
                          : item.orderStatus === "CONFIRMED"
                          ? "orange"
                          : item.orderStatus === "DELIVERED"
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.orderStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
        {/* <div
          style={{ display: "flex", justifyContent: "center", padding: "16px" }}
        >
          <Pagination
            count={Math.ceil(filteredOrders?.length / ordersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div> */}
      </Card>
    </div>
  );
};

export default OrderTableView;
