import React, { Fragment } from "react";
import Header from "../header/Header";
import ListItemShopping from "../list-item-shopping/ListItemShopping";
import "typeface-roboto";
import "../../App.css";
import Loading from '../loading/Loading';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    
  }

  componentDidMount() {

    const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
    const { history } = this.props;

    //*****Google
    // if( !tokenGoogle ) {
    //     history.push('/');
    // }
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
