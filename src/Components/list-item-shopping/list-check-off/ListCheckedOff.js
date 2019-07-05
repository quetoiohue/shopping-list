import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import "./ListCheckedOff.css";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MoreVert from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/action";

const ListCheckedOff = props => {
  const [open, setOpen] = React.useState(true);
  const [openOption, setopenOption] = useState(false);

  const triggerOptionButton = event => {
    event.preventDefault();
    if (event.currentTarget.getAttribute("name") === "optionBtn") {
      setopenOption(!openOption);
    } else return;
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (event.currentTarget.getAttribute("name") === "openMore") {
      setOpen(!open);
    } else {
      return;
    }
  }

  const { listItemCheckOff } = props;
  return (
    <>
      <List>
        <div className="wrap-title-checkoff">
          <ListItem
            button
            onClick={event => handleClick(event)}
            className="item-title"
            name="openMore"
          >
            {open ? (
              <ExpandLess className="wrap-img" />
            ) : (
              <ExpandMore className="wrap-img" />
            )}
            <ListItemText className="name-item">
              {`${listItemCheckOff.length} checked off`}
            </ListItemText>
          </ListItem>
          <ListItemIcon
            className="btn-item-right"
            onClick={event => triggerOptionButton(event)}
            name="optionBtn"
          >
            <MoreVert className="icon-hover" />
          </ListItemIcon>
        </div>
        {openOption ? <CardOption {...props} /> : ""}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ul className="list-item list-checkoff">
            {listItemCheckOff.map((item, index) => (
              <li className="item-active" key={index.toString()}>
                <div className="wrap-img">
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${item.ITEM_PICTURE})` }}
                  />
                </div>
                <div className="wrap-name-item">
                  <span className="name-item name-checkoff">{item.ITEM_NAME}</span>
                </div>
                <div className="wrap-btn-item">
                  <div
                    className="btn"
                    onClick={() => props.toggleState(item)}
                  >
                    <div className="btn-icon">
                      <MaterialIcon icon="add" />
                    </div>
                  </div>
                  <div
                    className="btn"
                    onClick={() => {
                      props.deleteItem(item);
                    }}
                  >
                    <div className="btn-icon">
                      <MaterialIcon icon="delete" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Collapse>
      </List>
    </>
  );
};

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
    fontsize: "14px",
    /* line-height: 48px, */
    padding: "0px 24px",
    textAlign: "left",
    height: "48px",
    fontFamily: "Roboto, sans-serif",
    color: "rgb(95, 99, 104)",
    textOverflow: "ellipsis"
  }
}));

const CardOption = props => {
  const classes = useStyles();

  return (
    <List component="nav" className="card-option" aria-label="Mailbox folders">
      <ListItem
        button
        className={classes.nameOption}
        onClick={props.uncheckedAllItem}
      >
        <ListItemText>Unchecked all item</ListItemText>
      </ListItem>
      <Divider />
      <ListItem
        button
        className={classes.nameOption}
        onClick={props.deleteAllItemCheckOff}
      >
        <ListItemText>Delete all item</ListItemText>
      </ListItem>
    </List>
  );
};
const mapStateToProps = state => {
  return {
    listItem: state.list.listItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCheckedOff);
