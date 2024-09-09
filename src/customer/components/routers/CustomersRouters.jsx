import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import Cart from "../cart/Cart";

import ProductDetails from "../../ProductDetails/ProductDetails";
import { Footer } from "../footer/Footer";
import Crousel from "../crousel/Crousel";
// import Product from "../product/product";
import ProductHero from "../product/ProductHero";
import Checkout from "../checkout/Checkout";
import Order from "../order/Order";
import OrderDetails from "../order/OrderDetails";

const CustomersRouters = () => {
  return (
    <div className="h-full">
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Crousel />} />

        <Route path="/cart" element={<Cart />} />
        <Route
          path="/:levelOne/:levelTwo/:levelThree"
          element={<ProductHero />}
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomersRouters;
