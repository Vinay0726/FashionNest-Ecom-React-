
import { Diversity1 } from '@mui/icons-material'
import './App.css'
import NavBar from './customer/components/Navigation/NavBar'
import Crousel from './customer/components/crousel/Crousel'
import ProductCardCarousal from './customer/components/productscard/ProductCardCarousal'
import { mens_tshirts } from "../../E-Commerce/src/Data/mens_tshirt";
import { girls_tops } from "../../E-Commerce/src/Data/girls_tops";
import RecentThreeCard from './customer/components/productscard/RecentThreeCard'
import { Footer } from './customer/components/footer/Footer'
// import Product from './customer/components/product/product'
import ProductHero from './customer/components/product/ProductHero'
import ProductDetails from './customer/ProductDetails/ProductDetails'
import Cart from './customer/components/cart/Cart'
import Checkout from './customer/components/checkout/Checkout'
import Order from './customer/components/order/Order'
import OrderDetails from './customer/components/order/OrderDetails'
import CustomersRouters from './customer/components/routers/CustomersRouters'
import { Route, Routes } from 'react-router-dom'
import AdminRouters from './customer/components/routers/AdminRouters'

function App() {
 

  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/*" element={<CustomersRouters />}></Route>
        <Route path="/admin/*" element={<AdminRouters />}></Route>
      </Routes>

      {/* <NavBar /> */}
      {/* <Crousel /> */}
      {/* <div className="w-full h-screen flex-col items-center justify-center"> */}
      {/* <ProductCardCarousal
          data={mens_tshirts}
          sectionName={"Men's T-shirts"}
        /> */}

      {/* <RecentThreeCard />
        <ProductCardCarousal data={girls_tops} sectionName={"Girl's Tops"} /> */}
      {/* <ProductHero/> */}
      {/* <ProductDetails/> */}

      {/* <Cart/> */}
      {/* <Checkout/> */}
      {/* <Order/> */}
      {/* <OrderDetails/> */}
      {/* <Footer /> */}
      {/* </div> */}
    </div>
  );
}

export default App
