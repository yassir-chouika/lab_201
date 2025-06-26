import { useState } from "react";
import { db } from "../../services/firebase";
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
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error("Error adding concert:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Add New Concert</h2>

      {successMsg && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm">
          {successMsg}
        </div>
      )}

      <input
        type="text"
        name="titre"
        placeholder="Title"
        value={formData.titre}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={formData.venue}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        name="ville"
        placeholder="City"
        value={formData.ville}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        name="pays"
        placeholder="Country"
        value={formData.pays}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          name="isSoldOut"
          checked={formData.isSoldOut}
          onChange={handleChange}
          className="accent-red-500"
        />
        <span>Sold Out</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Adding..." : "Add Concert"}
      </button>
    </form>
  );
};

export default ConcertForm;
