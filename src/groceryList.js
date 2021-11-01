import { useState, useEffect } from "react";

export default function GroceryList(props) {
  const [list, setList] = useState(props.items || []);
  const [newItemName, setNewItemName] = useState("");
  useEffect(() => {
    setList([...props.items]); //to avoid mutation
  }, [props.items]);

  useEffect(() => {
    if (props.items != list) {
      // to avoid inital call of onChange
      props.onChange(list);
    }
  }, [list]);
  const addNewItemToList = () => {
    if (newItemName) {
      const isNewItemPresent = list.find((item) => item.name === newItemName);
      const newList = (isNewItemPresent &&
        list.map((item) => {
          item.name === newItemName && item.count++;
          return item;
        })) || [
        ...list,
        {
          name: newItemName,
          count: 1,
          id: Math.random(),
          bought: false,
        },
      ];
      setList(newList);
    } else {
      alert("Please provide Item Name");
    }
  };

  const changeCount = (id, type) => {
    const groceries = list
      .map((item) => {
        if (item.id === id) {
          switch (type) {
            case "increment":
              item.count++;
              break;
            case "decrement":
              if (item.count === 1) {
                const shouldDelete = window.confirm(
                  "Do you want to delete this item"
                );
                shouldDelete && item.count--;
              } else {
                item.count--;
              }
              break;
            case "delete":
            case "buy":
              const confirm = window.confirm(`Do you want to ${type} item?`);
              if (confirm) {
                item.count = 0;
              }
              break;
          }
        }
        return item;
      })
      .filter((item) => item.count > 0);
    setList(groceries);
  };

  return (
    <>
      <div>Add new item</div>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Enter Item here"
      />
      <button onClick={addNewItemToList}>Add Item</button>
      {list.map((item) => (
        <div key={item.id}>
          <div>Item Name: {item.name}</div>
          <div>
            Number/Count: {item.count}{" "}
            <span>
              <div>
                <button onClick={() => changeCount(item.id, "increment")}>
                  Increment
                </button>
              </div>
              <div>
                <button onClick={() => changeCount(item.id, "decrement")}>
                  Decrement
                </button>
              </div>
              <div>
                <button onClick={() => changeCount(item.id, "delete")}>
                  Delete Item
                </button>
              </div>
              <div>
                <button onClick={() => changeCount(item.id, "buy")}>
                  Buy Item
                </button>
              </div>
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
