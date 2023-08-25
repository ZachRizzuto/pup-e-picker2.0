import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export type TDogsContext = {
  dogs: Dog[];
  setDogs: (input: Dog[]) => void;
  isLoading: boolean;
  postDog: (input: Omit<Dog, "id">) => Promise<void>;
  patchDog: (id: number, patch: boolean) => Promise<void>;
  deleteDog: (id: number) => void;
};

const DogsContext = createContext<TDogsContext>({} as TDogsContext);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const postDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog({
      name: dog.name,
      image: dog.image,
      description: dog.description,
      isFavorite: dog.isFavorite,
    })
      .then(() => {
        toast.success("Dog created!");
      })
      .then(() => Requests.getAllDogs())
      .then((dogs) => setDogs(dogs))
      .then(() => setIsLoading(false));
  };

  const patchDog = (id: number, patch: boolean) => {
    setDogs(
      dogs.map((dog) => (dog.id === id ? { ...dog, isFavorite: patch } : dog))
    );
    return Requests.patchFavoriteForDog(patch, id).catch(() => setDogs(dogs));
  };

  const deleteDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id != id));
    Requests.deleteDogRequest(id).catch(() => setDogs(dogs));
  };

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
          isLoading,
          postDog,
          patchDog,
          deleteDog,
        }}
      >
        {children}
      </DogsContext.Provider>
    </>
  );
};

export const useDogs = () => useContext(DogsContext);
