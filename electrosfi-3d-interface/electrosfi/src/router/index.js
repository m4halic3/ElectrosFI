import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Landing',
    component: () => import('../pages/Landing')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register')
  },
  {
    redirect: "/dashboard",
    path: "/dashboard",
    component: () => import('../pages/Dashboard'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard/Content')
      },
      {
        path: '/materials',
        name: 'Materials',
        component: () => import('../pages/Materials')
      },
      {
        path: '/simulations/:key',
        name: 'Simulation Productions',
        component: () => import('../pages/Simulations/Show'),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: '/simulations3d/:key',
        name: '3D Simulation Productions',
        component: () => import('../pages/Simulations3D/Show'),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/pages/Settings'),
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/simulator/:key',
    name: 'Simulator',
    component: () => import('@/pages/Simulator'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/simulator3d/:key',
    name: 'Simulator3d',
    component: () => import('@/pages/Simulator3d'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/details',
    name: 'ProductionDetails',
    component: () => import('../pages/Dashboard'),
    children: [
      {
        path: '/details/:simulationID/:productionID',
        name: 'Details',
        component: () => import('../pages/Simulations/Detail')
      },
      
    ],
    meta: {
      requiresAuth: false,
      showToAll: true
    }
  },
  {
    path: '/details3d',
    name: 'Production3dDetails',
    component: () => import('../pages/Dashboard'),
    children: [
      {
        path: '/datails3d/:simulationID/:productionID',
        name: '3D Details',
        component: () => import('../pages/Simulations3D/Detail')
      },
    ],
    meta: {
      requiresAuth: false,
      showToAll: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: "/",
  routes
});

router.beforeEach((to, from, next) => {
  const usuarioAtual = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const showToAll = to.matched.some(record => record.meta.showToAll);
  if (showToAll) { next(); return; }

  if (requiresAuth && !usuarioAtual) router.push('/');
  else if (!requiresAuth && usuarioAtual) router.push('/dashboard');
  else next();

});

export default router
