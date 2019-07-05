import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import Dialog from "@material-ui/core/Dialog";
import "./DialogOrder.css";
import * as actionTypes from '../../../store/action';
import { connect } from 'react-redux';

const DialogOrder = props => {
  const {
    isOpenDialog,
    ITEM_ID,
    handleCloseDialog,
  } = props;
  const handleClose = () => {
    props.onChangeInfoItem(newItem);
    handleCloseDialog();
  };

  const [state, setState] = useState({
    newItem: props.listItem.find(e => e.ITEM_ID === ITEM_ID),
    isSaving: false
  });

  const onChangeInput = e => {
    setState({
      newItem: {
        ...newItem,
        [e.target.name]: e.target.value
      },
      isSaving: true
    });
  };

  const onChangQuantity = number => {
    setState({
      ...state,
      newItem: {
        ...newItem,
        ITEM_QUANTITY: newItem.ITEM_QUANTITY + number
      }
    });
  };
  const { isSaving, newItem } = state;
  const { ITEM_NAME, ITEM_PICTURE, ITEM_QUANTITY, ITEM_NOTE } = newItem;
  return (
    <>
      <Dialog
        className="container-dialog"
        open={isOpenDialog}
        onClose={handleClose}
      >
        <div className="header-dialog">
          <div className="btn-icon flex-center" onClick={handleClose}>
            <MaterialIcon icon="close" />
          </div>
          <div className="save-text flex-center">
            <span className="saveProgress">
              {isSaving ? "saving..." : "saved"}
            </span>
          </div>
        </div>
        <div className="main-info">
          <div className="image-container flex-center">
            <div
              className="image-main"
              style={{ backgroundImage: `url(${ITEM_PICTURE})` }}
            />
          </div>
          <input
            className="input-change-name"
            type="text"
            value={ITEM_NAME}
            onChange={onChangeInput}
            name="ITEM_NAME"
          />
          <div className="state-label">
            <span className="text-state">On your list</span>
          </div>
        </div>
        <div className="content">
          <div className="quantity-container flex-center">
            <div className="quantity-button">
              <div
                className="btn-icon flex-center"
                onClick={() => onChangQuantity(-1)}
              >
                <MaterialIcon icon="remove_circle_outline" />
              </div>
              <div className="label-container">
                <span className="quantity-text">Qty</span>
                &nbsp;
                <span className="quantity">{ITEM_QUANTITY}</span>
              </div>
              <div
                className="btn-icon flex-center"
                onClick={() => onChangQuantity(1)}
              >
                <MaterialIcon icon="add_circle_outline" />
              </div>
            </div>
          </div>
        </div>
        <div className="content-note">
          <textarea
            className="text-note"
            value={ITEM_NOTE}
            onChange={onChangeInput}
            name="ITEM_NOTE"
          />
        </div>
        <div className="footer-dialog" />
      </Dialog>
    </>
  );
};

const mapStateToProps = state => {
  return {
    listItem: state.list.listItem,
  }
}

export default connect(mapStateToProps, null)(DialogOrder);
