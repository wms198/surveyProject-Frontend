import { link } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Die psychologische Fakultät</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">Admin</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;