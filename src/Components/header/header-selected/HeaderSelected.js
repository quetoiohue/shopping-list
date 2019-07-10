import React from 'react';
import MaterialIcon from 'material-icons-react';
import '../Header.css';
import * as fetch from '../../../API/Product';

class HeaderSelected extends React.Component {

    setCheckedOfSelectedItem = () => {
      fetch.setChecked_ItemSelected();
      fetch.setSelectedAllItem(false, false);
      fetch.setSelectedAllItem(false, true);
    }

    deleteItemSelected = () => {
      fetch.delete_ItemSelected();
    }

    resetSelect = () => {
      fetch.setSelectedAllItem(false, false);
    } 
    render(){
      const { count } = this.props;
        return (
            <>
            <div className="header header-selected">
              <div className="header-inner">
                <div className="btn left-btn">
                  <div
                    className="btn-icon"
                    onClick={this.resetSelect}
                  >
                    <MaterialIcon icon="arrow_back" />
                  </div>
                </div>
                <div className="header-content">
                  <h3 className="title-header">
                    <a className="logo-link"> {count + " selected"}</a>
                  </h3>
                  <div
                    className="container-btn-right"
                  >
                    <div className="wrap-btn-right">
                      <div
                        className="btn right-btn"
                        onClick={this.setCheckedOfSelectedItem}
                      >
                        <div className="btn-icon">
                          <MaterialIcon icon="check" />
                        </div>
                      </div>
                      <div 
                      className="btn right-btn" 
                      onClick={this.deleteItemSelected}>
                        <div className="btn-icon">
                          <MaterialIcon icon="delete" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
    }
}

export default HeaderSelected;