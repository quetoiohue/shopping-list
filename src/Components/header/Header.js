import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import '../list-item-shopping/list-check-off/ListCheckedOff.css';
import './Header.css';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Check from '@material-ui/icons/Check';
// import Empty from '@material-ui/icons/'
export default class Header extends React.Component {
  render() {
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
            <div className="container-btn-right">
              <CardOptions />
            <div className="wrap-btn-right">
              <div 
              className="btn right-btn"
              onClick={() => {}}
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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  nameOption: {
    padding: "0px 24px !important",
    
    fontFamily: "Roboto, sans-serif",
    textOverflow: "ellipsis",
    textAlign: "left",
    height: "48px",
    color: "rgb(95, 99, 104)",
  },
}));

const CardOptions = props => {
  const classes = useStyles();
  const [isOrder, setisOrder] = useState(false);
  const [isCategory, setisCategory] = useState(false);
  const [isAlpha, setisAlpha] = useState(false);

  console.log(props);

  const setSortOrder = (event) => {
    event.preventDefault();
    setisOrder(!isOrder);
    setisCategory(false);
    setisAlpha(false);
  }

  const setSortCategory = (event) => {
    event.preventDefault();
    setisCategory(!isCategory);
    setisOrder(false);
    setisAlpha(false);
  }

  const setSortAlpha = (event) => {
    event.preventDefault();
    setisAlpha(!isAlpha);
    setisCategory(false);
    setisOrder(false);
  }
  return (
    <List component="nav" className="card-option card-category">
      <ListItem
        button
        className={`${classes.nameOption}`}
        onClick={(event) => setSortOrder(event)}
      >
        { isOrder ? <ListItemIcon>
          <Check />
        </ListItemIcon> : <ListItemIcon></ListItemIcon>}
        
        <ListItemText>Order added</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        button
        className={`${classes.nameOption}`}
        onClick={(event) => setSortCategory(event)}
      >
        { isCategory ? <ListItemIcon>
          <Check />
        </ListItemIcon> :<ListItemIcon></ListItemIcon>}
        <ListItemText>Category</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        button
        className={`${classes.nameOption}`}
        onClick={(event) => setSortAlpha(event)}
      >
        { isAlpha ? <ListItemIcon>
          <Check />
        </ListItemIcon> : <ListItemIcon></ListItemIcon>}
        <ListItemText >Alphabetical</ListItemText>
      </ListItem>
    </List>
  );
};