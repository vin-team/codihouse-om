import { LoaderCircle } from 'lucide-react';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className='absolute w-full h-full flex justify-center items-center'>
      <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
    </div>
  );
};

export default Loading;