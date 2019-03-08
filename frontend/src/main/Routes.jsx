import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Shelf from '../components/shelf/Shelf'
import Product from '../components/product/Product'
import Stores from '../components/stores/Stores'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/catalog' component={Shelf} />
        <Route path='/product/:id' component={Product} />
        <Route path='/stores' component={Stores} />
        <Redirect from='*' to='/' />
    </Switch>