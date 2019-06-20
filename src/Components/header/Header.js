import React from "react";
import MaterialIcon from "material-icons-react";
// import "./Header.css";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-inner">
          <div className="btn left-btn">
            <div className="btn-icon">
              <MaterialIcon icon="menu" />
            </div>
          </div>
          <div className="header-content">
            <h3 className="title-header">
              <a className="logo-link">Shopping List</a>
            </h3>
            <div className="wrap-btn-right">
              <div className="btn right-btn">
                <div className="btn-icon">
                  <MaterialIcon icon="sort" />
                </div>
              </div>
              <div className="btn right-btn">
                <div className="btn-icon">
                  <MaterialIcon icon="person_add" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
