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
		name: 'แดชบอร์ด',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/Quotations',
		name: 'ใบเสนอราคา',
		layout: "dashboard",
		component: () => import('../views/Quotation.vue'),
	},
	{
		path: '/pdf',
		name: 'ใบเสนอราคา',
		layout: "dashboard",
		component: () => import('../views/PDF/Pdf.vue'),
	},	{
		path: '/createpdf',
		name: 'createpdf',
		component: () => import('../views/PDF/createPDF.vue'),
	},
	{
		path: '/Invoice/:id',
		name: 'ใบวางบิล',
		layout: "dashboard",
		component: () => import('../views/Invoice.vue'),
	},
	{
		path: '/Quotations/CreateQuotation',
		name: 'สร้างใบเสนอราคา',
		layout: "dashboard",
		component: () => import('../views/CreateQuotation.vue'),
	},
	{
		path: '/Customers',
		name: 'ลูกค้า',
		layout: "dashboard",
		component: () => import('../views/Customer.vue'),
	},
	{
		path: '/Customers/EditCustomer/:id',
		name: 'แก้ไขลูกค้า',
		layout: "dashboard",
		component: () => import('../views/EditCustomer.vue'),
	},
	{
		path: '/setting/EditEmployee/:id',
		name: 'แก้ไขพนักงาน',
		layout: "dashboard",
		component: () => import('../views/EditEmployee.vue'),
	},
	{
		path: '/setting/EditBank/:id',
		name: 'จัดการบัญชีธนาคาร',
		layout: "dashboard",
		component: () => import('../views/EditBank.vue'),
	},
	{
		path: '/archive',
		name: 'อื่นๆ',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/setting/webSetting',
		name: 'ตั้งค่าเว็บไซต์',
		layout: "dashboard",
		component: () => import('../views/Websetting.vue'),
	},
	{
		path: '/setting/employee',
		name: 'จัดการพนักงาน',
		layout: "dashboard",
		component: () => import('../views/Employee.vue'),
	},
	{
		path: '/setting/bank',
		name: 'จัดการธนาคาร',
		layout: "dashboard",
		component: () => import('../views/BankDash.vue'),
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
