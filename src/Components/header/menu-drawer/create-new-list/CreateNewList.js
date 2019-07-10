import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import "./CreateNewList.css";
import * as fetch from "../../../../API/Product";
import store from "../../../../store/createStore";

const CreateNewList = props => {
  const [state, setState] = React.useState({
    isPrimary: false,
    txtNameList: ""
  });

  const onChangeInput = event => {
    setState({
      ...state,
      [event.target.name]: [event.target.value]
    });
  };
  const onCancel = () => {
    props.clickCloseDialog();
    setState({
      ...state,
      txtNameList: ""
    });
  };

  const onCreate = () => {
    const { txtNameList, isPrimary } = state;
    const USER_ID = JSON.parse(localStorage.getItem("USER_ID"));
    if (txtNameList) {
      if (isPrimary) {
        fetch.resetListPrimary();
      }
      fetch.createList(USER_ID, txtNameList, isPrimary);
      props.clickCloseDialog();
      setState({
        ...state,
        txtNameList: ""
      });
    }
    return;
  };

  const onEnterCreate = e => {
    if (e.keyCode === 13) {
      onCreate();
    }
  };
  const { isPrimary, txtNameList } = state;
  return (
    <React.Fragment>
    <Dialog
      open={props.open}
      onClose={props.clickCloseDialog}
      className="container"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className="header-dialog" id="form-dialog-title">
        Create New List
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="txtNameList"
          label="Name your new list"
          type="text"
          value={txtNameList}
          onChange={onChangeInput}
          fullWidth
          autoComplete="off"
          onKeyDown={onEnterCreate}
        />
      </DialogContent>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPrimary}
              onChange={() =>
                setState({
                  ...state,
                  isPrimary: !isPrimary
                })
              }
              color="primary"
            />
          }
          label="Make this my primary list"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onCreate} color="primary">
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
  );
};

export default CreateNewList;
