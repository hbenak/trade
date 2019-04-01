import './Logo.css'
//import logo from '../../assets/imgs/Logo_ML@2x.png.png'
import logo from '../../assets/imgs/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
	<div className="logo-box">
		<Link to="/" className="logo">
			<h1 className="logo">
				<span className="d-none">Mercado Livre</span>
				<img src={logo} alt="logo" />
			</h1>
		</Link>
	</div>
    

    