import React from 'react';
import CustomerItem from './CustomerItem';

interface CustomerListProps { }

const CustomerList: React.FC<CustomerListProps> = ({ }) => {
  const customers = [
    {
      name: 'Nguyễn Văn Tươi',
      code: 'CUSN121990',
      phone: '0904762101',
      email: 'nguyenvantuoi99@email.com',
      group: 'Bán sỉ',
      totalSpend: 979000,
      orders: 2,
      points: 97,
      lastPurchase: '2025-06-15',
    },
    {
      name: 'Nguyễn Thị Lan',
      code: 'CUSN12186',
      phone: '0987654321',
      email: 'nguyenthilian@email.com',
      group: 'Bán sỉ',
      totalSpend: 1250000,
      orders: 5,
      points: 245,
      lastPurchase: '2024-01-18',
    },
    {
      name: 'Lê Minh Cường',
      code: 'CUSN12187',
      phone: '0912345678',
      email: 'leminhcuong@email.com',
      group: 'Bán lẻ',
      totalSpend: 31310000,
      orders: 1,
      points: 156,
      lastPurchase: '2024-01-14',
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({customers.length} khách hàng)</h2>
      </div>

      <div className="p-6 space-y-4">
        {customers.map((customer, index) => (
          <CustomerItem
            key={index}
            name={customer.name}
            code={customer.code}
            phone={customer.phone}
            email={customer.email}
            group={customer.group}
            totalSpend={customer.totalSpend}
            orders={customer.orders}
            points={customer.points}
            lastPurchase={customer.lastPurchase} />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;