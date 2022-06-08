import "./App.css";
import { useState, useEffect } from "react";
import Timeline from "./components/Timeline";
import Dashboard from "./components/Dashboard";
import Reservation from "./components/Reservation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/auth/LoginForm";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  let authObject = JSON.parse(user);
  console.log(authObject);

  useEffect(() => {
    let isMounted = true;
    const auth = async () => {
      setUser(localStorage.getItem("user"));
      setToken(localStorage.getItem("auth-token"));
    };

    auth();
    return () => {
      isMounted = false;
      console.log(authObject);
    };
  });

  return (
    <Router>
      <div className="App">
        <div className="bg-gray-50">
          {authObject && authObject.isAdmin && <Navbar />}
          <Switch>
            <Route exact path="/">
              <Timeline />
            </Route>
            <Route exact path="/dashboard">
              {token && authObject.isAdmin && <Dashboard user={token} />}
              {!authObject && <LoginForm />}
            </Route>
            <Route path="/reservations/:id">
              <Reservation />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
