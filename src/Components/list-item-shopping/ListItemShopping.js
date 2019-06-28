import React from "react";
import "./ListItemShopping.css";
import MaterialIcon from "material-icons-react";
import data from "./data/data";
import ListCheckedOff from "./list-check-off/ListCheckedOff";
import ListItems from "./list-item/ListItems";
import OrderCategoryList from "./order-category-list/OrderCategoryList";
import OrderAlphaList from "./order-alpha-list/OrderAlphaList";
import RecommenList from "./recommend-list/RecommendList";

const arrSlide = data.listProduct;
const numberOfSlide = arrSlide.length / 3;
const getListItem = JSON.parse(localStorage.getItem("listItem"));
const getListItemCheckOff = JSON.parse(
  localStorage.getItem("listItemCheckOff")
);

export default class ListItemShopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 0,
      textInput: "",
      openRecommend: false,
      isSelectAll: false,
      listProduct: data.listProduct,
      listItem: getListItem || [],
      listItemCheckOff: getListItemCheckOff || []
    };
  }
  triggerSelectAll = open => {
    this.setState({
      isSelectAll: open
    });
    console.log(this.state.isSelectAll);
  };
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
    const { listItem } = this.state;
    let newItem = {
      name: item.name,
      picture: item.picture,
      idCate: item.idCate,
      quantity: 1,
      note: ""
    };
    listItem.unshift(newItem);
    this.setState({
      listItem
    });
  };

  addItemByInput = event => {
    const { listItem, listProduct } = this.state;
    if (event.key === "Enter") {
      const { textInput } = this.state;
      if (textInput) {
        const getItem = listProduct.find(item =>
         item.name.toUpperCase() === textInput.toUpperCase()
        );
        let newItem = {
          name: getItem.name,
          picture: getItem.picture,
          idCate: getItem.idCate,
          quantity: 1,
          note: ""
        };
        listItem.unshift(
          getItem
            ? newItem
            : {
                name: textInput,
                picture: ["http://chittagongit.com/download/117414"],
                idCate: 6,
                quantity: 1,
                note: ""
              }
        );
      }
      this.setState({
        listItem
      });
    }
  };

  deleteItem = item => {
    const { listItem } = this.state;
    listItem.splice(listItem.findIndex(e => e === item), 1);
    this.setState({
      listItem
    });
  };

  addItemCheckOut = item => {
    const { listItem, listItemCheckOff } = this.state;
    listItemCheckOff.unshift(item);
    listItem.splice(listItem.findIndex(e => e === item), 1);
    this.setState({
      listItem,
      listItemCheckOff
    });
  };

  addCheckOffToItem = index => {
    const { listItem, listItemCheckOff } = this.state;
    listItem.unshift(listItemCheckOff[index]);
    listItemCheckOff.splice(index, 1);
    this.setState({
      listItem,
      listItemCheckOff
    });
  };

  deleteItemCheckOff = index => {
    const { listItemCheckOff } = this.state;
    listItemCheckOff.splice(index, 1);
    this.setState({
      listItemCheckOff
    });
  };
  addAllCheckOffToItem = () => {
    const { listItemCheckOff, listItem } = this.state;
    const listItems = listItem.concat(listItemCheckOff);
    this.setState({
      listItem: listItems,
      listItemCheckOff: []
    });
  };
  deleteAllItemCheckOff = () => {
    this.setState({
      listItemCheckOff: []
    });
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

  onChangeInfoItem = (index, name, quantity, note) => {
    const { listItem } = this.state;
    listItem[index].name = name;
    listItem[index].quantity = quantity;
    listItem[index].note = note;
    this.setState({
      listItem
    });
  };
  render() {
    const styles = {
      slidesStyle: {
        transform: `translateX(${this.state.translateX}px)`,
        transition: "all 1s"
      }
    };
    const { slidesStyle } = styles;
    const {
      listProduct,
      listItem,
      listItemCheckOff,
      textInput,
      openRecommend,
      isSelectAll
    } = this.state;
    const { stateSort } = this.props;
    const props = {
      textInput,
      stateSort,
      listItem,
      listItemCheckOff,
      listProduct,
      addItem: this.addItem,
      addItemCheckOut: this.addItemCheckOut,
      deleteItem: this.deleteItem,
      addCheckOffToItem: this.addCheckOffToItem,
      deleteItemCheckOff: this.deleteItemCheckOff,
      addAllCheckOffToItem: this.addAllCheckOffToItem,
      deleteAllItemCheckOff: this.deleteAllItemCheckOff,
      onChangeInfoItem: this.onChangeInfoItem,
      triggerSelectAll: this.triggerSelectAll
    };

    localStorage.setItem("listItem", JSON.stringify(listItem));
    localStorage.setItem("listItemCheckOff", JSON.stringify(listItemCheckOff));
    return (
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
                                backgroundImage: `url(${item.picture[0]})`
                              }}
                            />
                          </div>
                          <div className="wrap-slide-name">
                            <span className="slide-name">{item.name}</span>
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
          {stateSort.isOrder === true ? <ListItems {...props} /> : ""}
          {stateSort.isCategory === true ? (
            <OrderCategoryList {...props} />
          ) : (
            ""
          )}
          {stateSort.isAlpha === true ? <OrderAlphaList {...props} /> : ""}
          {listItemCheckOff.length ? <ListCheckedOff {...props} /> : ""}
        </div>
      </div>
    );
  }
}
