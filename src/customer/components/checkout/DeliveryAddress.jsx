import React, { useEffect } from "react";
import AddressCard from "../address/AddressCard";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderById } from "../../../Store/Order/Action";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../../../Store/Auth/Action";
import { getCart } from "../../../Store/Cart/Action";

const DeliveryAddress = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  //for address cart
     const location = useLocation();
     const { order } = useSelector((store) => store);
     const { cart } = useSelector((store) => store);
    //  const searchPrams = new URLSearchParams(location.search);
    //  const orderId = searchPrams.get("order_id");

     useEffect(()=>{
      dispatch(getCart);
     },[])
          const orderId = cart.cart?.user?.address[0]?.id; 
          const addres = cart.cart?.user?.address[0]; 
      useEffect(() => {

        if (orderId) {    
          dispatch(getOrderById(orderId));

          
        }
      }, [dispatch, orderId]);

      console.log("order id babaja",orderId)
     
 const handleDeliveredhere=(()=>{
   const address = {
     firstName: addres?.firstName,
     lastName: addres?.lastName,
     streetAddress: addres?.streetAddress,
     city: addres?.city,
     state: addres?.state,
     zipCode: addres?.zipCode,
     mobile: addres?.mobile,
   };
   const orderData = { address, navigate };
   dispatch(createOrder(orderData));
   console.log("address", address);
 })
//end address cart
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const address = {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          streetAddress: data.get("address"),
          city: data.get("city"),
          state: data.get("state"),
          zipCode: data.get("zip"),
          mobile: data.get("phoneNumber"),
        };
        const orderData={address,navigate}
        dispatch(createOrder(orderData))
        console.log("address", address);
    }
    
     
  return (
    <div className="mt-16">
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md mt-10 ml-10 sm:ml-0 shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            <AddressCard address={order.order?.shippingAddress} />
            <Button
              onClick={handleDeliveredhere}
              sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
            >
              Deliver Here
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="phoneNumber"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{ py: 2, mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddress;