import React, { Fragment } from "react";
import Header from "../header/Header";
import ListItemShopping from "../list-item-shopping/ListItemShopping";
import "typeface-roboto";
import "../../App.css";
import Loading from "../loading/Loading";
import * as fetch from "../../API/login";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch.verifyToken(token).then(res => {
      if (res.data === "Token Fail"){
        localStorage.removeItem('token');
        this.props.history.push("/");
      }
      return;
    });
    this.setState({
      isLoading: false
    });
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Fragment>
        <Header />
        <ListItemShopping />
      </Fragment>
    );
  }
}

export default Main;
