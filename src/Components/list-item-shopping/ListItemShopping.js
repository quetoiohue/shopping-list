import React from "react";
import "./ListItemShopping.css";
import MaterialIcon from "material-icons-react";
import data from "./data/data";
import ListCheckedOff from "./list-check-off/ListCheckedOff";
import ListItems from "./list-item/ListItems";
import OrderCategoryList from "./order-category-list/OrderCategoryList";
import OrderAlphaList from "./order-alpha-list/OrderAlphaList";
import RecommenList from "./recommend-list/RecommendList";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import * as fetch from "../../API/Product";

const arrSlide = data.listProduct;
const numberOfSlide = arrSlide.length / 3;

class ListItemShopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 0,
      textInput: "",
      openRecommend: false,
      isSelectAll: false,
      listProduct: data.listProduct
    };
  }

  componentDidMount() {
    this.props.onFetchBegin();
    fetch.products().then(res => {
      this.setState({ listProduct: res.data });
      console.log(this.state.listProduct);
    });
    const USER_ID = JSON.parse(localStorage.getItem("USER_ID"));
    fetch.getItems(USER_ID).catch(err => this.props.onFetchFailure(err));
    console.log("product", this.props.listItem);
  }
  triggerSelectAll = open => {};
  onChangeInput = event => {
    this.setState({
      textInput: event.target.value
    });
    this.openRecommend(true);
  };

  prevSlide = event => {
    const { translateX } = this.state;
    const { slide } = this.refs;
    if (translateX < -slide.offsetWidth * numberOfSlide) {
      this.setState({
        translateX: translateX + slide.offsetWidth * numberOfSlide
      });
    } else {
      return;
    }
  };
  nextSlide = event => {
    const { translateX } = this.state;
    const { slide } = this.refs;
    if (translateX >= -(arrSlide.length - numberOfSlide) * slide.offsetWidth) {
      this.setState({
        translateX: translateX - slide.offsetWidth * numberOfSlide
      });
    } else {
      return;
    }
  };
  addItem = item => {
    const { PRODUCT_NAME, PRODUCT_PICTURE, PRODUCT_NOTE, CATEGORY_ID } = item;
    console.log(PRODUCT_NAME);
    fetch.createItem(
      1,
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
        const {
          PRODUCT_NAME,
          PRODUCT_PICTURE,
          PRODUCT_NOTE,
          CATEGORY_ID
        } = getItem;
        if (getItem) {
          fetch.createItem(
            1,
            PRODUCT_NAME,
            PRODUCT_PICTURE,
            PRODUCT_NOTE,
            CATEGORY_ID
          );
        } else {
          fetch.createItem(
            1,
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
    console.log(item);
    fetch.deleteItem(item.ITEM_ID);
  };

  toggleState = item => {
    const { ITEM_ID, ITEM_NAME, ITEM_QUANTITY, ITEM_NOTE, IS_CHECKED } = item;
    console.log(ITEM_NAME);
    fetch.updateItem(ITEM_ID, ITEM_NAME, ITEM_QUANTITY, ITEM_NOTE, 1 - IS_CHECKED);
  };

  uncheckedAllItem = () => {
    fetch.setStateAllOfItem(false);
  };

  deleteAllItemCheckOff = () => {
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
    console.log(node);

    const { inputAdd } = this.refs;
    if (node) {
      if (node.contains(event.target) || inputAdd.contains(event.target)) {
        return;
      }
    }

    this.openRecommend(false);
  };

  onChangeInfoItem = (item) => {
    const {
      ITEM_ID,
      ITEM_NAME,
      ITEM_QUANTITY,
      ITEM_NOTE,
      IS_CHECKED
    } = item;
    fetch.updateItem(
      ITEM_ID,
      ITEM_NAME,
      ITEM_QUANTITY,
      ITEM_NOTE,
      IS_CHECKED
      );
  };
  render() {
    const styles = {
      slidesStyle: {
        transform: `translateX(${this.state.translateX}px)`,
        transition: "all 1s"
      }
    };

    const { slidesStyle } = styles;
    const { listProduct, textInput, openRecommend, isSelectAll } = this.state;
    const { isSort, listItem, isLoading } = this.props;
    console.log(listItem);
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

    return isLoading ? (
      "Loading..."
    ) : (
      <div className="list-page">
        <div className="shopping-list">
          <div className="top-bar">
            {isSelectAll ? (
              <div className="add-input-item wrap-select-all">
                <div className="select-all-text">SELECT ALL</div>
              </div>
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
                    <div className="slides" style={slidesStyle}>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSort: state.sort.stateSort,
    listItem: state.list.listItem,
    isLoading: state.list.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBegin: () => dispatch({ type: actionTypes.FETCH_ITEMS_BEGIN }),
    onFetchSucces: items =>
      dispatch({ type: actionTypes.FETCH_ITEMS_SUCCESS, listItem: items }),
    onFetchFailure: err =>
      dispatch({ type: actionTypes.FETCH_ITEMS_FAILURE, error: err }),
    fetchToDos: () => dispatch({ type: actionTypes.FETCH_TODOS })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemShopping);
