import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import DashboardRTLLayout from './layouts/DashboardRTL.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueStepWizard from 'vue-step-wizard'
import 'vue-step-wizard/dist/vue-step-wizard.css'
import VueTabs from 'vue-nav-tabs'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// make jw pagination component available in application
import JwPagination from 'jw-vue-pagination';
import { BTabs } from 'bootstrap-vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
DatePicker.locale('TH')
Vue.use(DatePicker)

Vue.component('b-tabs', BTabs)
import { TabsPlugin } from 'bootstrap-vue'
Vue.use(TabsPlugin)
Vue.use('vue-moment');

Vue.component('jw-pagination', JwPagination);

Vue.use(Vuetify)






// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './plugins/click-away'
import Vuelidate from 'vuelidate'

import './scss/app.scss';

import ThailandAutoComplete from 'vue-thailand-address-autocomplete'

Vue.component('ThailandAutoComplete', ThailandAutoComplete)

Vue.use(Vuelidate);

Vue.use(VueTabs);

Vue.use(VueStepWizard);

Vue.use(Antd);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.config.productionTip = false

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-dashboard-rtl", DashboardRTLLayout);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/* const app = createApp({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


app.use(store); */