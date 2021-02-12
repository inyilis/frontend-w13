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
        next('/sada/login')
    }
}

Vue.use(VueRoters)

const mainRoters = new VueRoters({
    mode: 'history',
    routes:
    [
        {
            path:"/sada/login",
            name:"login",
            component: Login,
            meta: { requiresVisitor: true },
        },
        {
            path:"/sada/home",
            name:"home",
            component: Home,
            beforeEnter: isAuth,
        },
        {
            path:"/sada/products",
            name:"products",
            component: Products,
            beforeEnter: isAuth,
        },
        {
            path:"/sada/history",
            name:"history",
            component: History,
            beforeEnter: isAuth,
        },
        {
            path: "*",
            redirect: "/sada/home",
        }
    ]
})

mainRoters.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresVisitor)) {
        if (Store.getters.getAuth.login == true) {
            next("/sada/home");
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