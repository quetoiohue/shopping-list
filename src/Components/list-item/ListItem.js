import React from "react";
import MaterialIcon from "material-icons-react";
import "./ListItem.css";
import data from "./data/data";

const arrSlide = data.listProduct;
const numberOfSlide = arrSlide.length / 3;
export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 0,
      listProduct: data.listProduct,
      listItem: []
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
  //   stateSlideLimit = () => {
  //         const { btnPrev, btnNext, slide } = this.refs;
  //         const {translateX} = this.state;
  //         const widthSlide = -(arr.length) * slide.offsetWidth;
  //        btnPrev.style.display = (translateX < 0) ? "block" : "none";
  //        btnNext.style.display = (translateX > widthSlide) ? "block" : "none";
  //   }
  addItem = item => {
    const { listItem } = this.state;
      listItem.push(item);
      this.setState({
          listItem
      })
      console.log(JSON.stringify(listItem));  
  };
  addItemByInput = (event) => {
    const {listItem, listProduct} = this.state;
    if(event.key === 'Enter'){
      const { name, value } = event.target;
      const getItem = listProduct.find(item => item.name === value);
      listItem.push((getItem) ? getItem : {name: value , picture: ["../../images/local-small1.png"]});
      this.setState({
        listItem
      })
    }
    
  }
  render() {
    const styles = {
      slidesStyle: {
        transform: `translateX(${this.state.translateX}px)`,
        transition: "all 1s"
      }
    };
    const { slidesStyle } = styles;
    const { listProduct, listItem } = this.state;
    localStorage.setItem('listItem',JSON.stringify(listItem));
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
                <div className="wrap-btn">
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
                          console.log(item);
                          this.addItem(item)
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
          <ul className="list-item">
            {listItem.map(item => (
              <li className="item-active">
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
                  <div className="btn">
                    <div className="btn-icon">
                      <MaterialIcon icon="done" />
                    </div>
                  </div>
                  <div className="btn">
                    <div className="btn-icon">
                      <MaterialIcon icon="delete" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
