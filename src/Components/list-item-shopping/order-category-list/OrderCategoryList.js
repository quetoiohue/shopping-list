import React, { useState } from "react";
import MaterialIcon from "material-icons-react";

const OrderCategoryList = props => {
  const { listItem } = props;
  const [listCategory] = useState([
    { idCate: 1, nameCate: "Beverages" },
    { idCate: 2, nameCate: "Dairy & Eggs" },
    { idCate: 3, nameCate: "Home & Garden" },
    { idCate: 4, nameCate: "Meat & Seafood" },
    { idCate: 5, nameCate: "Produce" }
  ]);
  return (
    <ul className="list-item">
      {listCategory.map((itemCate, index) => (
        <div className="item-cate">
            { listItem
              .filter(e => e.idCate === itemCate.idCate)
              .length > 0 ? <span className="item-active title-cate">{itemCate.nameCate}</span> : "" }
          
          <ul className="list-item">
            {listItem
              .filter(e => e.idCate === itemCate.idCate)
              .map((item, index) => (
                <li className="item-active" key={index.toString()}>
                  <div className="wrap-img">
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${item.picture[0]})` }}
                    />
                  </div>
                  <div className="wrap-name-item">
                    <span className="name-item">{item.name}</span>
                  </div>
                  <div className="wrap-btn-item">
                    <div
                      className="btn"
                      onClick={() => props.addItemCheckOut(item)}
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
  );
};
export default OrderCategoryList;
