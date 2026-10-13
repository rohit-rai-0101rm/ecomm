import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/productApi';
import { Product } from '../../types/product';
import { getErrorMessage } from '../../utils/errors';

export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ProductsState {
  items: Product[];
  status: LoadStatus;
  refreshing: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  refreshing: false,
  error: null,
};

export const loadProducts = createAsyncThunk<
  Product[],
  { refresh?: boolean } | undefined,
  { rejectValue: string }
>('products/load', async (_arg, { rejectWithValue }) => {
  try {
    return await fetchProducts();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, (state, action) => {
        state.error = null;
        if (action.meta.arg?.refresh) {
          state.refreshing = true;
        } else {
          state.status = 'loading';
        }
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.refreshing = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.refreshing = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export default productsSlice.reducer;
