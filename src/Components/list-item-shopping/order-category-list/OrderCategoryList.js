import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import DialogOrder from "../dialog-order/DialogOrder";
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/action';

const OrderCategoryList = props => {
  const [listCategory] = useState([
    { idCate: 1, nameCate: "Beverages" },
    { idCate: 2, nameCate: "Dairy & Eggs" },
    { idCate: 3, nameCate: "Home & Garden" },
    { idCate: 4, nameCate: "Meat & Seafood" },
    { idCate: 5, nameCate: "Produce" },
    { idCate: 6, nameCate: "Other" }
  ]);

  const handleCloseDialog = () => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: false
    })
  };

  const [propsDialog, setPropsDialog ]= useState({
    isOpenDialog: false,
    handleCloseDialog,
    index: -1,
    onChangeInfoItem: props.onChangeInfoItem
  });

  const handleClickOpenDialog = (item) => {
    setPropsDialog({
      ...propsDialog,
      index: props.listItem.find( e => e === item),
      isOpenDialog: true,
    })
    debugger
  };

  return (
    <>
      <ul className="list-item">
        {listCategory.map((itemCate, index) => (
          <div className="item-cate" key={index.toString()}>
            {props.listItem.filter(e => e.idCate === itemCate.idCate).length > 0 ? (
              <span className="item-active title-cate">
                {itemCate.nameCate}
              </span>
            ) : (
              ""
            )}

            <ul className="list-item">
              {props.listItem
                .filter(e => e.idCate === itemCate.idCate)
                .map((item, index) => (
                  <li className="item-active" key={index.toString()}>
                    <div className="wrap-img">
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${item.picture[0]})` }}
                      />
                    </div>
                    <div
                      className="wrap-name-item"
                      onClick={() => handleClickOpenDialog(item)}
                    >
                      <span className="name-item">{item.name}</span>
                      <div className="info-item">
                        {item.quantity !== 1 ? (
                          <span className="quantity-item">
                            Qty {item.quantity}
                          </span>
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
                          props.addItemCheckOff(item);
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
          </div>
        ))}
      </ul>
      {propsDialog.index !== -1 ? <DialogOrder {...propsDialog} /> : ""}
    </>
  );
};

const mapStateToProps = state => {
  return {
    listItem: state.list.listItem,
  };
}

const mapDispatchToProps = dispatch => {
  return {
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderCategoryList);
