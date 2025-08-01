import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    savePedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido,
    listProductos
} from '../../services/api';

const usePedidos = () => {
    const [formState, setFormState] = useState({
        id: null,
        direccion: '',
    });

    const [productos, setProductos] = useState([]);
    const [listaProducts, setListaProducts] = useState([]);
    const [pedidosList, setPedidosList] = useState([]);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);

    const getUserIdFromToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decodedToken = JSON.parse(jsonPayload);
            const userId = decodedToken.uid || decodedToken.id || decodedToken._id;
            if (!userId) {
                return null;
            }
            return userId;
        } catch (err) {
            return null;
        }
    };

    const showErrorAlert = (err) => {
        const backendError = err.response && err.response.data;
        const text = backendError?.error || backendError?.msg || err.message || 'Ocurrió un error inesperado.';
        Swal.fire({
            title: 'Error',
            text: text,
            icon: 'error'
        });
    };

    useEffect(() => {
        const newTotal = productos.reduce((acc, item) => {
            const productInfo = listaProducts.find(p => p._id === item._id);
            if (productInfo) {
                return acc + (productInfo.precio * item.cantidad);
            }
            return acc;
        }, 0);
        setTotal(newTotal);
    }, [productos, listaProducts]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setUserLoading(true);

            let id = null;
            try {
                const userString = localStorage.getItem('user');
                if (userString) {
                    const user = JSON.parse(userString);
                    id = getUserIdFromToken(user.token);
                    setCurrentUserId(id);
                } else {
                }
            } catch (error) {
            } finally {
                setUserLoading(false);
            }

            if (id) {
                try {
                    const productsResponse = await listProductos();
                    setListaProducts(productsResponse.data.productos);

                    const pedidosResponse = await getPedidos();
                    const allPedidos = pedidosResponse.data.pedidos;

                    const filtered = allPedidos.filter(pedido => {
                        let pedidoUserId = null;
                        if (pedido.user) {
                            if (typeof pedido.user === 'object') {
                                pedidoUserId = pedido.user.uid || pedido.user._id;
                            }
                            else if (typeof pedido.user === 'string') {
                                pedidoUserId = pedido.user;
                            }
                        }
                        
                        return pedidoUserId === id;
                    });
                    setPedidosList(filtered);

                } catch (err) {
                    showErrorAlert(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setListaProducts([]);
                setPedidosList([]);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddProducto = () => {
        const firstProductId = listaProducts.length > 0 ? listaProducts[0]._id : '';
        setProductos(prev => [...prev, { _id: firstProductId, cantidad: 1 }]);
    };

    const handleRemoveProducto = (index) => {
        setProductos(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpdateCantidad = (index, cantidad) => {
        setProductos(prev => prev.map((item, i) => i === index ? { ...item, cantidad: Number(cantidad) } : item));
    };

    const handleSelectProducto = (index, value) => {
        setProductos(prev => prev.map((item, i) => i === index ? { ...item, _id: value } : item));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formState.direccion) {
                Swal.fire({
                    title: 'Error de validación',
                    text: 'La dirección es un campo obligatorio.',
                    icon: 'warning'
                });
                return;
            }

            if (productos.length === 0) {
                Swal.fire({
                    title: 'Error de validación',
                    text: 'Debe agregar al menos un producto.',
                    icon: 'warning'
                });
                return;
            }

            let userIdToSend = currentUserId;
            if (!userIdToSend) {
                const userString = localStorage.getItem('user');
                if (userString) {
                    const user = JSON.parse(userString);
                    userIdToSend = getUserIdFromToken(user.token);
                }
            }
            
            if (!userIdToSend) {
                Swal.fire({
                    title: 'Error de usuario',
                    text: 'No se encontraron datos de usuario. Por favor, inicie sesión nuevamente.',
                    icon: 'error'
                });
                setLoading(false);
                return;
            }

            const productsToSend = productos.map(item => {
                const productInfo = listaProducts.find(p => p._id === item._id);
                return {
                    producto: productInfo ? productInfo.nombre : '',
                    cantidad: item.cantidad
                };
            });

            const data = {
                direccion: formState.direccion,
                productos: productsToSend,
                total,
                user: userIdToSend
            };

            let response;
            const token = JSON.parse(localStorage.getItem('user')).token;

            if (formState.id) {
                response = await updatePedido(formState.id, data, token);
                setPedidosList(prev => prev.map(p => p._id === formState.id ? response.data.pedidoDetails : p));
                Swal.fire({
                    title: 'Éxito',
                    text: response.data.msg || 'Pedido actualizado con éxito.',
                    icon: 'success',
                    timer: 1500
                });
            } else {
                response = await savePedido(data, token);
                setPedidosList(prev => [response.data.pedidoDetails, ...prev]);
                Swal.fire({
                    title: '¡Pedido Creado!',
                    html: `Tu pedido ha sido creado con éxito. <br/> Tienes <b>una hora</b> para editarlo o eliminarlo.`,
                    icon: 'success'
                });
            }

            resetForm();
        } catch (err) {
            showErrorAlert(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePedido = async (id) => {
        setLoading(true);
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await deletePedido(id, token);
            setPedidosList(prev => prev.filter(p => p._id !== id));
            Swal.fire({
                title: 'Éxito',
                text: response.data.msg || 'Pedido eliminado con éxito.',
                icon: 'success',
                timer: 1500
            });
        } catch (err) {
            showErrorAlert(err);
        } finally {
            setLoading(false);
        }
    };

    const loadPedidoForEdit = async (id) => {
        setLoading(true);
        try {
            const response = await getPedidoById(id);
            const pedido = response.data.pedido;
            setFormState({
                id: pedido._id,
                direccion: pedido.direccion,
            });
            setProductos(pedido.productos.map(item => ({ _id: item.producto._id, cantidad: item.cantidad })));
        } catch (err) {
            showErrorAlert(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormState({ id: null, direccion: '' });
        setProductos([]);
    };

    return {
        formState,
        productos,
        total,
        listaProducts,
        pedidosList,
        loading,
        userLoading,
        handleChange,
        handleAddProducto,
        handleRemoveProducto,
        handleUpdateCantidad,
        handleSelectProducto,
        handleSubmit,
        handleDeletePedido,
        loadPedidoForEdit,
        resetForm
    };
};

export default usePedidos;
