import React, { useState, useEffect } from "react";
import MaterialIcon from "material-icons-react";
import "../list-item-shopping/list-check-off/ListCheckedOff.css";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Check from "@material-ui/icons/Check";
import MenuDrawer from "./menu-drawer/MenuDrawer";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSort: false,
      left: false
    };
    console.log(this.props.isSort);
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    const { notBtnSort } = this.refs;

    if (
      this.node &&
      this.node.contains(e.target) &&
      !notBtnSort.contains(e.target)
    ) {
      return;
    }
    this.setIsOpenSort(false);
  };

  setIsOpenSort = open => {
    this.setState({
      isOpenSort: open
    });
  };

  toggleDrawer = (event, open) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ left: open });
  };

  render() {
    const { isOpenSort, left } = this.state;
    const props = {
      left,
      toggleDrawer: this.toggleDrawer,
    };
    return (
      <div>
        <div className="header">
          <div className="header-inner">
            <div className="btn left-btn">
              <div
                className="btn-icon"
                onClick={e => {
                  this.toggleDrawer(e, true);
                }}
              >
                <MaterialIcon icon="menu" />
              </div>
            </div>
            <div className="header-content">
              <h3 className="title-header">
                <a className="logo-link">Shopping List</a>
              </h3>
              <div
                ref={node => (this.node = node)}
                className="container-btn-right"
              >
                {isOpenSort ? <CardOptionsForm /> : ""}
                <div className="wrap-btn-right">
                  <div
                    className="btn right-btn"
                    onClick={event => {
                      this.setIsOpenSort(!isOpenSort);
                    }}
                  >
                    <div className="btn-icon">
                      <MaterialIcon icon="sort" />
                    </div>
                  </div>
                  <div className="btn right-btn" ref="notBtnSort">
                    <div className="btn-icon">
                      <MaterialIcon icon="person_add" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MenuDrawer {...props} {...this.props} />
      </div>
    );
  }
}

const useStyles = {
  nameOption: {
    padding: "0px 24px !important",
    fontFamily: "Roboto, sans-serif",
    textOverflow: "ellipsis",
    textAlign: "left",
    height: "48px",
    color: "rgb(95, 99, 104)"
  }
};

class CardOptions extends React.Component {
  state = {
    classes: useStyles
  };

  setSortOrder = event => {
    event.preventDefault();
    this.props.onChangeStateSort({
      isOrder: true,
      isCategory: false,
      isAlpha: false
    });
  };

  setSortCategory = event => {
    event.preventDefault();
    this.props.onChangeStateSort({
      isOrder: false,
      isCategory: true,
      isAlpha: false
    });
  };

  setSortAlpha = event => {
    event.preventDefault();
    this.props.onChangeStateSort({
      isOrder: false,
      isCategory: false,
      isAlpha: true
    });
  };

  render() {
    console.log("Card: ", this.props);
    const { isOrder, isCategory, isAlpha } = this.props.isSort;
    localStorage.setItem("isSort", JSON.stringify(this.props.isSort));
    const classes = this.state;
    return (
      <List component="nav" className="card-option card-category">
        <ListItem
          button
          className={`${classes.nameOption}`}
          onClick={this.setSortOrder}
        >
          {isOrder ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : (
            <ListItemIcon />
          )}

          <ListItemText>Order added</ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          button
          className={`${classes.nameOption}`}
          onClick={this.setSortCategory}
        >
          {isCategory ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : (
            <ListItemIcon />
          )}
          <ListItemText>Category</ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          button
          className={`${classes.nameOption}`}
          onClick={this.setSortAlpha}
        >
          {isAlpha ? (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          ) : (
            <ListItemIcon />
          )}
          <ListItemText>Alphabetical</ListItemText>
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {isSort: state.sort.stateSort}
}

const mapDispatchToProps = dispatch => {
  return { 
    onChangeStateSort: (stateSort) => dispatch({type: actionTypes.CHANGE_STATE_SORT, stateSort: stateSort })
   } 
}

const CardOptionsForm =  connect(mapStateToProps, mapDispatchToProps)(CardOptions);

