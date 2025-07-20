import { useState } from "react";
import { listaCategorias } from "../../services/api";
import Swal from "sweetalert2";

export const useCategoriasHook = () => {
    const [loading, setLoading] = useState(false);
    const [listCategory, setListCategory] = useState([]);

    const handleGetListCategorias = async () => {
        try {
            const response = await listaCategorias();
            console.log(response, "ListaCategorias");
            setListCategory(response.data.categorias);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error categorias',
                icon: 'error'
            })
        } finally {
            setLoading(false)
        }
    }


    return { listCategory, handleGetListCategorias, loading };
}