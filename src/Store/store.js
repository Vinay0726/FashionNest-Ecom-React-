import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Import named export
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import adminOrderReducer from "./Admin/Order/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  productData: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  adminOrder:adminOrderReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
