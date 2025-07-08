import { useRoutes } from "react-router-dom";
import PrivateRoutes from "../../components/PrivateRoutes";
import Login from "../../components/Auth/Login.jsx"
import Dashboard from "../../components/Dashboard/Dashboard.jsx";

 const AppRoutes = () => {
    const routes = useRoutes([
        { path: "/", element: <Login /> },
        {
            path: "/dashboard", element: (
                <PrivateRoutes>
                    <Dashboard />
                </PrivateRoutes>
            )
        }
    ])
    return routes;
}

export default AppRoutes;