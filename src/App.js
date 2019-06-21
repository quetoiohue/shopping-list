import React from "react";
import Header from "./Components/header/Header";
import ListItemShopping from "./Components/list-item-shopping/ListItemShopping";
import "./App.css";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <ListItemShopping />
      </header>
    </div>
  );
}

export default App;
