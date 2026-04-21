import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const TRAIL_COUNT = 6;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const isTouch = useRef(false);

  const setTrailRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) trailsRef.current[i] = el;
  }, []);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    checkTouch();
    if (isTouch.current) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Direct position for dot (instant feel)
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Delayed ring follows
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
      });

      // Trail particles
      trailsRef.current.forEach((trail, i) => {
        gsap.to(trail, {
          x: e.clientX,
          y: e.clientY,
          opacity: 0.4 - i * 0.06,
          duration: 0.3 + i * 0.08,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(trail, { opacity: 0, duration: 0.3 });
          },
        });
      });
    };

    const onMouseEnter = () => {
      dot.classList.add('cursor-visible');
      ring.classList.add('cursor-visible');
    };

    const onMouseLeave = () => {
      dot.classList.remove('cursor-visible');
      ring.classList.remove('cursor-visible');
    };

    // Hover detection for interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], .navbar-brand, .footer-social-link, .result-info-card, .phase2-badge, .phase2-division-badge'
      );
      const inputs = document.querySelectorAll('input, textarea');

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('cursor-hover');
          ring.classList.add('cursor-hover');
          (el as HTMLElement).style.cursor = 'none';
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('cursor-hover');
          ring.classList.remove('cursor-hover');
        });
      });

      inputs.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('cursor-text');
          ring.classList.add('cursor-text');
          (el as HTMLElement).style.cursor = 'none';
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('cursor-text');
          ring.classList.remove('cursor-text');
        });
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Run hover listeners initially and observe DOM changes
    addHoverListeners();
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => setTrailRef(el, i)}
          className="cursor-trail-particle"
        />
      ))}
    </>
  );
}
