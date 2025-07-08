import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Navbar */}
            <Navbar toggleSidebar={toggleSidebar} />
            
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            
            {/* Main Content */}
            <main className={`
                pt-20 px-4 md:px-6 lg:px-8 
                transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}
                min-h-[calc(100vh-5rem)]
            `}>
                {/* Container with nice shadow and animation */}
                <div className="
                    bg-white rounded-xl shadow-sm
                    border border-gray-200
                    min-h-[calc(100vh-6rem)]
                    p-4 md:p-6
                    transition-all duration-200
                    hover:shadow-md
                    hover:border-gray-300
                ">
                    {children}
                </div>
                
                {/* Subtle decorative elements */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -z-10 blur-3xl"></div>
                <div className="absolute top-1/4 left-0 w-48 h-48 bg-purple-400/10 rounded-full -z-10 blur-3xl"></div>
            </main>
            
            {/* Floating Action Button for mobile */}
            {!sidebarOpen && (
                <button 
                    onClick={toggleSidebar}
                    className="
                        fixed bottom-6 left-6 z-30
                        md:hidden
                        p-3 bg-gradient-to-br from-blue-500 to-purple-600
                        rounded-full shadow-lg
                        text-white
                        transition-all
                        hover:scale-110
                        hover:shadow-xl
                        active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Layout;