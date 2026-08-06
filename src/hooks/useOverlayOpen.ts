import { useEffect } from 'react';

const OVERLAY_OPEN_CLASS = 'overlay-open';

/** Locks document chrome for iOS Safari (html/body paint under the browser bar). */
export function useOverlayOpen(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    html.classList.add(OVERLAY_OPEN_CLASS);
    html.style.setProperty('background-color', '#000000', 'important');
    document.body.style.setProperty('background-color', '#000000', 'important');
    document.body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    let themeMeta = document.querySelector('meta[name="theme-color"]');
    const createdMeta = !themeMeta;
    if (!themeMeta) {
      themeMeta = document.createElement('meta');
      themeMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeMeta);
    }
    const prevTheme = themeMeta.getAttribute('content');
    themeMeta.setAttribute('content', '#000000');

    return () => {
      html.classList.remove(OVERLAY_OPEN_CLASS);
      html.style.removeProperty('background-color');
      document.body.style.removeProperty('background-color');
      document.body.style.overflow = '';
      html.style.overflow = '';
      if (themeMeta) {
        if (createdMeta) themeMeta.remove();
        else if (prevTheme) themeMeta.setAttribute('content', prevTheme);
        else themeMeta.removeAttribute('content');
      }
    };
  }, [active]);
}
