import { createContext } from "react";
import { Claim } from "../../auth/types";

export type ThemeType = 'dark' | 'light';

export interface GlobalContextInterface {
  transparentMain: boolean,
  setTransparentMain: (transparentMain: boolean) => void,
  theme: ThemeType,
  setTheme: (theme: ThemeType) => void,
  claims: Claim[],
  setClaims: (claims: Claim[]) => void,
  getClaim: (name: string) => Claim | undefined,
  isLoggedIn: () => boolean,
}

const GlobalContext = createContext<GlobalContextInterface>({} as GlobalContextInterface);

export default GlobalContext;