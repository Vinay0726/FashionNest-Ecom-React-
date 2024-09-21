import React from 'react'
import Crousel from '../crousel/Crousel'
import RecentThreeCard from '../productscard/RecentThreeCard';
import ProductCardCarousel from '../productscard/ProductCardCarousal';

const HomePage = () => {
  return (
    <div>
      <Crousel />

      <div className="w-full flex-col items-center justify-center">
       {/* <ProductCardCarousel
          data={mens_tshirts}
          sectionName={"Men's T-shirts"}
        />  */}

       <RecentThreeCard/>
        {/* <ProductCardCarousel data={girls_tops} sectionName={"Girl's Tops"} /> */}
        </div>
    </div>
  );
}

export default HomePage
