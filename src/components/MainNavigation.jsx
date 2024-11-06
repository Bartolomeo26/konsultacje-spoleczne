import { Form, Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from '../styles/MainNavigation.module.css';
import logo from '../assets/logo.png';
import { useAuth } from "../util/AuthContext";
import { getSelf } from '../util/fetch'
import { useQuery, useQueryClient } from "@tanstack/react-query";

function MainNavigation()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { token, removeToken } = useAuth();

    const navigate = useNavigate();

    const { data: user, refetch } = useQuery({
        queryKey: ['userData', token],
        queryFn: () => getSelf(token),
        enabled: false,
        cacheTime: 0,
        onSuccess: (data) =>
        {
            console.log("Dane pobrane:", data);
        },
    });

    useEffect(() =>
    {
        refetch();
        console.log(user)
    }, [token, refetch]);

    const handleSignOut = () =>
    {
        removeToken();
        setIsDropdownOpen(false);
        navigate('/')

    }

    return (
        <header className="bg-cyan-800 p-4 px-10 flex justify-between items-center">
            <Link to='/'><div className="flex items-center text-white"><img className={classes.logo} src={logo} alt="logo" /><h1>Dialogue Bridge</h1></div></Link>


            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white p-2"
                aria-label="Toggle Menu"
            >
                ☰
            </button>

            <nav className={`${isMenuOpen ? "block" : "hidden"} md:flex`}>
                <ul className={`md:flex space-y-4 md:space-y-0 md:space-x-8 ${classes.nav__links}`}>
                    <li>
                        <Link to='/' onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false) }}>Home</Link>
                    </li>
                    <li>
                        <Link to='/communities' onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false) }}>Communities</Link>
                    </li>
                    <li>
                        <Link to='/communities/new' onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false) }}>Create a Community</Link>
                    </li>
                    <li>
                        <Link to='/faq' onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false) }}>FAQ</Link>
                    </li>
                </ul>
            </nav>

            {token ? (
                <div className="relative">
                    {/* Przycisk do rozwijania dropdowna */}
                    {user ?
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className={classes.button}>
                            Hello, {user.name}!
                        </button> : <button onClick={() => setIsDropdownOpen(prev => !prev)} className={classes.button}>
                            Hello!
                        </button>
                    }
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 bg-white shadow-lg rounded mt-2 z-10" >
                            <ul className="flex flex-col" >
                                {user &&
                                    <li>
                                        <Link to={"/users/" + user.id} onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-200" style={{ color: "rgba(0, 136, 169, 1)" }}>Profile</Link>
                                    </li>}
                                <li>

                                    <button onClick={handleSignOut} style={{ color: "rgba(0, 136, 169, 1)" }} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                                        Sign Out
                                    </button>

                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="hidden md:block">
                    <Link to="/signup">
                        <button type="button" className={classes.button}>Sign In</button>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default MainNavigation;
