import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../create-new-list/CreateNewList.css";
import './RenameForm.css';
import * as fetch from '../../../../API/Product';

const RenameForm = props => {
  const [state, setState] = React.useState({
    txtListRename: ""
  })
  
  const onChangeInput = (event) => {
    setState({
      ...state,
      [event.target.name] : [event.target.value]
    })
  }
  const onCancel = () => {
    props.onClickCloseRename();
    setState({
      ...state,
      txtListRename: ""
    })
  }

  const clickOK = () => {
    const { txtListRename } = state;
    if (txtListRename) {
      props.handleCloseRename(props.e, txtListRename);
      setState({
        ...state,
        txtListRename: ""
      })
    }
    return ;
  }

  const onEnterCreate = (e) => {
    if (e.keyCode === 13) {
        clickOK();
    }
  }
  const { txtListRename } = state;
  return (
    <>
    <Dialog
      open={props.openRename}
      onClose={props.onClickCloseRename}
      className="container-rename-form"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className="header-dialog" id="form-dialog-title">
        Rename list
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="txtListRename"
          label="List name"
          type="text"
          value={txtListRename}
          onChange={onChangeInput}
          fullWidth
          autoComplete="off"
          onKeyDown={onEnterCreate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={clickOK} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default RenameForm;
