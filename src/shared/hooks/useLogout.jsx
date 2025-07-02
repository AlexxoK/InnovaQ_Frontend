export const useLogout = () => {
    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }
    return logout;
}