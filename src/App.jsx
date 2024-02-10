import { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";

const setItemsToLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const App = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("list") || [])
  );

  const addItem = (name) => {
    const newItem = {
      name,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setItemsToLocalStorage(newItems);
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    setItemsToLocalStorage(newItems);
  };

  const editItem = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setItems(newItems);
    setItemsToLocalStorage(newItems);
  };

  return (
    <section className="section-center">
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};

export default App;
