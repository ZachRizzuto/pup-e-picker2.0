// Right now these dogs are constant, but in reality we should be getting these from our server

import { useDogs } from "../Providers/DogProvider";
import { useTab } from "../Providers/TabProvider";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const { dogs, patchDog, deleteDog, isLoading } = useDogs();
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
            onEmptyHeartClick={() => patchDog(dog.id, true)}
            onHeartClick={() => patchDog(dog.id, false)}
            onTrashIconClick={() => deleteDog(dog.id)}
            isLoading={isLoading}
            key={dog.id}
          />
        ))}
      </>
    );
  };
