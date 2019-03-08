import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/catalog">
                <i className="fa fa-list"></i> Catálogo
            </Link>
            <Link to="/stores">
                <i className="fa fa-search"></i> Lojas
            </Link>
        </nav>
    </aside>