import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hou from '@/components/hou'
// import home from '@/components/home'
import sideBar from '@/components/sideBar'
import Manage from '@/components/Manage/userManage'
import Customer from '@/components/Customer/customerManage'
import Driver from '@/components/Driver/driverManage'
import Store from '@/components/Store/storeManage'
import Goods from '@/components/Goods/goodsManage'
import Order from '@/components/Order/orderManage'
import Hot from '@/components/Hot/hotManage'

Vue.use(Router)

export default new Router({
  routes: [
  //   {
  //  path:'/customerManage',
  //  name:'customerManage',
  //  component:customerManage
  // },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
        path: '/Manage',
        name: 'Manage',
        component: Manage
      },
      {
        path: '/Customer',
        name: 'Customer',
        component: Customer 
      },
      {
        path: '/Driver',
        name: 'Driver',
        component: Driver
      },
      {
        path: '/Store',
        name: 'Store',
        component: Store
      },
      {
        path: "/Goods",
        name: "Goods",
        component: Goods
      },
      {
        path: "/Order",
        name: "Order",
        component: Order
      },
      {
        path: "/Hot",
        name: "Hot",
        component: Hot
      },
    ]
    },

    {
      path: '/hou',
      name: 'hou',
      component: hou
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: home
    // },
  ]
})
