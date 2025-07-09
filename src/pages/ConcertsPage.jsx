import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const ConcertsPage = () => {
  const [concerts, setConcerts] = useState([]);
  const navigate = useNavigate();

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
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors hover:opacity-80"
            style={{
              border:"2px solid",
              bordercolor: "#00FFE0",
              color: "#0D1B2A",
              cursor: "pointer",
              borderRadius:"50px",
            }}
            onClick={() => navigate("/")}
          >
            Retour
          </button>
          <div className="text-center flex-1">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#00FFE0" }}
            >
              Concerts à venir
            </h1>
            <div
              className="h-1 w-24 mx-auto rounded-full"
              style={{ backgroundColor: "#FF3CAC" }}
            ></div>
          </div>
          <div className="w-20"></div>
        </div>

        {concerts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#0D1B2A" }}
              >
                <span className="text-2xl" style={{ color: "#EAEAEA" }}>
                  ♪
                </span>
              </div>
            </div>
            <p className="text-lg" style={{ color: "#EAEAEA" }}>
              No concerts found.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {concerts.map((concert) => (
              <div
                key={concert.id}
                className="rounded-xl p-6 shadow-lg border-2"
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#00FFE0",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2
                      className="font-mono text-2xl font-bold mb-3"
                      style={{ color: "#00FFE0" }}
                    >
                      {concert.titre}
                    </h2>
                    <div
                      className="space-y-2 text-base"
                      style={{ color: "#EAEAEA" }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#FF3CAC" }}
                        ></span>
                        <span className="font-sans text-[#FF3CAC]">{formatDate(concert.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#FF3CAC" }}
                        ></span>
                        <span className="font-sans text-[#FF3CAC]">{concert.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#FF3CAC" }}
                        ></span>
                        <span className="font-sans text-[#FF3CAC]">
                          {concert.ville}, {concert.pays}
                        </span>
                      </div>
                    </div>
                  </div>

                  {concert.isSoldOut && (
                    <div className="ml-4">
                      <span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide animate-pulse"
                        style={{
                          backgroundColor: "#FF3CAC",
                          color: "#0D1B2A",
                          boxShadow: "0 0 15px rgba(255, 60, 172, 0.5)",
                        }}
                      >
                        COMPLET
                      </span>
                    </div>
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
