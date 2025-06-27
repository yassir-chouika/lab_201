import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Public Website</h1>
      <a href="/login" className="text-blue-500 hover:underline text-lg">
        Go to Admin Login
      </a>
    </div>
  );
};

export default HomePage;
