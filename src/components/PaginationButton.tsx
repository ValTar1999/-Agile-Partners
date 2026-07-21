import { useEffect, useState } from 'react';
import type { PageTheme } from '../hooks/usePageTheme';

const SECTIONS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'who-we-are', label: 'WHO WE ARE' },
  { id: 'work', label: 'WORK' },
  { id: 'contact-us', label: 'CONTACT US' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

type PaginationButtonProps = {
  theme: PageTheme;
};

export default function PaginationButton({ theme }: PaginationButtonProps) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    const updateVisibility = () => {
      const trigger = window.innerHeight * 0.15;
      const about = document.getElementById('about');
      const work = document.getElementById('work');
      if (!about || !work) return;

      const aboutTop = about.getBoundingClientRect().top;
      const workBottom = work.getBoundingClientRect().bottom;
      setVisible(aboutTop <= trigger && workBottom > window.innerHeight * 0.55);
    };

    const updateActive = () => {
      const line = window.innerHeight * 0.35;
      let next: SectionId | null = null;

      // contact-us lives in a fixed footer — skip getBoundingClientRect for it
      for (const section of SECTIONS) {
        if (section.id === 'contact-us') continue;
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) {
          next = section.id;
        }
      }

      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
      if (nearBottom) next = 'contact-us';

      setActiveId(next);
    };

    updateVisibility();

    const onScroll = () => {
      updateVisibility();
      updateActive();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={`flex flex-col items-end transition-[opacity,color] duration-300 select-none ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
    >
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => setActiveId(section.id)}
            className="group relative flex items-center justify-end py-[5.5px] pl-28"
          >
            <span className="relative flex items-center">
              <span className="pointer-events-none absolute right-full mr-3 text-[10px] leading-normal whitespace-nowrap uppercase opacity-0 transition-opacity duration-250 ease-linear group-hover:opacity-100">
                {section.label}
              </span>
              <span
                className={`transition-width block h-px max-h-px min-h-px bg-current duration-250 ease-linear group-hover:w-11 ${
                  isActive ? 'w-11' : 'w-4'
                }`}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
