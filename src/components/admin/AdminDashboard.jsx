// src/components/AdminDashboard.jsx
import { useAuth } from "../../context/AuthContext";
import ConcertForm from "./ConcertForm";
import ConcertList from "./ConcertList";

const AdminDashboard = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="font-semibold">Logged in as:</p>
            <p className="text-blue-600">{currentUser?.email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <ConcertForm />
        <hr className="my-6" />
        <ConcertList />
      </div>
    </div>
  );
};

export default AdminDashboard;
