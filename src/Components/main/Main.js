import React, { Fragment } from "react";
import Header from "../header/Header";
import ListItemShopping from "../list-item-shopping/ListItemShopping";
import { Link } from "react-router-dom";
import "typeface-roboto";
import "../../App.css";
import { accessToken } from "../../API/login";
import { connect } from "react-redux";
import * as actionTypes from '../../store/action';

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
    console.log( tokenGoogle );
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
    console.log("Main : ", this.props.isSort);
    return isLoading ? (
      <div className="App-header text-loading">Loading...</div>
    ) : (
      <Fragment>
        <Header />
        <ListItemShopping {...this.props}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {isSort: state.sort.stateSort}
}

const mapDispatchToProps = dispatch => {
  return { onChangeStateSort: (isSort) => dispatch({type: actionTypes.CHANGE_STATE_SORT, stateSort: isSort}) } 
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
