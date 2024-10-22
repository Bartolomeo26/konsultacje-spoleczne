import { Link } from "react-router-dom";
import classes from '../styles/MainNavigation.module.css';
import logo from '../assets/logo.png'
function MainNavigation()
{
    return (
        <>
            <header className="bg-cyan-800">
                <Link to='/'><img className={classes.logo} src={logo} alt="logo" /></Link>
                <nav>
                    <ul className={classes.nav__links}>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/communities'>Communities</Link>
                        </li>
                        <li>
                            <Link to='/communities/new'>Create a Community</Link>
                        </li>
                        <li>
                            <Link to='/faq'>FAQ</Link>
                        </li>
                    </ul>
                </nav>
                <div>

                    <Link to="/signup"><button className={classes.button}>Sign In</button></Link>
                </div>
            </header>

        </>);
}

export default MainNavigation;