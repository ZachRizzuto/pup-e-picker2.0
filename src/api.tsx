import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";
const getAllDogs = () =>
  fetch(`${baseUrl}/dogs`).then((res): Promise<Dog[]> => res.json());

const postDog = (dog: Omit<Dog, "id">): Promise<Dog> => {
  return fetch(`${baseUrl}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  }).then((res): Promise<Dog> => res.json());
};

const deleteDogRequest = (
  id: number,
  dogs: Dog[],
  setDogs: (input: Dog[]) => void
) => {
  setDogs(dogs.filter((dog) => dog.id != id));

  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        setDogs(dogs);
      } else return;
    })
    .catch((err) => console.log(err));
};

const patchFavoriteForDog = (
  patch: boolean,
  id: number,
  dogs: Dog[],
  setDogs: (input: Dog[]) => void
) => {
  setDogs(
    dogs.map((dog) => (dog.id === id ? { ...dog, isFavorite: patch } : dog))
  );

  fetch(`${baseUrl}/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFavorite: patch,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        setDogs(dogs);
      } else return;
    })
    .catch((err) => console.log(err));
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
