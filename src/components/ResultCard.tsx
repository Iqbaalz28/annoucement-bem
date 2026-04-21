import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { CheckCircle, XCircle, Mail, AlertTriangle, GraduationCap, Hash, BookOpen, Calendar } from 'lucide-react';
import { CONFIG, type StudentData } from '../config';
import Phase2Section from './Phase2Section';
import './ResultCard.css';

interface ResultCardProps {
  student: StudentData | null;
  searchedNim: string;
}

// Confetti burst for accepted result
function createConfetti(container: HTMLElement) {
  const colors = ['#1B5E20', '#2E7D32', '#F9A825', '#66BB6A', '#FFD54F', '#A5D6A7', '#FFF176'];
  const shapes = ['circle', 'square', 'triangle'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    confetti.className = `confetti-piece confetti-${shape}`;
    confetti.style.setProperty('--confetti-color', color);
    confetti.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
    confetti.style.top = '40%';

    container.appendChild(confetti);

    gsap.to(confetti, {
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.8) * 500,
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 0.5 + 0.5,
      opacity: 0,
      duration: 1.5 + Math.random() * 1,
      ease: 'power2.out',
      delay: Math.random() * 0.3,
      onComplete: () => confetti.remove(),
    });
  }
}

export default function ResultCard({ student, searchedNim }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect on info cards
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 12,
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();

    // Main card entrance
    tl.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.9, rotateX: -5 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );

    // Stagger info cards
    if (infoCardsRef.current) {
      const cards = infoCardsRef.current.querySelectorAll('.result-info-card');
      tl.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.4'
      );
    }

    // Fire confetti for accepted
    if (student?.status_diterima && confettiRef.current) {
      setTimeout(() => {
        if (confettiRef.current) createConfetti(confettiRef.current);
      }, 600);
    }
  }, [student, searchedNim]);

  if (!searchedNim) return null;

  // === NIM DITEMUKAN & DITERIMA ===
  if (student && student.status_diterima) {
    return (
      <div ref={cardRef} className="result-card result-found" id="result-card" style={{ perspective: '1000px' }}>
        {/* Confetti container */}
        <div ref={confettiRef} className="confetti-container" />

        {/* Decorative top accent */}
        <div className="result-accent-bar"></div>

        {/* Animated glow border */}
        <div className="result-glow-border" />

        <div className="result-title-row">
          <h2 className="result-title result-title-success">Selamat!</h2>
          <img
            src="/good-job.png"
            alt="Selamat"
            className="result-hero-img"
          />
        </div>
        <p className="result-subtitle">
          Anda dinyatakan <strong>DITERIMA</strong> sebagai pengurus {CONFIG.ORG_NAME} periode {CONFIG.PERIOD}.
        </p>

        {/* Card-based info layout with 3D tilt */}
        <div ref={infoCardsRef} className="result-info-grid">
          <div
            className="result-info-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="result-info-icon">
              <GraduationCap size={20} />
            </div>
            <div className="result-info-content">
              <span className="result-info-label">Nama</span>
              <span className="result-info-value">{student.nama}</span>
            </div>
          </div>

          <div
            className="result-info-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="result-info-icon">
              <Hash size={20} />
            </div>
            <div className="result-info-content">
              <span className="result-info-label">NIM</span>
              <span className="result-info-value">{student.nim}</span>
            </div>
          </div>

          <div
            className="result-info-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="result-info-icon">
              <BookOpen size={20} />
            </div>
            <div className="result-info-content">
              <span className="result-info-label">Program Studi</span>
              <span className="result-info-value">{student.program_studi}</span>
            </div>
          </div>

          <div
            className="result-info-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="result-info-icon">
              <Calendar size={20} />
            </div>
            <div className="result-info-content">
              <span className="result-info-label">Angkatan</span>
              <span className="result-info-value">{student.angkatan}</span>
            </div>
          </div>
        </div>

        {/* Phase 2: Division Placement */}
        <Phase2Section student={student} />
      </div>
    );
  }

  // === NIM TIDAK DITEMUKAN ===
  return (
    <div ref={cardRef} className="result-card result-not-found" id="result-card-not-found">
      <div className="result-icon-wrapper result-icon-error">
        <XCircle size={36} />
      </div>
      <h2 className="result-title result-title-error">NIM Tidak Ditemukan</h2>
      <p className="result-message">
        Maaf, NIM <strong>{searchedNim}</strong> tidak terdaftar.
      </p>
      <p className="result-message">
        Silakan periksa kembali NIM yang Anda masukkan.
      </p>

      <div className="result-contact-box">
        <div className="result-contact-header">
          <AlertTriangle size={16} />
          <span>Informasi Kontak Panitia:</span>
        </div>
        <div className="result-contact-item">
          <Mail size={16} />
          <a href={`mailto:${CONFIG.CONTACT_EMAIL}`}>{CONFIG.CONTACT_EMAIL}</a>
        </div>
      </div>
    </div>
  );
}
