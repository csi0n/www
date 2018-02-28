import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route, Redirect, routerRedux} from 'dva/router'
import dynamic from 'dva/dynamic'

const {ConnectedRouter} = routerRedux

const Routers = function ({history, app}) {
    const error404 = dynamic({
        app,
        component: () => import('./../pages/errors/404')
    })
    const routes = [
        {
            path: '/home',
            models: () => [import('./')],
            component: () => import('./../pages/home')
        }
    ]

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/home"/>)}/>
                {
                    routes.map(({path, ...dynamic}, key) => (
                        <Route key={key}
                               exact
                               path={path}
                               component={dynamic({
                                   app,
                                   ...dynamic,
                               })}
                        />
                    ))
                }
                <Route component={error404}/>
            </Switch>
        </ConnectedRouter>
    )
}

Routers.propTypes = {
    history: PropTypes.object,
    app: PropTypes.object
};
export default Routers