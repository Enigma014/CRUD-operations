import React, { Component } from 'react';
import { ProductConsumer } from './Context';
import './App.css';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h3>Crud Operations</h3>
        <ProductConsumer>
          {(value) => (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Info</th>
                  <th>Price</th>
                  <th>Company</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td><input type="text" value={value.title} onChange={(e) => value.updateValue(e, "title")} /></td>
                  <td><input type="text" value={value.info} onChange={(e) => value.updateValue(e, "info")} /></td>
                  <td><input type="text" value={value.price} onChange={(e) => value.updateValue(e, "price")} /></td>
                  <td><input type="text" value={value.company} onChange={(e) => value.updateValue(e, "company")} /></td>
                  <td>
                    <button
                      className="custom-button add"
                      onClick={() => value.onSave(value.id)}
                    >
                      {value.id ? "Save" : "Add new row"}
                    </button>
                  </td>
                </tr>
              </thead>
              <tbody>
                {value.Alldata.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.info}</td>
                    <td>{product.price}</td>
                    <td>{product.company}</td>
                    <td>
                      <button
                        className="custom-button edit"
                        onClick={() => value.onEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="custom-button delete"
                        onClick={() => value.onDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </ProductConsumer>
      </div>
    );
  }
}
