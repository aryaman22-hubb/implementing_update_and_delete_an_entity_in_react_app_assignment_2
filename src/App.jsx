import ItemList from "./components/ItemList";

// Use the following link to get the data
// `/doors` will give you all the doors.
const API_URI = `https://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  return <ItemList apiUri={API_URI} />;
}

export default App;
