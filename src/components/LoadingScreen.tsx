import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate text letters stagger
    if (textRef.current) {
      const letters = textRef.current.querySelectorAll('span');
      gsap.fromTo(
        letters,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        }
      );

      // Add staggered bounce delays
      letters.forEach((letter, i) => {
        (letter as HTMLElement).style.animationDelay = `${i * 0.1}s`;
      });
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Variable speed: fast start, slow middle, fast end
        const increment = prev < 30 ? 8 : prev < 70 ? 3 : prev < 90 ? 5 : 10;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100
  useEffect(() => {
    if (progress >= 100 && !exiting) {
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 600); // Wait for exit animation
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, exiting, onComplete]);

  const loadingText = 'BEM KEMAKOM';

  return (
    <div
      ref={containerRef}
      className={`loading-screen ${exiting ? 'loading-exit' : ''}`}
    >
      {/* Background particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="loading-particle" />
      ))}

      {/* Logo with 3D motion */}
      <div className="loading-logo-container">
        <div className="loading-logo-glow" />
        <div className="loading-orbits">
          <div className="loading-orbit-dot" />
          <div className="loading-orbit-dot" />
          <div className="loading-orbit-dot" />
        </div>
        <img
          src="/logo-bem.png"
          alt="Logo BEM KEMAKOM"
          className="loading-logo"
        />
      </div>

      {/* Animated text */}
      <div ref={textRef} className="loading-text">
        {loadingText.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="loading-progress-track">
        <div
          className="loading-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
