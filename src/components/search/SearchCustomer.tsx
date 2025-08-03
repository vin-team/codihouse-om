'use client';

import { CustomerResult } from '@/pages/search';
import React from 'react';
import SearchCustomerItem from './SearchCustomerItem';

interface SearchCustomerProps {
  customers: CustomerResult[];
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({ customers }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">
          Danh sách khách hàng ({customers.length})
        </h2>
      </div>
      <div className="p-6 space-y-4">
        {customers.map((customer, index) => (
          <SearchCustomerItem key={index} customer={customer} />
        ))}
      </div>
    </div>
    // <div className="space-y-4">
    //   <h2 className="text-lg font-semibold text-gray-900">
    //     Danh sách khách hàng ({searchResults.customers.length})
    //   </h2>
    //   <div className="space-y-4">
    //     {searchResults.customers.map((customer, index) => (
    //       <Card key={index} className="p-4">
    //         <CardContent className="p-0">
    //           <div className="flex justify-between items-start">
    //             <div className="flex-1 space-y-3">
    //               {/* Header */}
    //               <div className="flex items-center gap-3">
    //                 <span className="font-medium text-gray-900">{customer.name}</span>
    //                 <Badge variant="secondary" className="text-xs">
    //                   {customer.code}
    //                 </Badge>
    //               </div>

    //               {/* Contact Info */}
    //               <div className="flex items-center gap-4 text-sm text-gray-600">
    //                 <div className="flex items-center gap-1">
    //                   <Phone className="h-4 w-4" />
    //                   <span>{customer.phone}</span>
    //                 </div>
    //                 <div className="flex items-center gap-1">
    //                   <Mail className="h-4 w-4" />
    //                   <span>{customer.email}</span>
    //                 </div>
    //               </div>

    //               {/* Details */}
    //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
    //                 <div>
    //                   <span className="font-medium">Nhóm:</span> {customer.group}
    //                 </div>
    //                 <div>
    //                   <span className="font-medium">Tổng chi tiêu:</span> {customer.totalSpending}
    //                 </div>
    //                 <div>
    //                   <span className="font-medium">Đơn hàng:</span> {customer.orders}
    //                 </div>
    //                 <div>
    //                   <span className="font-medium">Điểm tích lũy:</span> {customer.points}
    //                 </div>
    //               </div>

    //               {/* Last Purchase */}
    //               {customer.lastPurchase && (
    //                 <div className="text-sm text-gray-600">
    //                   <span className="font-medium">Mua cuối:</span> {customer.lastPurchase}
    //                 </div>
    //               )}
    //             </div>

    //             <Button
    //               variant="outline"
    //               size="sm"
    //               onClick={() => handleViewCustomer(customer.code)}
    //               className="flex items-center gap-2 ml-4"
    //             >
    //               <Eye className="h-4 w-4" />
    //               Xem
    //             </Button>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>
    // </div>

  );
};

export default SearchCustomer;