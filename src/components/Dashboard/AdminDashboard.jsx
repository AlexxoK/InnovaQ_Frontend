import { useState, useEffect } from "react";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import { Car, Users, PieChart, Settings, AlertCircle, DollarSign, Star, Activity, FileText } from 'lucide-react';
import {
    UserIcon,
    ShoppingBagIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import './admin.css'
import { useAdminDashbordHook } from "../../shared/hooks/useAdminDashboard";

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { productosMasVendidosList, handleListMasVendidos, handleListUsuario, listUser, promedio, handlePromedio, numeroClientesAll, handleNumeroClientes,
        pedidosAdmin, handlePedidosAdmin
    } = useAdminDashbordHook();
    const [isLoading, setIsLoading] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            await handleListMasVendidos();
            await handleListUsuario();
            await handlePromedio();
            await handleNumeroClientes();
            await handlePedidosAdmin();
            setIsLoading(false)
        };
        fetchData();
    }, [])

    // Datos de ejemplo
    const stats = [
        { title: "Pedidos Realizados", value: `${pedidosAdmin.length}`, icon: <Car className="h-6 w-6" />, trend: "↑ 12%", color: "bg-blue-100 text-blue-600" },
        { title: "Clientes nuevos", value: `${numeroClientesAll}`, icon: <Users className="h-6 w-6" />, trend: "↑ 5%", color: "bg-green-100 text-green-600" },
        { title: "Ingresos diarios", value: "$1,245", icon: <DollarSign className="h-6 w-6" />, trend: "↑ 18%", color: "bg-purple-100 text-purple-600" },
        { title: "Calificación", value: `${promedio}/5`, icon: <Star className="h-6 w-6" />, trend: "", color: "bg-yellow-100 text-yellow-600" }
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
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Administración</h1>
                            <p className="text-gray-600">Sigan haciendo su mayor esfuerzo!</p>
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
                                        Pedidos Recientes
                                    </h2>
                                    <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                        Ver todas
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-black font-bold">Cliente</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider text-black font-bold">Productos</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-black font-bold">Fecha</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  text-black font-bold">Estado</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-black font-bold">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-gray-50">
                                            {pedidosAdmin.map(order => (
                                                <tr key={order.id} className="hover:bg-gray-100 transition-colors duration-150 ease-in-out">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-violet-100 rounded-full flex items-center justify-center">
                                                                <UserIcon className="h-5 w-5 text-violet-600" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-violet-600">{order.user.nombre}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-semibold space-y-1">
                                                            {order.productos.map((p, i) => (
                                                                <div key={i} className="flex items-center">
                                                                    <ShoppingBagIcon className="flex-shrink-0 mr-2 h-4 w-4 text-blue-500" />
                                                                    <span>{p.producto.nombre}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="flex-shrink-0 mr-2 h-4 w-4 text-cyan-400" />
                                                            <span className="text-sm font-medium text-cyan-600">
                                                                {order.fechaPedido}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {order.estado ? (
                                                                <>
                                                                    <CheckCircleIcon className="flex-shrink-0 mr-2 h-4 w-4 text-emerald-500" />
                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                                                        Completado
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ClockIcon className="flex-shrink-0 mr-2 h-4 w-4 text-yellow-500" />
                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                        En progreso
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <CurrencyDollarIcon className="flex-shrink-0 mr-2 h-4 w-4 text-sky-500" />
                                                            <span className="text-sm font-bold text-sky-700">
                                                                {order.total}
                                                            </span>
                                                        </div>
                                                    </td>
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
                                    Ultimos Clientes Registrados
                                </h2>
                                <div className="space-y-4">
                                    {listUser.map((userlist, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                                                {userlist.nombre?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{userlist.nombre} {userlist.apellido}</h4>
                                                <p className="text-sm text-gray-500">{userlist.role}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-xs px-2 py-1 rounded-full ${userlist.estado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {userlist.estado ? 'Activo' : 'Desactivado'}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">{userlist.correo}</p>
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
                                {productosMasVendidosList.map((masVendidos) => (
                                    <div key={masVendidos._id} className="group border border-gray-200 rounded-lg p-5 hover:border-blue-500 transition duration-200 hover:shadow-md">
                                        <div className="space-y-3">
                                            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                                                <p className="text-sm font-medium text-red-800">
                                                    Producto más vendido: {masVendidos.nombre}
                                                </p>
                                                <p className="text-xs text-red-600">
                                                    Solo quedan {masVendidos.stock} unidades
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;