import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, XCircle, Mail, AlertTriangle, GraduationCap, Hash, BookOpen, Calendar } from 'lucide-react';
import { CONFIG, type StudentData } from '../config';
import Phase2Section from './Phase2Section';
import './ResultCard.css';

interface ResultCardProps {
  student: StudentData | null;
  searchedNim: string;
}

export default function ResultCard({ student, searchedNim }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [student, searchedNim]);

  if (!searchedNim) return null;

  // === NIM DITEMUKAN & DITERIMA ===
  if (student && student.status_diterima) {
    return (
      <div ref={cardRef} className="result-card result-found" id="result-card">
        {/* Decorative top accent */}
        <div className="result-accent-bar"></div>

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

        {/* Card-based info layout instead of rigid table */}
        <div className="result-info-grid">
          <div className="result-info-card">
            <div className="result-info-icon">
              <GraduationCap size={20} />
            </div>
            <div className="result-info-content">
              <span className="result-info-label">Nama</span>
              <span className="result-info-value">{student.nama}</span>
            </div>
          </div>

          <div className="result-info-card">
            <div className="result-info-icon">
              <Hash size={20} />
            </div>
            <div className="result-info-content">
              <span className="result-info-label">NIM</span>
              <span className="result-info-value">{student.nim}</span>
            </div>
          </div>

          <div className="result-info-card">
            <div className="result-info-icon">
              <BookOpen size={20} />
            </div>
            <div className="result-info-content">
              <span className="result-info-label">Program Studi</span>
              <span className="result-info-value">{student.program_studi}</span>
            </div>
          </div>

          <div className="result-info-card">
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
