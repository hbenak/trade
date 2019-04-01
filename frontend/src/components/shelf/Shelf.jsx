import './Shelf.css'
import React, { Component } from 'react'
//import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Main from '../template/Main'
import ico_free_shipping from '../../assets/imgs/ic_shipping@2x.png.png'

const baseUrl = 'http://localhost:3001/api/items?q='

const initialState = {
  isLoaded: false,
  items: [{ id: '', title: '' }]
}

export default class Shelf extends Component {
  state = { ...initialState }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    this.searchItems()
  }

  searchItems() {
    let searchTerm = this.props.location.search

    if (!!searchTerm) {
      searchTerm = searchTerm.split('?search=');
      console.log(searchTerm[1])

      axios(baseUrl + searchTerm[1]).then(resp => {
        this.setState({ items: resp.data.items, isLoaded: true })
      }) 
    }
  }

  //componentDidMount: uma unica chamada
  //componentWillMount: pode fazer mais de uma chamada
  componentDidMount() {
    this.searchItems()
  }

  renderList() {
    return (
     <div className="row bg-white py-2">
       <div className="col-12">
         <ul className="d-flex flex-row flex-wrap mt-4 p-0 products-list">
          {this.renderProduct()}
         </ul>
       </div>
     </div>
    )
  }

  renderProduct() {

    const isLoaded = this.state.isLoaded

    if (!isLoaded) {
      let searchTerm = this.props.location.search

      if (!!searchTerm) {
        return (<div>Carregando . . . </div>)
      } else {
        return (<div>Aguardando dados para busca</div>)
      }
    }
    //slice para limitar a 4 resultados exibidos
    return this.state.items.slice(0,4).map(product => {
      return (
        <li className="col-12 list-unstyled" key={product.id}>
          <div className="my-1 border-bottom d-flex" onClick={() => this.props.history.push('/items/'+product.id)}>
            <figure>
              <img src={product.picture} alt={product.title} className="w-100 h-auto rounded" />
            </figure>
            <div className="prod-info">
              <span className="d-none">{product.id}</span>
              <h4 className="px-1">
                {this.renderPriceCurrency(product.price.currency)}
                {this.renderPrice(product.price.amount)}
                {this.renderFreeShipping(product.free_shipping)}
              </h4>
              <span className="px-1 prod-address">{product.address_state}</span>
              <p className="px-1 prod-title">{product.title}</p>
              <span className="px-1 prod-condition">{product.condition}</span>
            </div>
          </div>
        </li>
      )
    })

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
        <span className="free-shipping">
          <img src={ico_free_shipping} alt="Free Shipping" />
        </span>
      )
    }
  }

  render() {
    return (
     <Main>
      {this.renderList()}
     </Main>
    )
  }
}