import Loadable from 'react-loadable'

import LoadingComponent from '@/common/loader'

export default [
    {
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('./pages/home/index'),
            loading: LoadingComponent
        }),
    }
]