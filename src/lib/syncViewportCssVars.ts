/**
 * CSS-Tricks / industry-standard mobile viewport fix.
 * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 *
 * Sets:
 *  --vh         → 1% of the *visible* viewport (for calc(var(--vh)*100))
 *  --app-height → full visible height in px
 *  --vv-top     → visualViewport.offsetTop (iOS keyboard / chrome scroll)
 */
export function syncViewportCssVars(): void {
  const vv = window.visualViewport;
  const visibleHeight = Math.min(window.innerHeight, vv?.height ?? Number.POSITIVE_INFINITY);
  const top = vv?.offsetTop ?? 0;
  const root = document.documentElement;

  root.style.setProperty('--vh', `${visibleHeight * 0.01}px`);
  root.style.setProperty('--app-height', `${visibleHeight}px`);
  root.style.setProperty('--vv-top', `${top}px`);
}

/** Keep CSS viewport vars in sync for the lifetime of the page. */
export function startViewportCssVarsSync(): () => void {
  syncViewportCssVars();

  const onChange = () => syncViewportCssVars();
  const vv = window.visualViewport;

  vv?.addEventListener('resize', onChange);
  vv?.addEventListener('scroll', onChange);
  window.addEventListener('resize', onChange);
  window.addEventListener('orientationchange', onChange);

  return () => {
    vv?.removeEventListener('resize', onChange);
    vv?.removeEventListener('scroll', onChange);
    window.removeEventListener('resize', onChange);
    window.removeEventListener('orientationchange', onChange);
  };
}
