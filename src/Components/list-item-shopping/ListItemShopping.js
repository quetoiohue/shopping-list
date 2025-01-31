import React from "react";
import "./ListItemShopping.css";
import MaterialIcon from "material-icons-react";
import ListCheckedOff from "./list-check-off/ListCheckedOff";
import ListItems from "./list-item/ListItems";
import OrderCategoryList from "./order-category-list/OrderCategoryList";
import OrderAlphaList from "./order-alpha-list/OrderAlphaList";
import RecommenList from "./recommend-list/RecommendList";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import * as fetch from "../../API/Product";
import Loading from "../loading/Loading";
import SnackBar from './snack-bar/SnackBar';


class ListItemShopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      openRecommend: false,
      isSelectAll: false,
      listProduct: [],
      offset: 0,
      pagesize: 5,
    };
  }

  componentDidMount() {
    const { offset, pagesize } = this.state;
    this.props.onFetchBegin();
    fetch.products(offset, pagesize).then(res => {  
      this.setState({ listProduct: res.data });     
    });
    this.props.onFreshState(this.props.LIST_ID);
    this.props.onFreshCount();
  }

  onChangeInput = event => {
    this.setState({
      textInput: event.target.value
    });
    this.openRecommend(true);
  };

  prevSlide = event => {
    const { offset, pagesize } = this.state;
    const slides = document.getElementsByClassName('slides');
    if (offset > 0) {
      slides[0].classList.add('m-l-550');
      
      this.setState((prevState) => {
        return {offset: prevState.offset - pagesize + 1}
      }, () => {
        fetch.products(this.state.offset, pagesize).then(res => {
        this.setState({ listProduct: res.data });
        });
      })
      setTimeout(() => {
        slides[0].classList.remove('m-l-550');
      }, 1000);  
    } 
    return;
  };
  nextSlide = event => {
    const { pagesize, listProduct } = this.state;
    const slides = document.getElementsByClassName('slides');
    if (pagesize <= listProduct.length ) {
          slides[0].classList.add('m-l--550'); 
        this.setState((prevState) => {
              return {offset: prevState.offset + pagesize - 1}
            }, () => {
              fetch.products(this.state.offset, pagesize).then(res => {
              this.setState({ listProduct: res.data });
              });
            }) 
        setTimeout(() => {
          slides[0].classList.remove('m-l--550'); 
        }, 1000);     
    } 
    return
  };
  addItem = item => {
    const { PRODUCT_NAME, PRODUCT_PICTURE, PRODUCT_NOTE, CATEGORY_ID } = item;
    const { LIST_ID } = this.props;
    fetch.createItem(
      LIST_ID,
      PRODUCT_NAME,
      PRODUCT_PICTURE,
      PRODUCT_NOTE,
      CATEGORY_ID
    );
  };

  addItemByInput = event => {
    const { listProduct } = this.state;

    if (event.key === "Enter") {
      const { textInput } = this.state;
      if (textInput) {
        const getItem = listProduct.find(
          item => item.PRODUCT_NAME.toUpperCase() === textInput.toUpperCase()
        );
        const { LIST_ID } = this.props;
        if (getItem) {
          const {
            PRODUCT_NAME,
            PRODUCT_PICTURE,
            PRODUCT_NOTE,
            CATEGORY_ID
          } = getItem;
          fetch.createItem(
            LIST_ID,
            PRODUCT_NAME,
            PRODUCT_PICTURE,
            PRODUCT_NOTE,
            CATEGORY_ID
          );
        } else {
          fetch.createItem(
            LIST_ID,
            textInput,
            "http://chittagongit.com/download/117414",
            "",
            7
          );
        }
      }
    }
  };

  deleteItem = item => {
    this.props.onSetTextSnackBar("1 item deleted")
    this.onClickOpenSnackBar();
    fetch.deleteItem(item.ITEM_ID);
  };

  toggleState =  item => {
    const { ITEM_ID, ITEM_NAME, ITEM_QUANTITY, ITEM_NOTE, IS_CHECKED } = item;;
     this.props.onSetTextSnackBar(IS_CHECKED ? "1 item unchecked" : "1 item checked")
    this.onClickOpenSnackBar();
   fetch.updateItem(
      ITEM_ID,
      ITEM_NAME,
      ITEM_QUANTITY,
      ITEM_NOTE,
      1 - IS_CHECKED
    );
  };

  uncheckedAllItem = () => {
    let lengthArrChecked = this.props.listItem.filter(e => e.IS_CHECKED === 1).length;
    this.props.onSetTextSnackBar(lengthArrChecked + " item unchecked")
    this.onClickOpenSnackBar();
    fetch.setStateAllOfItem(false);
  };

  deleteAllItemCheckOff = () => {
    let lengthArrChecked = this.props.listItem.filter(e => e.IS_CHECKED === 1).length;
    this.props.onSetTextSnackBar(lengthArrChecked + " item deleted")
    this.onClickOpenSnackBar();
    fetch.deleteFollowState(true);
  };

  openRecommend = open => {
    this.setState({
      openRecommend: open
    });
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClicks);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClicks);
  }

  handleClicks = event => {
    const node = this.node;

    const { inputAdd } = this.refs;
    if (node && inputAdd) {
      if (node.contains(event.target) || inputAdd.contains(event.target)) {
        return;
      }
    }

    this.openRecommend(false);
  };

  onChangeInfoItem = item => {
    const { ITEM_ID, ITEM_NAME, ITEM_QUANTITY, ITEM_NOTE, IS_CHECKED } = item;
    fetch.updateItem(ITEM_ID, ITEM_NAME, ITEM_QUANTITY, ITEM_NOTE, IS_CHECKED);
  };

  onSelectAll = () => {
    fetch.setSelectedAllItem(true, false);
  };

  unSelectAll = () => {
    fetch.setSelectedAllItem(false, false);
  };

  onClickOpenSnackBar = () => {
    fetch.start_transaction();
    this.props.onSetOpenSnackBar(true);
  }

  onClickUndo = () => {
    fetch.rollback();
    this.props.onSetOpenSnackBar(false);
  }

  onClickCloseSnackBar = (event, reason) => {
    fetch.commit();
    if (reason === 'clickaway') {
      return;
    }
    this.props.onSetOpenSnackBar(false);
  }
  render() {
    const { listProduct, textInput, openRecommend } = this.state;
    const { isSort, listItem, isLoading, count } = this.props;
    const listItemCheckOff = listItem.filter(e => e.IS_CHECKED === 1);
    const props = {
      textInput,
      listProduct,
      listItem,
      listItemCheckOff,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      toggleState: this.toggleState,
      uncheckedAllItem: this.uncheckedAllItem,
      deleteAllItemCheckOff: this.deleteAllItemCheckOff,
      onChangeInfoItem: this.onChangeInfoItem,
      triggerSelectAll: this.triggerSelectAll
    };

    const propsSnackBar = {
      onClickOpenSnackBar: this.onClickOpenSnackBar,
      onClickCloseSnackBar: this.onClickCloseSnackBar,
      onClickUndo: this.onClickUndo
    }
    const isUnSelect =
      count < listItem.length - listItemCheckOff.length ? false : true;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="list-page">
        <div className="shopping-list">
          <div className="top-bar">
            {count ? (
              isUnSelect ? (
                <div
                  onClick={this.unSelectAll}
                  className="add-input-item wrap-select-all"
                >
                  <div className="select-all-text">DESELECT ALL</div>
                </div>
              ) : (
                <div
                  onClick={this.onSelectAll}
                  className="add-input-item wrap-select-all"
                >
                  <div className="select-all-text">SELECT ALL</div>
                </div>
              )
            ) : (
              <div
                className="add-input-item"
                onFocus={() => {
                  const { carousel } = this.refs;
                  carousel.style.display = "flex";
                }}
                onDoubleClickCapture={() => {
                  const { carousel } = this.refs;
                  carousel.style.display = "none";
                }}
              >
                <div className="form">
                  <div className="wrap-btn" onClick={this.addItemByInput}>
                    <div className="btn">
                      <div className="btn-icon">
                        <MaterialIcon icon="add" />
                      </div>
                    </div>
                  </div>
                  <div className="wrap-add-input">
                    <input
                      type="text"
                      className="add-input"
                      placeholder="Add Item"
                      name="name"
                      ref="inputAdd"
                      onKeyDown={this.addItemByInput}
                      onChange={this.onChangeInput}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="carousel" ref="carousel">
                  <div className="carousel-inner">
                    <div className="slides">
                      {listProduct.map((item, _index) => (
                        <div
                          className="slide"
                          ref="slide"
                          key={_index.toString()}
                          onClick={() => {
                            this.addItem(item);
                          }}
                        >
                          <div className="wrap-slide-img">
                            <div
                              className="slide-img"
                              style={{
                                backgroundImage: `url(${item.PRODUCT_PICTURE})`
                              }}
                            />
                          </div>
                          <div className="wrap-slide-name">
                            <span className="slide-name">
                              {item.PRODUCT_NAME}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="wrap-prev"
                      onClick={this.prevSlide}
                      ref="btnPrev"
                    >
                      <div className="prev" />
                    </div>
                    <div
                      className="wrap-next"
                      onClick={this.nextSlide}
                      ref="btnNext"
                    >
                      <div className="next" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={node => (this.node = node)}>
            {openRecommend === true ? <RecommenList {...props} /> : ""}
          </div>
          {isSort.isOrder === true ? <ListItems {...props} /> : ""}
          {isSort.isCategory === true ? <OrderCategoryList {...props} /> : ""}
          {isSort.isAlpha === true ? <OrderAlphaList {...props} /> : ""}
          {listItemCheckOff.length ? <ListCheckedOff {...props} /> : ""}
        </div>
        <SnackBar {...propsSnackBar}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSort: state.sort.stateSort,
    listItem: state.list.listItem,
    isLoading: state.list.isLoading,
    LIST_ID: state.list.LIST_ID,
    count: state.list.count,
    txtSnackBar: state.list.txtSnackBar,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBegin: () => dispatch({ type: actionTypes.FETCH_ITEMS_BEGIN }),
    onFetchSucces: items =>
      dispatch({ type: actionTypes.FETCH_ITEMS_SUCCESS, listItem: items }),
    onFetchFailure: err =>
      dispatch({ type: actionTypes.FETCH_ITEMS_FAILURE, error: err }),
    onFreshState: () => dispatch({ type: actionTypes.REFRESH_STATE }),
    onFreshCount: () => dispatch({ type: actionTypes.REFRESH_COUNT }),
    onSetOpenSnackBar: (openSnackBar) => dispatch({ type: actionTypes.SET_OPEN_SNACKBAR, openSnackBar: openSnackBar}),
    onSetTextSnackBar: (txtSnackBar) => dispatch({ type: actionTypes.SET_TEXT_SNACKBAR, txtSnackBar: txtSnackBar}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemShopping);
