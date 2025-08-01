import { useState, useEffect } from "react";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import { useClienteDashbordHook } from "../../shared/hooks/useClienteDashboard";
import { History, Package, MapPin, Calendar, CheckCircle, CircleDollarSign, Box, User } from 'lucide-react';
import './client.css'

const ClienteDashboard = () => {
    const { pedidosClient, handlePedidosClient } = useClienteDashbordHook();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            await handlePedidosClient();
        };
        fetchData();
    }, [])

    return (
        <div className="bg-slate-900 min-h-screen ">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
                <div className="px-4 md:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-white">Bienvenido {pedidosClient?.length > 0 ? pedidosClient[0].user.nombre : ''}</h1>
                            <p className="text-gray-600 mt-1 text-white">Historial de tus pedidos en <span className="font-semibold text-blue-600">InnovaQ!</span></p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/50">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-600" />
                                <span>Tus pedidos recientes</span>
                            </h2>
                        </div>

                        {pedidosClient?.length > 0 ? (
                            <div className="space-y-6">
                                {pedidosClient.map((pedido) => (
                                    <div key={pedido._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-2 py-1 rounded-md shadow-xs">
                                                    <Calendar className="h-4 w-4 text-blue-500" />
                                                    <span>{pedido.fechaPedido}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-2 py-1 rounded-md shadow-xs">
                                                    <MapPin className="h-4 w-4 text-blue-500" />
                                                    <span>{pedido.direccion}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${pedido.estado
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-amber-100 text-amber-800'
                                                    } flex items-center gap-1`}>
                                                    {pedido.estado ? (
                                                        <>
                                                            <CheckCircle className="h-3 w-3" />
                                                            Completado
                                                        </>
                                                    ) : (
                                                        <>
                                                            <History className="h-3 w-3" />
                                                            Pendiente
                                                        </>
                                                    )}
                                                </span>
                                                <span className="font-medium text-gray-800 bg-white px-2 py-1 rounded-md shadow-xs">
                                                    Total: <span className="text-blue-600">${pedido.total.toFixed(2)}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="divide-y divide-gray-100">
                                            {pedido.productos.map((item, index) => (
                                                <div key={index} className="p-4 flex flex-col md:flex-row gap-4 hover:bg-gray-50 transition-colors">
                                                    <div className="w-full md:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center p-2">
                                                        <img
                                                            src={item.producto.imagen}
                                                            alt={item.producto.nombre}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-medium text-gray-800 text-lg">{item.producto.nombre}</h3>
                                                        <p className="text-sm text-gray-500 mb-2">{item.producto.instrucciones}</p>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                                                            <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-2 rounded-md">
                                                                <Box className="h-4 w-4 text-blue-600" />
                                                                <span>Cantidad: <span className="font-medium">{item.cantidad}</span></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-2 rounded-md">
                                                                <CircleDollarSign className="h-4 w-4 text-blue-600" />
                                                                <span>Precio: <span className="font-medium">${item.producto.precio.toFixed(2)}</span></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-2 rounded-md">
                                                                <Package className="h-4 w-4 text-blue-600" />
                                                                <span>Stock: <span className="font-medium">{item.producto.stock}</span></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-2 rounded-md">
                                                                <CircleDollarSign className="h-4 w-4 text-blue-600" />
                                                                <span>Subtotal: <span className="font-medium">${(item.cantidad * item.producto.precio).toFixed(2)}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Package className="h-10 w-10 text-blue-500" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-700">No hay pedidos registrados</h3>
                                <p className="text-gray-500 mt-1">Tus pedidos aparecerán aquí cuando los realices</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClienteDashboard;