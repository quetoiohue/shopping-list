import React, { Fragment } from "react";
import Header from "../header/Header";
import ListItemShopping from "../list-item-shopping/ListItemShopping";
import { Link } from "react-router-dom";
import "typeface-roboto";
import "../../App.css";
import { accessToken } from "../../API/login";

class Main extends React.Component {
  constructor(props) {
    const getAccount = JSON.parse(localStorage.getItem("account"));
    super(props);
    this.state = {
      stateSort: getAccount.isSort || { isAlpha: false, isCategory: false, isOrder: true },
      isLoading: true,
    };
    console.log(this.state.getAccount);
  }
  
  callBack = stateSort => {
    this.setState({ stateSort });
  };

  componentDidMount() {
    const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
    const { history } = this.props;

    //*****Google
    console.log( tokenGoogle );
    if( !tokenGoogle ) {
        history.push('/');
    }
    this.setState({
      isLoading: false
    })
   //****Facebook
    // accessToken(token)
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       this.setState({
    //         dataUser: res.data
    //       });
    //     }
    //     this.setState({ isLoading: false });
    //     return;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     history.push("/");
    //   });
  }

  render() {
    const { stateSort, isLoading } = this.state;
    const props = {
      stateSort,
      callBack: this.callBack
    };
    
    return isLoading ? (
      <div className="App-header text-loading">Loading...</div>
    ) : (
      <Fragment>
        <Header {...props} {...this.props}/>
        <ListItemShopping {...props} />
      </Fragment>
    );
  }
}

export default Main;
