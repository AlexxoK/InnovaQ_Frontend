import axios from 'axios'
import { useLogout } from '../shared/hooks/useLogout'

const api = axios.create({
    baseURL: 'http://localhost:3000/InnovaQ',
    timeout: 10000,
})


apiClient.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('usuario')

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