import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistState {
  ids: number[];
}

const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<number>) {
      const index = state.ids.indexOf(action.payload);
      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
