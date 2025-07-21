import { useState } from "react";
import { addProductos, editProductos, deleteProductos, listProductos } from "../../services/api";
import Swal from "sweetalert2";

export const useProductsHook = () => {
    const [loading, setLoading] = useState(false);
    const [listaProducts, setListProducts] = useState([]);

    const handleGetListProducts = async () => {
        try {
            const response = await listProductos();
            console.log(response, "ListaProductos");
            setListProducts(response.data.productos);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleAddProductos = async (data) => {
        try {
            setLoading(true);
            const response = await addProductos(data);
            console.log(response, "AgregarProductos");
            await Swal.fire({
                title: 'Producto Agregado',
                text: 'El producto ha sido agregado exitosamente',
                icon: 'success',
                timer: 1500,
                color: 'white',
                background: '#1f2937',
                customClass: {
                    popup: 'animate__animated animate__fadeInDown',
                }
            })
            await handleGetListProducts();
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleEditProductos = async (id, formData) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta seguro que deseas editar este producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'Cancelar',
            color: 'white',
            background: '#1f2937',
            customClass: {
                popup: 'animate__animated animate__fadeInDown',
            }
        });
        if (confirm.isConfirmed) {
            try {
                setLoading(true);
                const data = new FormData();
                for (const key in formData) {
                    data.append(key, formData[key]);
                }
                const response = await editProductos(id, formData);
                console.log(response, "EditarProductos");
                await Swal.fire({
                    title: 'Producto Editado',
                    text: 'El producto ha sido editado exitosamente',
                    icon: 'success',
                    timer: 1500,
                    color: 'white',
                    background: '#1f2937',
                    customClass: {
                        popup: 'animate__animated animate__fadeInDown',
                    }
                })
                await handleGetListProducts();
            } catch (error) {
                const backendError = error.response?.data;
                Swal.fire({
                    title: 'Error',
                    text: backendError?.error || backendError?.msg || 'Error',
                    icon: 'error'
                })
            }
        }
    }

    const handleDeleteProductos = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Está seguro?',
            text: 'Esta acción eliminará el producto permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#1f2937',
            color: 'white',
            customClass: {
                popup: 'animate__animated animate__fadeInDown',
            }
        });

        if (confirm.isConfirmed) {
            try {
                setLoading(true);
                const response = await deleteProductos(id);
                console.log(response);

                await Swal.fire({
                    title: 'Producto Eliminado',
                    text: 'El producto ha sido eliminado exitosamente',
                    icon: 'success',
                    timer: 1500,
                    background: '#1f2937',
                    color: 'white',
                    customClass: {
                        popup: 'animate__animated animate__fadeInDown',
                    }
                });

                await handleGetListProducts();
            } catch (error) {
                const backendError = error.response?.data;
                Swal.fire({
                    title: 'Error',
                    text: backendError?.error || backendError?.msg || 'Error',
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        }
    };
    return { listaProducts, handleGetListProducts, handleAddProductos, handleEditProductos, handleDeleteProductos, loading };
}


