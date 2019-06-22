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

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSort: false,
    };    
  }

  setIsOpenSort = () => {
    this.setState({
      isOpenSort: !this.state.isOpenSort
    });
  };
  render() {
    const { isOpenSort } = this.state;
    return (
      <div className="header">
        <div className="header-inner">
          <div className="btn left-btn">
            <div className="btn-icon">
              <MaterialIcon icon="menu" />
            </div>
          </div>
          <div className="header-content">
            <h3 className="title-header">
              <a className="logo-link">Shopping List</a>
            </h3>
            <div 
            className="container-btn-right"
            >
              {isOpenSort ? (
                <CardOptions 
                {...this.props}/>
              ) : (
                ""
              )}
              <div className="wrap-btn-right">
                <div
                  className="btn right-btn"
                  onClick={() => {
                    this.setIsOpenSort();
                  }}
                >
                  <div className="btn-icon">
                    <MaterialIcon icon="sort" />
                  </div>
                </div>
                <div className="btn right-btn">
                  <div className="btn-icon">
                    <MaterialIcon icon="person_add" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  constructor(props) {
    super(props);
    const getIsSort = JSON.parse(localStorage.getItem('isSort'));
    this.state = {
      isSort: getIsSort || {isOrder: true, isCategory: false, isAlpha: false},
      classes: useStyles,
    }; 
    console.log("header : ", this.props);   
  }

  setSortOrder = event => {
    event.preventDefault();
    this.setState(
      {
        isSort: {
          isOrder: true,
          isCategory: false,
          isAlpha: false
        }
      },
      () => this.props.callBack(this.state.isSort)
    );
    
  };

  setSortCategory = event => {
    event.preventDefault();
    this.setState(
      {
        isSort: {
          isOrder: false,
          isCategory: true,
          isAlpha: false
        }
      },
      () => this.props.callBack(this.state.isSort)
    );
  };

  setSortAlpha = event => {
    event.preventDefault();
    this.setState(
      {
        isSort: {
          isOrder: false,
          isCategory: false,
          isAlpha: true
        }
      },
      () => this.props.callBack(this.state.isSort)
    );
  };
  render() {
    const { isSort } = this.state;
    const { isOrder, isCategory, isAlpha } = isSort;
    localStorage.setItem('isSort', JSON.stringify(isSort));
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
