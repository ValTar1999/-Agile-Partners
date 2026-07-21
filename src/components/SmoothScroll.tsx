import { useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '../hooks/useLenis';

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    instance.scrollTo(0, { immediate: true, force: true });
    setLenis(instance);

    let rafId = 0;

    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const getAnchorScrollOptions = (destination: number) => ({
      // Give long jumps more time than neighboring-section jumps.
      duration: Math.min(
        3,
        Math.max(1.2, 1 + (Math.abs(destination - window.scrollY) / window.innerHeight) * 0.22),
      ),
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    });

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      // Footer is fixed; scroll to page bottom to reveal it.
      if (href === '#contact-us') {
        event.preventDefault();
        instance.scrollTo(instance.limit, getAnchorScrollOptions(instance.limit));
        return;
      }

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      const destination = window.scrollY + target.getBoundingClientRect().top - 80;
      instance.scrollTo(target, { ...getAnchorScrollOptions(destination), offset: -80 });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      instance.destroy();
      setLenis(null);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
