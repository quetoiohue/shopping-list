import React, { Fragment } from "react";
import MaterialIcon from "material-icons-react";
import Drawer from "@material-ui/core/Drawer";
import "./MenuDrawer.css";
import {
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
  Menu,
  MenuItem
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import CreateNewList from "./create-new-list/CreateNewList";
import RenameForm from "./rename-form/RenameForm";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/action";
import * as fetch from "../../../API/Product";

class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openOpiton: false,
      openRename: false,
      username: ""
    };
  }

  componentDidMount() {
    const USER_ID = JSON.parse(localStorage.getItem('USER_ID'));
    this.props.onFetchListSuccess();
    fetch.getInfoAccount(USER_ID).then(res => this.setState({
      username: res.data[0].USERNAME
    }))
  }

  clickOpenDialog = () => {
    this.setState({
      open: true
    });
  };

  clickCloseDialog = () => {
    this.setState({
      open: false
    });
  };

  clickLogOut = () => {
    this.props.history.push("/");
    localStorage.removeItem("tokenGoogle");
    return;
  };

  onClickOption = (event, LIST_ID) => {
    event.preventDefault();
  };

  render() {
    const { open, openRename, username } = this.state;
    const propsDialog = {
      open,
      openRename,
      clickCloseDialog: this.clickCloseDialog
    };
    const { Lists } = this.props;

    const sideList = () => (
      <Fragment>
        <CreateNewList {...propsDialog} />
        <div className="" role="presentation">
          <div
            onClick={() => {
              this.clickLogOut();
            }}
            className="wrap-account-item"
          >
            <div className="wrap-account">
              <div
                className="wrap-img-acc"
                // style={{ backgroundImage: `url(${imageUrl})` }}
              />
              <div className="wrap-info">
                <h3 className="name-info">{username}</h3>
                {/* <p className="email-info">{email}</p> */}
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
              {Lists.filter(e => e.IS_PRIMARY === 1).map(e => (
                <ItemList key = {e.LIST_ID}
                 e={e} {...this.props} />
              ))}
            </List>

            <div className="wrap-title-list">
              <div className="title-list">Other lists</div>
            </div>
            <List className="pad-ver-0">
              {Lists.filter(e => e.IS_PRIMARY === 0).map(e => (
                <ItemList  key = {e.LIST_ID}
                e={e} {...this.props} />
              ))}
            </List>
            <div onClick={this.clickOpenDialog} className="btn-drawer">
              <span className="btn-text">Create New List</span>
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
      </Fragment>
    );

    return (
      <>
        <Drawer
          open={this.props.left}
          onClose={() => this.props.toggleDrawer(false)}
          className="container-menu-drawer"
        >
          {sideList()}
        </Drawer>
      </>
    );
  }
}

const ItemList = props => {
  const [state, setState] = React.useState({
    anchorEl: null,
    openRename: false,
    quantityList: null
  });

  React.useEffect(() => {
    fetch.getListQuantity(props.e.LIST_ID).then(res => {
      setState({
        ...state,
        quantityList: res.data[0]["COUNT(ITEM_ID)"]
      });
    });
  }, [props.e.LIST_ID]);

  const handleClick = event => {
    setState({
      ...state,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  const handleShare = () => {};

  const handleMakePrimary = e => {
    const { LIST_ID, LIST_NAME } = e;
    handleClose();
    fetch.resetListPrimary();
    fetch.updateList(LIST_ID, LIST_NAME, true);
  };

  const handleDelete = item => {
    const { LIST_ID } = item;
    fetch.deleteList(LIST_ID);
  };

  const onClickOpenRename = () => {
    setState({
      ...state,
      openRename: true,
      anchorEl: null
    });   
  };

  const onClickCloseRename = () => {
    setState({
      ...state,
      openRename: false
    });
  };
  const handleCloseRename = (e, txtRename) => {
    fetch.updateList(e.LIST_ID, txtRename, e.IS_PRIMARY);
    onClickCloseRename();
    handleClose();
  };

  const onClickList = LIST_ID => {
    localStorage.setItem("LIST_ID", LIST_ID);
    props.onShowList(LIST_ID);
    props.onFreshState();
    props.toggleDrawer(false);
  };

  const { e } = props;
  const { anchorEl, openRename, quantityList } = state;
  const propsRename = {
    e,
    openRename,
    onClickCloseRename,
    onClickOpenRename,
    handleCloseRename
  };
  
  const classItem = (props.LIST_ID === e.LIST_ID) ? "item-active item-primary" : "item-active item-other";
  return e.IS_PRIMARY ? (
    <ListItem key={e.LIST_ID} className={classItem}>
      <RenameForm {...propsRename} />
      <ListItemText
        onClick={() => {
          onClickList(e.LIST_ID);
        }}
      >
        <ListItemText className="text-item-drawer">
          {e.LIST_NAME}
          <ListItemText className="text-item-drawer">
            {quantityList + " item"}
          </ListItemText>
        </ListItemText>
      </ListItemText>

      <div>
        <ListItemIcon onClick={handleClick} className="btn-icon-item">
          <MoreVert />
        </ListItemIcon>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleShare}>Share</MenuItem>
          <MenuItem onClick={() => onClickOpenRename()}>Rename</MenuItem>
          <MenuItem onClick={() => handleDelete(e)}>Delete</MenuItem>
        </Menu>
      </div>
    </ListItem>
  ) : (
    <ListItem key={e.LIST_ID} className={classItem}>
      <RenameForm {...propsRename} />
      <ListItemText
        onClick={() => {
          onClickList(e.LIST_ID);
        }}
      >
        <ListItemText className="text-item-drawer">
          {e.LIST_NAME}
          <ListItemText className="text-item-drawer">
            {quantityList + " item"}
          </ListItemText>
        </ListItemText>
      </ListItemText>

      <div>
        <ListItemIcon onClick={handleClick} className="btn-icon-item">
          <MoreVert />
        </ListItemIcon>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleShare}>Share</MenuItem>
          <MenuItem onClick={() => onClickOpenRename()}>Rename</MenuItem>
          <MenuItem onClick={() => handleMakePrimary(e)}>Make primary</MenuItem>
          <MenuItem onClick={() => handleDelete(e)}>Delete</MenuItem>
        </Menu>
      </div>
    </ListItem>
  );
};

const mapStateToProps = state => {
  return {
    Lists: state.list.Lists,
    LIST_ID: state.list.LIST_ID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchListSuccess: () => dispatch({ type: actionTypes.REFRESH_LISTS }),
    onFreshState: () => dispatch({ type: actionTypes.REFRESH_STATE }),
    onShowList: LIST_ID =>
      dispatch({ type: actionTypes.SHOW_LIST, LIST_ID: LIST_ID })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDrawer);
