<template>
  <div class="hello">
    <div class="one">
      <v-head></v-head>
      <div class="box1">
        <v-sidebar></v-sidebar>
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./home.vue";
import vSidebar from "./sideBar.vue";
export default {
  name: "HelloWorld",
  components: { vHead, vSidebar },
  // data() {
  //   return {
  //     msg: "Welcome to Your Vue.js App",
  //   };
  // },
};
</script>

<style scoped>
.content {
  position: relative;
  width: 920px;
  height: 0px;
}
</style>