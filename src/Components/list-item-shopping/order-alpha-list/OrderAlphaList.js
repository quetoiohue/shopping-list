import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import DialogOrder from "../dialog-order/DialogOrder";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/action";

const OrderAlphaList = props => {
  const [listAlpha] = useState(["A", "B", "C"]);

  const handleCloseDialog = () => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: false
    });
  };

  const [propsDialog, setPropsDialog] = useState({
    isOpenDialog: false,
    handleCloseDialog,
    index: -1,
    onChangeInfoItem: props.onChangeInfoItem
  });

  const handleClickOpenDialog = item => {
    setPropsDialog({
      ...propsDialog,
      isOpenDialog: true,
      index: props.listItem.findIndex(e => e === item)
    });
  };

  return (
    <>
      <ul className="list-item">
        {listAlpha.map((items, index) =>
          props.listItem
            .filter(e => e.name.indexOf(items) === 0)
            .sort((a, b) => {
              let nameA = a.name.toUpperCase();
              let nameB = b.name.toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            })
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
            ))
        )}
      </ul>
      {propsDialog.index !== -1 ? <DialogOrder {...propsDialog} /> : ""}
    </>
  );
};

const mapStateToProps = state => {
  console.log(state.list.listItem);
  
  return {
    listItem: state.list.listItem
  };
};
  
const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderAlphaList);
