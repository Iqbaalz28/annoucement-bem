import { useEffect, useRef } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { CONFIG } from '../config';
import gsap from 'gsap';
import './CountdownTimer.css';

interface CountdownTimerProps {
  onExpired: () => void;
}

function DigitCard({ value, label }: { value: number; label: string }) {
  const digitRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value && digitRef.current) {
      gsap.fromTo(
        digitRef.current,
        { y: -20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
      prevValue.current = value;
    }
  }, [value]);

  return (
    <div className="digit-card">
      <div className="digit-value-container">
        <span ref={digitRef} className="digit-value">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="digit-label">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ onExpired }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(CONFIG.PHASE_1_TARGET_DATE);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasExpired = useRef(false);

  useEffect(() => {
    if (isExpired && !hasExpired.current) {
      hasExpired.current = true;
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: 0.9,
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: onExpired,
        });
      } else {
        onExpired();
      }
    }
  }, [isExpired, onExpired]);

  // Enter animation
  useEffect(() => {
    if (containerRef.current && !isExpired) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const targetDate = new Date(CONFIG.PHASE_1_TARGET_DATE);
  const dateStr = targetDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = targetDate.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <div ref={containerRef} className="countdown-container" id="countdown-section">
      <h1 className="countdown-heading">Pengumuman Akan Dibuka Pada</h1>
      <div className="countdown-glass">
        <DigitCard value={days} label="HARI" />
        <span className="countdown-separator">:</span>
        <DigitCard value={hours} label="JAM" />
        <span className="countdown-separator">:</span>
        <DigitCard value={minutes} label="MENIT" />
        <span className="countdown-separator">:</span>
        <DigitCard value={seconds} label="DETIK" />
      </div>
      <p className="countdown-subtitle">
        Mohon tunggu hingga {dateStr} pukul {timeStr}
      </p>
    </div>
  );
}
