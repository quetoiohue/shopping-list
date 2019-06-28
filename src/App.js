import React from "react";
import Main from "./Components/main/Main";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import LoginForm from "./Components/login/LoginForm";
import SignUpForm from "./Components/signup/SignUpForm";
import ShareList from "./Components/share-list/ShareList";
import "typeface-roboto";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route path="/" exact component={LoginForm} />
              <Route path="/list" component={Main} />
              <Route path="/share" component={ShareList} />
              <Route path="/signup" component={SignUpForm} />
            </Switch>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
