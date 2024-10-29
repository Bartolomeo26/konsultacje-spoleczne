import { Form, Link, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import classes from '../styles/MainNavigation.module.css';
import logo from '../assets/logo.png';

function MainNavigation()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Stan do zarządzania dropdownem
    const token = useRouteLoaderData("root");


    return (
        <header className="bg-cyan-800 p-4 px-10 flex justify-between items-center">
            <Link to='/'><img className={classes.logo} src={logo} alt="logo" /></Link>

            {/* Mobile Menu Button */}
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
                        <Link to='/' onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to='/communities' onClick={() => setIsMenuOpen(false)}>Communities</Link>
                    </li>
                    <li>
                        <Link to='/communities/new' onClick={() => setIsMenuOpen(false)}>Create a Community</Link>
                    </li>
                    <li>
                        <Link to='/faq' onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                    </li>
                </ul>
            </nav>

            {token ? (
                <div className="relative">
                    {/* Przycisk do rozwijania dropdowna */}
                    <button onClick={() => setIsDropdownOpen(prev => !prev)} className={classes.button}>
                        Menu
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 bg-white shadow-lg rounded mt-2" >
                            <ul className="flex flex-col" >
                                <li>
                                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-200" style={{ color: "rgba(0, 136, 169, 1)" }}>Profile</Link>
                                </li>
                                <li>
                                    <Form action="/logout" method='post'>
                                        <button type="submit" style={{ color: "rgba(0, 136, 169, 1)" }} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                                            Sign Out
                                        </button>
                                    </Form>
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
