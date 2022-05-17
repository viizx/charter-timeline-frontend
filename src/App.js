import "./App.css";
import Timeline from "./components/Timeline";
import Dashboard from "./components/Dashboard";
import Reservation from "./components/Reservation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Timeline />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/reservations/:id">
            <Reservation />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
