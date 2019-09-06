import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class CartList extends Component {
  render() {
    return (
      <div>
        {" "}
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>productName</th>
              <th>quantityPerUnit</th>
              <th>unitPrice</th>
              <th>unitsInStock</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map(cartItem => (
              <tr key={cartItem.product.id}>
                <th scope="row"> {cartItem.product.id} </th>
                <td> {cartItem.product.productName} </td>
                <td> {cartItem.product.quantityPerUnit} </td>
                <td> {cartItem.product.unitPrice} </td>
                <td> {cartItem.product.unitsInStock} </td>
                <td> {cartItem.quantity} </td>
                <td>
                  <Button
                    onClick={() => this.props.removeFromCart(cartItem.product)}
                    color="danger"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
