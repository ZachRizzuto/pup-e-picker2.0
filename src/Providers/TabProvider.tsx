import { ReactNode, createContext, useState, useContext } from "react";
import { Ttab } from "../types";

type TTabContext = {
  tab: Ttab;
  setTab: (input: Ttab) => void;
};

const TabContext = createContext<TTabContext>({} as TTabContext);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState<Ttab>("all-dogs");
  return (
    <>
      <TabContext.Provider
        value={{
          tab,
          setTab,
        }}
      >
        {children}
      </TabContext.Provider>
    </>
  );
};

export const useTab = () => useContext(TabContext);
