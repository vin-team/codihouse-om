import React from 'react';

interface SearchHeaderProps {
  keyword: string;
  totalResults: number;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ keyword, totalResults }) => {
  return (
    <div className='flex flex-row justify-between items-center'>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kết quả tìm kiếm</h1>
        <p className="text-gray-600">Tìm kiếm cho "{keyword}"</p>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">{totalResults}</div>
        <div className="text-sm text-gray-600">Kết quả</div>
      </div>
    </div>
  );
};

export default SearchHeader;