import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialIcon from "material-icons-react";
import Drawer from "@material-ui/core/Drawer";
import "./MenuDrawer.css";
import {
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles({
  list: {
    width: 330,
    margin: 0,
    marginBottom: "56px"
  },
  fullList: {
    width: "auto"
  }
});

const MenuDrawer = props => {
  const classes = useStyles();

  //****get info facebook
  // const { id, name, picture } = props.dataUser;
  // const urlProfile = picture.data.url;

 const clickLogOut = () => {
   debugger
    props.history.push("/");
    localStorage.removeItem("tokenGoogle");
    return;
  };

  //****get info Google
  const User = JSON.parse(localStorage.getItem("tokenGoogle")) || {};
  const { email, name, imageUrl } = User.profileObj || {};

 

  const sideList = () => (
    <div className={classes.list} role="presentation">
      <div onClick={() => {clickLogOut()}} className="wrap-account-item">
        <div className="wrap-account">
          <div
            className="wrap-img-acc"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="wrap-info">
            <h3 className="name-info">{name}</h3>
            <p className="email-info">{email}</p>
          </div>
        </div>
      </div>
      <div className="wrap-list-item">
        <div className="wrap-title-list">
          <div className="title-list">Primary list</div>
          <div className="btn btn-help">
            <MaterialIcon icon="help" />
          </div>
        </div>
        <List className="pad-ver-0">
          <ListItem className="item-active item-primary">
            <ListItemText>
              Shopping List
              <ListItemText>11 item</ListItemText>
            </ListItemText>
            <ListItemIcon className="btn-icon-item">
              <MoreVert />
            </ListItemIcon>
          </ListItem>
        </List>
        <div className="wrap-title-list">
          <div className="title-list">Other lists</div>
        </div>
        <List className="pad-ver-0">
          <ListItem className="item-active item-other">
            <ListItemText className="text-item-drawer">
              ABC List
              <ListItemText className="text-item-drawer">11 item</ListItemText>
            </ListItemText>
            <ListItemIcon className="btn-icon-item">
              <MoreVert />
            </ListItemIcon>
          </ListItem>
        </List>
        <div className="btn-drawer">
          <a href="#" onClick={() => {}} className="btn-text">
            Create New List
          </a>
        </div>
        <Divider />
        <ul className="list-item">
          <li className="item-active item-help-footer">
            <div className="wrap-btn-footer">
              <div className="btn-footer-drawer">
                <MaterialIcon icon="help" />
              </div>
              <span className="text-btn-footer">Send Feedback</span>
            </div>
          </li>
          <li className="item-active item-help-footer">
            <div className="wrap-btn-footer">
              <div className="btn-footer-drawer">
                <MaterialIcon icon="help" />
              </div>
              <span className="text-btn-footer">Help</span>
            </div>
          </li>
        </ul>
        <div className="wrap-title-list link-footer">
          <span>
            <a> privacy . </a>
          </span>
          <span>
            <a>term</a>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Drawer open={props.left} onClose={() => props.toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </>
  );
};

export default MenuDrawer;
