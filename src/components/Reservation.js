import { useHistory, useParams } from "react-router-dom";
import useFetch from "../utility/useFetch";

const ReservationDetails = () => {
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
      history.push("/");
    });
  };

  return (
    <div className="reservation-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {reservation && (
        <article>
          <div>{reservation.x}</div>
          <div className="container">
            {new Date(reservation.y[0]).toLocaleDateString("en-US", options)}
          </div>
          <div className="container">
            {new Date(reservation.y[1]).toLocaleDateString("en-US", options)}
          </div>
          <div>{reservation.fillColor === "#006066" && "Booked"}</div>
          <div>{reservation.fillColor === "#061137" && "Option"}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default ReservationDetails;
