import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import detailPage from '@/pages/detail'
import orderListPage from '@/pages/orderList'
import detailAn from '@/pages/details/analysis'
import detailCo from '@/pages/details/count'
import detailFo from '@/pages/details/forecast'
import detailPu from '@/pages/details/publish'

Vue.use(Router)

export default new Router({
	// mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/detail',
      name: 'detailPage',
      component: detailPage,
      redirect: '/detail/count',
      children: [
        {
          path: 'analysis',
          component: detailAn
        },
        {
          path: 'count',
          component: detailCo
        },
        {
          path: 'forecast',
          component: detailFo
        },
        {
          path: 'publish',
          component: detailPu
        },
      ]
    },
    {
      path: '/orderList',
      name: 'orderListPage',
      component: orderListPage
    }
  ]
})
