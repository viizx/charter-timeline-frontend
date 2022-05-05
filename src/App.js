import "./App.css";
import Timeline from "./components/Timeline";
import ReservationList from "./components/ReservationList";
import Reservation from "./components/Reservation";
import Create from "./components/Create";
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
          <Route exact path="/reservations">
            <Create />
            <ReservationList />
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
