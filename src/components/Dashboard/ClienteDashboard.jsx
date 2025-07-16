import { useState } from "react";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import { Car, Clock, CreditCard, History, Settings, Star, Wallet, Calendar, AlertCircle } from 'lucide-react';
import './client.css'

const ClienteDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Datos de ejemplo
    const stats = [
        { title: "Lavados este mes", value: "4", icon: <Car className="h-6 w-6" />, trend: "↑ 33%" },
        { title: "Próxima reserva", value: "15 Oct", icon: <Calendar className="h-6 w-6" /> },
        { title: "Saldo disponible", value: "$125.00", icon: <Wallet className="h-6 w-6" /> },
        { title: "Puntos acumulados", value: "320", icon: <Star className="h-6 w-6" /> }
    ];

    const recentServices = [
        { id: 1, type: "Lavado Premium", date: "10 Oct 2023", status: "Completado", price: "$45.00" },
        { id: 2, type: "Lavado Express", date: "5 Oct 2023", status: "Completado", price: "$25.00" },
        { id: 3, type: "Detallado Completo", date: "28 Sep 2023", status: "Completado", price: "$80.00" }
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
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Clientes</h1>
                            <p className="text-gray-600">Bienvenido a nuestra página InnovaQ!</p>
                        </div>
                        <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2">
                            <Car className="h-5 w-5" />
                            Agendar nuevo lavado
                        </button>
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
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Two Columns Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Services */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <History className="h-5 w-5 text-blue-600" />
                                    Historial reciente
                                </h2>
                                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                    Ver todo
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentServices.map(service => (
                                    <div key={service.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                <Car className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{service.type}</h4>
                                                <p className="text-sm text-gray-500">{service.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{service.price}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${service.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {service.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-blue-600" />
                                    Acciones rápidas
                                </h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all flex flex-col items-center">
                                        <Wallet className="h-6 w-6 mb-1" />
                                        <span className="text-sm">Recargar saldo</span>
                                    </button>
                                    <button className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-all flex flex-col items-center">
                                        <Star className="h-6 w-6 mb-1" />
                                        <span className="text-sm">Mis puntos</span>
                                    </button>
                                    <button className="p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-all flex flex-col items-center">
                                        <Settings className="h-6 w-6 mb-1" />
                                        <span className="text-sm">Preferencias</span>
                                    </button>
                                    <button className="p-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-all flex flex-col items-center">
                                        <AlertCircle className="h-6 w-6 mb-1" />
                                        <span className="text-sm">Ayuda</span>
                                    </button>
                                </div>
                            </div>

                            {/* Promo Card */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl text-white">
                                <h3 className="font-bold text-lg mb-2">¡Oferta especial!</h3>
                                <p className="text-sm mb-4">Lleva 3 lavados premium y obtén el 4to gratis</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Válido hasta 30/11</span>
                                    <button className="text-xs font-medium bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-gray-100 transition-all">
                                        Aplicar
                                    </button>
                                </div>
                            </div>

                            {/* Next Wash */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                    Próximo lavado
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                        <Car className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Lavado Completo</h4>
                                        <p className="text-sm text-gray-500">Viernes, 15 Oct · 10:00 AM</p>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 text-sm border border-gray-200 hover:border-gray-300 rounded-lg transition-all">
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClienteDashboard;