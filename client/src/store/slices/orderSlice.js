import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const fetchMyOrders = createAsyncThunk(
  "order/orders/me",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/order/orders/me");
      return res.data.myOrders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data.message);
    }
  },
);

export const placeOrder = createAsyncThunk(
  "order/new",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/order/new", data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(
        error.reponse.data.message || "Failed to place order, try again.",
      );
      return thunkAPI.rejectWithValue(error.res.data.message);
    }
  },
);

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
  reducers: {
    toggleOrderStep(state) {
      state.orderStep = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.fetchingOrders = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.fetchingOrders = false;
      })

      .addCase(palceOrders.pending, (state) => {
        state.placingOrder = true;
      })
      .addCase(palceOrders.fulfilled, (state) => {
        state.placingOrder = false;
        state.finalPrice = action.payload.total_price;
        state.paymentIntent = action.payload.paymentIntent;
        state.orderStep = 2;
      })
      .addCase(palceOrders.rejected, (state) => {
        state.placingOrder = false;
      });
  },
});

export default orderSlice.reducer;
export const { toggleOrderStep } = orderSlice.actions;
