import { createContext, useContext, useEffect, useState } from "react";
import { authChange, getUserProfile, signOut } from "../Lib/Auth";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
const [user, setUser] = useState(null);
const [profile, setProfile] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
const cleanUp = authChange(async (user) => {
    setUser(user);

    if(user) {
        try {
            const profile = await getUserProfile(user.id);
            // console.log('profle data get', profile);
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

const logOut = async () => {
try {
    await signOut();
} catch (error) {
    console.error('error exist so singout not works...')
}
}

const value = {
    user,
    profile,
    isLoading,
    isLoggedIn: !!user,
    logOut
}
// console.log("profile", profile);
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