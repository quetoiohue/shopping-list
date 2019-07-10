import React, { useEffect, useState } from "react";
import "../ListItemShopping.css";
import MaterialIcon from "material-icons-react";
import * as fetch from "../../../API/Product";
import { connect } from "react-redux";

const Item = props => {
  const { item, handleClickOpenDialog } = props;

  const onClickImg = item => {
    fetch.setSelectedItem(item.ITEM_ID, !item.IS_SELECTED);
  };

  const {
    ITEM_ID,
    ITEM_PICTURE,
    ITEM_NAME,
    ITEM_NOTE,
    ITEM_QUANTITY,
    IS_SELECTED
  } = props.item;
  
  return (
    <React.Fragment>
      <li
        className={
          IS_SELECTED ? "item-active item-active-selected" : "item-active"
        }
        key={ITEM_ID}
      >
        <div onClick={() => onClickImg(item)} className="wrap-img">
          <div
            className={IS_SELECTED ? "img img-selected" : "img"}
            style={{ backgroundImage: `url(${ITEM_PICTURE})` }}
          />
        </div>
        <div
          className="wrap-name-item"
          onClick={() => handleClickOpenDialog(item)}
        >
          <span className="name-item">{ITEM_NAME}</span>
          <div className="info-item">
            {ITEM_QUANTITY !== 1 ? (
              <span className="quantity-item">Qty {ITEM_QUANTITY}</span>
            ) : (
              ""
            )}
            {ITEM_NOTE ? <span className="note-item">{ITEM_NOTE}</span> : ""}
          </div>
        </div>

        {IS_SELECTED ? (
          ""
        ) : (
          <div className="wrap-btn-item">
            <div
              className="btn"
              onClick={() => {
                props.toggleState(item);
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
        )}
      </li>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    count: state.list.count
  };
};
export default connect(mapStateToProps)(Item);
