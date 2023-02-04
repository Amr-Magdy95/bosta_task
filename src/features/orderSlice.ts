import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const url = "https://tracking.bosta.co/shipments/track/";
export const getOrder = createAsyncThunk(
  "order/getOrder",
  (orderId: number) => {
    return fetch(url+ orderId)
      .then((resp) =>{
        console.log(resp);
        return resp.json();
      })
      .catch((err) => console.log(err));
  }
);

export interface ValueType {
  provider?: string;
  CurrentStatus?: {
    state: string;
    timestamp: Date;
  };
  PromisedDate?: Date;
  TrackingNumber?: string;
  TrackingURL?: string;
  SupportPhoneNumbers?: Array<string>;
  TransitEvents?: Array<{
    state: string;
    timestamp: Date;
    hub?: string;
    reason?: string;
  }>;
  CreateDate?: Date;
  error?: string
}

export interface OrderState {
  value: ValueType;
  isLoading: boolean;
}

const initialState: OrderState = {
  value: {},
  isLoading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      console.log(action);
      console.log(state);
      state.isLoading = false;
      state.value = action.payload as unknown as ValueType;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default orderSlice.reducer;
