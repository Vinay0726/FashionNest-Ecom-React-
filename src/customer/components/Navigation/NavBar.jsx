import React, { useEffect } from "react";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { navigation } from "./navigation";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import AuthModel from "../../../Auth/AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../Store/Auth/Action";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorE1, setAnchorE1] = useState(null);

  const openUserMenu = Boolean(anchorE1);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  console.log(auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleUserClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };
  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpen(false);
    close();
  };
  // Function to handle navigation and closing the popup
  const handleOrder = (close) => () => {
    navigate("/account/order");
    close();
    setOpen(false);
  };
  // Function to handle navigation and closing the popup
  const handlePop= (close) => () => {
    navigate("/");
    close();
    setOpen(false);
  };
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);
  useEffect(() => {
    if (auth.user) handleClose();
    if (["/login", "/register"].includes(location.pathname)) {
      navigate(-1);
    }
  }, [auth.user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <div className="bg-white fixed top-0 z-20 w-full">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover object-center"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                onClick={() =>
                                  handleCategoryClick(category, section, item)
                                }
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2  font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {auth.user?.firstName ? (
                <div className="lg:ml-8 lg:flex">
                  <div className="flex items-center space-x-4">
                    <button className="bg-blue-300 text-white h-12 w-12 text-center font-semibold text-xl rounded-full">
                      {auth.user?.firstName[0].toUpperCase()}
                    </button>
                    <ul className="space-y-2">
                      <li
                        className="cursor-pointer"
                        onClick={() => console.log("Profile clicked")}
                      >
                        Profile
                      </li>
                      <li className="cursor-pointer" onClick={handleOrder}>
                        My Orders
                      </li>
                      <li className="cursor-pointer" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flow-root">
                  <a
                    onClick={handleOpen}
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white ">
        <p className="flex h-10 items-center justify-center bg-gray-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹ 300
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img alt="" src="./logo/logo.png" className="h-8 w-auto " />
                </a>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-14">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={`relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors lg:text-xl lg:text-gray-500 duration-200 ease-out hover:text-gray-800 ${
                                open ? "border-indigo-600 text-indigo-600" : ""
                              }`}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 transition duration-200 ease-out">
                            {/* Presentational element used to render the bottom shadow */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                          <img
                                            alt={item.imageAlt}
                                            src={item.imageSrc}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <a
                                          href={item.href}
                                          className="mt-6 block font-medium text-gray-900"
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <a
                                                onClick={() =>
                                                  handleCategoryClick(
                                                    category,
                                                    section,
                                                    item,
                                                    close
                                                  )
                                                }
                                                href={item.href}
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </>
                      )}
                    </Popover>
                  ))}

                  {/* Static Links */}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="lg:text-xl lg:text-gray-500 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="ml-auto flex items-center">
                {auth.user?.firstName ? (
                  <div className="hidden lg:ml-8 lg:flex">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <button
                            className="bg-blue-300 text-white  h-12 w-12 text-center font-semibold text-xl rounded-full"
                            variant="contained"
                            {...bindTrigger(popupState)}
                          >
                            {auth.user?.firstName[0].toUpperCase()}
                          </button>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              Profile
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                navigate("/account/order");
                                popupState.close(); // Close the menu
                              }}
                            >
                              My Orders
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleLogout(); // Call the logout function
                                popupState.close(); // Close the popup state
                              }}
                            >
                              Logout
                            </MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a
                      onClick={handleOpen}
                      className="lg:text-xl lg:text-gray-500 text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </a>
                  </div>
                )}

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div
                  onClick={() => navigate("/cart")}
                  className="ml-4 flow-root lg:ml-6"
                >
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
