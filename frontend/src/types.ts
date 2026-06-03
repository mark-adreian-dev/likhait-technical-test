/**
 * Type definitions for the Expense Tracking System
 */



export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: string;
  date: string;
}


export interface MonthlySummary {
  totalExpenses: number;
  categoryBreakdown: CategoryBreakdown[];
  topCategories: TopCategory[];
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  percentage: number;
}

export interface TopCategory {
  category: string;
  total: number;
  count: number;
}

export interface DayExpenses {
  day: number;
  expenses: Expense[];
  total: number;
}

export interface Category {
  id: number
  name: string
  is_deleted: boolean
  created_at: Date
  updated_at: Date
}

export interface CategoryFormData {
  name: string;
}

export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface PagiantedRepsonse<T> {
  status: number
  message: string
  data: PaginationContent<T>
}

export interface PaginationContent<T> {
  content: T
  pagination: PaginationContorls
}

export interface PaginationContorls {
  current_page: number,
  next_page: null | number,
  prev_page: null | number,
  total_pages: number,
  total_count: number
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  order?: "asc" | "desc";
  query?: string;
}
