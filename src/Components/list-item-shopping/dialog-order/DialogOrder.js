import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import Dialog from "@material-ui/core/Dialog";
import "./DialogOrder.css";

const DialogOrder = props => {
  const {
    isOpenDialog,
    listItem,
    index,
    handleCloseDialog,
    onChangeInfoItem
  } = props;
  const handleClose = () => {
    const { name, quantity, note } = newItem;
    onChangeInfoItem(index, name, quantity, note);
    handleCloseDialog();
  };

  const [state, setState] = useState({
    newItem: listItem[index],
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

  const onChangQuatity = number => {
    setState({
      ...state,
      newItem: {
        ...newItem,
        quantity: quantity + number
      }
    });
  };
  const { isSaving, newItem } = state;
  const { name, picture, quantity, note } = newItem;
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
              style={{ backgroundImage: `url(${picture[0]})` }}
            />
          </div>
          <input
            className="input-change-name"
            type="text"
            value={name}
            onChange={onChangeInput}
            name="name"
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
                onClick={() => onChangQuatity(-1)}
              >
                <MaterialIcon icon="remove_circle_outline" />
              </div>
              <div className="label-container">
                <span className="quantity-text">Qty</span>
                &nbsp;
                <span className="quantity">{quantity}</span>
              </div>
              <div
                className="btn-icon flex-center"
                onClick={() => onChangQuatity(1)}
              >
                <MaterialIcon icon="add_circle_outline" />
              </div>
            </div>
          </div>
        </div>
        <div className="content-note">
          <textarea
            className="text-note"
            value={note}
            onChange={onChangeInput}
            name="note"
          />
        </div>
        <div className="footer-dialog" />
      </Dialog>
    </>
  );
};

export default DialogOrder;
