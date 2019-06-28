import React, { useState, Fragment } from "react";
import MaterialIcon from "material-icons-react";
import DialogOrder from "../dialog-order/DialogOrder";

const ListItems = props => {
  const { listItem } = props;
  

  const handleCloseDialog = () => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: false
    })
  };

  const [propsDialog, setPropsDialog ]= useState({
    isOpenDialog: false,
    handleCloseDialog,
    listItem,
    index: -1,
    onChangeInfoItem: props.onChangeInfoItem
  });

  const handleClickOpenDialog = (index) => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: true,
      index
    })

  };
  return (
    <Fragment>
      <ul className="list-item">
        {listItem.map((item, index) => (
          <li className="item-active" key={index.toString()}>
            <div 
            // onClick={() => { props.triggerSelectAll(true)}}
            className="wrap-img">
              <div
                className="img"
                style={{ backgroundImage: `url(${item.picture[0]})` }}
              />
            </div>
            <div className="wrap-name-item" onClick={() => handleClickOpenDialog(index)}>
              <span className="name-item">{item.name}</span>
              <div className="info-item">
                {item.quantity !== 1 ? (
                  <span className="quantity-item">Qty {item.quantity}</span>
                ) : (
                  ""
                )}
                {item.note ? (
                  <span className="note-item">{item.note}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="wrap-btn-item">
              <div
                className="btn"
                onClick={() => {
                  props.addItemCheckOut(item);
                }}
              >
                <div className="btn-icon">
                  <MaterialIcon icon="done" />
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
      { propsDialog.index !== -1 ? <DialogOrder {...propsDialog} /> : "" }
      </Fragment>
  );
};
export default ListItems;
