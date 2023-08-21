import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { useTab } from "./Providers/TabProvider";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Ttab } from "./types";
import { LoadingProvider } from "./Providers/IsLoadingProvider";

export function App() {
  const { tab } = useTab();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <LoadingProvider>
        <Section label={"Dogs: "}>
          {(
            ["favorite-dogs", "unfavorite-dogs", "all-dogs"] as Ttab[]
          ).includes(tab) ? (
            <Dogs />
          ) : (
            <CreateDogForm />
          )}
        </Section>
      </LoadingProvider>
    </div>
  );
}
