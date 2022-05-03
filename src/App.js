import "./App.css";
import Timeline from "./components/Timeline";
import ReservationList from "./components/ReservationList";
import Reservation from "./components/Reservation";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Timeline />
          </Route>
          <Route exact path="/reservations">
            <ReservationList />
          </Route>
          <Route exact path="/reservations/create">
            <Create />
          </Route>
          <Route exact path="/reservations/:id">
            <Reservation />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
