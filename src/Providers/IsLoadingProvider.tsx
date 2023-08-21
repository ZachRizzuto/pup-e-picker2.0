import { ReactNode, createContext, useState, useContext } from "react";

type TLoadingContext = {
  isLoading: boolean;
  setIsLoading: (input: boolean) => void;
};

const LoadingContext = createContext<TLoadingContext>({} as TLoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </LoadingContext.Provider>
    </>
  );
};

export const useLoading = () => useContext(LoadingContext);
