import { useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import logo from '../assets/image/header/LOGO.svg';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WHO WE ARE', href: '#who-we-are' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT US', href: '#contact-us' },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const menuId = 'mobile-nav-menu';
  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    placement: 'bottom-end',
    middleware: [offset(12), flip({ padding: 16 }), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <nav className="flex w-full justify-center">
      <div className="relative flex w-full max-w-2160 items-center justify-between p-4 md:p-10 lg:items-start">
        <a href="/" className="flex items-center no-underline">
          <img src={logo} alt="Agile Partners" className="h-8 w-auto lg:h-11" />
        </a>

        <button
          type="button"
          ref={refs.setReference}
          className="inline-flex h-6 w-6 items-center justify-center bg-transparent lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          {...getReferenceProps()}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-6 bg-black" />
            <span className="block h-px w-6 bg-black" />
          </span>
        </button>

        <ul className="hidden list-none flex-col items-start lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group/nav relative inline-block text-base leading-5 font-normal tracking-[0.16px] text-black uppercase no-underline"
              >
                <span
                  className="absolute bottom-0 left-0 h-px w-0 bg-black transition-[width] duration-300 ease-out group-hover/nav:w-full"
                  aria-hidden
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {isMenuOpen && (
          <FloatingPortal>
            <div
              id={menuId}
              ref={refs.setFloating}
              style={floatingStyles}
              className="z-30 w-[min(92vw,20rem)] rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur-sm lg:hidden"
              {...getFloatingProps()}
            >
              <ul className="m-0 list-none space-y-1 p-0">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-2 text-base font-semibold tracking-wide text-black transition-colors hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FloatingPortal>
        )}
      </div>
    </nav>
  );
}
