import reducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../src/store/slices/cartSlice';
import { Product } from '../src/types/product';

const make = (id: number, price = 10): Product => ({
  id,
  title: `Product ${id}`,
  price,
  description: '',
  category: 'test',
  image: '',
  rating: { rate: 4, count: 1 },
});

const empty = { items: [] };

describe('cartSlice', () => {
  it('adds a new product with quantity 1', () => {
    const state = reducer(empty, addToCart({ product: make(1) }));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('does not duplicate and merges quantity for an existing product', () => {
    let state = reducer(empty, addToCart({ product: make(1) }));
    state = reducer(state, addToCart({ product: make(1), quantity: 3 }));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(4);
  });

  it('increases quantity', () => {
    let state = reducer(empty, addToCart({ product: make(1) }));
    state = reducer(state, increaseQuantity(1));
    expect(state.items[0].quantity).toBe(2);
  });

  it('decreases quantity and removes the item at zero', () => {
    let state = reducer(empty, addToCart({ product: make(1), quantity: 2 }));
    state = reducer(state, decreaseQuantity(1));
    expect(state.items[0].quantity).toBe(1);
    state = reducer(state, decreaseQuantity(1));
    expect(state.items).toHaveLength(0);
  });

  it('removes a product', () => {
    let state = reducer(empty, addToCart({ product: make(1) }));
    state = reducer(state, addToCart({ product: make(2) }));
    state = reducer(state, removeFromCart(1));
    expect(state.items.map(i => i.product.id)).toEqual([2]);
  });

  it('clears the cart', () => {
    let state = reducer(empty, addToCart({ product: make(1) }));
    state = reducer(state, clearCart());
    expect(state.items).toHaveLength(0);
  });
});
