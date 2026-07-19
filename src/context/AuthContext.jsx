import {createContext, useContext} from "react";
import {useCurrentUser} from "../hooks/useAuth.js";

const AuthContext = createContext({ user: null, isLoading: false})

export function AuthProvider({children}) {
    const {data: user, isLoading} = useCurrentUser()

    return (
        <AuthContext.Provider value={{ user:user ?? null, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}