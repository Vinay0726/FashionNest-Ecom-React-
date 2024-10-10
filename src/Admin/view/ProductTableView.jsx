import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../Store/Product/Action";

const ProductTableView = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((store) => store);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("mens_kurta");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId)).then(() => {
      fetchProducts();
    });
  };

  const fetchProducts = () => {
    const filters = {
      category,
      colors: [],
      sizes: [],
      minPrice,
      maxPrice,
      minDiscount: 0,
      sort: "price_low",
      pageNumber,
      pageSize,
      stock: "",
      searchTerm,
    };
    dispatch(findProducts(filters));
  };

  useEffect(() => {
    fetchProducts();
  }, [
    dispatch,
    pageNumber,
    pageSize,
    category,
    searchTerm,
    minPrice,
    maxPrice,
  ]);

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1); // Pagination is 1-based, backend is likely 0-based
  };

  return (
    <div>
      <Card className="mt-2">
        <CardHeader className="text-center" title="All Products" />

        <TableContainer
          sx={{
            overflowX: "auto", // Makes the table scrollable horizontally
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "white",
              border: "1px solid #e3e1e1",
            }}
            aria-label="products table"
          >
            <TableHead sx={{ padding: "10px" }}>
              <TableRow sx={{ boxShadow: 2 }}>
                <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                  align="right"
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                  align="right"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                  align="right"
                >
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.products?.content
                ?.filter((item) =>
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5)
                .reverse()
                .map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Avatar
                        src={item.imageUrl}
                        sx={{ width: 30, height: 30 }}
                      ></Avatar>
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">{item.category.name}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {/* <Pagination
          count={productData.products?.totalPages}
          page={pageNumber + 1}
          onChange={handlePageChange}
          sx={{ padding: "16px", display: "flex", justifyContent: "center" }}
        /> */}
      </Card>
    </div>
  );
};

export default ProductTableView;
