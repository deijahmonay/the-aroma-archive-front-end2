import { Link } from 'react-router-dom';
import '../../app.css'; // Import your styles

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav className="navbar simple-navbar">
      <div className="navbar-logo">
        <Link to="/">Aroma Archive</Link>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/perfumes">Perfumes</Link></li>
            <li><Link to="/perfumes/new">New Perfume</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar
