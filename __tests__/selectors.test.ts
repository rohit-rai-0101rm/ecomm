import { selectCartCount, selectCartTotal } from '../src/store/selectors';
import type { RootState } from '../src/store/store';

const product = (id: number, price: number) => ({
  id,
  title: '',
  price,
  description: '',
  category: '',
  image: '',
  rating: { rate: 0, count: 0 },
});

const state = {
  cart: {
    items: [
      { product: product(1, 10), quantity: 2 },
      { product: product(2, 5.5), quantity: 3 },
    ],
  },
} as unknown as RootState;

describe('cart selectors', () => {
  it('counts total items', () => {
    expect(selectCartCount(state)).toBe(5);
  });

  it('sums total amount', () => {
    expect(selectCartTotal(state)).toBeCloseTo(36.5);
  });
});
