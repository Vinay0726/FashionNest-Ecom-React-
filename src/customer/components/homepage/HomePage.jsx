import React, { useEffect, useState } from 'react'
import Crousel from '../crousel/Crousel'
import axios from "axios"; 
import RecentThreeCard from '../productscard/RecentThreeCard';
import ProductCardCarousel from '../productscard/ProductCardCarousal';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          "http://localhost:8080/api/admin/products/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data); // Set the fetched product data
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  console.log("products is", products);

  return (
    <div>
      <Crousel />

      <div className="w-full flex-col items-center justify-center">
        {products.length > 0 ? (
          <ProductCardCarousel
            data={products
              .filter((item) => item.category.name === "mens_tshirt")
              .slice(0, 12)}
            sectionName={"Men's T-Shirt"}
          />
        ) : (
          <p>No products available</p>
        )}
        {products.length > 0 ? (
          // Pass the last 3 products as a prop to RecentThreeCard
          <RecentThreeCard products={products.slice(-4).reverse()} />
        ) : (
          <p>No products available</p>
        )}
        {products.length > 0 ? (
          <ProductCardCarousel
            data={products
              .filter((item) => item.category.name === "women_top")
              .slice(0, 12)}
            sectionName={"Girl's Top"}
          />
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage
