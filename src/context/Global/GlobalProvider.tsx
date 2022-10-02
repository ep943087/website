import { useState } from "react";
import GlobalContext, { GlobalContextInterface, ThemeType } from "./GlobalContext";

const GlobalProvider = (props: GlobalProviderProps) => {
  
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [transparentMain, setTransparentMain] = useState<boolean>(true);

  const initialValues: GlobalContextInterface = {
    transparentMain,
    setTransparentMain,
    theme,
    setTheme,
  }

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