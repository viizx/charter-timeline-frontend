import Read from "./Read";
import useFetch from "../utility/useFetch";
import Loading from "./Loading";
import Create from "./Create";

const Dashboard = () => {
  const { isPending, data: reservations } = useFetch(
    "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation"
  );

  return (
    <>
      <Create />
      {isPending && <Loading />}
      {reservations && <Read reservations={reservations} />}
    </>
  );
};

export default Dashboard;
