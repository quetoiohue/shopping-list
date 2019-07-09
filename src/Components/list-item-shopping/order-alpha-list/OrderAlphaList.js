import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import DialogOrder from "../dialog-order/DialogOrder";
import { connect } from "react-redux";
import Item from '../item/Item';

const OrderAlphaList = props => {
  const [listAlpha] = useState(["A", "B", "C", "D"]);

  const handleCloseDialog = () => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: false
    });
  };

  const [propsDialog, setPropsDialog] = useState({
    isOpenDialog: false,
    handleCloseDialog,
    ITEM_ID: null,
    onChangeInfoItem: props.onChangeInfoItem
  });

  const handleClickOpenDialog = item => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: true,
      ITEM_ID: item.ITEM_ID
    });
  };
  const propsItem = {
    ...props,
    handleClickOpenDialog
  }
  return (
    <>
      <ul className="list-item">
        {listAlpha.map((items, index) =>
          props.listItem
            .filter(e => e.ITEM_NAME.toUpperCase().indexOf(items) === 0 && !e.IS_CHECKED)
            .sort((a, b) => {
              let nameA = a.ITEM_NAME.toUpperCase();
              let nameB = b.ITEM_NAME.toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            })
            .map((item, index) => (
              <Item item={item} {...propsItem} />
            ))
        )}
      </ul>
      {propsDialog.ITEM_ID ? <DialogOrder {...propsDialog} /> : ""}
    </>
  );
};

const mapStateToProps = state => {
  return {
    listItem: state.list.listItem
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderAlphaList);
