import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'

export default function Navbar() {
    const { user, logout } = useAuth();
    return (
            <nav className="navbar">
                <div className="navbar-container">
                    <div>
                        <Link className='navbar-brand' to="/">Market</Link>
                    </div>

                    <div className="navbar-links">
                        <Link className='navbar-link' to="/">Home</Link>
                        <Link className='navbar-link' to="/checkout">Checkout</Link>
                    </div>


                    <div className="navbar-auth">
                        { !user ? (
                            <>
                            <Link className='btn btn-secondary' to="/auth">Login</Link>
                            <Link className='btn btn-primary' to="/auth">Register</Link>
                            </>
                        ) : (
                            <><span>Hello, {user}</span><button className='btn btn-secondary' onClick={logout}>Logout</button></>
                        )
                    }
                    </div>
                </div>
                
            </nav>
    );
}