import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import "rsuite/dist/rsuite.min.css";

const Edit = (props) => {
  const defaultValues = props;
  console.log(defaultValues);
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [startDate, setStartDate] = useState([null, null]);
  const [endDate, setEndDate] = useState([null, null]);
  const [ship, setShip] = useState("");
  const [reservation, setReservation] = useState("");
  var fillColor = "";
  var x = "";
  var name = "";

  var y1 = new Date(startDate).getTime();
  var y2 = new Date(endDate).getTime();

  var y = [y1, y2];
  if (reservation === "Booked") {
    fillColor = "#006066";
  } else {
    fillColor = "#061137";
  }

  if (ship === "1") {
    x = "Lady Gita";
    name = "Lady Gita";
  } else if (ship === "2") {
    x = "Ardura";
    name = "Ardura";
  } else if (ship === "3") {
    x = "Alba";
    name = "Alba";
  } else if (ship === "4") {
    x = "Slano";
    name = "Slano";
  } else if (ship === "5") {
    x = "Vito";
    name = "Vito";
  } else if (ship === "6") {
    x = "Korab";
    name = "Korab";
  } else if (ship === "7") {
    x = "Agape Rose";
    name = "Agape Rose";
  } else if (ship === "8") {
    x = "Son De Mar";
    name = "Son De Mar";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = { x, y, fillColor };

    setIsPending(true);

    fetch(
      "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation/" +
        id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }
    )
      .then((response) => {
        console.log(response);
        console.log(input);

        setIsPending(false);
      })
      .then(() => {
        setEndDate("");
        setStartDate("");
        setShip("");
        setReservation("");
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="novi-red-edit">
            <div className="col-sm">
              <select
                className="form-select"
                aria-label="Default select example"
                // defaultValue={props.x}
                value={ship}
                placeholder="Select vessel"
                onChange={(e) => setShip(e.target.value)}
              >
                <option defaultValue="">Select vessel</option>
                <option value="1">Lady Gita</option>
                <option value="2">Ardura</option>
                <option value="3">Alba</option>
                <option value="4">Slano</option>
                <option value="5">Vito</option>
                <option value="6">Korab</option>
                <option value="7">Agape Rose</option>
                <option value="8">Son De Mar</option>
              </select>
            </div>
            <div className="col-sm">
              <select
                className="form-select"
                aria-label="Default select example"
                // defaultValue={props.fillColor === "#006066" ? "Booked" : "Option"}
                value={reservation}
                placeholder="Reservation"
                onChange={(e) => setReservation(e.target.value)}
              >
                <option defaultValue="">Select your option</option>
                <option value="0">Booked</option>
                <option value="1">Option</option>
              </select>
            </div>
            <div className="col-sm">
              <input
                placeholder="Selected date"
                type="date"
                className="form-select"
                // defaultValue={props.y[0]}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
            <div className="col-sm">
              <input
                placeholder="Selected date"
                type="date"
                // defaultValue={props.y[1]}
                className="form-select"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-sm">
              {!isPending && (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              )}
              {isPending && (
                <button disabled type="submit" className="btn btn-primary">
                  Working...
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
