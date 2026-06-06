import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  count: number;
}

interface Action {
  payload: number;
  type: string;
}

const initialState: CartState = {
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
    },
    decrementCount: (state) => {
      state.count -= 1;
    },
    setCount: (state, action: Action) => {
      state.count = action.payload;
    },
  },
});

export const { incrementCount, decrementCount, setCount } = cartSlice.actions;
export default cartSlice.reducer;
