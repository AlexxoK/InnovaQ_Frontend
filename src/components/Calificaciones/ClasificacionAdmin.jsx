import Layout from "../Layout/Layout.jsx";
import { useCalifacionesHook } from "../../shared/hooks/useCalificacion.jsx";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  StarIcon as StarSolid, 
  UserIcon, 
  CalendarIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

const CalificacionAdmin = () => {
    const { handleGetCalificaciones, calificaciones } = useCalifacionesHook();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetCalificaciones();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

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
        show: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
                        Reseñas de Clientes
                    </h1>
                    <p className="text-gray-500 mt-2">Administra y visualiza todas las calificaciones recibidas</p>
                </motion.div>

                <div className="mb-6 flex items-center justify-between">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-blue-50 px-4 py-2 rounded-lg flex items-center"
                    >
                        <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-blue-700 font-medium">
                            {calificaciones.length} {calificaciones.length === 1 ? 'reseña' : 'reseñas'} en total
                        </span>
                    </motion.div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6"
                >
                    <AnimatePresence>
                        {calificaciones.map((calificacion) => (
                            <motion.div
                                key={calificacion._id}
                                variants={item}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                                <UserIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {calificacion.usuario.nombre} {calificacion.usuario.apellido}
                                                </h3>
                                                <div className="flex items-center mt-1">
                                                    <div className="flex mr-4">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarSolid 
                                                                key={i}
                                                                className={`h-5 w-5 ${i < calificacion.estrellas ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center text-gray-500 text-sm">
                                                        <CalendarIcon className="h-4 w-4 mr-1" />
                                                        {formatDate(calificacion.createdAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-4 text-gray-600 pl-16 border-l-2 border-blue-100"
                                    >
                                        "{calificacion.comentario}"
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {calificaciones.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-600">No hay reseñas aún</h3>
                        <p className="text-gray-500 mt-2">Los clientes aún no han dejado sus calificaciones</p>
                    </motion.div>
                )}
            </div>
        </Layout>
    )
}

export default CalificacionAdmin;