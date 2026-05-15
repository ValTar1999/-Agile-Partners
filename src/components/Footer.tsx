import { Fragment, useState } from 'react';
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
import logo from '../assets/image/LOGO-dark.svg';

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

export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const menuId = 'footer-nav-menu';
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
    <footer
      id="contact-us"
      className="flex h-full min-h-0 w-full scroll-mt-20 flex-col bg-black text-white"
    >
      <div className="flex h-full min-h-0 w-full flex-col p-4 md:p-10">
        <div className="relative flex shrink-0 items-center justify-between lg:items-start">
          <a href="/">
            <img src={logo} alt="Agile Partners" className="h-11 w-auto" />
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
              <span className="block h-px w-6 bg-white" />
              <span className="block h-px w-6 bg-white" />
            </span>
          </button>

          <ul className="hidden list-none flex-col items-start gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group/nav relative inline-block text-base leading-5 font-normal tracking-[0.16px] text-white uppercase no-underline"
                >
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 bg-white transition-[width] duration-300 ease-out group-hover/nav:w-full"
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
                className="z-30 w-[min(92vw,20rem)] rounded-2xl border border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur-sm lg:hidden"
                {...getFloatingProps()}
              >
                <ul className="m-0 list-none space-y-1 p-0">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="block rounded-xl px-3 py-2 text-base font-semibold tracking-wide text-white transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black focus-visible:outline-none"
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

        <div className="flex min-h-0 flex-1 flex-col justify-between gap-8 py-6 md:gap-10 md:py-8 lg:gap-12 lg:py-10 xl:gap-14 xl:py-12">
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <h2 className="mb-4 text-[40px] leading-11 -tracking-[1.6px] md:mb-5 lg:text-6xl lg:leading-[1.1] lg:-tracking-[2.4px] xl:mb-6 xl:text-7xl xl:leading-20 xl:-tracking-[2.88px]">
              Get in touch
            </h2>
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
          </div>

          <div className="flex shrink-0 flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8 lg:gap-10">
            <div className="flex flex-col gap-8">
              <address className="text-xl leading-[26px] -tracking-[0.7px] text-white not-italic xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]">
                Stefan cel Mare Str. 135
                <br />
                Chisinau, Moldova
              </address>
              <a
                href="tel:+37360869382"
                className="text-xl leading-[26px] -tracking-[0.7px] text-white transition-colors hover:text-[#0AE58A] xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]"
              >
                (+373) 608 69 382
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
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
            </div>
          </div>

          <p className="shrink-0 pb-1 text-base leading-5 -tracking-[0.48px] text-[#999999]">
            ©Agile Partners 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
