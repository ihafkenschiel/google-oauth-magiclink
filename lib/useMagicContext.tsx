import { createContext } from "react";

const MagicContext = createContext();

const useMagicContext = () => {
  return <MagicContext.Provider value={magic}></MagicContext.Provider>;
};
