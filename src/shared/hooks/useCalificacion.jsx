import { useState } from "react";
import { getCalificacion, getCalificacionPromedio, postCalificacion } from "../../services/api";
import Swal from "sweetalert2";


export const useCalifacionesHook = () => {
    const [calificaciones, setCalificaciones] = useState([]);
    const [promedio, setPromedio] = useState(0);

    const handleGetCalificaciones = async () => {
        try {
            const response = await getCalificacion();
            setCalificaciones(response.data.calificaciones);
            console.log(response.data.calificaciones, "calificaciones");
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }

    const handlePostCalificacion = async (id, calificacion) => {
        try {
            const response = await postCalificacion(calificacion, id);
            console.log(response, "PostCalificacion");
            setCalificaciones(response.data);
            Swal.fire({
                title: 'Calificación Enviada',
                text: 'Gracias por tu calificación',
                icon: 'success',
                timer: 1500,
                color: 'white',
                background: '#1f2937',
                customClass: {
                    popup: 'animate__animated animate__fadeInDown',
                }
            })
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                background: '#1f2937',
                color: 'white',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }

    
    return {calificaciones, handleGetCalificaciones, handlePostCalificacion, promedio,}
}
