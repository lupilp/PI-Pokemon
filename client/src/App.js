import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreatePokemon from "./components/CreatePokemon";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/pokemons" component={CreatePokemon} />
          <Route exact path="/pokemons/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
