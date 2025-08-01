import Layout from '@/components/dashboard/Layout';
import React from 'react';

interface dashboardProps {
  // Define props here
}

const dashboard: React.FC<dashboardProps> = ({ }) => {
  return (
    <Layout
      children={
        <div>
          <h1>Welcome to Dashboard</h1>
          <p>This is the page of dashboard .</p>
        </div>
      } />
  );
};

export default dashboard;