import { useState } from "react";
import { Form } from "./Form";
import { Logo } from "./Logo";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

interface ItemObj {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export interface ItemProp {
  item: ItemObj;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

export interface Items {
  items: ItemObj[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearItems: () => void;
}
export interface ItemsStats {
  items: ItemObj[];
}

export interface AddItems {
  onAddItems: (item: ItemObj) => void;
}

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "charger", quantity: 1, packed: false },
// ];

function App() {
  const [items, setItems] = useState<ItemObj[]>([]);

  const handleAddItems = (item: ItemObj) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleClearItems = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  };

  const handleToggleItem = (id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
