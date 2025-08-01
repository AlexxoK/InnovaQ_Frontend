import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileBox, ChevronLeft, Box, Star, ListStart, Layers, PackageIcon,ReceiptText
} from 'lucide-react';
import './sidebar.css'

import { ProductsAdminNavigate } from "../../shared/hooks/useDashboard";
import { ProductsNavigate } from "../../shared/hooks/useDashboard";
import { CalificacionesNavigate } from "../../shared/hooks/useDashboard";
import { CalificacionesAdminNavigate } from "../../shared/hooks/useDashboard";
import { CategoriaAdminNavigate } from "../../shared/hooks/useDashboard";
import { CategoriaClienteNavigate } from "../../shared/hooks/useDashboard";
import { FacturasNavigate } from "../../shared/hooks/useDashboard";
import { PedidoClienteNavigate } from "../../shared/hooks/useDashboard";
import { PedidoAdminNavigate } from "../../shared/hooks/useDashboard";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  const { productsDashboard, handleProductsDashboard } = ProductsAdminNavigate();
  const { productsNav, handleProductsNavigate } = ProductsNavigate();
  const { calificacionesNav, handleCalificacionesNavigate } = CalificacionesNavigate();
  const { calificacionesDashboard, handleCalificacionesDashboard } = CalificacionesAdminNavigate();
  const { categoriaDashboardAdmin, handleCategoriaDashboardAdmin } = CategoriaAdminNavigate();
  const { categoriaDashboardCliente, handleCategoriaDashboardCliente } = CategoriaClienteNavigate();
  const { facturasNav, handleFacturasNavigate } = FacturasNavigate();
  const { PedidoDashboardCliente, handlePedidoDashboardCliente } = PedidoClienteNavigate();
  const { PedidoDashboardAdmin, handlePedidoDashboardAdmin } = PedidoAdminNavigate();

  const clientSections = [
    { text: 'Productos', icon: <Box className="h-5 w-5" />, action: handleProductsNavigate },
    { text: 'Califica Nuestra App', icon: <Star className="h-5 w-5" />, action: handleCalificacionesNavigate },
    { text: 'Categorias', icon: <Layers className="h-5 w-5" />, action: handleCategoriaDashboardCliente },
    { text: 'Pedidos', icon: <PackageIcon className="h-5 w-5" />, action: handlePedidoDashboardCliente },
    { text: 'Facturas', icon: <ReceiptText className="h-5 w-5" />, action: handleFacturasNavigate }

  ];


  const adminSections = [
    { text: 'Productos', icon: <FileBox className="h-5 w-5" />, action: handleProductsDashboard },
    { text: 'Calificaciones', icon: <ListStart className="h-5 w-5" />, action: handleCalificacionesDashboard },
    { text: 'Categorias', icon: <Layers className="h-5 w-5" />, action: handleCategoriaDashboardAdmin },
    { text: 'Facturas', icon: <ReceiptText className="h-5 w-5" />, action: handleFacturasNavigate  },
    { text: 'Pedidos', icon: <PackageIcon className="h-5 w-5" />, action: handlePedidoDashboardAdmin }
  ]

  const sections = user?.role === 'ADMIN' ? adminSections : clientSections;

  return (
    <div className={`fixed inset-y-0 left-0 z-20 bg-gradient-to-b from-gray-800 to-gray-900 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out shadow-2xl flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {user?.role === 'ADMIN' ? 'Admin InnovaQ' : 'Mi Cuenta'}
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-700 transition-all duration-200 hover:rotate-[-4deg]"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-700 flex items-center space-x-3 bg-gray-800/50">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-medium">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-400">{user?.role === 'ADMIN' ? 'Administrador' : 'Cliente'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {sections.map((section, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  section.action();
                  toggleSidebar();
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 hover:text-blue-300 transition-all duration-200 group hover:translate-x-1"
              >
                <span className="text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform duration-200">
                  {section.icon}
                </span>
                <span className="font-medium">{section.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;