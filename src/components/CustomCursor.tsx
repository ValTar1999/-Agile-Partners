import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.documentElement.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      const el = dotRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      el.style.opacity = '1';
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onDown = () => {
      const inner = innerRef.current;
      if (!inner) return;
      inner.style.transform = 'scale(2)';
    };

    const onUp = () => {
      const inner = innerRef.current;
      if (!inner) return;
      inner.style.transform = 'scale(1)';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('blur', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 mix-blend-difference will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <span
        ref={innerRef}
        className="block size-3 rounded-full bg-white ease-out"
        style={{ transform: 'scale(1)', transition: 'transform 150ms ease-out' }}
      />
    </div>
  );
}
