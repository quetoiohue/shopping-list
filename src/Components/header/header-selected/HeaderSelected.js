import React from 'react';
import MaterialIcon from 'material-icons-react';
import '../Header.css';
import { connect } from 'react-redux';
import * as fetch from '../../../API/Product';
import SnackBar from '../../list-item-shopping/snack-bar/SnackBar';
import store from '../../../store/createStore';
import * as actionTypes from '../../../store/action';

class HeaderSelected extends React.Component {

    setCheckedOfSelectedItem = () => {
      this.props.onSetTextSnackBar(this.props.count + " item checked")
      this.onClickOpenSnackBar();
      fetch.setChecked_ItemSelected();
    }

    deleteItemSelected = () => {
      this.props.onSetTextSnackBar(this.props.count + " item deleted")
      this.onClickOpenSnackBar();
      fetch.delete_ItemSelected();
    }

    // resetSelect = () => {
    //   fetch.start_transaction();
    //   fetch.setSelectedAllItem(false, false); // (is_selected, is_checked)
    //   fetch.setSelectedAllItem(false, true); // (is_selected, is_checked)
    //   fetch.commit();
    // }
    onClickOpenSnackBar = () => {
    fetch.start_transaction();
    store.dispatch({type: actionTypes.SET_OPEN_SNACKBAR, openSnackBar: true})
    }
  
    onClickUndo = () => {
      fetch.rollback();
      store.dispatch({type: actionTypes.SET_OPEN_SNACKBAR, openSnackBar: false})
    }
  
    onClickCloseSnackBar = (event, reason) => {
      fetch.commit();
      if (reason === 'clickaway') {
        return;
      }
      store.dispatch({type: actionTypes.SET_OPEN_SNACKBAR, openSnackBar: false})
    } 
    render(){
      const { count } = this.props;
      const props = {
        onClickCloseSnackBar: this.onClickCloseSnackBar,
        onClickUndo: this.onClickUndo
      }
        return (
            <>
            <SnackBar {...props} />
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

const mapStateToProps = state => {
  return {
    count: state.list.count,
    txtSnackBar: state.list.txtSnackBar,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetOpenSnackBar: (openSnackBar) => dispatch({ type: actionTypes.SET_OPEN_SNACKBAR, openSnackBar: openSnackBar}),
    onSetTextSnackBar: (txtSnackBar) => dispatch({ type: actionTypes.SET_TEXT_SNACKBAR, txtSnackBar: txtSnackBar}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderSelected);