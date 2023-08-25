import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../Providers/DogProvider";

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
    const { postDog, isLoading } = useDogs();
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          postDog({
            name: dogName,
            description: dogDesc,
            image: selectedImage,
            isFavorite: false,
          })
            .then(() => resetState())
            .catch((err) => console.log(err));
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
