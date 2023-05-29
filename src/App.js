import "./App.css";
import Block from "./components/Block";
import { DATA } from "./data";
function App() {
  return (
    <div className="App">
      <Block data={DATA} />
    </div>
  );
}

export default App;
