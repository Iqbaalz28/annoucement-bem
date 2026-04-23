import { CONFIG, type StudentData } from '../config';
import { useCountdown } from '../hooks/useCountdown';
import { Clock, Sparkles } from 'lucide-react';
import './Phase2Section.css';

interface Phase2SectionProps {
  student: StudentData;
}

export default function Phase2Section({ student }: Phase2SectionProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(CONFIG.PHASE_2_TARGET_DATE);

  // Phase 2 is not yet activated — show "Coming Soon"
  if (!CONFIG.isPhase2Active) {
    return (
      <div className="phase2-container phase2-coming-soon" id="phase2-section">
        <div className="phase2-badge">
          <Clock size={18} />
          <span>Segera Hadir</span>
        </div>
        <p className="phase2-description">
          Penempatan divisi akan diumumkan segera.
        </p>
      </div>
    );
  }

  // Phase 2 activated, countdown still running
  if (!isExpired) {
    return (
      <div className="phase2-container phase2-countdown" id="phase2-section">
        <h3 className="phase2-title">Penempatan Divisi</h3>
        <p className="phase2-description">Akan diumumkan dalam:</p>
        <div className="phase2-timer">
          <div className="phase2-digit">
            <span className="phase2-digit-value">{String(days).padStart(2, '0')}</span>
            <span className="phase2-digit-label">Hari</span>
          </div>
          <span className="phase2-sep">:</span>
          <div className="phase2-digit">
            <span className="phase2-digit-value">{String(hours).padStart(2, '0')}</span>
            <span className="phase2-digit-label">Jam</span>
          </div>
          <span className="phase2-sep">:</span>
          <div className="phase2-digit">
            <span className="phase2-digit-value">{String(minutes).padStart(2, '0')}</span>
            <span className="phase2-digit-label">Mnt</span>
          </div>
          <span className="phase2-sep">:</span>
          <div className="phase2-digit">
            <span className="phase2-digit-value">{String(seconds).padStart(2, '0')}</span>
            <span className="phase2-digit-label">Dtk</span>
          </div>
        </div>
      </div>
    );
  }

  // Phase 2 expired — show division placement
  const division = student.penempatan_divisi;

  return (
    <div className="phase2-container phase2-result" id="phase2-section">
      <h3 className="phase2-title">Selamat Anda Bergabung Dengan Divisi:</h3>
      {division ? (
        <div className="phase2-division-badge">
          <Sparkles size={20} />
          <span>{division}</span>
        </div>
      ) : (
        <p className="phase2-pending">Penempatan belum ditentukan. Mohon tunggu informasi lebih lanjut.</p>
      )}
    </div>
  );
}
