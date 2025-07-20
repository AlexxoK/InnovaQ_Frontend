import axios from 'axios'
import { useLogout } from '../shared/hooks/useLogout'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/InnovaQ/v1',
    timeout: 10000,
    
})


apiClient.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user')

        if (storedUser) {
            try {
                const {token} = JSON.parse(storedUser)
                if(token) {
                    config.headers["x-token"] = token;
                }
            } catch (error) {
                console.log("Error en el interceptor de la petición", error)
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const login = async (data) => {
    return await apiClient.post('auth/login', data)
}

export const getListUser = async () => {
    return await apiClient.get('usuarios/getUsuarios')
}

export const numeroClientes = async () => {
    return await apiClient.get('usuarios/numeroClientes')
}

export const addProductos = async (data) => {
    return await apiClient.post('productos/agregar', data)
}

export const listProductos = async () => {
    return await apiClient.get('productos/lista')
}

export const editProductos = async (id, data) => {
    return await apiClient.put(`productos/actualizar/${id}`, data)
}

export const deleteProductos = async (id) => {
    return await apiClient.delete(`productos/eliminar/${id}`)
}

export const productosMasVendidos = async () => {
    return await apiClient.get('productos/mas-vendidos')
}

export const promedioCalificacion = async () => {
    return await apiClient.get('calificacion/promedio')
}

export const listaCategorias = async () => {
    return await apiClient.get('categorias/getCategorias')
}