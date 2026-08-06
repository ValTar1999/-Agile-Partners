import { useEffect, useState, type CSSProperties } from 'react';

function readViewportStyle(): CSSProperties {
  const vv = window.visualViewport;
  const height = Math.ceil(vv?.height ?? window.innerHeight);
  const top = vv?.offsetTop ?? 0;

  return {
    top,
    left: 0,
    right: 0,
    width: '100%',
    height,
    minHeight: height,
  };
}

/** Tracks iOS/Android visual viewport so fixed overlays cover the full screen. */
export function useFullscreenOverlayStyle(active = true) {
  const [style, setStyle] = useState<CSSProperties>(() => readViewportStyle());

  useEffect(() => {
    if (!active) return;

    const update = () => setStyle(readViewportStyle());
    update();

    const vv = window.visualViewport;
    vv?.addEventListener('resize', update);
    vv?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    return () => {
      vv?.removeEventListener('resize', update);
      vv?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [active]);

  return style;
}
