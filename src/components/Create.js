import React, { useState } from "react";

const Create = ({ user }) => {
  const [isPending, setIsPending] = useState(false);
  const [startDate, setStartDate] = useState([null, null]);
  const [endDate, setEndDate] = useState([null, null]);
  const [ship, setShip] = useState("");
  const [reservation, setReservation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  var fillColor = "";
  var x = "";

  var y1 = new Date(startDate).getTime();
  var y2 = new Date(endDate).getTime();

  var y = [y1, y2];
  if (reservation === "1") {
    fillColor = "#006066";
  } else {
    fillColor = "#061137";
  }

  if (ship === "1") {
    x = "Lady Gita";
  } else if (ship === "2") {
    x = "Ardura";
  } else if (ship === "3") {
    x = "Alba";
  } else if (ship === "4") {
    x = "Slano";
  } else if (ship === "5") {
    x = "Vito";
  } else if (ship === "6") {
    x = "Korab";
  } else if (ship === "7") {
    x = "Agape Rose";
  } else if (ship === "8") {
    x = "Son De Mar";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = { x, y, fillColor, from: fromLocation, to: toLocation };

    setIsPending(true);
    console.log(input);

    const response = await fetch(
      "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user,
        },
        body: JSON.stringify(input),
      }
    );

    if (response) {
      console.log(response);
      setIsPending(false);
      setEndDate("");
      setStartDate("");
      setShip("");
      setReservation("");
      setFromLocation("");
      setToLocation("");
    }
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Create New Reservation
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <b>Vessel </b>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="selectVessel"
                  value={ship}
                  placeholder="Select vessel"
                  onChange={(e) => setShip(e.target.value)}
                >
                  <option defaultValue=""></option>
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
              <div>
                <b>Reservation type </b>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={reservation}
                  placeholder=""
                  onChange={(e) => setReservation(e.target.value)}
                >
                  <option defaultValue=""></option>
                  <option value="0">Booked</option>
                  <option value="1">Option</option>
                </select>
              </div>
              <div>
                <b>From Location </b>
                <input
                  placeholder=""
                  type="text"
                  className="form-control"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
              <div>
                <b>From Date </b>
                <input
                  placeholder=""
                  type="date"
                  className="form-select"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </div>
              <div>
                <b>To Location </b>
                <input
                  placeholder=""
                  type="text"
                  className="form-control"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
              <div>
                <b>To Date </b>
                <input
                  placeholder=""
                  type="date"
                  className="form-select"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="container">
                <div className="button">
                  {!isPending && (
                    <button type="submit" className="btn btn-primary">
                      Add Reservation
                    </button>
                  )}
                  {isPending && (
                    <button disabled type="submit" className="btn btn-primary">
                      Working...
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
