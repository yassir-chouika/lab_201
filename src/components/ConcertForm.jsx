// src/components/ConcertForm.jsx
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialFormState = {
  titre: "",
  date: "",
  venue: "",
  ville: "",
  pays: "",
  isSoldOut: false,
};

const ConcertForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.titre ||
      !formData.date ||
      !formData.venue ||
      !formData.ville ||
      !formData.pays
    ) {
      return alert("Please fill in all fields.");
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "concerts"), {
        ...formData,
        date: Timestamp.fromDate(new Date(formData.date)),
      });
      setSuccessMsg("Concert added successfully!");
      setFormData(initialFormState);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error adding concert:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Ajouter un concert
        </h2>
        <p className="text-sm text-gray-500">Créer un nouveau concert</p>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-green-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-green-800">
              {successMsg}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="titre"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Titre
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            placeholder="Titre du concert"
            value={formData.titre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="venue"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Lieu
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            placeholder="Nom du lieu"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ville"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ville
            </label>
            <input
              type="text"
              id="ville"
              name="ville"
              placeholder="Ville"
              value={formData.ville}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="pays"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pays
            </label>
            <input
              type="text"
              id="pays"
              name="pays"
              placeholder="Pays"
              value={formData.pays}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isSoldOut"
            name="isSoldOut"
            checked={formData.isSoldOut}
            onChange={handleChange}
            className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
          />
          <label htmlFor="isSoldOut" className="ml-2 text-sm text-gray-700">
            Sold out
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Ajouter un concert"}
        </button>
      </form>
    </div>
  );
};

export default ConcertForm;
