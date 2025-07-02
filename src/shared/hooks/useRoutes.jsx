import { useRoutes } from "react-router-dom";
import PrivateRoutes from "../../components/PrivateRoutes";

export const AppRoutes = () => {
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
            path: "/listar-productos", element: (
                <PrivateRoutes>
                    <ListarProductos />
                </PrivateRoutes>
            )
        },
    ])
    return routes;
}