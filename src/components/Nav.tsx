import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/image/header/LOGO.svg';
import { useLenis } from '../hooks/useLenis';
import { usePageTheme } from '../hooks/usePageTheme';
import MobileNavMenu from './MobileNavMenu';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WHO WE ARE', href: '#who-we-are' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT US', href: '#contact-us' },
];

const navLinkClass =
  'self-stretch text-base leading-5 font-normal tracking-[0.16px] text-current uppercase no-underline transition-colors duration-300';

const slideDown = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
};

function scrollToTop(lenis: ReturnType<typeof useLenis>) {
  const fromY = lenis?.scroll ?? window.scrollY;
  if (fromY <= 0) return;

  const options = {
    duration: Math.min(3, Math.max(1.2, 1 + (fromY / window.innerHeight) * 0.22)),
    easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  };

  if (lenis) lenis.scrollTo(0, options);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Nav() {
  const lenis = useLenis();
  const pageTheme = usePageTheme();
  const isDark = pageTheme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const menuId = 'mobile-nav-menu';

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToTop(lenis);
  };

  return (
    <nav className="mx-auto flex w-full max-w-2160 justify-center">
      <div className="relative flex w-full items-center justify-between p-4 md:p-10 lg:items-start">
        <motion.a
          href={import.meta.env.BASE_URL}
          className="flex items-center no-underline"
          initial={slideDown.initial}
          animate={slideDown.animate}
          transition={slideDown.transition}
          onClick={handleLogoClick}
        >
          <img
            src={logo}
            alt="Agile Partners"
            className={`h-8 w-auto transition-[filter] duration-300 lg:h-11 ${isDark ? 'invert' : ''}`}
          />
        </motion.a>

        <motion.button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center bg-transparent lg:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          initial={slideDown.initial}
          animate={slideDown.animate}
          transition={{ ...slideDown.transition, delay: 0.08 }}
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-6 bg-current transition-colors duration-300" />
            <span className="block h-px w-6 bg-current transition-colors duration-300" />
          </span>
        </motion.button>

        <motion.ul
          className="hidden list-none flex-col items-start lg:flex"
          initial={slideDown.initial}
          animate={slideDown.animate}
          transition={{ ...slideDown.transition, delay: 0.08 }}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={`group/nav relative block ${navLinkClass}`}>
                <span
                  className="absolute bottom-0 left-0 h-px w-0 bg-current transition-[width,color] duration-300 ease-out group-hover/nav:w-full"
                  aria-hidden
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </motion.ul>

        <MobileNavMenu isOpen={isMenuOpen} onClose={closeMenu} menuId={menuId} />
      </div>
    </nav>
  );
}
