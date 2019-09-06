import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Nav from "./Nav";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

export default class App extends Component {
  state = {
    currentCategory: "",
    product: [],
    cart: []
  };

  componentDidMount() {
    this.getProducts();
  }

  chanceCategory = category => {
    this.setState({
      currentCategory: category.categoryName
    });
    console.log(category);

    this.getProducts(category.id);
  };
  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          product: data
        })
      );
  };
  addToCart = product => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + "   add to cart");
  };
  removeFromCart = product => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + "   removed from cart");
  };
  render() {
    let categoryInfo = { title: "Category List" };
    let productInfo = { title: "Product List" };
    return (
      <div>
        <Container>
          <Nav cart={this.state.cart} removeFromCart={this.removeFromCart} />

          <Row>
            <Col xs="3">
              <CategoryList
                info={categoryInfo}
                chanceCategory={this.chanceCategory}
                currentCategory={this.state.currentCategory}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <ProductList
                      {...props}
                      addToCart={this.addToCart}
                      info={productInfo}
                      product={this.state.product}
                    />
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={props => (
                    <CartList
                      {...props}
                      removeFromCart={this.removeFromCart}
                      cart={this.state.cart}
                    />
                  )}
                />
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
