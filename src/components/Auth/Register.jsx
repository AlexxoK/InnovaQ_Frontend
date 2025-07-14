import React, { useState } from "react";
import { useRegister } from "../../shared/hooks/useRegister";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const { handleRegister } = useRegister();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        username: "",
        correo: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "CLIENTE",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({
        nombre: false,
        apellido: false,
        username: false,
        correo: false,
        password: false,
        confirmPassword: false,
        phone: false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { confirmPassword, ...registerData } = formData;
        await handleRegister(registerData);
    }

    return (
        <div className="register-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="register-card"
            >
                <div className="register-content">
                    <h2 className="register-title">Registro</h2>
                    <form onSubmit={handleSubmit} className="register-form">
                        {["nombre", "apellido", "username", "correo", "password", "confirmPassword", "phone"].map((field, index) => (
                            <div className="input-group" key={index}>
                                <div className={`input-icon ${isFocused[field] ? "focused" : ""}`}>
                                    {field === "nombre" || field === "apellido" || field === "username" ? (
                                        <FaUser />
                                    ) : field === "correo" ? (
                                        <HiOutlineMail />
                                    ) : field === "password" || field === "confirmPassword" ? (
                                        <FaLock />
                                    ) : field === "phone" ? (
                                        <FaPhoneAlt />
                                    ) : null}
                                </div>
                                <input
                                    type={field === "password" || field === "confirmPassword" ? (showPassword ? "text" : "password") : "text"}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    onFocus={() => setIsFocused({ ...isFocused, [field]: true })}
                                    onBlur={() => setIsFocused({ ...isFocused, [field]: false })}
                                    required
                                    placeholder={field === "confirmPassword" ? "Confirmar Contraseña" : field.charAt(0).toUpperCase() + field.slice(1)}
                                    className="register-input"
                                    maxLength={field === "phone" ? 8 : 25}
                                    minLength={field === "phone" ? 8 : undefined}
                                />
                                {(field === "password" || field === "confirmPassword") && (
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                )}
                            </div>
                        ))}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="register-button"
                        >
                            Registrarse
                        </motion.button>
                    </form>

                    <p className="login-link-container">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Register;