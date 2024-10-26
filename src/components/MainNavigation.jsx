import { Link } from "react-router-dom";
import { useState } from "react";
import classes from '../styles/MainNavigation.module.css';
import logo from '../assets/logo.png';

function MainNavigation()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

            <div className="hidden md:block">
                <Link to="/signup">
                    <button type="button" className={classes.button}>Sign In</button>
                </Link>
            </div>
        </header>
    );
}

export default MainNavigation;
