import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase'
import VueKonva from 'vue-konva'
import vuetify from './plugins/vuetify';
import VuePrlx from 'vue-prlx'
import 'animate.css/animate.min.css';
Vue.use(VuePrlx);

Vue.config.productionTip = false
Vue.use(VueKonva)
var firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
window.firebase = firebase;

import store from './store'

let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});

