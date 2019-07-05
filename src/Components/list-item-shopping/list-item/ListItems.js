import React, { useState, Fragment } from "react";
import MaterialIcon from "material-icons-react";
import DialogOrder from "../dialog-order/DialogOrder";
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/action';

const ListItems = props => {
console.log(props.listItem);

  const handleCloseDialog = () => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: false
    })
  };

  const [propsDialog, setPropsDialog ]= useState({
    isOpenDialog: false,
    handleCloseDialog,
    onChangeInfoItem: props.onChangeInfoItem,
    ITEM_ID: null
  });

  const handleClickOpenDialog = (item) => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: true,
      ITEM_ID: item.ITEM_ID
    })
    console.log(item); 
  };

  const listItem = props.listItem.filter(e => e.IS_CHECKED === 0);
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
                style={{ backgroundImage: `url(${item.ITEM_PICTURE})` }}
              />
            </div>
            <div className="wrap-name-item" onClick={() => handleClickOpenDialog(item)}>
              <span className="name-item">{item.ITEM_NAME}</span>
              <div className="info-item">
                {item.ITEM_QUANTITY !== 1 ? (
                  <span className="quantity-item">Qty {item.ITEM_QUANTITY}</span>
                ) : (
                  ""
                )}
                {item.ITEM_NOTE ? (
                  <span className="note-item">{item.ITEM_NOTE}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="wrap-btn-item">
              <div
                className="btn"
                onClick={() => {
                 console.log("click", item.IS_CHECKED);
                 props.toggleState(item)
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
      { propsDialog.ITEM_ID ? <DialogOrder {...propsDialog} /> : "" }
      </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    listItem: state.list.listItem,
  };
}

export default connect(mapStateToProps)(ListItems);
