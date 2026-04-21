import { useRef, useEffect, useCallback } from 'react';
import { CONFIG } from '../config';
import gsap from 'gsap';
import './Navbar.css';

export default function Navbar() {
  const logoRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect on logo
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!logoRef.current || !brandRef.current) return;
    const rect = brandRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(logoRef.current, {
      rotateY: x * 25,
      rotateX: -y * 25,
      scale: 1.1,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!logoRef.current) return;
    gsap.to(logoRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  // Navbar entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, []);

  // Scroll effect – shrink navbar
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 50) {
        navRef.current.classList.add('navbar-scrolled');
      } else {
        navRef.current.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" id="navbar" ref={navRef}>
      <div className="navbar-inner">
        <div
          className="navbar-brand"
          ref={brandRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="navbar-logo-wrapper">
            <div className="navbar-logo-glow" />
            <img
              ref={logoRef}
              src="/logo-bem.png"
              alt={`Logo ${CONFIG.ORG_NAME}`}
              className="navbar-logo"
            />
          </div>
          <span className="navbar-title">{CONFIG.ORG_NAME}</span>
        </div>
      </div>
    </nav>
  );
}
