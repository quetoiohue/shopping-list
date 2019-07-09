import React, { useState, Fragment } from "react";
import "./RecommendList.css";

const RecommendList = props => {
  const { listProduct, textInput } = props;

  return (
    <Fragment>
      <div className="wrap-recommend-list">
        <ul className="list-item recommend-list">
          {textInput
            ? listProduct
                .filter(
                  e =>
                    e.PRODUCT_NAME.toUpperCase().indexOf(
                      textInput.toUpperCase()
                    ) !== -1
                )
                .sort((a, b) => {
                  let nameA = a.PRODUCT_NAME.toUpperCase();
                  let nameB = b.PRODUCT_NAME.toUpperCase();
                  if (nameA < nameB) return -1;
                  if (nameA > nameB) return 1;
                })
                .map((e, index) => (
                  <li
                    key={index.toString()}
                    className="recommend-item"
                    onClick={() => props.addItem(e)}
                  >
                    {e.PRODUCT_NAME}
                  </li>
                ))
            : ""}
        </ul>
      </div>
    </Fragment>
  );
};

export default RecommendList;
