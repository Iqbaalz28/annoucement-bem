import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Search } from 'lucide-react';
import { CONFIG } from '../config';
import './NimInput.css';

interface NimInputProps {
  onSearch: (nim: string) => void;
}

export default function NimInput({ onSearch }: NimInputProps) {
  const [nim, setNim] = useState('');
  const [warning, setWarning] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Staggered entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out' }
      );
    }

    if (lineRef.current) {
      const lines = lineRef.current.children;
      tl.fromTo(
        lines,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
        '-=0.3'
      );
    }

    if (wrapperRef.current) {
      tl.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2'
      );
    }

    if (btnRef.current) {
      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' },
        '-=0.2'
      );
    }

    inputRef.current?.focus();
  }, []);

  // Ripple effect on button click
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const handleSubmit = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) createRipple(e);

    const trimmed = nim.trim();
    if (!trimmed) {
      setWarning('Silakan masukkan NIM terlebih dahulu!');
      // Shake animation
      if (inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { x: -8 },
          { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
        );
      }
      if (wrapperRef.current) {
        gsap.fromTo(
          wrapperRef.current,
          { x: -5 },
          { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' }
        );
      }
      return;
    }
    setWarning('');
    onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div ref={containerRef} className="nim-input-container" id="nim-input-section">
      <h1 ref={headingRef} className="nim-heading">
        Pengumuman Kelulusan {CONFIG.ORG_NAME}
        <br />
        <span className="nim-heading-period">{CONFIG.PERIOD}</span>
      </h1>
      <div ref={lineRef} className="nim-heading-line">
        <span className="line-green"></span>
        <span className="line-gold"></span>
      </div>

      <div
        ref={wrapperRef}
        className={`nim-input-wrapper ${warning ? 'nim-input-error' : ''}`}
      >
        <Search className="nim-input-icon" size={20} />
        <input
          ref={inputRef}
          type="text"
          className="nim-input"
          placeholder="Masukkan NIM Kamu"
          value={nim}
          onChange={(e) => {
            setNim(e.target.value);
            if (warning) setWarning('');
          }}
          onKeyDown={handleKeyDown}
          id="nim-input-field"
          autoComplete="off"
        />
      </div>

      {warning && (
        <p className="nim-warning">{warning}</p>
      )}

      <button
        ref={btnRef}
        className="nim-submit-btn"
        onClick={handleSubmit}
        id="nim-submit-button"
      >
        <span className="btn-text">Periksa Hasil</span>
        <span className="btn-shine" />
      </button>
    </div>
  );
}
