import { ReactNode } from "react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: React.FC<LayoutProps> = (props) => {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-screen px-10">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Brand and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Brand/Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OM</span>
                </div>
                <span className="text-xl font-bold text-gray-900">OrderManager</span>
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-6">
                {/* Dashboard */}
                <button
                  onClick={() => router.push('/dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard')
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 6.00016L8.25 1.3335L14.25 6.00016V13.3335C14.25 13.6871 14.1095 14.0263 13.8595 14.2763C13.6094 14.5264 13.2703 14.6668 12.9167 14.6668H3.58333C3.22971 14.6668 2.89057 14.5264 2.64052 14.2763C2.39048 14.0263 2.25 13.6871 2.25 13.3335V6.00016Z" stroke={`${isActive('/dashboard') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.25 14.6667V8H10.25V14.6667" stroke={`${isActive('/dashboard') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <span className={`text-sm ${isActive('/dashboard') ? 'text-primary-600' : 'text-gray-600'}`}>Dashboard</span>
                </button>

                {/* Orders */}
                <button
                  onClick={() => router.push('/orders')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/orders')
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.38 2.84668L11.38 6.28001" stroke={`${isActive('/orders') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.38 5.33311C14.3798 5.09929 14.318 4.86965 14.201 4.66721C14.084 4.46478 13.9158 4.29668 13.7133 4.17977L9.04667 1.51311C8.84398 1.39608 8.61405 1.33447 8.38001 1.33447C8.14596 1.33447 7.91603 1.39608 7.71334 1.51311L3.04667 4.17977C2.84418 4.29668 2.67599 4.46478 2.55898 4.66721C2.44197 4.86965 2.38024 5.09929 2.38 5.33311V10.6664C2.38024 10.9003 2.44197 11.1299 2.55898 11.3323C2.67599 11.5348 2.84418 11.7029 3.04667 11.8198L7.71334 14.4864C7.91603 14.6035 8.14596 14.6651 8.38001 14.6651C8.61405 14.6651 8.84398 14.6035 9.04667 14.4864L13.7133 11.8198C13.9158 11.7029 14.084 11.5348 14.201 11.3323C14.318 11.1299 14.3798 10.9003 14.38 10.6664V5.33311Z" stroke={`${isActive('/orders') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.58002 4.6665L8.38002 7.99984L14.18 4.6665" stroke={`${isActive('/orders') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8.38 14.6667V8" stroke={`${isActive('/orders') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <span className={`text-sm ${isActive('/orders') ? 'text-primary-600' : 'text-gray-600'}`}>Đơn hàng</span>
                </button>

                {/* Customers */}
                <button
                  onClick={() => router.push('/customers')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/customers')
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4766 14V12.6667C11.4766 11.9594 11.1957 11.2811 10.6956 10.781C10.1955 10.281 9.51722 10 8.80998 10H4.80998C4.10273 10 3.42446 10.281 2.92436 10.781C2.42426 11.2811 2.14331 11.9594 2.14331 12.6667V14" stroke={`${isActive('/customers') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.80998 7.33333C8.28274 7.33333 9.47664 6.13943 9.47664 4.66667C9.47664 3.19391 8.28274 2 6.80998 2C5.33722 2 4.14331 3.19391 4.14331 4.66667C4.14331 6.13943 5.33722 7.33333 6.80998 7.33333Z" stroke={`${isActive('/customers') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.4767 13.9998V12.6664C15.4762 12.0756 15.2796 11.5016 14.9176 11.0346C14.5556 10.5677 14.0488 10.2341 13.4767 10.0864" stroke={`${isActive('/customers') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.4767 2.08643C12.0503 2.23329 12.5587 2.56689 12.9218 3.03463C13.2848 3.50237 13.4819 4.07765 13.4819 4.66976C13.4819 5.26187 13.2848 5.83715 12.9218 6.30489C12.5587 6.77262 12.0503 7.10623 11.4767 7.25309" stroke={`${isActive('/customers') ? "#2563eb" : "#4B5563"}`} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span className={`text-sm ${isActive('/customers') ? 'text-primary-600' : 'text-gray-600'}`}>Khách hàng</span>
                </button>
              </nav>
            </div>

            {/* Right side - Search and User */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14 14L11.1333 11.1333" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="block w-64 pl-10 pr-12 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <kbd className="inline-flex items-center px-2 py-1 border border-gray-300 rounded text-xs font-mono text-gray-500 bg-gray-50">
                    ⌘ K
                  </kbd>
                </div>
              </div>

              {/* User/Admin Section */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1066 14V12.6667C11.1066 11.9594 10.8257 11.2811 10.3256 10.781C9.8255 10.281 9.14723 10 8.43998 10H4.43998C3.73274 10 3.05446 10.281 2.55436 10.781C2.05427 11.2811 1.77332 11.9594 1.77332 12.6667V14" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.43998 7.33333C7.91274 7.33333 9.10665 6.13943 9.10665 4.66667C9.10665 3.19391 7.91274 2 6.43998 2C4.96722 2 3.77332 3.19391 3.77332 4.66667C3.77332 6.13943 4.96722 7.33333 6.43998 7.33333Z" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.1066 13.9998V12.6664C15.1061 12.0756 14.9095 11.5016 14.5475 11.0346C14.1855 10.5677 13.6787 10.2341 13.1066 10.0864" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.1066 2.08643C11.6802 2.23329 12.1886 2.56689 12.5517 3.03463C12.9147 3.50237 13.1118 4.07765 13.1118 4.66976C13.1118 5.26187 12.9147 5.83715 12.5517 6.30489C12.1886 6.77262 11.6802 7.10623 11.1066 7.25309" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-black">Quản trị viên</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;