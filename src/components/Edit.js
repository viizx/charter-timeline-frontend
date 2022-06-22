import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Edit = ({ props }) => {
  const defaultValues = props;

  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("hr-HR")
  );
  const [endDate, setEndDate] = useState("");
  const [ship, setShip] = useState("");
  const [reservation, setReservation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const setDefaultValues = () => {
    setStartDate(new Date(defaultValues.y[0]).toISOString().split("T")[0]);
    setEndDate(new Date(defaultValues.y[1]).toISOString().split("T")[0]);
    setShip(defaultValues.x);
    setReservation(defaultValues.fillColor);
    setFromLocation(defaultValues.from);
    setToLocation(defaultValues.to);
  };
  useEffect(() => {
    if (defaultValues) {
      setDefaultValues();
    }
  }, defaultValues);

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
      "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation/" +
        id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      <form onSubmit={handleSubmit}>
        <div className="align-content: center px-4">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                htmlFor="selectVessel"
                className="block text-sm font-medium text-gray-700"
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
                <option defaultValue="">Select vessel</option>
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
                htmlFor="reservationType"
                className="block text-sm font-medium text-gray-700"
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
                <option defaultValue="">Select your option</option>
                <option value="#006066">Booked</option>
                <option value="#061137">Option</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="fromLocation"
                className="block text-sm font-medium text-gray-700"
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
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="toLocation"
                className="block text-sm font-medium text-gray-700"
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
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  Edit Reservation
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
        </div>
      </form>
    </div>
  );
};

export default Edit;
