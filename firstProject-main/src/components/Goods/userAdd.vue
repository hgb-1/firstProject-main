<template>
  <div>
    <el-dialog
      :visible.sync="dialogadd"
      width="720px"
      :close-on-click-modal="false"
      @close="resetForm('add')"
    >
      <el-form
        :model="add"
        status-icon
        :rules="rules"
        ref="add"
        label-width="100px"
        class="demo-ruleform"
        :inline="true"
        width="500px"
      >
        <el-form-item label="商品名称" prop="name" class="x">
          <el-input
            v-model="add.name"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="定价" prop="price" class="x2">
          <el-input
            v-model="add.price"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price2" class="x">
          <el-input
            v-model="add.price2"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="一级分类" prop="class1" class="x2">
          <el-input
            v-model="add.class1"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="二级分类" prop="class2" class="x">
          <el-input
            v-model="add.class2"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告词" prop="ad" class="x2">
          <el-input
            v-model="add.ad"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="上架时间" prop="time" class="x">
          <el-input
            v-model="add.time"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家名称" prop="name2" class="x2">
          <el-input
            v-model="add.name2"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock" class="x">
          <el-input
            v-model="add.stock"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="书号" prop="bookNum" class="x2">
          <el-input
            v-model="add.bookNum"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>

        <el-button
          class="r"
          @click="
            dialogadd = false;
            resetForm('add');
          "
          >取 消</el-button
        >
        <el-button class="r" type="primary" @click="addDate('add')"
          >确 定</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogadd: false,
      add: {
        name: "",
        price: "",
        price2: "",
        class1: "",
        class2: "",
        ad: "",
        time: "",
        name2: "",
        stock: "",
        bookNum: "",

        num: "",
        introduce: "",
        state: "",
        views: "",
        code: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            pattern: /^([\w\@.]{1,14})$/g,
            message: "请输入正确的用户名：",
          },
        ],
      },
    };
  },
  methods: {
    //确定
    addDate(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          let newDialogForm = Object.assign({}, this.add, {
            id: new Date().getTime(),
          });

          this.dialogadd = false;
          this.$emit("searchAdd", newDialogForm);
        }
      });
    },

    dialogVisible() {},
    resetForm(forName) {
      this.$refs[forName].resetFields();
    },
    openDialog(falg, val) {
      this.dialogadd = falg;
      this.$nextTick(() => {
        this.$refs.add.resetFields();
      });
    },
  },
};
</script>

<style lang="css" scoped>
.one {
  width: 200px;
}
.demo-ruleform {
  position: relative;
  height: 460px;
  width: 300px;
}
.y {
  position: absolute;
  left: 500px;
}
/* 定位 */
.x2 {
  position: relative;
  left: 220px;
}
</style>