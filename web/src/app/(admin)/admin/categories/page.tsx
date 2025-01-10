'use client'

import { useState } from 'react';
import { FaStore, FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

interface Category {
  id: number;
  name: string;
  description: string;
  partnersCount: number;
  status: 'active' | 'inactive';
}

export default function CategoriesPage() {
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: 'Healthcare',
      description: 'Medical facilities and healthcare services',
      partnersCount: 45,
      status: 'active',
    },
    // Add more categories
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90">
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-crystal-blue/10 text-crystal-blue">
                  <FaStore />
                </div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-white/50">{category.partnersCount} partners</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/[0.05] rounded-lg">
                  <FaEdit className="text-white/70" />
                </button>
                <button className="p-2 hover:bg-white/[0.05] rounded-lg">
                  <FaTrash className="text-rose-400" />
                </button>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-4">{category.description}</p>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${
                category.status === 'active' 
                  ? 'bg-emerald-500/10 text-emerald-300' 
                  : 'bg-rose-500/10 text-rose-300'
              }`}>
                {category.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 