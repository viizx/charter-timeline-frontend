import Read from "./Read";
import useFetch from "../utility/useFetch";
import Loading from "./Loading";

const ReservationList = () => {
  const { isPending, data: reservations } = useFetch(
    "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation"
  );
  console.log(reservations);

  return (
    <>
      {isPending && <Loading />}
      {reservations && <Read reservations={reservations} />}
    </>
  );
};

export default ReservationList;
