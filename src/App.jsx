import useModelLoader from "./hooks/tf-toxic-hook";
import "./App.css";
import TextModerate from "./components/TextModarate/TextModerate";
import SimpleSpinner from "./components/SimpleSpinner/SimpleSpinner";

function App() {
  const { isModelLoading, modelInstance } = useModelLoader();

  return (
    <div className="App">
      {isModelLoading ? (
        <SimpleSpinner />
      ) : (
        <TextModerate modelInstance={modelInstance} />
      )}
    </div>
  );
}

export default App;
