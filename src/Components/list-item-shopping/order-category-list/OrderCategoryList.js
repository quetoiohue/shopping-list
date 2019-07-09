import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import DialogOrder from "../dialog-order/DialogOrder";
import { connect } from "react-redux";
import { getCategorys } from "../../../API/Product";
import Item from '../item/Item';

const OrderCategoryList = props => {
  const [listCategory, setListCategory] = useState([]);

  React.useEffect(() => {
    getCategorys()
      .then(res => {
        setListCategory(res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  }, []);

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
      ITEM_ID: item.ITEM_ID,
      isOpenDialog: true
    });
  };
  const propsItem = {
    ...props,
    handleClickOpenDialog
  }
  return (
    <>
      <ul className="list-item">
        {listCategory.map((itemCate, index) => (
          <div className="item-cate" key={index.toString()}>
            {props.listItem.filter(
              e => e.CATEGORY_ID === itemCate.CATEGORY_ID && !e.IS_CHECKED
            ).length > 0 ? (
              <span className="item-active title-cate">
                {itemCate.CATEGORY_NAME}
              </span>
            ) : (
              ""
            )}

            <ul className="list-item">
              {props.listItem
                .filter(
                  e => e.CATEGORY_ID === itemCate.CATEGORY_ID && !e.IS_CHECKED
                )
                .map((item, index) => (
                  <Item item={item} {...propsItem}/>
                ))}
            </ul>
          </div>
        ))}
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
)(OrderCategoryList);
