import { useState } from "react";
import axios from "axios";

export default function SaveLayoutButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/save");
      setStatus("✅ Saved successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to save layout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Layout"}
      </button>
      {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
    </div>
  );
}
