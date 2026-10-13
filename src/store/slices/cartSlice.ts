import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartEntry, Product } from '../../types/product';

export interface CartState {
  items: CartEntry[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>,
    ) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find(i => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find(i => i.product.id === action.payload);
      if (existing) {
        existing.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find(i => i.product.id === action.payload);
      if (!existing) {
        return;
      }
      if (existing.quantity <= 1) {
        state.items = state.items.filter(i => i.product.id !== action.payload);
      } else {
        existing.quantity -= 1;
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.product.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
