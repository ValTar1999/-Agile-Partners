import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'who-we-are', label: 'WHO WE ARE' },
  { id: 'work', label: 'WORK' },
  { id: 'contact-us', label: 'CONTACT US' },
] as const;

export default function PaginationButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const trigger = window.innerHeight * 0.15;
      const whoWeAre = document.getElementById('about');
      const work = document.getElementById('work');

      if (!whoWeAre || !work) return;

      const whoTop = whoWeAre.getBoundingClientRect().top;
      const workBottom = work.getBoundingClientRect().bottom;

      // Hide once the end of ProjectsSection reaches the upper part of the viewport
      setVisible(whoTop <= trigger && workBottom > window.innerHeight * 0.55);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={`flex flex-col items-end transition-opacity duration-300 select-none ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ color: '#ffffff' }}
    >
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          className="group relative flex items-center justify-end py-1.5"
        >
          <span className="absolute right-[calc(100%+12px)] text-[10px] leading-normal whitespace-nowrap uppercase opacity-0 transition-opacity duration-[250ms] ease-linear group-hover:opacity-100">
            {section.label}
          </span>
          <span className="block h-px w-4 bg-current opacity-50 transition-[width,opacity] duration-[250ms] ease-linear group-hover:w-11 group-hover:opacity-100" />
        </a>
      ))}
    </nav>
  );
}
