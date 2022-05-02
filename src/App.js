import "./App.css";
import Timeline from "./components/Timeline";
import ReservationList from "./components/ReservationList";
import Create from "./components/Create";

function App() {
  return (
    <div className="App">
      <Timeline />
      <ReservationList />
      <Create />
    </div>
  );
}

export default App;
