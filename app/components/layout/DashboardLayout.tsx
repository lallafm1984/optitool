import React from 'react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 왼쪽 사이드바 - 너비 축소 */}
      <div className="w-48 bg-white shadow-lg">
        <div className="p-3">
          <h1 className="text-lg font-bold">관리자 대시보드</h1>
        </div>
        <nav className="mt-2">
          <ul className="space-y-1">
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link href="/">대시보드</Link>
            </li>
            <li className="px-3 py-2">
              <div>
                <span>상품 관리</span>
                <ul className="ml-3 mt-1 space-y-1">
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/products/register">상품등록</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/products/list">상품목록</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/sets/list">세트목록</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/products/categories">카테고리 설정</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="px-3 py-2">
              <div>
                <span>판매 관리</span>
                <ul className="ml-3 mt-1 space-y-1">
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/channels/list">판매채널</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/sales/plans/list">판매계획</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/sales/performance">판매실적 등록</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/sales/performance/list">판매실적 목록</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="px-3 py-2">
              <div>
                <span>통계</span>
                <ul className="ml-3 mt-1 space-y-1">
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/statistics/sales">상품별 통계</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/statistics/sales">채널별 통계</Link>
                  </li>
                  <li className="px-2 py-1 hover:bg-gray-100">
                    <Link href="/dashboard/statistics/sales">아소트 통계</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* 오른쪽 메인 컨텐츠 */}
      <div className="flex-1 overflow-auto">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 