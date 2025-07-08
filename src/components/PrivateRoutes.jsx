import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(user.role)) {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes permiso para acceder a este sitio.',
            background: '#1f2937',
            color: 'white'
        })
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}

export default PrivateRoutes;