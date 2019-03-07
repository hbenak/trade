import './Product.css'
import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { Link } from 'react-router-dom'

const headerProps = {
  icon: 'product-hunt',
  title: 'Produto',
  subtitle: 'Descrição, foto e comentários do produto'
}

const baseUrl = 'http://localhost:3001/products'

const initialState = {
  product: { name: '', description: '' },
  list: []
}

const pathname = window.location.pathname.split("/product/");
const idProduct = pathname[1];

export default class Product extends Component {
  state = { ...initialState }

  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  renderProduct() {
    return this.state.list.map(product => {
      if (parseInt(product.id) === parseInt(idProduct)) {
        return (
          <div className="d-flex flex-row flex-wrap mt-4 p-0">
            <div className="my-1 w-25" key={product.id}>
              <figure>
                <img src={product.photo} alt={product.name} className="w-100 h-auto" />
              </figure>
              <span className="d-none">{product.id}</span>
              <h4 className="px-1">{product.name}</h4>
              <p className="px-1">{product.description}</p>
            </div>
            {this.renderComments()}
          </div>
        )
      }
    })
  }

  renderComments() {
    return (
      <div className="w-75 px-2">
        <h5>Comentários</h5>
      </div>
    )
  }

  render() {
    return (
      <Main {...headerProps}>
        <div className="w-100 p-2 bg-light">
          <Link to="/catalog" className="text-decoration-none text-primary"><i className="fa fa-arrow-left"></i> Voltar para o catálogo</Link>
        </div>
        {this.renderProduct()}
      </Main>
    )
  }
}