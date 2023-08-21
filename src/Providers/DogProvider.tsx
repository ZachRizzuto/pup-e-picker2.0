import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { Dog, TDogsContext } from "../types";
import { Requests } from "../api";

const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  useEffect(() => {
    Requests.getAllDogs()
      .then((dogArray) => setDogs(dogArray))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <DogsContext.Provider
        value={{
          dogs,
          setDogs,
        }}
      >
        {children}
      </DogsContext.Provider>
    </>
  );
};

export const useDogs = () => useContext(DogsContext);
