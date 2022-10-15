import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreatePokemon from "./components/CreatePokemon";

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/pokemons" component={CreatePokemon} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
