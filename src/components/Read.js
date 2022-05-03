import React, { useState } from "react";
import { Link } from "react-router-dom";

const Read = ({ reservations }) => {
  let options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div className="kontejner">
      <div className="novi-red-head">
        <div className="row">
          <div className="col-sm">Ship</div>
          <div className="col-sm">From</div>
          <div className="col-sm">To</div>
        </div>
      </div>

      {reservations.map((reservation) => (
        <div key={reservation._id}>
          <form>
            <a
              href={`https://port-3001-js-practice-vice889681.codeanyapp.com/reservations/${reservation._id}`}
            >
              <div className="novi-red">
                <div className="row">
                  <div className="col-sm">
                    <div className="container">{reservation.x}</div>
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
                </div>
              </div>
            </a>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Read;
