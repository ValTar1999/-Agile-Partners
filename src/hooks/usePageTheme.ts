import { createContext, useContext } from 'react';

export type PageTheme = 'light' | 'dark';

export const PageThemeContext = createContext<PageTheme>('light');

export function usePageTheme() {
  return useContext(PageThemeContext);
}
