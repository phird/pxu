import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/customer',
		name: 'Createcustomer',
		layout: "dashboard",
		component: () => import('../views/CreateCustomer.vue'),
	},
	{
		path: '/Quotations',
		name: 'Quotations',
		layout: "dashboard",
		component: () => import('../views/Quotation.vue'),
	},
	{
		path: '/Quotations/CreateQuotation',
		name: 'CreateQuotations',
		layout: "dashboard",
		component: () => import('../views/CreateQuotation.vue'),
	},
	{
		path: '/setting',
		name: 'Setting',
		layout: "dashboard",
		component: () => import('../views/CreateCustomer.vue'),
	},
	{
		path: '/archive',
		name: 'Archive',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

export default router
