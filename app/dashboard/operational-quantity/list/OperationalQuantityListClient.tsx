"use client"

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import { format } from 'date-fns';

interface ISizeData {
  size: string;
  quantity: number;
  percent: number;
}

interface IOperationalQuantity {
  id: string;
  set_id: string;
  set_name: string;
  sizes: ISizeData[];
  total_quantity: number;
  created_at: string;
}

export default function OperationalQuantityListClient() {
  const [data, setData] = useState<IOperationalQuantity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/operational-quantity/list');
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || '데이터 조회 실패');
      setData(result.data);
    } catch (err) {
      console.error('데이터 조회 중 오류:', err);
      setError(err instanceof Error ? err.message : '데이터 로딩 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/operational-quantity/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      fetchData();
      alert('삭제되었습니다.');
    } catch (error) {
      console.error('삭제 중 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">에러: {error}</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              등록일자
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              시간
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상품명
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              세트품번
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[800px]">
              사이즈별 수량
            </th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              총 수량
            </th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
              관리
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="">
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {format(new Date(item.created_at), 'yyyy-MM-dd')}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {format(new Date(item.created_at), "HH:mm")}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{item.set_name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600">{item.set_id}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2 min-w-[800px]">
                  {item.sizes.map((sizeData, index) => (
                    <div 
                      key={index} 
                      className="flex-1 flex flex-col items-center bg-blue-50 rounded-lg p-2 shadow-sm "
                    >
                      <div className="text-lg font-bold text-gray-900 mb-2">
                        {sizeData.size}

                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-medium text-gray-700">
                          {sizeData.quantity.toLocaleString()}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {sizeData.percent}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-700">
                    {item.total_quantity.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">총계</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          등록된 운영수량 데이터가 없습니다.
        </div>
      )}
    </div>
  );
} 