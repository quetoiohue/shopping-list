import React from "react";
import "./ListItemShopping.css";
import MaterialIcon from "material-icons-react";
import data from "./data/data";
import ListCheckedOff from "./list-check-off/ListCheckedOff";
import ListItems from "./list-item/ListItems";

const arrSlide = data.listProduct;
const numberOfSlide = arrSlide.length / 3;
const getListItem = JSON.parse(localStorage.getItem("listItem"));
const getListItemCheckOff = JSON.parse(localStorage.getItem("listItemCheckOff"));

export default class ListItemShopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 0,
      listProduct: data.listProduct,
      listItem: getListItem || [],
      listItemCheckOff: getListItemCheckOff || []
    };
  }
  prevSlide = event => {
    const { translateX } = this.state;
    const { slide } = this.refs;
    if (translateX < -slide.offsetWidth * numberOfSlide) {
      this.setState({
        translateX: translateX + slide.offsetWidth * numberOfSlide
      });
      console.log(translateX);
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
    listItem.unshift(item);
    this.setState({
      listItem
    });
    console.log(JSON.stringify(listItem));
  };

  addItemByInput = event => {
    const { listItem, listProduct } = this.state;
    if (event.key === "Enter") {
      const { value } = this.refs.inputAdd;
      if (value) {
        const getItem = listProduct.find(item => item.name === value);
        listItem.unshift(
          getItem
            ? getItem
            : {
                name: value,
                picture: ["http://chittagongit.com/download/117414"]
              }
        );
      }
      this.setState({
        listItem
      });
    }
  };

  deleteItem = index => {
    const { listItem } = this.state;
    listItem.splice(index, 1);
    this.setState({
      listItem
    });
  };

  addItemCheckOut = index => {
    const { listItem, listItemCheckOff } = this.state;
    listItemCheckOff.unshift(listItem[index]);
    listItem.splice(index, 1);
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
    console.log(listItem);
    this.setState({
      listItem: listItems,
      listItemCheckOff: [],
    })  
  }
  deleteAllItemCheckOff = () => {
    const { listItemCheckOff } = this.state;  
    this.setState({
      listItemCheckOff: []
    })  
    console.log(listItemCheckOff);
  }
  render() {
    const styles = {
      slidesStyle: {
        transform: `translateX(${this.state.translateX}px)`,
        transition: "all 1s"
      }
    };
    const { slidesStyle } = styles;
    const { listProduct, listItem, listItemCheckOff } = this.state;
    const props = {
      listItem,
      listItemCheckOff,
      addItemCheckOut: this.addItemCheckOut,
      deleteItem: this.deleteItem,
      addCheckOffToItem: this.addCheckOffToItem,
      deleteItemCheckOff: this.deleteItemCheckOff,
      addAllCheckOffToItem: this.addAllCheckOffToItem,
      deleteAllItemCheckOff: this.deleteAllItemCheckOff
    
    };
    localStorage.setItem("listItem", JSON.stringify(listItem));
    localStorage.setItem("listItemCheckOff", JSON.stringify(listItemCheckOff));
    return (
      <div className="list-page">
        <div className="shopping-list">
          <div className="top-bar">
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
          </div>
          <ListItems {...props} />
          {listItemCheckOff.length ? <ListCheckedOff {...props} /> : ""}
        </div>
      </div>
    );
  }
}
