import { useState } from "react";
import Swal from "sweetalert2";
import { pedidosPorUsuario } from "../../services/api";


export const useClienteDashbordHook = () => {
    const [pedidosClient, setPedidosClient] = useState([])

    const handlePedidosClient = async () => {
        try {
            const response = await pedidosPorUsuario();
            console.log(response, "PedidosClient");
            setPedidosClient(response.data.pedidos);
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error',
                icon: 'error'
            })
        }
    }

    return {pedidosClient, handlePedidosClient}
}