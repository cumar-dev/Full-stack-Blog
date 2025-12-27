import { createContext, useContext, useEffect, useState } from "react";
import { authChange, getUserProfile } from "../Lib/Auth";

export const AuthContext = createContext(null);

export function AuthtProvider({children}) {
const [user, setUser] = useState(null);
const [profile, setProfile] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
const cleanUp = authChange(async (user) => {
    setUser(user);

    if(user) {
        try {
            const profile = await getUserProfile(user.id);
            setProfile(profile);
            
        } catch (error) {
            console.error("error fetching user profile", error)
        }
    }else {
        setProfile(null);
    }

   setIsLoading(false);
})
 return cleanUp;
}, [])

const value = {
    user,
    profile,
    isLoading,
    isLoggedIn: !!user
}
return (
   < AuthContext.Provider value={value}>
    {children}
   </AuthContext.Provider>
)
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(context === null) {
        throw new Error('useAuth must be used with in auth provider')
    }

    return context;
}