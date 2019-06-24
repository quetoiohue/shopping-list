import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialIcon from "material-icons-react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
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

  const sideList = () => (
    <div className={classes.list} role="presentation">
      <div className="wrap-account-item">
        <div className="wrap-account">
          <div className="wrap-img-acc" />
          <div className="wrap-info">
            <h3 className="name-info">Quang</h3>
            <p className="email-info">quangtran.dev24h@gmail.com</p>
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
              T2 List
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
            <a href>privacy . </a>
          </span>
          <span>
            {" "}
            <a href>term</a>{" "}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Drawer open={props.left} onClose={() => props.toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
