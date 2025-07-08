import { useState } from "react";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import { Car, Users, Clock, PieChart, Settings, AlertCircle, DollarSign, Calendar, Star, Activity, Shield, FileText } from 'lucide-react';
import './admin.css'

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Datos de ejemplo
    const stats = [
        { title: "Lavados hoy", value: "24", icon: <Car className="h-6 w-6" />, trend: "↑ 12%", color: "bg-blue-100 text-blue-600" },
        { title: "Clientes nuevos", value: "8", icon: <Users className="h-6 w-6" />, trend: "↑ 5%", color: "bg-green-100 text-green-600" },
        { title: "Ingresos diarios", value: "$1,245", icon: <DollarSign className="h-6 w-6" />, trend: "↑ 18%", color: "bg-purple-100 text-purple-600" },
        { title: "Calificación", value: "4.8/5", icon: <Star className="h-6 w-6" />, trend: "↑ 0.2", color: "bg-yellow-100 text-yellow-600" }
    ];

    const recentOrders = [
        { id: 1, client: "Juan Pérez", service: "Lavado Premium", time: "10:30 AM", status: "En progreso", price: "$45.00" },
        { id: 2, client: "María García", service: "Lavado Express", time: "11:15 AM", status: "Completado", price: "$25.00" },
        { id: 3, client: "Carlos López", service: "Detallado Completo", time: "9:00 AM", status: "Completado", price: "$80.00" },
        { id: 4, client: "Ana Martínez", service: "Lavado Básico", time: "12:30 PM", status: "Pendiente", price: "$20.00" }
    ];

    const employees = [
        { name: "Luis Rodríguez", role: "Lavador", status: "Activo", schedule: "8AM - 4PM" },
        { name: "Pedro Gómez", role: "Detallador", status: "Activo", schedule: "10AM - 6PM" },
        { name: "Sofía Ramírez", role: "Cajero", status: "Descanso", schedule: "9AM - 5PM" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
                <div className="px-4 md:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Panel de Administración</h1>
                            <p className="text-gray-600">Resumen y métricas de tu carwash</p>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-all flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Reporte
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Configuración
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm">{stat.title}</p>
                                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                        {stat.trend && <span className="text-green-500 text-xs font-medium">{stat.trend}</span>}
                                    </div>
                                    <div className={`p-2 ${stat.color} rounded-lg`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Three Columns Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Recent Orders */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-blue-600" />
                                        Órdenes recientes
                                    </h2>
                                    <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                        Ver todas
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {recentOrders.map(order => (
                                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.client}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.service}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'En progreso' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Statistics Chart */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                    <PieChart className="h-5 w-5 text-blue-600" />
                                    Estadísticas semanales
                                </h2>
                                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-400">Gráfico de ingresos y servicios</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Employees */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    Personal activo
                                </h2>
                                <div className="space-y-4">
                                    {employees.map((employee, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                                {employee.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{employee.name}</h4>
                                                <p className="text-sm text-gray-500">{employee.role}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-xs px-2 py-1 rounded-full ${employee.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {employee.status}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">{employee.schedule}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                    Ver todo el personal
                                </button>
                            </div>

                            {/* Alerts */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                    Alertas importantes
                                </h2>
                                <div className="space-y-3">
                                    <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                                        <p className="text-sm font-medium text-red-800">Producto en bajo stock: Shampoo</p>
                                        <p className="text-xs text-red-600">Solo quedan 3 unidades</p>
                                    </div>
                                    <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                        <p className="text-sm font-medium text-yellow-800">Mantenimiento programado</p>
                                        <p className="text-xs text-yellow-600">Maquina de presión - 15 Oct</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    Acciones rápidas
                                </h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all flex flex-col items-center">
                                        <Users className="h-5 w-5 mb-1" />
                                        <span className="text-xs text-center">Agregar empleado</span>
                                    </button>
                                    <button className="p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-all flex flex-col items-center">
                                        <Car className="h-5 w-5 mb-1" />
                                        <span className="text-xs text-center">Nuevo servicio</span>
                                    </button>
                                    <button className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-all flex flex-col items-center">
                                        <DollarSign className="h-5 w-5 mb-1" />
                                        <span className="text-xs text-center">Registrar pago</span>
                                    </button>
                                    <button className="p-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-all flex flex-col items-center">
                                        <Calendar className="h-5 w-5 mb-1" />
                                        <span className="text-xs text-center">Programar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;