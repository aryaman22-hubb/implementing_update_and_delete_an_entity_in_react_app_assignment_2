import { useEffect, useState } from "react";
import Item from "./Item";

const API_URI = "http://localhost:8000/doors"; // Ensure this matches your backend

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URI);
      if (!response.ok) throw new Error("Failed to fetch doors");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete door");
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleStatus = async (item) => {
    const updatedStatus = item.status === "open" ? "closed" : "open";

    try {
      const response = await fetch(`${API_URI}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updatedStatus }),
      });

      if (!response.ok) throw new Error("Failed to update door status");

      setItems(items.map((i) => (i.id === item.id ? { ...i, status: updatedStatus } : i)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Doors List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={deleteItem} onToggleStatus={toggleStatus} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
