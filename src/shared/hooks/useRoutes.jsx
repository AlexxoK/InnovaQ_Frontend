import { useRoutes } from "react-router-dom";
import PrivateRoutes from "../../components/PrivateRoutes";
import Login from "../../components/Auth/Login.jsx"
import Register from "../../components/Auth/Register.jsx"
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import CalificacionCliente from "../../components/Calificaciones/CalificacionCliente.jsx";
import CalificacionAdmin from "../../components/Calificaciones/ClasificacionAdmin.jsx";
import ProductsAdmin from "../../components/Products/ProductsAdmin.jsx";
import ProductsCliente from "../../components/Products/ProductsCliente.jsx";
import CategoriaAdmin from "../../components/Categorias/CategoriaAdmin.jsx";
import CategoriaCliente from "../../components/Categorias/CategoriaCliente.jsx";
import FacturasPage from "../../components/Facturas/FacturaPage.jsx";
import PedidosForm from "../../components/Pedidos/PedidosForm.jsx";
import AdminPedidos from "../../components/Pedidos/AdminPedidos.jsx";



const AppRoutes = () => {
    const routes = useRoutes([
        { path: "/", element: <Login /> },

        { path: "/register", element: <Register /> },

        {
            path: "/dashboard", element: (
                <PrivateRoutes>
                    <Dashboard />
                </PrivateRoutes>
            )
        },
        {
            path: "/ClientCalificaciones", element: (
                <PrivateRoutes roles={['CLIENTE']}>
                    <CalificacionCliente />
                </PrivateRoutes>
            )
        },
        {
            path: "/AdminCalificaciones", element: (
                <PrivateRoutes roles={['ADMIN']}>
                    <CalificacionAdmin />
                </PrivateRoutes>
            )
        },
        {
            path: "/ClientProductos", element: (
                <PrivateRoutes roles={['CLIENTE']}>
                    <ProductsCliente />
                </PrivateRoutes>
            )
        },
        {
            path: "/AdminProductos", element: (
                <PrivateRoutes roles={['ADMIN']}>
                    <ProductsAdmin />
                </PrivateRoutes>
            )
        },
        {
            path: "/CategoriaAdmin", element: (
                <PrivateRoutes roles={['ADMIN']}>
                    <CategoriaAdmin />
                </PrivateRoutes>
            )
        },
        {
            path: "/CategoriaCliente", element: (
                <PrivateRoutes roles={['CLIENTE']}>
                    <CategoriaCliente />
                </PrivateRoutes>
            )
        },{
            path: "/Facturas", element: (
                <PrivateRoutes >
                    <FacturasPage />
                </PrivateRoutes>
            )
        },
        {
            path: "/PedidoCliente", element: (
                <PrivateRoutes roles={['CLIENTE']}>
                    <PedidosForm />
                </PrivateRoutes>
            )
        },
        {
            path: "/PedidoAdmin", element: (
                <PrivateRoutes roles={['ADMIN']}>
                    <AdminPedidos />
                </PrivateRoutes>
            )
        }
    ])
    return routes;
}

export default AppRoutes;