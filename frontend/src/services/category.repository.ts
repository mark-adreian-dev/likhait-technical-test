/**
 * API service for communicating with the backend
 */

import { ApiResponse, Category, CategoryFormData, PagiantedRepsonse, PaginationParams } from "../types";

const API_BASE_URL = "http://localhost:3000/api";


/**
 * Fetch categories for a specific year and month
 */
export async function getCategories(
  year: number,
  month: number,
): Promise<Category[]> {
  const response = await fetch(
    `${API_BASE_URL}/categories?year=${year}&month=${month}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

/**
 * Fetch all categories
 */
export async function fetchCategories(params: PaginationParams): Promise<PagiantedRepsonse<Category[]>
  > {
  
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.append("page", params.page.toString());
  }

  if (params?.limit) {
    searchParams.append("limit", params.limit.toString());
  }

  if (params?.sort_by) {
    searchParams.append("sort_by", params.sort_by);
  }

  if (params?.order) {
    searchParams.append("order", params.order);
  }

  if (params?.query) {
    searchParams.append("query", params.query);
  }

  const url = `${API_BASE_URL}/categories${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

/**
 * Create a new Category
 */
export async function createCategory(data: CategoryFormData): Promise<ApiResponse<Category>> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create Category");
  }

  return response.json();
}

/**
 * Update an existing Category
 */
export async function updateCategory(
  id: number,
  data: Partial<CategoryFormData>,
): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update Category");
  }

  return response.json();
}

/**
 * Delete an Category
 */
export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete Category");
  }
}
