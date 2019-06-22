import React, { useState, useEffect } from "react";
import Header from "./Components/header/Header";
import ListItemShopping from "./Components/list-item-shopping/ListItemShopping";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    const getStateSort = JSON.parse(localStorage.getItem("isSort"));
    super(props);
    this.state = {
      stateSort: getStateSort
    };
  }
  callBack = stateSort => {
    this.setState({ stateSort });
  };

  componentDidMount() {
    const { stateSort } = this.state;
    this.setState({
      stateSort
    });
  }
  render() {
    const { stateSort } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Header callBack={this.callBack} />
          <ListItemShopping stateSort={stateSort} />
        </header>
      </div>
    );
  }
}

export default App;
