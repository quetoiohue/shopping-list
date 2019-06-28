import React, { useState, Fragment } from 'react';
import './RecommendList.css';

const RecommendList = (props) => {
    const { listProduct , textInput } = props;
    return (
        <div className="wrap-recommend-list">
            <ul className="list-item recommend-list">
                {
                (textInput) ?
                  listProduct
                  .filter( e => e.name.toUpperCase().indexOf(textInput.toUpperCase()) !== -1)
                  .map((e, index )=> 
                    <li 
                    key={index.toString()}
                    className="recommend-item"
                    onClick={() => props.addItem(e)}
                    >
                        {e.name}
                    </li>
                    ) : ""
                }
            </ul>
        </div>
    )
} 

export default RecommendList;