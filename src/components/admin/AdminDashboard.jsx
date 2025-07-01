import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ConcertForm from "./ConcertForm";
import ConcertList from "./ConcertList";

const AdminDashboard = () => {
  const { logout, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg">
                🔓
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome Back
                </h1>
                <p className="text-sm text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-5 py-2 text-sm font-medium transition ${
                activeTab === "form"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Concert List
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-5 py-2 text-sm font-medium transition ${
                activeTab === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Add Concert
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-xl mx-auto">
          {activeTab === "form" ? <ConcertList /> : <ConcertForm />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
