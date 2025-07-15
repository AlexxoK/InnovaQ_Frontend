import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../Layout/Layout.jsx";
import { useCategorias } from "../../shared/hooks/useCategorias.jsx";
import { Layers, Edit3, Trash2 } from "lucide-react";
import "./Categoria.css";

const Categorias = () => {
    const { categorias, loading, handleGetCategorias, handlePostCategoria, handlePutCategoria, handleDeleteCategoria } = useCategorias();

    const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: "", descripcion: "" });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [categoriaIdEditando, setCategoriaIdEditando] = useState(null);

    useEffect(() => {
        handleGetCategorias();
    }, [])

    const handleInputChange = (e) => {
        setNuevaCategoria(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, descripcion } = nuevaCategoria;
        if (!nombre.trim() || !descripcion.trim()) return;

        if (modoEdicion && categoriaIdEditando) {
            await handlePutCategoria(categoriaIdEditando, { nombre, descripcion });
        } else {
            await handlePostCategoria({ nombre, descripcion }, true);
        }

        setNuevaCategoria({ nombre: "", descripcion: "" });
        setModoEdicion(false);
        setCategoriaIdEditando(null);
    }

    const handleEditar = (categoria) => {
        setNuevaCategoria({ nombre: categoria.nombre, descripcion: categoria.descripcion });
        setCategoriaIdEditando(categoria._id);
        setModoEdicion(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleCancelarEdicion = () => {
        setModoEdicion(false);
        setCategoriaIdEditando(null);
        setNuevaCategoria({ nombre: "", descripcion: "" });
    }

    const confirmarEliminar = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) handleDeleteCategoria(id);
        })
    }

    return (
        <Layout>
            <div className="categorias-container">
                <div className="categorias-card categorias-form-card">
                    <h2 className="categorias-title">{modoEdicion ? "Editar categoría" : "Crear nueva categoría"}</h2>
                    <form className="categorias-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la categoría"
                            value={nuevaCategoria.nombre}
                            onChange={handleInputChange}
                            className="categorias-input"
                        />
                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={nuevaCategoria.descripcion}
                            onChange={handleInputChange}
                            className="categorias-textarea"
                            rows="3"
                        />
                        <button type="submit" className="categorias-button">
                            {modoEdicion ? "Actualizar categoría" : "Crear categoría"}
                        </button>
                        {modoEdicion && (
                            <button
                                type="button"
                                className="categorias-button cancelar-btn"
                                onClick={handleCancelarEdicion}
                            >
                                Cancelar edición
                            </button>
                        )}
                    </form>
                </div>

                <div className="categorias-card categorias-list-card">
                    <h2 className="categorias-title">Categorías</h2>
                    {loading && <p className="categorias-loading">Cargando categorías...</p>}
                    {!loading && categorias.length === 0 && <p className="categorias-empty">No hay categorías registradas ~~</p>}

                    <ul className="categorias-list">
                        {categorias.map((categoria) => (
                            <li key={categoria._id}>
                                <div className="categoria-contenido">
                                    <div className="categoria-nombre">
                                        <Layers className="categoria-icono" size={18} />
                                        <strong>{categoria.nombre}</strong>
                                    </div>
                                    <p className="categoria-descripcion">{categoria.descripcion}</p>
                                </div>
                                <div className="botones-container">
                                    <button className="categorias-editar-btn" onClick={() => handleEditar(categoria)}>
                                        <Edit3 size={16} className="boton-icono" />
                                        Editar
                                    </button>
                                    <button className="categorias-eliminar-btn" onClick={() => confirmarEliminar(categoria._id)}>
                                        <Trash2 size={16} className="boton-icono" />
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Categorias;