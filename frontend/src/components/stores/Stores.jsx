import './Stores.css'
import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'search',
  title: 'Lojas',
  subtitle: 'Encontre a loja mais próxima'
}

const baseUrl = 'https://plausible-nitrogen.glitch.me/addresses'

const initialState = {
  stores: [{
    store: "",
    adrress: ""
  }]
}

export default class Store extends Component {
  state = { ...initialState }

  componentDidMount() {
    axios(baseUrl).then(resp => {
      console.log(resp.data);
      this.setState({ stores: resp.data })
    })
  }

  myStores() {
    return this.state.stores.map((s, i) => {
      return (
        <div key={i}>
          <h5>{s.store}</h5>
          <p>{s.address}</p>
          <hr />
        </div>
      )
    })
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.myStores()}
      </Main>
    )
  }
}