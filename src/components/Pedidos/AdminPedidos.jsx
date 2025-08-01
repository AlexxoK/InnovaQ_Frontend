import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Layout from "../Layout/Layout.jsx";
import { getPedidos } from '../../services/api';
import { Tag, User, Search } from 'lucide-react';

const AdminPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        username: '',
        nombre: '',
        apellido: '',
        fecha: '',
        total: ''
    });

    const showErrorAlert = (err) => {
        const backendError = err.response && err.response.data;
        const text = backendError?.error || backendError?.msg || err.message || 'Ocurrió un error inesperado.';
        Swal.fire({
            title: 'Error',
            text: text,
            icon: 'error'
        });
    };

    useEffect(() => {
        const fetchAllPedidos = async () => {
            try {
                const response = await getPedidos();
                const allPedidos = response.data.pedidos;
                setPedidos(allPedidos);
                setFilteredPedidos(allPedidos);
            } catch (err) {
                showErrorAlert(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPedidos();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let tempPedidos = [...pedidos];

            if (filters.username) {
                tempPedidos = tempPedidos.filter(p =>
                    p.user.username.toLowerCase().includes(filters.username.toLowerCase())
                );
            }
            if (filters.nombre) {
                tempPedidos = tempPedidos.filter(p =>
                    p.user.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
                );
            }
            if (filters.apellido) {
                tempPedidos = tempPedidos.filter(p =>
                    p.user.apellido.toLowerCase().includes(filters.apellido.toLowerCase())
                );
            }
            if (filters.fecha) {
                tempPedidos = tempPedidos.filter(p =>
                    p.fechaPedido.includes(filters.fecha)
                );
            }
            if (filters.total) {
                tempPedidos = tempPedidos.filter(p =>
                    p.total.toString().includes(filters.total)
                );
            }

            setFilteredPedidos(tempPedidos);
        };
        applyFilters();
    }, [pedidos, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            username: '',
            nombre: '',
            apellido: '',
            fecha: '',
            total: ''
        });
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Cargando pedidos...</div>;
    }

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen p-8 font-inter">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">Administración de Pedidos</h1>
                        <p className="text-gray-500">¡Sigan haciendo su mayor esfuerzo!</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Filtros de Búsqueda</h2>
                        <button
                            onClick={clearFilters}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                placeholder="Filtrar por Username"
                                className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500"
                                value={filters.username}
                                onChange={handleFilterChange}
                            />
                            <User className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Filtrar por Nombre"
                                className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500"
                                value={filters.nombre}
                                onChange={handleFilterChange}
                            />
                            <Tag className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="apellido"
                                placeholder="Filtrar por Apellido"
                                className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500"
                                value={filters.apellido}
                                onChange={handleFilterChange}
                            />
                            <Tag className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        <div className="relative">
                            <input
                                type="date"
                                name="fecha"
                                placeholder="Filtrar por Fecha"
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                value={filters.fecha}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="total"
                                placeholder="Filtrar por Total"
                                className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500"
                                value={filters.total}
                                onChange={handleFilterChange}
                            />
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CLIENTE</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCTOS</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPedidos.length > 0 ? filteredPedidos.map(pedido => (
                                <tr key={pedido._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-500" />
                                            <div>
                                                <p className="font-semibold text-purple-700">{pedido.user.nombre} {pedido.user.apellido}</p>
                                                <p className="text-xs text-gray-500">{pedido.user.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {pedido.productos.map((item, index) => (
                                            <p key={index}>{item.producto.nombre} (x{item.cantidad})</p>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pedido.fechaPedido}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="font-bold">Q{pedido.total.toFixed(2)}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron pedidos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default AdminPedidos;
 