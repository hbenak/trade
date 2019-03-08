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
  product: {
    comments: []
  },
  list: []
}

export default class Product extends Component {
  state = { ...initialState, comment:"" }

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
      this.setState({ product: resp.data })
    })
  }

  renderProduct() {
    const product = this.state.product

    return (
      <div className="d-flex flex-row flex-wrap mt-4 p-0">
        <div className="my-1 w-25">
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

  renderComments() {
    return (
      <div className="w-75 px-2">
        <h5>Comentários</h5>

        <div className="row mt-2">
          <div className="col">
            <input type="text" className="form-control"
             name="comment" value={this.state.comment}
             onChange={e => this.updateField(e)} placeholder="Digite seu comentário..." />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
              <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
            </div>
          </div>
        </div>

        {this.renderAllComments()}
      </div>
    )
  }

  renderAllComments() {
    if (this.state.product.comments.length > 0) {
      return this.state.product.comments.map((c, i) => {
        return <div key={i} className="mt-3 custom-comments">{c}</div>
      })
    } else {
      return (
        <div className="text-secondary mt-3">Nenhum comentário</div>
      )
    }

  }

  updateField(event) {
    const comment = event.target.value
    this.setState({ comment })
  }

  clear() {
    this.setState({ comment: '' })
  }

  save() {
    if (this.state.comment.length > 0) {
      const existingComment = this.state.product.comments
      const commentActive = this.state.comment
      existingComment.push(commentActive);
      const method = 'put'
      const product = this.state.product
      const url = baseUrl + '/' + product.id

      axios[method](url, product)
      .then(resp => {
        console.log(resp.data);
        this.clear();
      })
    }
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