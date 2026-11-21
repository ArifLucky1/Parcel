import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const fetchMyOrders = createAsyncThunk("order/orders/me", async(_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/order/orders/me");
    return res.data.myOrders;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.res.data.message)
  }
})


const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    fetchingOrders: false,
    placingOrder: false,
    finalPrice: null,
    orderStep: 1,
    paymentIntent: "",
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default orderSlice.reducer;
export const {} = orderSlice.actions;