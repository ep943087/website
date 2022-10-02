import { createContext } from "react";

export type ThemeType = 'dark' | 'light';

export interface GlobalContextInterface {
  transparentMain: boolean,
  setTransparentMain: (transparentMain: boolean) => void,
  theme: ThemeType,
  setTheme: (theme: ThemeType) => void,
}

const GlobalContext = createContext<GlobalContextInterface>({
  transparentMain: true,
  setTransparentMain: (transparentMain) => {},
  theme: 'dark',
  setTheme: (theme) => {},
});

export default GlobalContext;