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
            navigate("/ListProducts", {state: {message: "Welcome List Products"}})
        } catch (error) {
            console.log(error)
        }
    }
    return {productsNav, handleProductsNavigate};
}