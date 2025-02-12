"use client";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaStore,
  FaHospital,
  FaUniversity,
  FaLandmark,
  FaShoppingBag,
  FaCode,
  FaIndustry,
  FaPlane,
  FaHotel,
  FaUtensils,
  FaCar,
  FaGraduationCap,
  FaFootballBall,
  FaPaintBrush,
  FaMusic,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUndo,
} from "react-icons/fa";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import { CategoriesContext } from "../../context";
import axios from "axios";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../layout";

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: any;
  partnersCount: number;
  status: "active" | "inactive";
}

const ICON_MAP = {
  store: FaStore,
  hospital: FaHospital,
  university: FaUniversity,
  landmark: FaLandmark,
  shopping: FaShoppingBag,
  code: FaCode,
  industry: FaIndustry,
  travel: FaPlane,
  hotel: FaHotel,
  restaurant: FaUtensils,
  automotive: FaCar,
  education: FaGraduationCap,
  sports: FaFootballBall,
  arts: FaPaintBrush,
  entertainment: FaMusic,
};

export default function CategoriesPage() {
  const [isDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { categories, setCategories } = useContext(CategoriesContext);

  const handleAddCategory = (
    categoryData: Omit<Category, "id" | "partnersCount">
  ) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_CATEGORIES || "";
    axios
      .post(url, {
        name: categoryData.name,
        description: categoryData.description,
        status: categoryData.status,
      })
      .then((response) => {
        if (response.status === 201) {
          return response.data.category;
        } else {
          throw new Error("Failed to create category");
        }
      })
      .then((data) => {
        const newCategory: Category = {
          id: data.id,
          name: data.name,
          description: data.description,
          icon: FaSearch,
          partnersCount: data.partnersCount,
          status: data.status,
        };
        setCategories((prev) => [...prev, newCategory]);

        toast.success("Category added successfully", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      })
      .catch(() => {
        toast.error("Failed to add category", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = (
    categoryData: Omit<Category, "id" | "partnersCount">
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === editingCategory?.id ? { ...cat, ...categoryData } : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: number) => {
    const categoryToDelete = categories.find((cat) => cat.id === categoryId);
    if (!categoryToDelete) return;

    var shouldHandleRemove = true;

    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    toast.success(
      (t) => (
        <div className="flex items-center gap-2">
          <span>Deletion in progress</span>
          <button
            onClick={() => {
              setCategories((prev) => [...prev, categoryToDelete]);
              toast.dismiss(t.id);
              shouldHandleRemove = false;
            }}
            className="px-2 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1"
          >
            <FaUndo />
            <span>Undo</span>
          </button>
        </div>
      ),
      {
        duration: 5000,
        style: {
          background: "#1e293b",
          color: "#fff",
        },
      }
    );

    const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_CATEGORIES || "";
    setTimeout(() => {
      if (!shouldHandleRemove) return;

      axios
        .delete(url, { data: { id: categoryId, name: categoryToDelete.name } })
        .then((response) => {
          if (response.status !== 204) {
            throw new Error("Failed to delete category");
          }
        })
        .catch(() => {
          setCategories((prev) => [...prev, categoryToDelete]);
          toast.error("Failed to delete category", {
            duration: 5000,
            style: {
              background: "#17222D",
              color: "#FFF",
            },
          });
        });
    }, 6000);
  };

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_CATEGORIES || "";

    axios
      .get(`${url}?page=${DEFAULT_PAGE}&per-page=${DEFAULT_PER_PAGE}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.categories.content;
        } else {
          throw new Error("Failed to fetch categories");
        }
      })
      .then((data) => {
        const categories = data.map((category: any) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          icon: FaSearch,
          partnersCount: category.partnersCount,
          status: category.status,
        }));

        setCategories(categories);
      })
      .catch((error) => {
        toast.error(error.message, {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Categories
        </h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent =
            ICON_MAP[category.icon as keyof typeof ICON_MAP] || FaStore;
          return (
            <div
              key={category.id}
              className={`${
                isDarkMode
                  ? "bg-white/[0.02] border-white/[0.05]"
                  : "bg-white border-slate-200"
              } 
                border rounded-xl p-6 hover:bg-opacity-[0.04] hover:border-opacity-80 transition-all`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "bg-crystal-blue/20" : "bg-crystal-blue/10"
                    } text-crystal-blue`}
                  >
                    <IconComponent />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {category.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      {category.partnersCount} partners
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className={`p-2 hover:bg-white/[0.05] rounded-lg ${
                      isDarkMode ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 hover:bg-white/[0.05] rounded-lg text-rose-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-white/70" : "text-slate-600"
                }`}
              >
                {category.description}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    category.status === "active"
                      ? isDarkMode
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-emerald-500/20 text-emerald-700"
                      : isDarkMode
                      ? "bg-rose-500/10 text-rose-300"
                      : "bg-rose-500/20 text-rose-700"
                  }`}
                >
                  {category.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        isDarkMode={isDarkMode}
        onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
        initialData={editingCategory}
      />
    </div>
  );
}
