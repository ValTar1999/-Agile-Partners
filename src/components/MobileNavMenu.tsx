import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logoDark from '../assets/image/LOGO-dark.svg';
import { useOverlayOpen, getOverlayRoot } from '../hooks/useOverlayOpen';
import { useLenis } from '../hooks/useLenis';
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

/** Griflan-style curtain */
const MENU_DURATION = 0.5;
const MENU_EASE = [0.76, 0, 0.24, 1] as const;
const LINK_BASE_DELAY = 0.25;
const LINK_STAGGER = 0.025;
const FOOTER_TEXT_CLASS = 'text-base leading-5 font-normal -tracking-[0.48px] text-white';
const FOOTER_BASE_DELAY = 0.4;
const MENU_PANEL_CLASS = 'fullscreen-fixed z-50 flex flex-col lg:hidden';
const MENU_LAYER_CLASS = 'absolute inset-0';

type MobileNavMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuId: string;
};

const SCROLL_KEYS = new Set([
  ' ',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
]);

export default function MobileNavMenu({ isOpen, onClose, menuId }: MobileNavMenuProps) {
  const lenis = useLenis();
  useOverlayOpen(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const { body } = document;
    const scrollY = window.scrollY;

    lenis?.stop();

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyTouchAction: body.style.touchAction,
    };

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.touchAction = 'none';

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (SCROLL_KEYS.has(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
    window.addEventListener('keydown', onKeyDown, true);

    return () => {
      window.removeEventListener('wheel', preventScroll, true);
      window.removeEventListener('touchmove', preventScroll, true);
      window.removeEventListener('keydown', onKeyDown, true);

      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      body.style.touchAction = prev.bodyTouchAction;

      window.scrollTo(0, scrollY);
      lenis?.scrollTo(scrollY, { immediate: true });
      lenis?.start();
    };
  }, [isOpen, onClose, lenis]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key={menuId}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={MENU_PANEL_CLASS}
        >
          {/* Dim overlay */}
          <motion.div
            className={`${MENU_LAYER_CLASS} bg-black/85`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MENU_DURATION, ease: 'linear' }}
          />

          {/* Outer mask — from top */}
          <motion.div
            className={`${MENU_LAYER_CLASS} overflow-hidden`}
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: MENU_DURATION, ease: MENU_EASE }}
          >
            {/* Inner mask — from bottom (counter-translate keeps content fixed) */}
            <motion.div
              className={`${MENU_LAYER_CLASS} flex flex-col overflow-hidden bg-black pt-[env(safe-area-inset-top,0px)] text-white`}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: MENU_DURATION, ease: MENU_EASE }}
            >
              <div className="flex items-center justify-between p-4">
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

              <ul className="m-0 flex list-none flex-col px-4 pt-8">
                {navLinks.map((link, index) => (
                  <li key={link.label}>
                    <RevealLine active delay={LINK_BASE_DELAY + index * LINK_STAGGER}>
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="block text-[40px] leading-11 font-normal -tracking-[1.6px] text-white uppercase no-underline transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:outline-none"
                      >
                        {link.label}
                      </a>
                    </RevealLine>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-24 px-4 pb-[max(2rem,env(safe-area-inset-bottom,0px))]">
                <motion.div
                  className="mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.4, scale: 1 }}
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
                  <RevealLine active delay={FOOTER_BASE_DELAY}>
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
                  <RevealLine active delay={FOOTER_BASE_DELAY + 0.08}>
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
