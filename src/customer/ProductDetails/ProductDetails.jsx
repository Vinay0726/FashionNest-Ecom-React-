

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Grid, LinearProgress,Box, Rating } from "@mui/material";
import { GiShoppingBag } from "react-icons/gi";
import ProductReviewCard from "./ProductReviewCard";

import { mens_tshirts } from "../../Data/mens_tshirt";
import MainCard from "../components/productscard/MainCard";
import RecentThreeCard from "../components/productscard/RecentThreeCard";
import Product from "../components/product/product";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../Store/Product/Action";
import { addItemToCart } from "../../Store/Cart/Action";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [

    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
   
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const navigate=useNavigate();
  const params=useParams();
  const dispatch=useDispatch();

  const {productData}=useSelector(store=>store)

 




  const handleAddToCart=(e)=>{
    e.preventDefault(); 
   const data = {
     productId: params.productId,
     size: selectedSize.name,
   };
   console.log("select size", data);

   dispatch(addItemToCart(data))
     .then(() => navigate("/cart"))
     .catch((error) =>
       console.error("Failed to add item to cart:", error.message)
     );
  }
  useEffect(()=>{
  const data={
productId:params.productId
  }
 
dispatch(findProductsById(data))

  },[params.productId])

  return (
    <div className="bg-white mt-28">
      <div className="pt-10">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto ml-10 flex  max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:ml-72"
          >
            <li className="text-base font-bold">
              <a
                aria-current="page"
                className="font-bold text-gray-500 hover:text-gray-600"
              >
                {
                  productData.product?.category?.parentCategory?.parentCategory
                    ?.name
                }
                <span> /</span>
              </a>
            </li>
            <li className="text-base ">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productData.product?.category?.parentCategory?.name}
                <span> /</span>
              </a>
            </li>

            <li className="text-base ">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productData.product?.title}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center ">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={productData.product?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex flex-wrap space-x-5 justify-center ">
              {product.images.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[6rem] max-h-[6rem] mt-4">
                  <img
                    alt={item.alt}
                    src={productData.product?.imageUrl}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-6 pb-16 pt-10 sm:px-6 lg:max-w-3xl lg:-ml-16 ">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {productData.product?.title}
              </h1>
              <p className="text-xl lg:text-2xl text-gray-500 mt-2">
                {productData.product?.brand}
              </p>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center text-lg lg:text-lg mt-4">
                <p className="text-2xl tracking-tight font-semibold text-gray-600">
                  MRF{" "}
                  <span className="text-gray-900 text-3xl">
                    {" "}
                    ₹ {productData.product?.discountedPrice}
                  </span>
                </p>
                <p className="text-2xl tracking-tight line-through ml-3 text-gray-400">
                  Rs{productData.product?.price}
                </p>
                <p className="text-3xl tracking-tight ml-3 font-bold text-green-400">
                  {productData.product?.discountPercent}%Off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-5">
                  <Rating
                    name="half-rating"
                    defaultValue={productData.product?.ratings}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">
                    {productData.product?.ratings} Ratings
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {productData.product?.reviews} Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>
                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 w-[80%] sm:w-[60%] sm:gap-24 lg:gap-[2px] gap-[2px] items-start sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center border rounded-full w-20 h-20 px-1 py-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 group-data-[checked]:border-green-500 group-data-[checked]:text-green-500" // Added checked state styles
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-full border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-green-500" // Checked border color
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <button
                  onClick={handleAddToCart}
                  type="submit"
                  className="mt-10 flex w-[45%] sm:w-[35%] lg:w-[25%] items-center gap-2 justify-center rounded-xl border border-transparent bg-indigo-500 px-8 py-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <GiShoppingBag /> Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 mt-5 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {productData.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {productData.product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rating and reviews */}

        <section>
          <h1 className="font-semibold text-2xl text-blue-800 ml-10 pb-4">
            Recent Review & Rating
          </h1>
          <div className="border flex flex-col ml-10 w-[95%] p-5">
            <Grid container spacing={7}>
              <Grid item xs={12} md={7}>
                <div className="space-y-5">
                  {[1, 2, 3].map((item, index) => (
                    <ProductReviewCard key={index} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={12} md={5}>
                <h1 className="text-2xl mt-1 font-semibold pb-1">
                  Product Ratings
                </h1>
                <div className="flex items-center">
                  <Rating value={4.6} precision={0.5} readOnly />
                  <p className="ml-1 text-lg opacity-60 ">59484 Ratings</p>
                </div>
                <Box className="mt-8 space-y-5">
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={50}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={40}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "gold",
                          },
                        }}
                        variant="determinate"
                        value={30}
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Average</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={20}
                        color="warning"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Poor</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={10}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* similar products */}

        <section className="pt-10 ">
          <h1 className="text-3xl p-5 ml-5 font-semibold border-b-2">
            Similar Products
          </h1>

          <div className="flex justify-center -ml-10 flex-wrap mt-4 ">
            {mens_tshirts.slice(0, 12).map((item) => (
              <MainCard product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
