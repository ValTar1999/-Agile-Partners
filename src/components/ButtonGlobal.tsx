'use client';

import { useEffect, useRef } from 'react';

export default function ButtonGlobal() {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    let frame: number;
    let start: number | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = ((ts - start) % 1800) / 1800;
      const eased = 0.5 - Math.cos(t * Math.PI * 2) / 2;
      dot.style.transform = `scale(${1 - eased * 0.35})`;
      dot.style.opacity = `${1 - eased * 0.6}`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <a
      href="#hiring"
      className="inline-flex cursor-pointer items-center gap-2.5 px-5 py-2.5 rounded-full text-xl leading-[26px] -tracking-[0.7px] select-none transition-transform duration-200 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: '#ffffff',
        color: '#000000',
      }}
    >
      <span
        ref={dotRef}
        className="w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: '#000000' }}
      />
      We're Hiring
    </a>
  );
}
