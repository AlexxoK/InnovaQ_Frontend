import { useState } from "react";
import Swal from "sweetalert2";
import { postCategoria, getCategorias, getCategoriasPorNombre, putCategoria, deleteCategoria } from "../../services/api";

export const useCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    const showErrorAlert = (error) => {
        const backendError = error.response?.data;
        Swal.fire({
            title: "Error",
            text: backendError?.error || backendError?.msg || "Error",
            icon: "error",
        })
    }

    const handlePostCategoria = async (data, actualizarLista = false) => {
        setLoading(true);
        try {
            const nombreLower = data.nombre.trim().toLowerCase();
            const existe = categorias.some(
                (cat) => cat.nombre.toLowerCase() === nombreLower
            )

            if (existe) {
                Swal.fire({
                    title: "Categoría existente",
                    text: `Ya existe una categoría con el nombre "${nombreLower}"`,
                    icon: "warning",
                    background: "#1f2937",
                    color: "white",
                })
                return;
            }

            await postCategoria(data);

            if (actualizarLista) {
                await handleGetCategorias();
            }

            Swal.fire({
                title: "Categoría Creada",
                text: "La categoría se ha creado exitosamente!",
                icon: "success",
                timer: 1500,
                background: "#1f2937",
                color: "white",
                customClass: { popup: "animate__animated animate__fadeInDown" },
            })
        } catch (error) {
            showErrorAlert(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetCategorias = async () => {
        setLoading(true);
        try {
            const response = await getCategorias();
            setCategorias(response.data.categorias || []);
        } catch (error) {
            showErrorAlert(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetCategoriaPorNombre = async (nombre) => {
        setLoading(true);
        try {
            const response = await getCategoriasPorNombre(nombre);
            setCategorias(response.data?.categorias || []);
        } catch (error) {
            showErrorAlert(error);
        } finally {
            setLoading(false);
        }
    }

    const handlePutCategoria = async (id, data) => {
        setLoading(true);
        try {
            await putCategoria(id, data);
            Swal.fire({
                title: "Categoría Actualizada",
                text: "La categoría se ha actualizado exitosamente!",
                icon: "success",
                timer: 1500,
                background: "#1f2937",
                color: "white",
                customClass: { popup: "animate__animated animate__fadeInDown" },
            });
            await handleGetCategorias();
        } catch (error) {
            showErrorAlert(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteCategoria = async (id) => {
        setLoading(true);
        try {
            await deleteCategoria(id);
            Swal.fire({
                title: "Categoría Eliminada",
                text: "La categoría se ha eliminado exitosamente!",
                icon: "success",
                timer: 1500,
                background: "#1f2937",
                color: "white",
                customClass: { popup: "animate__animated animate__fadeInDown" },
            });
            await handleGetCategorias();
        } catch (error) {
            showErrorAlert(error);
        } finally {
            setLoading(false);
        }
    }

    return { categorias, loading, handlePostCategoria, handleGetCategorias, handleGetCategoriaPorNombre, handlePutCategoria, handleDeleteCategoria }
}