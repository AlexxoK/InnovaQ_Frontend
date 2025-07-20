import Layout from "../Layout/Layout.jsx";
import { useProductsHook } from "../../shared/hooks/useProductos.jsx";
import { useState, useEffect } from "react";


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
    return (
        <Layout>
            <h1>Hola Cliente</h1>
        </Layout>
    )
}

export default ProductsCliente;