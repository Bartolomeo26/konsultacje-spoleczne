import { Link } from 'react-router-dom';
import classes from '../styles/Footer.module.css';
function Footer()
{
    return (

        <footer className="mt-auto py-3 px-2 bg-cyan-800">
            <div className="flex justify-between px-3">
                <span className="text-white">&copy; Social Consultations</span>
                <ul className='flex justify-around'>
                    <li className='px-2'>
                        <Link to='/products'>Rules</Link>
                    </li>
                    <li className='px-2'>
                        <Link to='/products'>Information clause</Link>
                    </li>
                    <li className='px-2'>
                        <Link to='/contact'>Contact</Link>
                    </li>
                </ul>

            </div>
        </footer>
    );
}

export default Footer;