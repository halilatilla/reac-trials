import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Nav from "./Nav";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: []
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
          products: data
        })
      );
  };
  render() {
    let categoryInfo = { title: "Category List" };
    let productInfo = { title: "Product List" };
    return (
      <div>
        <Container>
          <Row>
            <Nav />
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList
                info={categoryInfo}
                chanceCategory={this.chanceCategory}
                currentCategory={this.state.currentCategory}
              />
            </Col>
            <Col xs="9">
              <ProductList info={productInfo} products={this.state.products} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
