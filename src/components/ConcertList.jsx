// src/components/ConcertList.jsx
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { format } from "date-fns";

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "concerts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConcerts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (concert) => {
    setEditingId(concert.id);
    setEditForm({
      titre: concert.titre,
      date: concert.date?.seconds
        ? format(new Date(concert.date.seconds * 1000), "yyyy-MM-dd")
        : "",
      venue: concert.venue,
      ville: concert.ville,
      pays: concert.pays,
      isSoldOut: concert.isSoldOut,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (concertId) => {
    try {
      const docRef = doc(db, "concerts", concertId);
      await updateDoc(docRef, {
        ...editForm,
        date: editForm.date
          ? Timestamp.fromDate(new Date(editForm.date))
          : null,
      });
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error("Error updating concert:", error);
      alert("Failed to update concert");
    }
  };

  const handleDelete = async (concertId) => {
    try {
      await deleteDoc(doc(db, "concerts", concertId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting concert:", error);
      alert("Failed to delete concert");
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Concerts</h2>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Concerts
            </h2>
            <p className="text-sm text-gray-500">
              {concerts.length} {concerts.length === 1 ? "concert" : "concerts"}{" "}
              total
            </p>
          </div>
          {concerts.length > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {concerts.filter((c) => c.isSoldOut).length} sold out
            </span>
          )}
        </div>
      </div>

      {concerts.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            No concerts
          </h3>
          <p className="text-sm text-gray-500">
            Get started by adding your first concert.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {concerts.map((concert) => (
            <div
              key={concert.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              {editingId === concert.id ? (
                // Edit Form
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="titre"
                        value={editForm.titre}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs  font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={editForm.date}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs  font-medium text-gray-700 mb-1">
                        Venue
                      </label>
                      <input
                        type="text"
                        name="venue"
                        value={editForm.venue}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs  font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="ville"
                        value={editForm.ville}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs  font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="pays"
                        value={editForm.pays}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div className="flex items-center pt-4">
                      <input
                        type="checkbox"
                        name="isSoldOut"
                        checked={editForm.isSoldOut}
                        onChange={handleEditChange}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Sold out
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(concert.id)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-gray-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900">
                      {concert.titre}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {concert.isSoldOut && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Sold out
                        </span>
                      )}
                      <button
                        onClick={() => handleEdit(concert)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Edit concert"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(concert.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete concert"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {concert.date?.seconds
                        ? format(
                            new Date(concert.date.seconds * 1000),
                            "MMM dd, yyyy"
                          )
                        : "Date TBA"}
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {concert.venue}
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {concert.ville}
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                        />
                      </svg>
                      {concert.pays}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-xs backdrop-brightness-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Supprimer le concert
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Êtes-vous sûr de vouloir supprimer ce concert ? Cette action est
              irréversible
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcertList;
