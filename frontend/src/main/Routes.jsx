import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Shelf from '../components/shelf/Shelf'
import Product from '../components/product/Product'

export default props => 
    <Switch>
        <Route exact path='/' component={Shelf} />
        <Route exact path='/items' component={Shelf} />
        <Route path='/items/:id' component={Product} />
        <Redirect from='*' to='/' />
    </Switch>