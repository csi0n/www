import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import routes from './routes'

const history = createBrowserHistory()

const Routers = () => (
    <Router history={history}>
        <Switch>
            {routes.map((route, i) => {
                return <Route key={i} {...route}/>
            })}
        </Switch>
    </Router>
)
export default Routers