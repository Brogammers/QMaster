'use client'

import { useState } from 'react';
import { 
  FaStore, FaHospital, FaUniversity, FaLandmark, FaShoppingBag, 
  FaCode, FaIndustry, FaPlane, FaHotel, FaUtensils, FaCar,
  FaGraduationCap, FaFootballBall, FaPaintBrush, FaMusic,
  FaPlus, FaSearch, FaEdit, FaTrash 
} from 'react-icons/fa';
import AddCategoryModal from '@/components/admin/AddCategoryModal';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  partnersCount: number;
  status: 'active' | 'inactive';
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
  entertainment: FaMusic
};

export default function CategoriesPage() {
  const [isDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Healthcare',
      description: 'Medical facilities and healthcare services',
      icon: 'hospital',
      partnersCount: 45,
      status: 'active',
    },
    {
      id: 2,
      name: 'Education',
      description: 'Educational institutions and services',
      icon: 'university',
      partnersCount: 32,
      status: 'active',
    },
    {
      id: 3,
      name: 'Technology',
      description: 'Software and technology companies',
      icon: 'code',
      partnersCount: 28,
      status: 'active',
    }
  ]);

  const handleAddCategory = (categoryData: Omit<Category, 'id' | 'partnersCount'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: categories.length + 1,
      partnersCount: 0 // New categories start with 0 partners
    };
    setCategories(prev => [...prev, newCategory]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Categories</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = ICON_MAP[category.icon as keyof typeof ICON_MAP] || FaStore;
          return (
            <div 
              key={category.id} 
              className={`${isDarkMode ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-white border-slate-200'} 
                border rounded-xl p-6 hover:bg-opacity-[0.04] hover:border-opacity-80 transition-all`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-crystal-blue/20' : 'bg-crystal-blue/10'} text-crystal-blue`}>
                    <IconComponent />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{category.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>{category.partnersCount} partners</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className={`p-2 hover:bg-white/[0.05] rounded-lg ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                    <FaEdit />
                  </button>
                  <button className="p-2 hover:bg-white/[0.05] rounded-lg text-rose-400">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>{category.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  category.status === 'active' 
                    ? isDarkMode ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-500/20 text-emerald-700'
                    : isDarkMode ? 'bg-rose-500/10 text-rose-300' : 'bg-rose-500/20 text-rose-700'
                }`}>
                  {category.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDarkMode={isDarkMode}
        onSubmit={handleAddCategory}
      />
    </div>
  );
} 