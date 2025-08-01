import { useEffect, useState } from "react";
import { useProductsHook } from "../../shared/hooks/useProductos";
import { useCategorias } from "../../shared/hooks/useCategorias";
import Layout from "../Layout/Layout.jsx";
import {
    PlusCircle,
    Edit2,
    Trash2,
    X,
    Check,
    Image as ImageIcon,
    Loader2,
    ChevronDown
} from 'lucide-react';

const ProductsAdmin = () => {
    const {
        listaProducts,
        handleGetListProducts,
        handleAddProductos,
        handleEditProductos,
        handleDeleteProductos,
        loading
    } = useProductsHook();

    const {
        handleGetCategorias,
        categorias,
        loading: loadingCategories
    } = useCategorias();

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        handleGetListProducts();
        handleGetCategorias();
        setMounted(true);
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
        setIsSubmitting(true);

        try {
            const data = new FormData();

            data.append("nombre", formData.nombre);
            data.append("categoria", formData.categoria);
            data.append("instrucciones", formData.instrucciones);
            data.append("precio", formData.precio);
            data.append("stock", formData.stock);

            if (formData.imagen) {
                data.append("imagen", formData.imagen);
            } else if (formData.imagenUrl) {
                data.append("imagen", formData.imagenUrl);
            }

            if (editId) {
                await handleEditProductos(editId, data);
                setEditId(null);
            } else {
                await handleAddProductos(data);
            }

            resetForm();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: "",
            categoria: "",
            instrucciones: "",
            precio: "",
            stock: "",
            imagen: null,
            imagenUrl: ""
        });
        setPreview(null);
    };

    const handleEditClick = (product) => {
        setEditId(product._id);
        setFormData({
            nombre: product.nombre,
            categoria: product.categoria?._id || "",
            instrucciones: product.instrucciones,
            precio: product.precio,
            stock: product.stock,
            imagen: null,
            imagenUrl: product.imagen
        });
        setPreview(product.imagen);
    };

    const cancelEdit = () => {
        setEditId(null);
        resetForm();
    };

    return (
        <Layout>
            <div className={`container mx-auto px-4 py-8 transition-all duration-500 ease-in-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {/* Form Section */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-indigo-100">
                    <h3 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
                        {editId ? (
                            <>
                                <Edit2 className="mr-2 animate-pulse" size={24} />
                                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                    Editar Producto
                                </span>
                            </>
                        ) : (
                            <>
                                <PlusCircle className="mr-2 " size={24} />
                                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                    Agregar Producto
                                </span>
                            </>
                        )}
                    </h3>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="mb-4">
                                    <label className="block text-indigo-700 text-sm font-medium mb-2" htmlFor="nombre">
                                        Nombre del Producto
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                                        name="nombre"
                                        placeholder="Nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-indigo-700 text-sm font-medium mb-2" htmlFor="categoria">
                                        Categoría
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none pr-8 bg-white shadow-sm transition-all duration-200"
                                            name="categoria"
                                            value={formData.categoria}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Seleccione una categoría</option>
                                            {categorias.map(categoria => (
                                                <option key={categoria._id} value={categoria.nombre}>
                                                    {categoria.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-3 text-indigo-400 " size={18} />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-indigo-700 text-sm font-medium mb-2" htmlFor="instrucciones">
                                        Instrucciones
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] shadow-sm transition-all duration-200"
                                        name="instrucciones"
                                        placeholder="Instrucciones"
                                        value={formData.instrucciones}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="mb-4">
                                    <label className="block text-indigo-700 text-sm font-medium mb-2" htmlFor="precio">
                                        Precio (Q)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-indigo-500">Q</span>
                                        <input
                                            className="w-full pl-8 pr-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200"
                                            name="precio"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={formData.precio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-indigo-700 text-sm font-medium mb-2" htmlFor="stock">
                                        Stock
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-indigo-700 text-sm font-medium mb-2">
                                        Imagen del Producto
                                    </label>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <label className="flex-1 cursor-pointer bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center border border-indigo-200 shadow-sm hover:shadow-md">
                                            <ImageIcon className="mr-2 animate-pulse" size={16} />
                                            Subir imagen, Solo imagenes con formato .png, .webp, .jpg o .jpeg
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <span className="text-indigo-500 font-medium">o</span>
                                    </div>
                                    <input
                                        className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200"
                                        placeholder="Pega una URL de imagen"
                                        value={formData.imagenUrl}
                                        onChange={handleUrlChange}
                                    />
                                </div>

                                {preview && (
                                    <div className="mb-4 transition-all duration-500 animate-fade-in">
                                        <p className="text-sm text-indigo-600 mb-1">Vista previa:</p>
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="rounded-lg border-2 border-indigo-200 max-h-40 object-contain shadow-md transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            {editId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 rounded-lg flex items-center transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-1"
                                >
                                    <X className="mr-2" size={18} />
                                    Cancelar
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isSubmitting ? 'opacity-75' : ''}`}
                            >
                                {isSubmitting ? (
                                    <Loader2 className="mr-2 animate-spin" size={18} />
                                ) : (
                                    <Check className="mr-2" size={18} />
                                )}
                                {editId ? "Guardar cambios" : "Agregar producto"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className={`bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg p-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    <h4 className="text-xl font-bold text-indigo-800 mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            Lista de productos
                        </span>
                    </h4>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="animate-spin text-indigo-600" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listaProducts.map((product, index) => (
                                <div
                                    key={product._id}
                                    className={`border border-indigo-100 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 bg-white animate-fade-in-up`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={product.imagen}
                                            alt={product.nombre}
                                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h5 className="font-bold text-lg text-indigo-800 mb-2">{product.nombre}</h5>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.instrucciones}</p>

                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            <div className="bg-indigo-50 p-2 rounded-lg">
                                                <p className="text-xs text-indigo-500">Precio</p>
                                                <p className="font-medium text-indigo-700">Q{product.precio}</p>
                                            </div>
                                            <div className="bg-purple-50 p-2 rounded-lg">
                                                <p className="text-xs text-purple-500">Stock</p>
                                                <p className="font-medium text-purple-700">{product.stock}</p>
                                            </div>
                                            <div className="col-span-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-2 rounded-lg">
                                                <p className="text-xs text-indigo-500">Categoría</p>
                                                <p className="font-medium text-indigo-700">{product.categoria?.nombre || 'Sin categoría'}</p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditClick(product)}
                                                className="flex-1 bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 text-yellow-800 py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-all duration-300 shadow hover:shadow-md"
                                            >
                                                <Edit2 className="mr-1 animate-pulse" size={16} />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProductos(product._id)}
                                                className="flex-1 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-800 py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-all duration-300 shadow hover:shadow-md"
                                            >
                                                <Trash2 className="mr-1 animate-wiggle" size={16} />
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProductsAdmin;