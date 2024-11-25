import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import classes from '../styles/MainNavigation.module.css';
import logo from '../assets/logo.png';
import { useAuth } from "../util/AuthContext";
import { Menu, X, User, LogOut } from 'lucide-react';

function MainNavigation()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { token = null, removeToken, loggedUser } = useAuth();
    const dropdownRef = useRef(null); // Ref do dropdowna
    const navigate = useNavigate();

    const handleSignOut = () =>
    {
        removeToken();
        setIsDropdownOpen(false);
        navigate('/');
    };

    const handleClickOutside = (event) =>
    {
        // Sprawdzamy, czy kliknięcie nie było w dropdownie
        if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() =>
    {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
        {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-cyan-800 p-4 px-10 flex justify-between items-center">
            <Link to='/'><div className="flex items-center text-white"><img className={classes.logo} src={logo} alt="logo" /><h1>Dialogue Bridge</h1></div></Link>


            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white p-2"
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                    
                    {loggedUser ?
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className={classes.button}>
                            Hello, {loggedUser.name}!
                        </button> : <button onClick={() => setIsDropdownOpen(prev => !prev)} className={classes.button}>
                            Hello!
                        </button>
                    }
                    
                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 bg-white shadow-lg rounded mt-2 z-10"
                            ref={dropdownRef}
                        >
                            <ul className="flex flex-col">
                                {loggedUser && (
                                    <li>
                                        <Link
                                            to={"/users/" + loggedUser.id}
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center px-4 py-2 hover:bg-gray-200 hover:rounded-t"
                                            style={{ color: "rgba(0, 136, 169, 1)" }}
                                        >
                                            <User size={18} className="mr-2" />
                                            Profile
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={() =>
                                        {
                                            setIsDropdownOpen(false);
                                            handleSignOut();
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200 hover:rounded-b"
                                        style={{ color: "rgba(0, 136, 169, 1)" }}
                                    >
                                        <LogOut size={18} className="mr-2" />
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
