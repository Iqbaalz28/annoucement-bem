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

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
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
      <h1 className="nim-heading">
        Pengumuman Kelulusan {CONFIG.ORG_NAME}
        <br />
        <span className="nim-heading-period">{CONFIG.PERIOD}</span>
      </h1>
      <div className="nim-heading-line">
        <span className="line-green"></span>
        <span className="line-gold"></span>
      </div>

      <div className={`nim-input-wrapper ${warning ? 'nim-input-error' : ''}`}>
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
        className="nim-submit-btn"
        onClick={handleSubmit}
        id="nim-submit-button"
      >
        Periksa Hasil
      </button>
    </div>
  );
}
