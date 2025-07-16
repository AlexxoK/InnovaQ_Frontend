import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Home, Bell, UserCircle, HelpCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { useLogout as logoutHandler } from '../../shared/hooks/useLogout';
import './navbar.css'

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    Swal.fire({
      title: 'Cerrando sesión',
      text: '¿Estás seguro que deseas salir?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      background: '#1f2937',
      color: '#fff',
      backdrop: 'rgba(0,0,0,0.8)'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión exitosamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff'
        }).then(() => {
          localStorage.clear();
          sessionStorage.clear();
          logoutHandler();
          navigate('/');
        });
      }
    });
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-xl fixed w-full z-10 border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:rotate-12"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-blue-400" />
          </button>
          
          <a
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              {user?.role === 'ADMIN' ? 'Innovaciones Químicas y Servicios Administración' : 'Innovaciones Químicas y Servicios'}
            </span>
          </a>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          <button className="p-2 relative rounded-full hover:bg-gray-700/50 transition-all duration-200 group">
            <Bell className="h-5 w-5 text-gray-300 group-hover:text-blue-300" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-700/50 transition-all duration-200 group">
            <HelpCircle className="h-5 w-5 text-gray-300 group-hover:text-blue-300" />
          </button>
          
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-200 group-hover:text-blue-300 transition-colors">
              {user?.name || 'User'}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-red-600/80 transition-all duration-300 group border border-gray-700 hover:border-red-500"
          >
            <LogOut className="h-5 w-5 text-gray-300 group-hover:text-white" />
            <span className="hidden md:inline text-sm font-medium">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;