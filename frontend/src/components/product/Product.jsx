import './Product.css'
import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { Link } from 'react-router-dom'
import ico_free_shipping from '../../assets/imgs/ic_shipping@2x.png.png'

const baseUrl = 'http://localhost:3001/api/items'

const initialState = {
  isLoaded: false,
  product: {}
}

export default class Product extends Component {
  state = { ...initialState }

  // componentWillReceiveProps(nextProps) {
  //   const idProduct = nextProps.match.id;
  //   if (idProduct !== this.props.match.id) {
  //     this.loadBase();
  //   }
  // }

  componentWillMount() {
    //console.log(this.props);
    this.loadBase(this.props.match.params.id);
  }

  loadBase(idProduct) {
    axios(baseUrl + '/' + idProduct).then(resp => {
      console.log(resp.data.item);
      this.setState({ product: resp.data.item, isLoaded: true })
    })
  }

  renderProduct() {
    const product = this.state.product
    const isLoaded = this.state.isLoaded

    if (!isLoaded) {
      return (<div>Carregando . . . </div>)
    }

    return (
      <div className="d-flex flex-row flex-wrap m-0 p-5 bg-white">
        <figure className="col-7">
          <img src={product.picture} alt={product.name} className="w-100 h-auto" />
        </figure>
        
        <div className="product-info col-4 offset-1">
          <span className="d-none">{product.id}</span>
          <span className="prod-condition">{product.condition} - {product.sold_quantity} vendidos</span>
          <p className="prod-title">{product.title}</p>
          <h4 className="px-1 prod-price">
            {this.renderPriceCurrency(product.price.currency)}
            {this.renderPrice(product.price.amount)}
            {this.renderFreeShipping(product.free_shipping)}
          </h4>
          <button className="button-buy">Comprar</button>
        </div>
        
        <div className="description mt-5">
          <h3>Descripción del producto</h3>
          <div className="px-1"><pre>{product.description}</pre></div>
        </div>
      </div>
    )
  }

  clear() {
    this.setState({ comment: '' })
  }

  renderPrice(p) {
    let formattedPrice = p.toFixed(2).split('.');
    formattedPrice[0] = formattedPrice[0].split(/(?=(?:...)*$)/).join('.');
    formattedPrice = formattedPrice.join(',');

    return (
      <span>{formattedPrice}</span>
    )
  }

  renderPriceCurrency(pc) {
    if (pc === "ARS") {
      return (<span>$</span>)
    } else if (pc === "BRL") {
      return (<span>R$</span>)
    } else {
      return (<span>?</span>)
    }
  }

  renderFreeShipping(fs) {
    if (fs) {
      return (
        <span>
          <img src={ico_free_shipping} alt="Free Shipping" />
        </span>
      )
    }
  }

  render() {
    return (
      <Main>
        <div className="w-100 p-2 bg-light">
          <Link to="/" className="text-decoration-none text-primary"><i className="fa fa-arrow-left"></i> Voltar</Link>
        </div>
        {this.renderProduct()}
      </Main>
    )
  }
}