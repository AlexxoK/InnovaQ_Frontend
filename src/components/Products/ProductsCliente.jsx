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
            <div>
                {listaProducts.map((product, index) => {
                    return (
                        <div key={product._id}>
                            <h1>{product.nombre}</h1>
                            <p>{product.instrucciones}</p>
                            <img src={product.imagen} alt={product.nombre} />
                            <p>{product.categoria?.nombre}</p>
                            <p>{product.precio}</p>
                            <p>{product.stock}</p>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export default ProductsCliente;