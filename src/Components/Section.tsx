import { ReactNode } from "react";
import { useTab } from "../Providers/TabProvider";
import { useDogs } from "../Providers/DogProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { dogs } = useDogs();
  const { tab, setTab } = useTab();

  const favoritedCount = dogs.filter((dog) => dog.isFavorite === true).length;
  const unfavoritedCount = dogs.filter(
    (dog) => dog.isFavorite === false
  ).length;
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${tab === "favorite-dogs" ? "active" : ""}`}
            onClick={() => {
              tab === "favorite-dogs"
                ? setTab("all-dogs")
                : setTab("favorite-dogs");
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${tab === "unfavorite-dogs" ? "active" : ""}`}
            onClick={() => {
              tab === "unfavorite-dogs"
                ? setTab("all-dogs")
                : setTab("unfavorite-dogs");
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${tab === "create-dog" ? "active" : ""}`}
            onClick={() => {
              tab === "create-dog" ? setTab("all-dogs") : setTab("create-dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
