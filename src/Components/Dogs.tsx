// Right now these dogs are constant, but in reality we should be getting these from our server

import { useDogs } from "../Providers/DogProvider";
import { useLoading } from "../Providers/IsLoadingProvider";
import { useTab } from "../Providers/TabProvider";
import { Requests } from "../api";
import { Dog } from "../types";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const { isLoading, setIsLoading } = useLoading();
    const { dogs, setDogs } = useDogs();
    const { tab } = useTab();
    const filteredDogs = dogs.filter((dog) => {
      if (tab === "all-dogs") return true;
      if (tab === "favorite-dogs") return dog.isFavorite;
      if (tab === "unfavorite-dogs") return !dog.isFavorite;
    });
    return (
      <>
        {filteredDogs.map((dog) => (
          <DogCard
            dog={{
              id: dog.id,
              name: dog.name,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
            }}
            onEmptyHeartClick={() => {
              Requests.patchFavoriteForDog(true, dog.id, dogs, (dogs: Dog[]) =>
                setDogs(dogs)
              );
            }}
            onHeartClick={() =>
              Requests.patchFavoriteForDog(false, dog.id, dogs, (dogs: Dog[]) =>
                setDogs(dogs)
              )
            }
            onTrashIconClick={() => {
              Requests.deleteDogRequest(dog.id, dogs, (dogs: Dog[]) =>
                setDogs(dogs)
              )
                .then(() => Requests.getAllDogs())
                .then((dogs) => setDogs(dogs))
                .catch((err) => console.log(err));
            }}
            isLoading={isLoading}
            key={dog.id}
          />
        ))}
      </>
    );
  };
