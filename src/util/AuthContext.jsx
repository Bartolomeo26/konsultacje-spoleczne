import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children })
{
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Aktualizacja tokena przy zmianach w localStorage
    useEffect(() =>
    {
        const handleStorageChange = () =>
        {
            setToken(localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () =>
        {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const updateToken = (newToken) =>
    {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const removeToken = () =>
    {
        setToken(null);
        localStorage.removeItem('token');
    }



    return (
        <AuthContext.Provider value={{ token, updateToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
