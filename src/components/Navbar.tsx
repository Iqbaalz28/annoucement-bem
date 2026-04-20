import { CONFIG } from '../config';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <img
            src="/logo-bem.png"
            alt={`Logo ${CONFIG.ORG_NAME}`}
            className="navbar-logo"
          />
          <span className="navbar-title">{CONFIG.ORG_NAME}</span>
        </div>
      </div>
    </nav>
  );
}
