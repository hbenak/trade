import './Main.css'
import React from 'react'
import Header from './Header'

export default props =>
    <React.Fragment>
        <Header />
        <main className="content container-fluid">
            <div className="row w-100 bg-light">
	    		<div className="col-12 col-md-10 offset-md-1">
		            {props.children}
            	</div>
            </div>
        </main>
    </React.Fragment>