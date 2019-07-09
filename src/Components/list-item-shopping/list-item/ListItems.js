import React, { useState, Fragment } from "react";
import DialogOrder from "../dialog-order/DialogOrder";
import { connect } from "react-redux";
import Item from '../item/Item';

const ListItems = props => {

  const handleCloseDialog = () => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: false
    });
  };

  const [propsDialog, setPropsDialog] = useState({
    isOpenDialog: false,
    handleCloseDialog,
    onChangeInfoItem: props.onChangeInfoItem,
    ITEM_ID: null
  });

  const handleClickOpenDialog = item => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: true,
      ITEM_ID: item.ITEM_ID
    });
  };

  const listItem = props.listItem.filter(e => e.IS_CHECKED === 0);
  const propsItem = {
    handleClickOpenDialog,
    ...props
  };
  return (
    <Fragment>
      <ul className="list-item">
        {listItem.map((item, index) => (
         <Item item = {item} {...propsItem}/>
        ))}
      </ul>
      {propsDialog.ITEM_ID ? <DialogOrder {...propsDialog} /> : ""}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    listItem: state.list.listItem
  };
};

export default connect(mapStateToProps)(ListItems);
