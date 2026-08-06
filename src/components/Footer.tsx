import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/image/LOGO-dark.svg';
import MobileNavMenu from './MobileNavMenu';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WHO WE ARE', href: '#who-we-are' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT US', href: '#contact-us' },
];
const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Facebook', href: '#' },
];

const navLinkClass =
  'self-stretch text-base leading-5 font-normal tracking-[0.16px] text-white uppercase no-underline';

const TEXT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideDown = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: TEXT_EASE },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function RevealLine({
  children,
  className,
  active,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  active: boolean;
  delay?: number;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0.5 }}
        animate={active ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0.5 }}
        transition={{
          y: { duration: 0.5, ease: TEXT_EASE, delay },
          opacity: { duration: 0.1, ease: 'easeOut', delay: delay + 0.1 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Footer({ isActive = false }: { isActive?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (isActive) setHasRevealed(true);
  }, [isActive]);

  const show = hasRevealed;

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const menuId = 'footer-nav-menu';

  return (
    <footer
      id="contact-us"
      className="flex h-full min-h-0 w-full scroll-mt-20 flex-col bg-black text-white"
    >
      <div className="mx-auto flex h-full min-h-0 w-full max-w-2160 flex-col p-4 md:p-10">
        <div className="relative flex shrink-0 items-center justify-between lg:items-start">
          <motion.a
            href="/"
            initial={slideDown.initial}
            animate={show ? slideDown.animate : slideDown.initial}
            transition={slideDown.transition}
          >
            <img src={logo} alt="Agile Partners" className="h-11 w-auto" />
          </motion.a>
          <motion.button
            type="button"
            className="inline-flex h-6 w-6 items-center justify-center bg-transparent lg:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            initial={slideDown.initial}
            animate={show ? slideDown.animate : slideDown.initial}
            transition={{ ...slideDown.transition, delay: 0.04 }}
            onClick={toggleMenu}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-6 bg-white" />
              <span className="block h-px w-6 bg-white" />
            </span>
          </motion.button>

          <motion.ul
            className="hidden list-none flex-col items-start lg:flex"
            initial={slideDown.initial}
            animate={show ? slideDown.animate : slideDown.initial}
            transition={{ ...slideDown.transition, delay: 0.04 }}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`group/nav relative block ${navLinkClass}`}>
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 bg-white transition-[width] duration-300 ease-out group-hover/nav:w-full"
                    aria-hidden
                  />
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </motion.ul>

          <MobileNavMenu isOpen={isMenuOpen} onClose={closeMenu} menuId={menuId} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between gap-8 py-6 md:gap-10 md:py-8 lg:gap-12 lg:py-10 xl:gap-0 xl:py-0">
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <RevealLine active={show} delay={0.08} className="mb-4 md:mb-5 xl:mb-6">
              <h2 className="text-[40px] leading-11 -tracking-[1.6px] lg:text-6xl lg:leading-[1.1] lg:-tracking-[2.4px] xl:text-7xl xl:leading-20 xl:-tracking-[2.88px]">
                Get in touch
              </h2>
            </RevealLine>
            <RevealLine active={show} delay={0.14}>
              <a
                href="mailto:contact@agilepartners.eu"
                className="group/link relative inline-flex items-center gap-2 text-xl leading-[26px] -tracking-[0.7px] text-[#0AE58A] xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]"
              >
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#0AE58A] transition-[width] duration-300 ease-out group-hover/link:w-full"
                  aria-hidden
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M10 2.5L17.5 10L10 17.5" stroke="#0AE58A" />
                  <path d="M17.5 10H1.25" stroke="#0AE58A" />
                </svg>
                <span className="relative z-10">contact@agilepartners.eu</span>
              </a>
            </RevealLine>
          </div>

          <div className="flex shrink-0 flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8 lg:gap-10 xl:mb-40">
            <div className="flex flex-col items-start gap-8 xl:flex-row xl:items-end xl:gap-x-12">
              <RevealLine active={show} delay={0.18}>
                <address className="text-xl leading-[26px] -tracking-[0.7px] text-white not-italic xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]">
                  Stefan cel Mare Str. 135
                  <br />
                  Chisinau, Moldova
                </address>
              </RevealLine>
              <RevealLine active={show} delay={0.22}>
                <a
                  href="tel:+37360869382"
                  className="text-xl leading-[26px] -tracking-[0.7px] text-white transition-colors hover:text-[#0AE58A] xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]"
                >
                  (+373) 608 69 382
                </a>
              </RevealLine>
            </div>
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-1"
              initial={fadeUp.initial}
              animate={show ? fadeUp.animate : fadeUp.initial}
              transition={{ duration: 0.45, ease: TEXT_EASE, delay: 0.26 }}
            >
              {socialLinks.map(({ name, href }, index) => (
                <Fragment key={name}>
                  {index > 0 && (
                    <span
                      className="text-xl leading-[26px] -tracking-[0.7px] text-white/90 xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]"
                      aria-hidden
                    >
                      /
                    </span>
                  )}
                  <a
                    href={href}
                    className="group/social relative inline-block text-xl leading-[26px] -tracking-[0.7px] text-white/90 transition-colors hover:text-[#0AE58A] xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]"
                  >
                    <span
                      className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#0AE58A] transition-[width] duration-300 ease-out group-hover/social:w-full"
                      aria-hidden
                    />
                    <span className="relative z-10">{name}</span>
                  </a>
                </Fragment>
              ))}
            </motion.div>
          </div>

          <motion.p
            className="shrink-0 pb-1 text-base leading-5 -tracking-[0.48px] text-[#999999]"
            initial={fadeUp.initial}
            animate={show ? fadeUp.animate : fadeUp.initial}
            transition={{ duration: 0.4, ease: TEXT_EASE, delay: 0.3 }}
          >
            ©Agile Partners 2026. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
