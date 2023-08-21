import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { Dog } from "../types";
import { useDogs } from "../Providers/DogProvider";
import { useLoading } from "../Providers/IsLoadingProvider";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [dogName, setDogName] = useState("");
    const [dogDesc, setDogDesc] = useState("");
    const resetState = () => {
      setSelectedImage(dogPictures.BlueHeeler);
      setDogName("");
      setDogDesc("");
    };
    const { setDogs } = useDogs();
    const { isLoading, setIsLoading } = useLoading();
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          Requests.postDog({
            name: dogName,
            description: dogDesc,
            image: selectedImage,
            isFavorite: false,
          })
            .then(() => Requests.getAllDogs())
            .then((dogs) => setDogs(dogs))
            .then(() => setIsLoading(false))
            .then(() => {
              toast.success("Dog created!");
            })
            .catch((err) => console.log(err));
          resetState();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={dogDesc}
          onChange={(e) => setDogDesc(e.target.value)}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          disabled={isLoading}
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  };
