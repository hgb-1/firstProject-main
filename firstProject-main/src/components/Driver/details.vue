<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      dialogView: false,
      tableViewData: [],
    };
  },
  methods: {
    openDialog(flag, order) {
      this.tableViewData = [];
      console.log(order);
      this.dialogView = flag;
      this.$nextTick(function () {
        this.tableViewData.push(order);
      });
    },
    cancelDialog() {
      this.dialogView = false;
    },
  },
};
</script>

<style scoped>
</style>