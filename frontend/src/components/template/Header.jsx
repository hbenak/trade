import './Header.css'
import React from 'react'
import Logo from './Logo'
import Search from './Search'

export default props =>
    <header className="header">
	    <div className="row w-100">
		    <div className="col-12 col-md-10 offset-md-1 d-flex">
		   		<Logo />
		   		<Search />
	   		</div>
   		</div>
    </header>