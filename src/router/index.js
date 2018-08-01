import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/index'
import index from '@/pages/home'
import order from '@/pages/order'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
        path: '/',
        name: 'login',
        component: login
        },
        {
            path: '/home',
            name: 'index',
            component: index
        },
        {
            path: '/order',
            name: 'order',
            component: order
        }
    ]
})
