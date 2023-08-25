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

const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Couldn't delete dog");
    } else return;
  });
};

const patchFavoriteForDog = (patch: boolean, id: number) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFavorite: patch,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Dog didn't patch");
    } else return;
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
