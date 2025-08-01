import React, { useState, useEffect } from 'react';
import Layout from "../Layout/Layout.jsx";
import usePedidos from '../../shared/hooks/usePedidos.jsx';
import { Plus, Minus, X, Trash2, Edit2, Loader, Package, MapPin, Tag, Clock } from 'lucide-react';

const PedidoForm = () => {
    const {
        formState,
        productos,
        total,
        listaProducts,
        pedidosList,
        loading,
        userLoading,
        handleChange,
        handleAddProducto,
        handleRemoveProducto,
        handleUpdateCantidad,
        handleSelectProducto,
        handleSubmit,
        handleDeletePedido,
        loadPedidoForEdit,
        resetForm
    } = usePedidos();

    const [timers, setTimers] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimers = {};
            pedidosList.forEach(pedido => {
                const oneHour = 60 * 60 * 1000;
                const createdAtTime = new Date(pedido.createdAt).getTime();
                const now = new Date().getTime();
                const remainingTime = createdAtTime + oneHour - now;

                if (remainingTime > 0) {
                    const minutes = Math.floor(remainingTime / 60000);
                    const seconds = Math.floor((remainingTime % 60000) / 1000);
                    newTimers[pedido._id] = `${minutes}m ${seconds}s`;
                }
            });
            setTimers(newTimers);
        }, 1000);

        return () => clearInterval(interval);
    }, [pedidosList]);

    const isFormValid = formState.direccion && productos.length > 0 && !productos.some(p => !p._id || p.cantidad < 1);

    return (
        <Layout>
            <div className="bg-slate-900 min-h-screen p-8 font-sans text-gray-100 flex items-center justify-center">
                <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
                    <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full lg:w-1/2">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <Package className="text-blue-400 w-8 h-8" />
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-100">Formulario de Pedidos</h1>
                                    <p className="text-gray-400">Crea un nuevo pedido con tus productos y dirección.</p>
                                </div>
                            </div>
                            {formState.id && (
                                <button
                                    onClick={resetForm}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                                    <MapPin className="text-green-400 w-5 h-5" />
                                    <span>Dirección de envío</span>
                                </label>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={formState.direccion}
                                    onChange={handleChange}
                                    placeholder="Escribe la dirección de envío"
                                    className="w-full bg-slate-700 text-gray-200 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                                    <Tag className="text-purple-400 w-5 h-5" />
                                    <span>Productos</span>
                                </label>
                                <div className="space-y-4">
                                    {productos.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-2 bg-slate-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-[1.01]">
                                            <select
                                                value={item._id}
                                                onChange={(e) => handleSelectProducto(index, e.target.value)}
                                                className="flex-grow bg-slate-800 text-gray-200 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                required
                                            >
                                                <option value="" disabled>Selecciona un producto</option>
                                                {listaProducts.map(product => (
                                                    <option key={product._id} value={product._id}>
                                                        {product.nombre} - ${product.precio}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={item.cantidad}
                                                onChange={(e) => {
                                                    const newValue = parseInt(e.target.value, 10);
                                                    handleUpdateCantidad(index, isNaN(newValue) ? 1 : Math.max(1, newValue));
                                                }}
                                                className="w-20 bg-slate-800 text-gray-200 border border-slate-600 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                min="1"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProducto(index)}
                                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddProducto}
                                    className="mt-4 w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Añadir Producto</span>
                                </button>
                            </div>

                            <div className="flex justify-between items-center bg-slate-700 p-4 rounded-xl shadow-inner">
                                <span className="text-xl font-bold text-gray-100">Total</span>
                                <span className="text-2xl font-extrabold text-blue-400">${total.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !isFormValid}
                                className={`w-full flex items-center justify-center space-x-2 font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 transform ${loading || !isFormValid ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}`}
                            >
                                {loading ? <Loader className="animate-spin w-5 h-5" /> : <span>{formState.id ? 'Actualizar Pedido' : 'Realizar Pedido'}</span>}
                            </button>
                        </form>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-100 mb-6">Mis Pedidos</h2>
                        {(loading || userLoading) && <div className="text-center text-gray-400">Cargando pedidos...</div>}
                        {!loading && !userLoading && pedidosList.length === 0 && <div className="text-center text-gray-400">No hay pedidos registrados para este usuario.</div>}
                        {!loading && !userLoading && pedidosList.length > 0 && (
                            <ul className="space-y-4">
                                {pedidosList.map(pedido => {
                                    const oneHour = 60 * 60 * 1000;
                                    const isEditable = (new Date().getTime() - new Date(pedido.createdAt).getTime()) < oneHour;

                                    return (
                                        <li key={pedido._id} className="bg-slate-700 p-4 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-300 transform hover:scale-[1.01]">
                                            <div className="flex-grow">
                                                <p className="font-bold text-lg text-blue-400">Pedido #{pedido._id.slice(-6)}</p>
                                                <p className="text-sm text-gray-400 flex items-center space-x-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{pedido.direccion}</span>
                                                </p>
                                                {isEditable ? (
                                                    <div className="flex items-center space-x-1 text-yellow-400 text-sm mt-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>Tiempo restante: {timers[pedido._id] || '0m 0s'}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-1 text-red-400 text-sm mt-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>Tiempo de edición expirado.</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex space-x-2 mt-4 sm:mt-0">
                                                <button
                                                    onClick={() => loadPedidoForEdit(pedido._id)}
                                                    disabled={!isEditable}
                                                    className={`p-2 rounded-lg transition-all duration-300 transform ${isEditable ? 'bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-110' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePedido(pedido._id)}
                                                    disabled={!isEditable}
                                                    className={`p-2 rounded-lg transition-all duration-300 transform ${isEditable ? 'bg-red-500 hover:bg-red-600 text-white hover:scale-110' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PedidoForm;
