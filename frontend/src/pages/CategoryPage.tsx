import { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import { Button, Modal } from "../vibes";
import { CategoryTable } from "../components/CategoryTable";
import { createCategory, fetchCategories } from "../services/category.repository";
import { Category, CategoryFormData, PagiantedRepsonse, PaginationContorls } from "../types";
import { CategoryForm } from "../components/CategoryForm";


const CategoryPage: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationContorls>({
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_pages: 1,
    total_count: 1
  });

  const pageStyle: React.CSSProperties = {
    padding: "48px 64px",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    justifyContent: "space-between",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "40px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
    margin: 0,
    flexShrink: 0,
  };

  const loadingStyle: React.CSSProperties = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "48px",
      fontSize: "18px",
      color: COLORS.secondary.s08,
    };
  


  const fetchCategoriesData = async () => {
    try {
      setLoading(true);
      const data: PagiantedRepsonse<Category[]> = await fetchCategories({page: pagination.current_page})
      setCategories(data.data.content);
      setPagination(data.data.pagination)
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      await fetchCategoriesData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating expense:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCategoriesData()
  }, [pagination.current_page])

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Category</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Add Category
        </Button>
      </div>

      {
        loading ? (<div style={loadingStyle}>Loading...</div>) :
        <CategoryTable pagination={pagination} setPagination={setPagination} fetchCategories={fetchCategoriesData} categories={categories} oncategoriesUpdated={() => setIsModalOpen(false)} />
      }

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryForm
          onSubmit={handleAddExpense}
          onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default CategoryPage
