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

const OrdersTables = () => {
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
      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            width: "100%",
            gap: "16px",
            padding: "16px",
          }}
        >
          {/* Search Input */}
          <TextField
            label="Search by Title"
            variant="outlined"
            sx={{ width: isMobile ? "100%" : "300px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "white",
              border: "1px solid #e3e1e1",
            }}
            aria-label="orders table"
          >
            <TableHead sx={{ padding: "10px" }}>
              <TableRow sx={{ boxShadow: 2 }}>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                  align="right"
                >
                  Id
                </TableCell>
                <TableCell
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                  align="right"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                  align="right"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                  align="right"
                >
                  Update Status
                </TableCell>
                <TableCell
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                  align="right"
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <AvatarGroup sx={{ float: "left" }}>
                      {item.orderItems.map((orderItems) => (
                        <Avatar
                          key={orderItems.product.id}
                          src={orderItems.product.imageUrl}
                        ></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    {item.orderItems.map((orderItems) => (
                      <div key={orderItems.product.id} className="p-1">
                        {orderItems.product.title}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.id}</TableCell>
                  <TableCell align="right">{item.totalPrice}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
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
                  <TableCell align="center">
                    <IconButton
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={open && selectedOrderId === item.id}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleConfirmed(item.id)}>
                        Confirmed
                      </MenuItem>
                      <MenuItem onClick={() => handleShipped(item.id)}>
                        Shipped
                      </MenuItem>
                      <MenuItem onClick={() => handleDelivered(item.id)}>
                        Delivered
                      </MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div
          style={{ display: "flex", justifyContent: "center", padding: "16px" }}
        >
          <Pagination
            count={Math.ceil(filteredOrders?.length / ordersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </Card>
    </div>
  );
};

export default OrdersTables;
