import { useState } from "react"
import { logout as logoutHandler } from "./useLogout.jsx"

const getUserDetails = () => {
    const userDetails = localStorage.getItem("usuario")
    if (userDetails) {
        return JSON.parse(userDetails)
    } else {
        return null
    }
}


export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails())
    const logout = () => {
        logoutHandler()
    }

    return {
        isLogged: Boolean(userDetails),
        username: userDetails?.username ? userDetails.username : 'Guest',
        logout,
    }
}