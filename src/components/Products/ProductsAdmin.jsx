import { useEffect, useState } from "react";
import {useProductsHook} from "../../shared/hooks/useProductos";
import Layout from "../Layout/Layout.jsx";

const ProductsAdmin = () => {
    const {
        listaProducts,
        handleGetListProducts,
        handleAddProductos,
        handleEditProductos,
        handleDeleteProductos,
        loading
    } = useProductsHook();

    const [formData, setFormData] = useState({
        nombre: "",
        categoria: "",
        instrucciones: "",
        precio: "",
        stock: "",
        imagen: null,
        imagenUrl: ""
    });

    const [editId, setEditId] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        handleGetListProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, imagen: file, imagenUrl: "" }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setFormData((prev) => ({ ...prev, imagen: null, imagenUrl: url }));
        setPreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key === "imagen" && formData.imagen) data.append("imagen", formData.imagen);
            else if (key === "imagenUrl" && !formData.imagen && formData.imagenUrl)
                data.append("imagen", formData.imagenUrl);
            else if (key !== "imagenUrl") data.append(key, formData[key]);
        }

        if (editId) {
            await handleEditProductos(editId, data);
            setEditId(null);
        } else {
            await handleAddProductos(data);
        }

        setFormData({ nombre: "", categoria: "", instrucciones: "", precio: "", stock: "", imagen: null, imagenUrl: "" });
        setPreview(null);
    };

    const handleEditClick = (product) => {
        setEditId(product._id);
        setFormData({
            nombre: product.nombre,
            categoria: product.categoria?.nombre || "",
            instrucciones: product.instrucciones,
            precio: product.precio,
            stock: product.stock,
            imagen: null,
            imagenUrl: product.imagen
        });
        setPreview(product.imagen);
    };

    return (
        <Layout>
        <div className="container mt-4">
            <h3>{editId ? "Editar Producto" : "Agregar Producto"}</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-6">
                        <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                        <input className="form-control mb-2" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} required />
                        <textarea className="form-control mb-2" name="instrucciones" placeholder="Instrucciones" value={formData.instrucciones} onChange={handleChange} required />
                        <input className="form-control mb-2" name="precio" type="number" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
                        <input className="form-control mb-2" name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
                        <input className="form-control mb-2" type="file" accept="image/*" onChange={handleFileChange} />
                        <input className="form-control mb-2" placeholder="o pega una URL de imagen" value={formData.imagenUrl} onChange={handleUrlChange} />
                        {preview && <img src={preview} alt="preview" className="img-thumbnail mb-2" style={{ maxHeight: 200 }} />}
                        <button type="submit" className="btn btn-primary w-100">
                            {editId ? "Guardar Cambios" : "Agregar Producto"}
                        </button>
                    </div>
                </div>
            </form>

            <hr />

            <h4>Lista de productos</h4>
            {loading ? <p>Cargando...</p> : (
                <div className="row">
                    {listaProducts.map(product => (
                        <div key={product._id} className="col-md-4 mb-3">
                            <div className="card">
                                <img src={product.imagen} className="card-img-top" alt={product.nombre} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.nombre}</h5>
                                    <p className="card-text">{product.instrucciones}</p>
                                    <p className="card-text"><strong>Precio:</strong> Q{product.precio}</p>
                                    <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                                    <p className="card-text"><strong>Categoría:</strong> {product.categoria?.nombre}</p>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditClick(product)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteProductos(product._id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>  
            )}
        </div>
        </Layout>
    );
};

export default ProductsAdmin;