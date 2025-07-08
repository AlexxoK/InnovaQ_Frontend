import { useState } from "react";
import { useLogin } from "../../shared/hooks/useLogin";
import "./login.css"; // Archivo CSS personalizado
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";

const Login = () => {
  const [usernameOrCorreo, setUsernameOrCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useLogin();
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin(usernameOrCorreo, password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center p-4 login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white border-opacity-20">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
              <p className="text-blue-200">Inicia sesión para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${isFocused.username ? 'text-blue-400' : 'text-blue-200'}`}>
                  {usernameOrCorreo.includes('@') ? <HiOutlineMail size={20} /> : <FaUser size={18} />}
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border ${isFocused.username ? 'border-blue-400' : 'border-transparent'} rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:bg-opacity-20 transition-all duration-300`}
                  placeholder="Usuario o Correo"
                  value={usernameOrCorreo}
                  onChange={(e) => setUsernameOrCorreo(e.target.value)}
                  onFocus={() => setIsFocused({...isFocused, username: true})}
                  onBlur={() => setIsFocused({...isFocused, username: false})}
                  required
                />
              </div>

              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${isFocused.password ? 'text-blue-400' : 'text-blue-200'}`}>
                  <FaLock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border ${isFocused.password ? 'border-blue-400' : 'border-transparent'} rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:bg-opacity-20 transition-all duration-300`}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused({...isFocused, password: true})}
                  onBlur={() => setIsFocused({...isFocused, password: false})}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-200 hover:text-blue-400 transition-colors duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-80' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : 'Iniciar Sesión'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-blue-200 text-sm">
                ¿No tienes una cuenta?{' '}
                <a 
                  href="/register" 
                  className="text-white font-medium hover:text-blue-300 transition-colors duration-300 underline underline-offset-4"
                >
                  Regístrate ahora
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Elementos decorativos */}
      <div className="login-decorator-1"></div>
      <div className="login-decorator-2"></div>
      <div className="login-decorator-3"></div>
    </div>
  );
};

export default Login;