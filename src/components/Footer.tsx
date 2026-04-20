import { MapPin, Phone, Mail, User } from 'lucide-react';
import { CONFIG } from '../config';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-top-line"></div>
      <div className="footer-inner">
        <div className="footer-section">
          <h3 className="footer-heading">Kontak</h3>
          <div className="footer-heading-line">
            <span className="fhl-green"></span>
            <span className="fhl-gold"></span>
          </div>
          <div className="footer-items">
            <div className="footer-item">
              <User size={16} />
              <a href="https://wa.me/6289622495656" target="_blank" rel="noopener noreferrer">
                Ketua BEM Kemakom
              </a>
            </div>
            <div className="footer-item">
              <Phone size={16} />
              <a href="https://wa.me/6283820086820" target="_blank" rel="noopener noreferrer">
                Sekretaris BEM Kemakom
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Informasi</h3>
          <div className="footer-heading-line">
            <span className="fhl-green"></span>
            <span className="fhl-gold"></span>
          </div>
          <div className="footer-items">
            <div className="footer-item">
              <MapPin size={16} />
              <span>{CONFIG.CONTACT_ADDRESS}</span>
            </div>
            <div className="footer-item">
              <Phone size={16} />
              <span>{CONFIG.CONTACT_PHONE}</span>
            </div>
            <div className="footer-item">
              <Mail size={16} />
              <a href={`mailto:${CONFIG.CONTACT_EMAIL}`}>{CONFIG.CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {CONFIG.ORG_NAME} — {CONFIG.UNIVERSITY}</p>
      </div>
    </footer>
  );
}
