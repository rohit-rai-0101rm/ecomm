import { Product } from '../types/product';
import { apiClient } from './client';
import { endpoints } from './endpoints';

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(endpoints.products);
  return data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(endpoints.product(id));
  return data;
}
