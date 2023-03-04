import { configureStore } from "@reduxjs/toolkit";

// Define the initial state of the store
const initialState = {
  token: "",
  expiry: null,
};

// Define the reducer function
function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        expiry: action.payload.expiry,
      };
    default:
      return state;
  }
}

// Create the Redux store with the reducer function and any desired middleware
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // Additional middleware can be added here, such as redux-thunk
  ],
});

export default store;
