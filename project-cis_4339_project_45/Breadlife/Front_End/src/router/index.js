import Vue from 'vue'
import VueRouter from 'vue-router'
import VaccineChart from '@/views/VaccineChart'
import RaceChart from '@/views/RaceChart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/intakeCreate',
    name: 'intakeCreate',
    component: () => import('../components/Intake_Create')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Intake_View')
  },

  {
    path: '/intakeEdit/:id',
    name: 'intakeEdit',
    component: () => import('../components/Intake_Edit')
  },

  {
    path: '/distView',
    name: 'distView',
    component: () => import('../components/Dist_View')
  },


  {
    path: '/distCreate',
    name: 'distCreate',
    component: () => import('../components/Dist_Create')
  },
  {
    path: '/distEdit/:id',
    name: 'distEdit',
    component: () => import('../components/Dist_Edit')
  },

  {
    path: '/ihView',
    name: 'ihView',
    component: () => import('../components/IH_View')
  },

  {
    path: '/distReport',
    name: 'distReport',
    component: () => import('../components/Dist_Report')
  },


  {
    path: '/ihCreate',
    name: 'ihCreate',
    component: () => import('../components/IH_Create')
  },
  {
    path: '/vaccineChart',
    name: 'vaccineChart',
    component: VaccineChart
  },
  {
    path: '/raceChart',
    name: 'raceChart',
    component: RaceChart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
