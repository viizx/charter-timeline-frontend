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
    <div class="container mx-auto py-5 sm:px-3 md:px-100 lg:px-100">
      <div class="align-content: center px-4">
        <form onSubmit={handleSubmit}>
          <div class="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                for="selectVessel"
                class="block text-sm font-medium text-gray-700"
              >
                Ship
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                for="reservationType"
                class="block text-sm font-medium text-gray-700"
              >
                Reservation Type
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-label="Default select example"
                value={reservation}
                id="reservationType"
                placeholder=""
                onChange={(e) => setReservation(e.target.value)}
              >
                <option defaultValue=""></option>
                <option value="0">Booked</option>
                <option value="1">Option</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="fromLocation"
                class="block text-sm font-medium text-gray-700"
              >
                From Location
              </label>
              <input
                placeholder=""
                id="fromLocation"
                type="text"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="startDate"
                class="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                placeholder=""
                type="date"
                id="startDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="toLocation"
                class="block text-sm font-medium text-gray-700"
              >
                To Location
              </label>
              <input
                placeholder=""
                id="toLocation"
                type="text"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="toDate"
                class="block text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                placeholder=""
                type="date"
                id="toDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 py-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
              {!isPending && (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Reservation
                </button>
              )}
              {isPending && (
                <button
                  disabled
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Working...
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
