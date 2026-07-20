import {createContext, useContext} from "react";
import {useCurrentUser} from "../hooks/useAuth.js";

const AuthContext = createContext({ user: null, isLoading: false})

export function AuthProvider({children}) {
    const {data: user, isLoading} = useCurrentUser()

    if (isLoading) {
        return
    }

    return (
        <AuthContext.Provider value={{ user:user ?? null, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}