import { useEffect, useState } from "react";
import { getClaims } from "../../auth/handleJWT";
import { Claim } from "../../auth/types";
import GlobalContext, { GlobalContextInterface, ThemeType } from "./GlobalContext";

const GlobalProvider = (props: GlobalProviderProps) => {
  
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [transparentMain, setTransparentMain] = useState<boolean>(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const getClaim = (name: string) => claims.find(claim => claim.name === name);
  const isLoggedIn = () => claims.length > 0;

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  const initialValues: GlobalContextInterface = {
    transparentMain,
    setTransparentMain,
    theme,
    setTheme,
    claims,
    setClaims,
    getClaim,
    isLoggedIn,
  };

  return (
    <GlobalContext.Provider value={initialValues}>
      {props.children}
    </GlobalContext.Provider>
  )
}

interface GlobalProviderProps {
  children: React.ReactNode,
}

export default GlobalProvider;