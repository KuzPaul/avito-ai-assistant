import { get, put } from "./clients.ts";
import type { ItemsResponse, Item } from "../types/index.ts";

// Получить список объявлений
export const getItems = (params: {
  q?: string;
  categories?: string;
  needsRevision?: boolean;
  sortColumn?: "title" | "createdAt";
  sortDirection?: "asc" | "desc";
  limit?: number;
  skip?: number;
}) => {
  return get<ItemsResponse>("/items", params);
};

// Получить одно объявление
export const getItemById = (id: string) => {
  return get<Item>(`/items/${id}`);
};

// Обновить объявление
export const updateItem = (id: string, data: Partial<Item>) => {
  return put<Item>(`/items/${id}`, data);
};
