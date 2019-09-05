import React, { Component } from "react";
import { Table } from "reactstrap";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.info.title}</h2>
        <Table>
          <thead>
            <tr>
              <th>categoryId</th>
              <th>productName</th>
              <th>quantityPerUnit</th>
              <th>unitPrice</th>
              <th>unitsInStock</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(products => (
              <tr key={products.id}>
                <th scope="row"> {products.categoryId} </th>
                <td> {products.productName} </td>
                <td> {products.quantityPerUnit} </td>
                <td> {products.unitPrice} </td>
                <td> {products.unitsInStock} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
