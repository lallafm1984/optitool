'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/app/components/layout/DashboardLayout';
import { supabase } from '@/utils/supabase';

interface Category {
  id: number;
  category_name: string;
}

interface Props {
  initialCategories: Category[];
}

export default function CategoryClient({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      setError('카테고리명을 입력해주세요.');
      return;
    }

    try {
      const { data, error: submitError } = await supabase
        .from('product_categories')
        .insert([{ category_name: newCategory.trim() }])
        .select()
        .single();

      if (submitError) throw submitError;

      setCategories([...categories, data]);
      setNewCategory('');
      setError('');
    } catch (err: any) {
      if (err.code === '23505') {
        setError('이미 존재하는 카테고리입니다.');
      } else {
        setError('카테고리 추가 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('이 카테고리를 삭제하시겠습니까?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('product_categories')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      alert('카테고리 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">카테고리 관리</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">카테고리 목록</h2>
          
          <div className="mb-6">
            <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
              {categories.map(category => (
                <React.Fragment key={category.id}>
                  <div className="px-4 py-2 bg-gray-50 rounded">
                    {category.category_name}
                  </div>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                새 카테고리
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="카테고리명 입력"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  추가
                </button>
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
} 