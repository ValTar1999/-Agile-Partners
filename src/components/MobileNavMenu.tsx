import { useEffect, useRef, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type Lenis from 'lenis';
import logoDark from '../assets/image/LOGO-dark.svg';
import { useOverlayOpen, getOverlayRoot } from '../hooks/useOverlayOpen';
import { useLenis } from '../hooks/useLenis';
import { syncViewportCssVars } from '../lib/syncViewportCssVars';
import RevealLine from './RevealLine';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WHO WE ARE', href: '#who-we-are' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT US', href: '#contact-us' },
];

const socialLinks = [
  { label: 'IG', name: 'Instagram', href: '#' },
  { label: 'LI', name: 'LinkedIn', href: '#' },
  { label: 'FB', name: 'Facebook', href: '#' },
];

const MENU_DURATION = 0.5;
const MENU_EASE = [0.76, 0, 0.24, 1] as const;
const LINK_BASE_DELAY = 0.25;
const LINK_STAGGER = 0.025;
const FOOTER_TEXT_CLASS = 'text-base leading-6 font-normal -tracking-[0.48px] text-white';
const FOOTER_BASE_DELAY = 0.4;
/** Wait for body unlock + Lenis restart before scrolling to a hash. */
const NAVIGATE_AFTER_CLOSE_MS = 80;

type MobileNavMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuId: string;
};

const SCROLL_KEYS = new Set([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End']);

function getAnchorScrollOptions(destination: number, fromY: number) {
  return {
    duration: Math.min(
      3,
      Math.max(1.2, 1 + (Math.abs(destination - fromY) / window.innerHeight) * 0.22),
    ),
    easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  };
}

function scrollToHash(hash: string, lenis: Lenis | null) {
  lenis?.resize();

  if (hash === '#contact-us') {
    const fromY = lenis?.scroll ?? window.scrollY;
    const limit = lenis?.limit ?? document.documentElement.scrollHeight - window.innerHeight;
    if (lenis) {
      lenis.scrollTo(limit, getAnchorScrollOptions(limit, fromY));
    } else {
      window.scrollTo({ top: limit, behavior: 'smooth' });
    }
    return;
  }

  const target = document.getElementById(hash.slice(1));
  if (!target) return;

  const fromY = lenis?.scroll ?? window.scrollY;
  const destination = fromY + target.getBoundingClientRect().top - 80;

  if (lenis) {
    lenis.scrollTo(destination, getAnchorScrollOptions(destination, fromY));
  } else {
    window.scrollTo({ top: destination, behavior: 'smooth' });
  }
}

export default function MobileNavMenu({ isOpen, onClose, menuId }: MobileNavMenuProps) {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const onCloseRef = useRef(onClose);
  lenisRef.current = lenis;
  onCloseRef.current = onClose;
  useOverlayOpen(isOpen);

  const handleNavLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    onClose();
    if (!href || !href.startsWith('#') || href === '#') return;

    window.setTimeout(() => {
      scrollToHash(href, lenisRef.current);
    }, NAVIGATE_AFTER_CLOSE_MS);
  };

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const { body } = document;
    const instance = lenisRef.current;
    const scrollY = instance?.scroll ?? window.scrollY;

    instance?.stop();
    syncViewportCssVars();

    // iOS: lock body in place so fixed overlays size against the visible viewport
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (SCROLL_KEYS.has(event.key)) {
        event.preventDefault();
      }
    };

    const onViewportChange = () => syncViewportCssVars();
    window.visualViewport?.addEventListener('resize', onViewportChange);
    window.visualViewport?.addEventListener('scroll', onViewportChange);
    window.addEventListener('resize', onViewportChange);

    window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
    window.addEventListener('keydown', onKeyDown, true);

    return () => {
      window.visualViewport?.removeEventListener('resize', onViewportChange);
      window.visualViewport?.removeEventListener('scroll', onViewportChange);
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('wheel', preventScroll, true);
      window.removeEventListener('touchmove', preventScroll, true);
      window.removeEventListener('keydown', onKeyDown, true);

      html.style.overflow = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';

      const current = lenisRef.current;
      window.scrollTo(0, scrollY);
      current?.scrollTo(scrollY, { immediate: true, force: true });
      current?.start();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key={menuId}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="mobile-nav-panel lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MENU_DURATION, ease: 'linear' }}
        >
          <motion.div
            className="absolute inset-0 bg-black/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MENU_DURATION, ease: 'linear' }}
          />

          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: MENU_DURATION, ease: MENU_EASE }}
          >
            <motion.div
              className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-black text-white"
              style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: MENU_DURATION, ease: MENU_EASE }}
            >
              <div className="flex shrink-0 items-center justify-between p-4">
                <a href="/" className="flex items-center no-underline" onClick={onClose}>
                  <img src={logoDark} alt="Agile Partners" className="h-8 w-auto" />
                </a>
                <button
                  type="button"
                  className="inline-flex h-6 w-6 items-center justify-center bg-transparent text-white"
                  aria-label="Close navigation menu"
                  onClick={onClose}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>

              <ul className="m-0 flex min-h-0 flex-1 list-none flex-col overflow-y-auto px-4 pt-8">
                {navLinks.map((link, index) => (
                  <li key={link.label} className="shrink-0">
                    <RevealLine active delay={LINK_BASE_DELAY + index * LINK_STAGGER}>
                      <a
                        href={link.href}
                        onClick={handleNavLinkClick}
                        className="block text-[40px] leading-11 font-normal -tracking-[1.6px] text-white uppercase no-underline transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:outline-none"
                      >
                        {link.label}
                      </a>
                    </RevealLine>
                  </li>
                ))}
              </ul>

              <div className="mobile-nav-panel-footer flex shrink-0 flex-col gap-24 px-4 pt-8">
                <motion.div
                  className="mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: MENU_EASE, delay: FOOTER_BASE_DELAY }}
                >
                  <svg
                    width="168"
                    height="24"
                    viewBox="0 0 168 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-60"
                    aria-hidden
                  >
                    <path d="M6 13.5L6 24" stroke="white" />
                    <path d="M6 0L6 10.5" stroke="white" />
                    <path d="M3 7.5L3 16.5" stroke="white" />
                    <path d="M12 13.5L12 24" stroke="white" />
                    <path d="M12 0L12 10.5" stroke="white" />
                    <path d="M9 5.25L9 18.75" stroke="white" />
                    <path d="M21 7.5L21 16.5" stroke="white" />
                    <path d="M18 13.5L18 24" stroke="white" />
                    <path d="M18 0L18 10.5" stroke="white" />
                    <path d="M15 5.25L15 18.75" stroke="white" />
                    <g clipPath="url(#clip0_7097_7533)">
                      <path d="M57 15L57 18L63 18L63 15" stroke="white" />
                      <path d="M63 24L63 17.25M57 24L57 17.25" stroke="white" />
                      <path d="M57 9L57 6L63 6L63 9" stroke="white" />
                      <path d="M63 0L63 6.75M57 -6.9018e-07L57 6.75" stroke="white" />
                      <path d="M48 12L72 12" stroke="white" />
                    </g>
                    <path
                      d="M118.5 12L114.972 11.7925C111.329 11.5782 108.422 8.67133 108.208 5.02771L108 1.5L107.792 5.02771C107.578 8.67133 104.671 11.5782 101.028 11.7925L97.5 12L101.028 12.2075C104.671 12.4218 107.578 15.3287 107.792 18.9723L108 22.5L108.208 18.9723C108.422 15.3287 111.329 12.4218 114.972 12.2075L118.5 12Z"
                      stroke="white"
                    />
                    <g clipPath="url(#clip1_7097_7533)">
                      <path d="M156 13.5L156 24" stroke="white" />
                      <path d="M154.504 11.9956L144.004 11.9956" stroke="white" />
                      <path d="M156 0L156 10.5" stroke="white" />
                      <path d="M168.004 11.9956L157.504 11.9956" stroke="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_7097_7533">
                        <rect width="24" height="24" fill="white" transform="translate(48)" />
                      </clipPath>
                      <clipPath id="clip1_7097_7533">
                        <rect width="24" height="24" fill="white" transform="translate(144)" />
                      </clipPath>
                    </defs>
                  </svg>
                </motion.div>

                <div className="flex items-end justify-between gap-4">
                  <RevealLine active delay={FOOTER_BASE_DELAY} className="pb-1">
                    <div className={`flex flex-wrap items-center gap-x-2 ${FOOTER_TEXT_CLASS}`}>
                      {socialLinks.map(({ label, name, href }, index) => (
                        <span key={label} className="inline-flex items-center gap-x-2">
                          {index > 0 && <span aria-hidden>/</span>}
                          <a
                            href={href}
                            className="text-white no-underline transition-opacity hover:opacity-70"
                            aria-label={name}
                          >
                            {label}
                          </a>
                        </span>
                      ))}
                    </div>
                  </RevealLine>
                  <RevealLine active delay={FOOTER_BASE_DELAY + 0.08} className="pb-1">
                    <p className={`m-0 shrink-0 ${FOOTER_TEXT_CLASS}`}>
                      © {new Date().getFullYear()}
                    </p>
                  </RevealLine>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>,
    getOverlayRoot(),
  );
}
