import { useState } from "react";
import Swal from "sweetalert2";
import { productosMasVendidos, getListUser, promedioCalificacion, numeroClientes, getPedidos, ingresosDiarios} from "../../services/api";


export const useAdminDashbordHook = () => {
    const [productosMasVendidosList, setProductosMasVendidosList] = useState([])
    const [listUser, setListUser] = useState([])
    const [promedio, setPromedio] = useState([])
    const [numeroClientesAll, setNumeroClientesAll] = useState([])
    const [pedidosAdmin, setPedidosAdmin] = useState([])
    const [ingresosDiariosList, setIngresosDiariosList] = useState([])
    const [loading, setLoading] = useState(false);

    const handleListMasVendidos = async () => {
        try{
            const response = await productosMasVendidos();
            console.log(response, "Mas vendidos");
            setProductosMasVendidosList(response.data.productoMasVendido);
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
    const handleListUsuario = async () => {
        try {
            const response = await getListUser();
            console.log(response, "ListaUsuario");
            setListUser(response.data.cliente);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }
    const handlePromedio = async () => {
        try {
            const response = await promedioCalificacion();
            console.log(response, "Promedio");
            setPromedio(response.data.promedioEstrellas);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }
    const handleNumeroClientes = async () => {
        try {
            const response = await numeroClientes();
            console.log(response, "NumeroClientes");
            setNumeroClientesAll(response.data.totalClientes);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }

    const handlePedidosAdmin = async () => {
        try {
            const response = await getPedidos();
            console.log(response, "PedidosAdmin");
            setPedidosAdmin(response.data.pedidos);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }

    const handleIngresosDiarios = async () => {
        try {
            const response = await ingresosDiarios();
            console.log(response, "IngresosDiarios");
            setIngresosDiariosList(response.data.ingresosTotales);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }

    
    return {productosMasVendidosList, handleListMasVendidos, listUser, handleListUsuario, promedio, handlePromedio, numeroClientesAll, handleNumeroClientes, pedidosAdmin, handlePedidosAdmin
        , ingresosDiariosList, handleIngresosDiarios
    }
}