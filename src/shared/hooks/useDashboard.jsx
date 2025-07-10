import { useState } from "react";
import { useNavigate } from "react-router-dom";



export const ProductsAdminNavigate = () => {
    const [productsDashboard, setProductsDashboard] = useState([]);
    const navigate = useNavigate();

    const handleProductsDashboard = async () => {
        try {
            console.log("Productos");
            navigate("/AdminProductos", { state: { message: "Welcome Products Admin " } })
        } catch (error) {
            console.log(error)
        }
    }
    return { productsDashboard, handleProductsDashboard }
}

export const ProductsNavigate = () => {
    const [productsNav, setProductsNav] = useState([])
    const navigate = useNavigate();

    const handleProductsNavigate = async () => {
        try {
            console.log("Lista");
            navigate("/ClientProductos", {state: {message: "Welcome List Products"}})
        } catch (error) {
            console.log(error)
        }
    }
    return {productsNav, handleProductsNavigate};
}

export const CalificacionesNavigate = () => {
    const [calificacionesNav, setCalificacionesNav] = useState([])
    const navigate = useNavigate();

    const handleCalificacionesNavigate = async () => {
        try {
            console.log("Lista");
            navigate("/ClientCalificaciones", {state: {message: "Welcome List Calificaciones"}})
        } catch (error) {
            console.log(error)
        }
    }

    return {calificacionesNav, handleCalificacionesNavigate};
}

export const CalificacionesAdminNavigate = () => {
    const [calificacionesDashboard, setCalificacionesDashboard] = useState([])
    const navigate = useNavigate();

    const handleCalificacionesDashboard = async () => {
        try {
            console.log("Calificaciones");
            navigate("/AdminCalificaciones", {state: {message: "Welcome Calificaciones Admin"}})
        } catch (error) {
            console.log(error)
        }
    }
    return {calificacionesDashboard, handleCalificacionesDashboard};
}