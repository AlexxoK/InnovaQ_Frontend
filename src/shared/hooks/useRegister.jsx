import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import { toast } from "react-toastify";


export const useRegister = () => {

    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            await register(data);
            navigate("/", { state: { message: "Registrado satisfactoriamente!" } });
        } catch (error) {
            console.error("Error al registrar:", error.response?.data || error.message);
            const message = error.response?.data?.error || "Error al registrar!";
            toast.error(` Email o Username ya existen!`)

        }
    };

    return { handleRegister };

}