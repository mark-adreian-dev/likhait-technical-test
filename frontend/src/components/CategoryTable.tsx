/**
 * Calendar categories table component
 */

import React, { Dispatch, SetStateAction, useState } from "react";
import { Category, CategoryFormData, PaginationContorls } from "../types";
import { formatDate } from "../utils/expenseUtils.ts";
import { COLORS } from "../constants/colors";
import { Button, Modal, Pagination } from "../vibes";
import { CategoryForm } from "./CategoryForm.tsx";
import { deleteCategory, updateCategory } from "../services/category.repository.ts";

interface CalendarcategoriesTableProps {
  categories: Category[];
  oncategoriesUpdated: () => void;
  fetchCategories: () => void;
  pagination: PaginationContorls
  setPagination: Dispatch<SetStateAction<PaginationContorls>>
}

const ITEMS_PER_PAGE = 10;

export function CategoryTable({
  categories,
  pagination,
  setPagination,
  fetchCategories, // I include fetchCategories to recreate what TanStack query do after mutation instead handling instead of handling data state locally
  oncategoriesUpdated,
}: CalendarcategoriesTableProps) {
  const [EditingCategories, setEditingCategories] = useState<Category | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingcategories, setDeletingcategories] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const handleEdit = (categories: Category) => {
    setEditingCategories(categories);
    setIsEditModalOpen(true);
  };

  const handleDelete = (categories: Category) => {
    setDeletingcategories(categories);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingcategories) return;
    try {
      await deleteCategory(deletingcategories.id);
      setIsDeleteModalOpen(false);
      setDeletingcategories(null);
      oncategoriesUpdated();
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete categories:", error);
      alert("Failed to delete categories");
    }
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (!EditingCategories) return;
    try {
      await updateCategory(EditingCategories.id, data);
      setIsEditModalOpen(false);
      setEditingCategories(null);
      fetchCategories();
      oncategoriesUpdated();
    } catch (error) {
      console.error("Failed to update categories:", error);
      throw error;
    }
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: COLORS.background.main,
    borderRadius: "0.5rem",
    overflow: "hidden",
    border: `1px solid ${COLORS.border}`,
  };

  const theadStyle: React.CSSProperties = {
    backgroundColor: COLORS.background.card,
  };

  const thStyle: React.CSSProperties = {
    padding: "0.75rem",
    textAlign: "left",
    fontWeight: 600,
    color: COLORS.text.primary,
    borderBottom: `2px solid ${COLORS.border}`,
  };

  const tdStyle: React.CSSProperties = {
    padding: "0.75rem",
    borderBottom: `1px solid ${COLORS.border}`,
    color: COLORS.text.primary,
  };

  const emptyStyle: React.CSSProperties = {
    padding: "2rem",
    textAlign: "center",
    color: COLORS.text.secondary,
  };

  const actionButtonsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
  };

  if (categories.length === 0) {
    return (
      <div style={tableStyle}>
        <div style={emptyStyle}>
          No categoriess found. Add your first categories to get started!
        </div>
      </div>
    );
  }

  return (
    <>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Date Created</th>
            <th style={thStyle}>Category Name</th>
            <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td style={tdStyle}>{formatDate(new Date(category.created_at))}</td>
              <td style={tdStyle}>{category.name}</td>
             
              <td style={{ ...tdStyle, textAlign: "center" }}>
                <div style={actionButtonsStyle}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(category)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={() => {}}
        setPagination={setPagination}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategories(null);
        }}
        title="Edit categories"
      >
        {EditingCategories && (
          <CategoryForm
            initialData={{
              name: EditingCategories.name,
            }}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingCategories(null);
            }}
            submitLabel="Update categories"
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingcategories(null);
        }}
        title="Delete categories"
      >
        <div style={{ padding: "1rem 0" }}>
          <p style={{ marginBottom: "1.5rem", color: COLORS.text.primary }}>
            Are you sure you want to delete this category?
          </p>
          {deletingcategories && (
            <p style={{ marginBottom: "1.5rem", color: COLORS.text.secondary }}>
              <strong>{deletingcategories.name}</strong> -{" "}
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingcategories(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
