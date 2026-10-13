import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotal = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
);

export const selectQuantityInCart = (productId: number) => (state: RootState) =>
  state.cart.items.find(i => i.product.id === productId)?.quantity ?? 0;
