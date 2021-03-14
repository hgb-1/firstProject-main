<template>
  <div class="dd">
    <el-row class="tac">
      <el-menu
        default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#04294b"
        text-color="rgba(182,167,167,0.596)"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/Manage">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/Customer">
          <i class="el-icon-user"></i>
          <span slot="title">客户管理</span>
        </el-menu-item>
        <el-menu-item index="/Driver">
          <i class="el-icon-user-solid"></i>
          <span slot="title">司机管理</span>
        </el-menu-item>
        <el-menu-item index="/Store">
          <i class="el-icon-s-home"></i>
          <span slot="title">门店管理</span>
        </el-menu-item>
        <el-menu-item index="/Goods">
          <i class="el-icon-star-off"></i>
          <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="/Order">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/Hot">
          <i class="el-icon-star-off"></i>
          <span slot="title">热门商品管理</span>
        </el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style >
.el-menu-vertical-demo {
  width: 250px;
  height: 600px;
  background: bisque;
}
</style>