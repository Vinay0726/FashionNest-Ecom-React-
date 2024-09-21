"use client";

import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

// Importing icons from react-icons
import {
  MdExpandMore,
  MdFilterList,
  MdGridView,
  MdClose,
  MdAdd,
  MdRemove,
} from "react-icons/md";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Product from "../product/product";
import { IoFilter, IoFilterSharp } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findProducts } from "../../../Store/Product/Action";
import { useSelector } from "react-redux";


const sortOptions = [
  { name: "Price: Low to High", value: "price_low", current: false },
  { name: "Price: High to Low", value: "price_high", current: false },
];

// Updated filters with only "Color," "Size," "Price Range," "Discount Range," and "Availability"
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "s", label: "S", checked: false },
      { value: "s", label: "M", checked: false },
      { value: "s", label: "L", checked: false },
    
    ],
  },
];


const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "159-399", label: "₹159 To ₹399", checked: false },
      { value: "399-999", label: "₹399 To ₹999", checked: false },
      { value: "999-1999", label: "₹999 To ₹1999", checked: false },
      { value: "1999-2999", label: "₹1999 To ₹2999", checked: false },
      { value: "3999-4999", label: "₹3999 To ₹4999", checked: false },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% And Above", checked: false },
      { value: "20", label: "20% And Above", checked: false },
      { value: "30", label: "30% And Above", checked: false },
      { value: "40", label: "40% And Above", checked: false },
      { value: "50", label: "50% And Above", checked: false },
      { value: "60", label: "60% And Above", checked: false },
      { value: "70", label: "70% And Above", checked: false },
      { value: "80", label: "80% And Above", checked: false },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    options: [
      { value: "in-stock", label: "In Stock", checked: true },
      { value: "out-of-stock", label: "Out of Stock", checked: false },
    ],
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



const FilterData = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //getting product data from store
  const { productData } = useSelector(store=>store);


  const { levelOne, levelTwo, levelThree } = useParams();

  // 'levelThree' will give you 'mens_kurta' in this case
  const category = levelThree;

  // for api filter
  const decodeQueryString = decodeURI(location.search);
  const searchParams = new URLSearchParams(decodeQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");

 const handlePaginationChange = (event, value) => {
   const searchParams = new URLSearchParams(location.search);
   searchParams.set("page", value); // Set the page as the second argument (value)

   const query = searchParams.toString();
   navigate({ search: `${query}` });
 };

 const handleSort=(event,sortValue)=>{
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("sort", sortValue);
  const query = searchParams.toString();
  navigate({ search: `${query}`})

 }

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.getAll(sectionId);

    // If the section already has values, split them into an array
    if (filterValue.length > 0) {
      filterValue = filterValue[0].split(",");
    } else {
      filterValue = [];
    }

    // Check if the value is already present
    if (filterValue.includes(value)) {
      // Remove the value if it's already present
      filterValue = filterValue.filter((item) => item !== value);
    } else {
      // Add the value if it's not present
      filterValue.push(value);
    }

    // Update the search parameters
    if (filterValue.length === 0) {
      searchParams.delete(sectionId);
    } else {
      searchParams.set(sectionId, filterValue.join(","));
    }

    // Navigate with the updated query string
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleRadioFilter = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  //for api
  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 1000] : priceValue.split("-").map(Number);

    const data = {
      category: category,
      colors: colorValue ? colorValue.split(",") : [],
      sizes: sizeValue ? sizeValue.split(",") : [],
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock: stock !== "null" ? stock : undefined, // Adjusting for null handling
    };

    // Console log the data object being passed to the API
    console.log("Data being sent to API:", data);
    dispatch(findProducts(data));
  }, [
    dispatch,
    category,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock,
  ]);
  
  return (
    <div className="bg-white w-full">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <MdClose aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <MdAdd
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MdRemove
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={() =>
                                handleFilter(option.value, section.id)
                              }
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {singleFilter.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MdRemove
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              ) : (
                                <MdAdd aria-hidden="true" className="h-5 w-5" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={section.id} // Ensures all options in a section are grouped
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:max-w-[85%]">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24 sm:pt-16">
            <h1 className="text-4xl mt-24 font-bold tracking-tight text-gray-900">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <MdExpandMore
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          // href={option.href}
                          onClick={(event) => handleSort(event, option.value)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <MdFilterList aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  <li className="text-2xl flex justify-between items-center text-gray-600">
                    Filters <IoFilter />
                  </li>
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <MdAdd
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MdRemove
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={() =>
                                handleFilter(option.value, section.id)
                              }
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {singleFilter.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <MdAdd
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MdRemove
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={(e) => handleRadioFilter(e, section.id)}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={section.id} // All radio buttons in a section share the same name
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              type="radio"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 border">
                <div className="sm:-mt-6">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {productData.products &&
                      productData.products.content?.length > 0 ? (
                        productData.products.content.map((item) => (
                          <Product key={item.id} product={item} />
                        ))
                      ) : (
                        <p>No products found.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full ">
            <div className="px-4 py-1 flex justify-center">
              <Pagination
                count={productData.products?.totalPages}
                onChange={handlePaginationChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FilterData;
