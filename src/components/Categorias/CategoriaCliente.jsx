import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout.jsx";
import { useCategorias } from "../../shared/hooks/useCategorias.jsx";
import { Layers, Search } from "lucide-react";
import "./Categoria.css";

const Categorias = () => {
    const { categorias, loading, handleGetCategorias } = useCategorias();
    const [busqueda, setBusqueda] = useState("");
    const [filtradas, setFiltradas] = useState([]);

    useEffect(() => {
        handleGetCategorias();
    }, []);

    useEffect(() => {
        const texto = busqueda.trim().toLowerCase();

        if (!texto) {
            setFiltradas(categorias);
            return;
        }

        const coincidencias = categorias.filter((cat) =>
            cat.nombre.toLowerCase().includes(texto)
        );

        setFiltradas(coincidencias);
    }, [busqueda, categorias]);

    return (
        <Layout>
            <div className="categorias-container">
                <div className="categorias-card categorias-list-card">
                    <h2 className="categorias-title">Categorías</h2>

                    <div className="categorias-search-wrapper">
                        <Search className="categorias-search-icon" size={18} />
                        <input
                            type="text"
                            className="categorias-input categorias-search-input"
                            placeholder="Buscar por nombre..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    {loading && <p className="categorias-loading">Cargando categorías...</p>}
                    {!loading && filtradas.length === 0 && (
                        <p className="categorias-empty">No se encontraron coincidencias ~~</p>
                    )}

                    <ul className="categorias-list">
                        {filtradas.map((categoria) => (
                            <li key={categoria._id}>
                                <div className="categoria-contenido">
                                    <div className="categoria-nombre">
                                        <Layers className="categoria-icono" size={18} />
                                        <strong>{categoria.nombre}</strong>
                                    </div>
                                    <p className="categoria-descripcion">{categoria.descripcion}</p>
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