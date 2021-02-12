import Vue from "vue"
import VueRoters from "vue-router"
import Home from "./views/home"
import Products from "./views/products"
import History from "./views/history"
import Login from "./views/login"
import Store from "./store"

const isAuth = (to, from, next) => {
    if (Store.getters.getAuth.login == true) {
        next()
    }
    else {
        next('/inyil/login')
    }
}

Vue.use(VueRoters)

const mainRoters = new VueRoters({
    mode: 'history',
    routes:
    [
        {
            path:"/inyil/login",
            name:"login",
            component: Login,
            meta: { requiresVisitor: true },
        },
        {
            path:"/inyil/home",
            name:"home",
            component: Home,
            beforeEnter: isAuth,
        },
        {
            path:"/inyil/products",
            name:"products",
            component: Products,
            beforeEnter: isAuth,
        },
        {
            path:"/inyil/history",
            name:"history",
            component: History,
            beforeEnter: isAuth,
        },
        {
            path: "*",
            redirect: "/inyil/home",
        }
    ]
})

mainRoters.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresVisitor)) {
        if (Store.getters.getAuth.login == true) {
            next("/inyil/home");
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

export default mainRoters