import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-row justify-center items-center">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <span className="text-xl font-bold">OrderManager</span>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;