import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../utility/useFetch";
import Edit from "./Edit";

const Reservation = () => {
  const options = { year: "numeric", month: "short", day: "numeric" };

  const { id } = useParams();
  const {
    data: reservation,
    error,
    isPending,
  } = useFetch(
    "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation/" +
      id
  );
  const history = useHistory();

  const handleDelete = async () => {
    const response = await fetch(
      "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation/" +
        id,
      {
        method: "DELETE",
      }
    );
    if (response) {
      history.push("/dashboard");
    }
  };

  return (
    <div>
      <div className="text-center min-h-full items-center justify-center sm:mx-4 md:mx-16 lg:mx-24 py-12 sm:px-4 md:px-6 lg:px-8">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {reservation && (
          <div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 sm:col-span-1 py-2">Ship</div>
              <div className="col-span-1 sm:col-span-1 py-2">From</div>
              <div className="col-span-1 sm:col-span-1 py-2">To</div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.x}
              </div>
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.from},{" "}
                {new Date(reservation.y[0]).toLocaleDateString(
                  "en-UK",
                  options
                )}
              </div>
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.to},{" "}
                {new Date(reservation.y[1]).toLocaleDateString(
                  "en-UK",
                  options
                )}
              </div>
            </div>
            <div className="col-span-6 sm:col-span-6 py-2  py-3 bg-gray-50 text-right sm:px-6">
              {!isPending && (
                <button
                  onClick={handleDelete}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                >
                  Delete Reservation
                </button>
              )}
              {isPending && (
                <button
                  disabled
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                >
                  Working...
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Edit props={reservation} />
    </div>
  );
};

export default Reservation;
