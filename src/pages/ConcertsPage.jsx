import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const ConcertsPage = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "concerts"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConcerts(data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };
    fetchConcerts();
  }, []);

  const formatDate = (date) => {
    if (!date?.toDate) return "Date TBD";
    return date.toDate().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-light text-gray-900 mb-8">
          Upcoming Concerts
        </h1>

        {concerts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No concerts found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {concerts.map((concert) => (
              <div
                key={concert.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-medium text-gray-900 mb-2">
                      {concert.titre}
                    </h2>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{formatDate(concert.date)}</div>
                      <div>{concert.venue}</div>
                      <div>
                        {concert.ville}, {concert.pays}
                      </div>
                    </div>
                  </div>
                  {concert.isSoldOut && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcertsPage;
