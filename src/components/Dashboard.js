import { useState } from "react";
import Read from "./Read";
import useFetch from "../utility/useFetch";
import Loading from "./Loading";
import Create from "./Create";

const Dashboard = ({ user }) => {
  const { isPending, data: reservations } = useFetch(
    "http://localhost:3000/api/reservation"
  );

  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="container mx-auto py-5 sm:px-3 md:px-100 lg:px-100">
        {!modal && (
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
            onClick={() => setModal(!modal)}
          >
            Create new Reservation
          </button>
        )}
        {modal && (
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
            onClick={() => setModal(!modal)}
          >
            Hide
          </button>
        )}
      </div>
      {modal && <Create user={user} />}
      {isPending && <Loading />}
      {reservations && <Read reservations={reservations} />}
    </>
  );
};

export default Dashboard;
