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

  const handleClick = () => {
    fetch(
      "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation/" +
        id,
      {
        method: "DELETE",
      }
    ).then(() => {
      history.push(0);
    });
  };

  return (
    <div className="kontejner2">
      <div className="reservation-details">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {reservation && (
          <div className="row">
            <div className="col-sm">
              <div className="container">{reservation.x}</div>
            </div>
            <div className="col-sm">
              <div className="container">
                {reservation.fillColor === "#006066" && "Option"}
                {reservation.fillColor === "#061137" && "Booked"}
              </div>
            </div>
            <div className="col-sm">
              <div className="container">
                {new Date(reservation.y[0]).toLocaleDateString(
                  "en-US",
                  options
                )}
              </div>
            </div>
            <div className="col-sm">
              <div className="container">
                {new Date(reservation.y[1]).toLocaleDateString(
                  "en-US",
                  options
                )}
              </div>
            </div>

            <div className="col-sm">
              <div className="container">
                <button onClick={handleClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            <Edit props={reservation} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;
