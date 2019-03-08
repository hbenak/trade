import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início" subtitle="Teste técnico de React.">
        <h2>Bem Vindo!</h2>
        <hr />
        <p className="my-1">Sistema para exemplificar a construção de um cadastro de produtos com inclusão de comentários desenvolvido em React!</p>
        <p className="my-1">Em catálogo escolha um produto e insira seus comentários.</p>
        <p className="my-1">Em lojas é possível ver uma lista com os endereços disponíveis.</p>
    </Main>