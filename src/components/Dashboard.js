import Read from "./Read";
import useFetch from "../utility/useFetch";
import Loading from "./Loading";
import Create from "./Create";

const Dashboard = ({ user }) => {
  const { isPending, data: reservations } = useFetch(
    "https://port-3000-js-practice-vice889681.codeanyapp.com/api/reservation"
  );

  return (
    <>
      <div className="container">
        <Create user={user} />
      </div>
      {isPending && <Loading />}
      {reservations && <Read reservations={reservations} />}
    </>
  );
};

export default Dashboard;
