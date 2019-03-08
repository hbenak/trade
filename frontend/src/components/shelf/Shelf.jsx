import './Shelf.css'
import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'list',
  title: 'Catálogo',
  subtitle: 'Lista de produtos, com exibição de foto, nome e descrição'
}

const baseUrl = 'http://localhost:3001/products'

const initialState = {
  product: { name: '', description: '' },
  list: []
}

export default class Shelf extends Component {
  state = { ...initialState }

  //componentDidMount: uma unica chamada
  //componentWillMount: pode fazer mais de uma chamada
  componentDidMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  renderList() {
    return (
     <div className="row">
       <div className="col-12">
         <ul className="d-flex flex-row flex-wrap mt-4 p-0 products-list">
          {this.renderProduct()}
         </ul>
       </div>
     </div>
    )
  }

  renderProduct() {
    return this.state.list.map(product => {
      return (
        <li className="col-6 col-lg-4 col-xl-3 list-unstyled" key={product.id}>
          <div className="my-1 border" onClick={() => this.props.history.push('/product/'+product.id)}>
            <figure>
              <img src={product.photo} alt={product.name} className="w-100 h-auto" />
            </figure>
            <span className="d-none">{product.id}</span>
            <h4 className="px-1">{product.name}</h4>
            <p className="px-1">{product.description}</p>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
     <Main {...headerProps}>
      {this.renderList()}
     </Main>
    )
  }
}