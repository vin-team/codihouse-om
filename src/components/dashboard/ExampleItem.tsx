import React from 'react';

interface ExampleItemProps {
  key: number;
  title: string;
  content: string;
}

const ExampleItem: React.FC<ExampleItemProps> = ({ key, title, content }) => {
  return (
    <div className='flex flex-col space-y-1 border border-gray-200 rounded-lg p-4 bg-white justify-center items-center'>
      <p className='text-lg font-bold'>{title}</p>
      <p className='text-sm text-gray-500'>{content}</p>
    </div>
  );
};

export default ExampleItem;