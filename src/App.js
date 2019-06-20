import React from "react";
import Header from "./Components/header/Header";
import ListItem from './Components/list-item/ListItem';
import "./App.css";
import './Components/header/Header.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <ListItem />
      </header>
    </div>
  );
}

export default App;
