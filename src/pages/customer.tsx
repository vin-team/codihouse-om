import Layout from '@/components/dashboard/Layout';
import React from 'react';

const Customer: React.FC = () => {
  return (
    <Layout
      children={
        <div>
          <h1>Welcome to Customer list</h1>
          <p>This is the page of managing your customer.</p>
        </div>
      } />

  );
};

export default Customer;