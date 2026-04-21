import { useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, User } from 'lucide-react';
import { CONFIG } from '../config';
import gsap from 'gsap';
import './Footer.css';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate footer sections
            if (sectionsRef.current) {
              const sections = sectionsRef.current.querySelectorAll('.footer-section');
              gsap.fromTo(
                sections,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out' }
              );

              // Stagger items within each section
              const items = sectionsRef.current.querySelectorAll('.footer-item');
              gsap.fromTo(
                items,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.4 }
              );

              // Social links pop in
              const socials = sectionsRef.current.querySelectorAll('.footer-social-link');
              gsap.fromTo(
                socials,
                { opacity: 0, scale: 0, rotation: -180 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)', delay: 0.6 }
              );
            }

            // Animate bottom bar
            if (bottomRef.current) {
              gsap.fromTo(
                bottomRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.8 }
              );
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" id="footer" ref={footerRef}>
      <div className="footer-top-line"></div>
      <div className="footer-inner" ref={sectionsRef}>
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
          <div className="footer-socials">
            <a href="https://www.instagram.com/kemakomupi/" target="_blank" rel="noopener noreferrer" className="footer-social-link" id="social-instagram" aria-label="Instagram Kemakom">
              <InstagramIcon />
            </a>
            <a href="https://whatsapp.com/channel/0029Vb1NtH9Fy72K8AOPCi1Z" target="_blank" rel="noopener noreferrer" className="footer-social-link" id="social-whatsapp" aria-label="WhatsApp Channel Kemakom">
              <WhatsAppIcon />
            </a>
            <a href="https://www.youtube.com/BEMKemakom" target="_blank" rel="noopener noreferrer" className="footer-social-link" id="social-youtube" aria-label="YouTube Kemakom">
              <YoutubeIcon />
            </a>
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

      <div className="footer-bottom" ref={bottomRef}>
        <p>&copy; {new Date().getFullYear()} {CONFIG.ORG_NAME} — {CONFIG.UNIVERSITY}</p>
      </div>
    </footer>
  );
}
