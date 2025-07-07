import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Tour2025() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "concerts"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConcerts(data.slice(0, 4)); // Show only the first 4 concerts
      } catch (error) {
        console.error("Error fetching concerts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  const formatDate = (date) => {
    if (!date?.toDate) return "TBD";
    return date.toDate().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <div className="w-full py-8 px-4">
        <h1 className="font-sans text-center text-4xl md:text-6xl font-bold text-gray-800 tracking-wider">
          TOUR 2025
        </h1>
      </div>

      {/* Main Content */}
      <div className="font-mono flex-1 flex flex-col lg:flex-row">
        {/* Left Side - X Pattern */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="relative w-full max-w-md aspect-square">
            <img src="/AfficheTour.png" alt="" />
          </div>
        </div>

        {/* Right Side - Tour Dates */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
          <div className="max-w-md mx-auto lg:mx-0">
            <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-8">
              Liste des dates dynamiques
            </h2>

            {loading ? (
              <div className="space-y-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                    <div className="text-gray-400 animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-48 mb-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : concerts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun concert trouvé.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {concerts.map((concert) => (
                  <div key={concert.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-800">
                      <span className="font-medium">{concert.ville}</span>
                      <span className="mx-2">–</span>
                      <span className="font-medium">
                        {formatDate(concert.date)}
                      </span>
                      <span className="mx-2">–</span>
                      <span>{concert.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12">
              <button
                onClick={() => navigate("/ConcertsPage")}
                className="px-6 py-3 border border-gray-600 rounded-full text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                Voir toutes les dates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
