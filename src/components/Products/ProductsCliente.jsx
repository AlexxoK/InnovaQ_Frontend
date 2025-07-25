import Layout from "../Layout/Layout.jsx";
import { useProductsHook } from "../../shared/hooks/useProductos.jsx";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StarIcon, ShoppingBagIcon, CurrencyDollarIcon, TagIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const ProductsCliente = () => {
    const {listaProducts, handleGetListProducts} = useProductsHook();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetListProducts();
            setIsLoading(false)
        };
        fetchData();
    }, [])

    // Animaciones
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center text-gray-800 mb-12"
                >
                    Nuestros Productos
                </motion.h1>
                
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {listaProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            variants={item}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={product.imagen} 
                                    alt={product.nombre} 
                                    className="w-60 h-60 object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {product.categoria?.nombre}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.nombre}</h2>
                                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                                        <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                                        <span className="text-yellow-800 text-sm">5.0</span>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 mb-4 flex items-start">
                                    <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                    <span>{product.instrucciones}</span>
                                </p>
                                
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center">
                                        <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-1" />
                                        <span className="text-lg font-bold text-gray-900">${product.precio}</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <TagIcon className="h-5 w-5 text-gray-500 mr-1" />
                                        <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                                        </span>
                                    </div>
                                </div>
                                
                                <button className="mt-6 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                                    Añadir al carrito
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Layout>
    )
}

export default ProductsCliente;