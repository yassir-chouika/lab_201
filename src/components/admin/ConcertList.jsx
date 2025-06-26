import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "concerts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConcerts(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Concert List</h2>
      {concerts.length === 0 ? (
        <p className="text-gray-500">No concerts found.</p>
      ) : (
        <ul className="space-y-4">
          {concerts.map((concert) => (
            <li
              key={concert.id}
              className="border rounded p-4 bg-gray-50 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{concert.titre}</h3>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {concert.date?.seconds
                  ? format(new Date(concert.date.seconds * 1000), "dd MMM yyyy")
                  : "—"}
              </p>
              <p>
                <span className="font-medium">Venue:</span> {concert.venue}
              </p>
              <p>
                <span className="font-medium">City:</span> {concert.ville}
              </p>
              <p>
                <span className="font-medium">Country:</span> {concert.pays}
              </p>
              <p>
                <span className="font-medium">Sold Out:</span>{" "}
                <span
                  className={
                    concert.isSoldOut
                      ? "text-red-600 font-bold"
                      : "text-green-600"
                  }
                >
                  {concert.isSoldOut ? "Yes" : "No"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConcertList;
