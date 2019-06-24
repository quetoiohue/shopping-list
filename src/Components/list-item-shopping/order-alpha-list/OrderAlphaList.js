import React, { useState } from 'react';
import MaterialIcon from 'material-icons-react';

const OrderAlphaList = (props) => {
    const { listItem } = props;
    const [ listAlpha ] = useState([
        'A' , 'B', 'C'
    ]);
    
    return(
        <ul className="list-item">
        { listAlpha.map((items, index) => 
            ( listItem
                .filter(e => e.name.indexOf(items) === 0)
                .sort((a, b) =>  {
                    let nameA = a.name.toUpperCase();
                    let nameB = b.name.toUpperCase();
                    if(nameA < nameB) return -1;
                    if(nameA > nameB) return 1;
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
              ))))}
    </ul>
    )
}

export default OrderAlphaList;