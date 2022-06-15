import React, { useState } from "react";

const Create = ({ user }) => {
  const [isPending, setIsPending] = useState(false);
  const [startDate, setStartDate] = useState([null, null]);
  const [endDate, setEndDate] = useState([null, null]);
  const [ship, setShip] = useState("");
  const [reservation, setReservation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  var y1 = new Date(startDate).getTime();
  var y2 = new Date(endDate).getTime();

  var y = [y1, y2];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      x: ship,
      y,
      fillColor: reservation,
      from: fromLocation,
      to: toLocation,
    };

    setIsPending(true);

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
    <div className="container mx-auto py-5 sm:px-3 md:px-100 lg:px-100">
      <div className="align-content: center px-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                for="selectVessel"
                className="block text-sm font-medium text-gray-700"
              >
                Ship
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                aria-label="Default select example"
                id="selectVessel"
                value={ship}
                placeholder="Select vessel"
                onChange={(e) => setShip(e.target.value)}
              >
                <option defaultValue=""></option>
                <option value="Lady Gita">Lady Gita</option>
                <option value="Ardura">Ardura</option>
                <option value="Alba">Alba</option>
                <option value="Slano">Slano</option>
                <option value="Vito">Vito</option>
                <option value="Korab">Korab</option>
                <option value="Agape Rose">Agape Rose</option>
                <option value="Son De Mar">Son De Mar</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                for="reservationType"
                className="block text-sm font-medium text-gray-700"
              >
                Reservation Type
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                aria-label="Default select example"
                value={reservation}
                id="reservationType"
                placeholder=""
                onChange={(e) => setReservation(e.target.value)}
              >
                <option defaultValue=""></option>
                <option value="#006066">Booked</option>
                <option value="#061137">Option</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="fromLocation"
                className="block text-sm font-medium text-gray-700"
              >
                From Location
              </label>
              <input
                placeholder=""
                id="fromLocation"
                type="text"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                placeholder=""
                type="date"
                id="startDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="toLocation"
                className="block text-sm font-medium text-gray-700"
              >
                To Location
              </label>
              <input
                placeholder=""
                id="toLocation"
                type="text"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                for="toDate"
                className="block text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                placeholder=""
                type="date"
                id="toDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 py-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
              {!isPending && (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                >
                  Add Reservation
                </button>
              )}
              {isPending && (
                <button
                  disabled
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
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
