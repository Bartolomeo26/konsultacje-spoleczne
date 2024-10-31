import { Link } from 'react-router-dom';
function Footer()
{
    return (

        <footer className="mt-auto py-3 px-2 bg-cyan-800">
            <div className="flex justify-between px-3">
                <span className="text-white">&copy; Dialogue Bridge</span>
                <ul className='flex justify-around'>
                    <li className='px-2'>
                        <Link to='/test'>Test</Link>
                    </li>
                    <li className='px-2'>
                        <Link to='/rules'>Rules</Link>
                    </li>
                    <li className='px-2'>
                        <Link to='/information-clause'>Information clause</Link>
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