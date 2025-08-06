'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Search } from 'lucide-react';
import SearchHeader from '@/components/search/SearchHeader';
import SearchOrder from '@/components/search/SearchOrder';
import SearchCustomer from '@/components/search/SearchCustomer';

interface SearchResultProps { }

export interface OrderResult {
  orderId: string;
  source: 'SHOPIFY' | 'SAPO';
  status: 'completed' | 'pending';
  customerName: string;
  phone: string;
  products: string[];
  orderDate: string;
  totalAmount: string;
  productCount: number;
}

export interface CustomerResult {
  name: string;
  code: string;
  phone: string;
  email: string;
  group: string;
  totalSpending: string;
  orders: number;
  points: number;
  lastPurchase?: string;
}

const SearchResultPage: React.FC<SearchResultProps> = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchResults, setSearchResults] = useState<{
    orders: OrderResult[];
    customers: CustomerResult[];
  }>({ orders: [], customers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(keyword);
    if (keyword) {
      const mockSearchResults = {
        orders: [
          {
            orderId: "#SP-123",
            source: "SAPO" as const,
            status: "completed" as const,
            customerName: "Trần Thị Bình",
            phone: "0901234567",
            products: [
              "Ốp lưng kèm ví - Flip Cover IPhone 16 Pro Max... (1)",
              "Túi đeo chéo dạng hộp Unisex - SOWER M (1)"
            ],
            orderDate: "2024-01-15",
            totalAmount: "26.010.000₫",
            productCount: 2
          },
          {
            orderId: "#ORD-003",
            source: "SHOPIFY" as const,
            status: "completed" as const,
            customerName: "Hoàng Văn Em",
            phone: "0901234567",
            products: ["Ví Dài Meron L - Lethnic (1)"],
            orderDate: "2024-01-15",
            totalAmount: "14.300.000₫",
            productCount: 2
          }
        ],
        customers: [
          {
            name: "Nguyễn Văn An",
            code: "CUSN12185",
            phone: "0904500014",
            email: "trantientoan@email.com",
            group: "Bán lẻ",
            totalSpending: "979.000₫",
            orders: 2,
            points: 97
          },
          {
            name: "Nguyễn Thị Lan",
            code: "CUSN12186",
            phone: "0987654321",
            email: "nguyenthilan@email.com",
            group: "Bán sỉ",
            totalSpending: "1.250.000₫",
            orders: 5,
            points: 245,
            lastPurchase: "2024-01-18"
          }
        ]
      };

      setSearchResults(mockSearchResults);
      setLoading(false);
    }
  }, [keyword]);

  const totalResults = searchResults.orders.length + searchResults.customers.length;

  if (loading) {
    return (
      <Layout>
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <SearchHeader keyword={keyword as string} totalResults={totalResults} />
        {searchResults.orders.length > 0 && <SearchOrder orders={searchResults.orders} />}
        {searchResults.customers.length > 0 && <SearchCustomer customers={searchResults.customers} />}

        {totalResults === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kết quả</h3>
            <p className="text-gray-600">
              Không có kết quả nào cho từ khóa "{keyword}". Vui lòng thử từ khóa khác.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResultPage; 