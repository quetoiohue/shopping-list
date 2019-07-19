import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/action';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const SnackBar = (props) => {
  const classes = useStyles();
  const { openSnackBar, onClickCloseSnackBar, onClickUndo, txtSnackBar } = props;
  console.log(props.openSnackBar);
  

  const handleClickUndo = () => {
      onClickUndo();
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={onClickCloseSnackBar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{txtSnackBar}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={handleClickUndo}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClickCloseSnackBar}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    openSnackBar: state.list.openSnackBar,
    txtSnackBar: state.list.txtSnackBar
  }
}
export default connect(mapStateToProps, null)(SnackBar);