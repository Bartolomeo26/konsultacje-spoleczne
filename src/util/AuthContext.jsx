import { createContext, useContext, useState, useEffect } from 'react';
import { getSelf } from './fetch';

const AuthContext = createContext();

export function AuthProvider({ children })
{
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loggedUser, setLoggedUser] = useState(null);


    const updateToken = (newToken) =>
    {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        fetchUser(newToken);
    };

    const removeToken = () =>
    {
        setToken(null);
        setLoggedUser(null);
        localStorage.removeItem('token');
    };


    const fetchUser = async (authToken) =>
    {
        console.log("fetchuje usera authcontext")
        try
        {
            const userData = await getSelf(authToken);
            console.log('nowy', userData)
            setLoggedUser(userData);
        } catch (error)
        {
            console.error("Błąd przy pobieraniu danych użytkownika:", error);
            removeToken();
        }
    };
    const refetchUser = () =>
    {
        if (token)
        {
            fetchUser(token);
        }
    };

    useEffect(() =>
    {
        if (token && !loggedUser)
        {
            fetchUser(token);
        }
    }, [token, loggedUser]);

    return (
        <AuthContext.Provider value={{ token, loggedUser, updateToken, removeToken, refetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
