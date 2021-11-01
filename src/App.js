import { useState, useEffect } from "react";
import GroceryList from "./groceryList";

function App() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    async function getData() {
      const grocery = await fetch(
        "https://mocki.io/v1/16d39e28-ca44-4a64-a5d5-573e2bf92b64" //created a mock API to fetch initial values
      ).then((response) => response.json());
      setGroceries(grocery);
    }
    getData();
  }, []);

  const triggerOnChange = (list) => {};
  return (
    <div className="App">
      <header className="App-header">
        <GroceryList items={groceries} onChange={triggerOnChange} />
      </header>
    </div>
  );
}

export default App;
