import React from "react";
import MaterialIcon from "material-icons-react";

const ListItems = props => {
  const { listItem } = props;
  return (
    <ul className="list-item">
      {listItem.map((item, index) => (
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
            <div className="btn" onClick={() => props.addItemCheckOut(item)}>
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
  );
};
export default ListItems;
