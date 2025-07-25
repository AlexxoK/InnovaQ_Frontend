import Layout from "../Layout/Layout.jsx";
import { useCalifacionesHook } from "../../shared/hooks/useCalificacion.jsx";
import { useState } from "react";
import { motion } from "framer-motion";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const CalificacionCliente = () => {
    const { handlePostCalificacion } = useCalifacionesHook();
    const [formData, setFormData] = useState({
        comentario: "",
        estrellas: 0
    });
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleStarClick = (estrella) => {
        setFormData((prev) => ({ ...prev, estrellas: estrella }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const destinarioId = "688146f57b89b89448afd59d";
        await handlePostCalificacion(destinarioId, formData);
        setFormData({
            comentario: "",
            estrellas: 0
        });
        setIsSubmitting(false);
    }

    return (
        <Layout>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
            >
                <motion.h1 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-center text-gray-800 mb-6"
                >
                    Califica Nuestra Pagina Web
                </motion.h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Sección de Estrellas */}
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">
                            {formData.estrellas > 0 
                                ? `Tu calificación: ${formData.estrellas} estrella${formData.estrellas > 1 ? 's' : ''}`
                                : "Selecciona una calificación"}
                        </h3>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((estrella) => (
                                <motion.button
                                    key={estrella}
                                    type="button"
                                    onClick={() => handleStarClick(estrella)}
                                    onMouseEnter={() => setHoveredStar(estrella)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="focus:outline-none"
                                >
                                    {estrella <= (hoveredStar || formData.estrellas) ? (
                                        <StarSolid className={`h-10 w-10 ${estrella <= formData.estrellas ? 'text-yellow-400' : 'text-yellow-200'}`} />
                                    ) : (
                                        <StarOutline className="h-10 w-10 text-gray-300" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Comentario */}
                    <div className="relative">
                        <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-2">
                            Tu opinión es importante
                        </label>
                        <motion.textarea
                            name="comentario"
                            rows="5"
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all duration-200"
                            placeholder="Escribe tu experiencia con esta pagina web..."
                            value={formData.comentario}
                            onChange={handleInputChange}
                            whileFocus={{ 
                                boxShadow: "0 0 0 2px rgba(132, 204, 22, 0.5)",
                                borderColor: "rgb(132, 204, 22)"
                            }}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                            {formData.comentario.length}/500
                        </div>
                    </div>

                    {/* Botón enviar */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting || formData.estrellas === 0}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-white ${
                            formData.estrellas === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700'
                        } shadow-md transition-all duration-300`}
                        whileHover={formData.estrellas > 0 ? { scale: 1.02 } : {}}
                        whileTap={formData.estrellas > 0 ? { scale: 0.98 } : {}}
                    >
                        {isSubmitting ? (
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                            />
                        ) : (
                            <>
                                <PaperAirplaneIcon className="h-5 w-5" />
                                Enviar Calificación
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Nota adicional */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-xs text-gray-500 text-center"
                >
                    Tu calificación ayudará a los usuarios a decidir si es la página web que buscan.
                </motion.p>
            </motion.div>
        </Layout>
    )
}

export default CalificacionCliente;