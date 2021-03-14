<template>
  <div>
    <el-dialog
      :visible.sync="dialogatler"
      width="720px"
      :close-on-click-modal="false"
      @close="resetForm('atler')"
    >
      <el-form
        :model="atler"
        status-icon
        :rules="rules"
        ref="atler"
        label-width="100px"
        class="demo-ruleform"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input
            v-model="atler.name"
            auto-complete="off"
            width="10px"
            class="one"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="定价" prop="price" class="x2">
          <el-input
            v-model="atler.price"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price2">
          <el-input
            v-model="atler.price2"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="num" class="x2">
          <el-input
            v-model="atler.num"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="一级分类" prop="class1">
          <el-input
            v-model="atler.class1"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="二级分类" prop="class2" class="x2">
          <el-input
            v-model="atler.class2"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告词" prop="ad">
          <el-input
            v-model="atler.ad"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="introduce" class="x2">
          <el-input
            v-model="atler.introduce"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="state">
          <el-input
            v-model="atler.state"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="上架时间" prop="time" class="x2">
          <el-input
            v-model="atler.time"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家编码" prop="code">
          <el-input
            v-model="atler.code"
            auto-complete="off"
            width="10px"
            class="one"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="浏览量" prop="views" class="x2">
          <el-input
            v-model="atler.views"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家名称" prop="name2">
          <el-input
            v-model="atler.name2"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock" class="x3">
          <el-input
            v-model="atler.stock"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-form-item label="书号" prop="bookNum">
          <el-input
            v-model="atler.bookNum"
            auto-complete="off"
            width="10px"
            class="one"
          ></el-input>
        </el-form-item>
        <el-button
          class="r1"
          @click="
            dialogatler = false;
            resetForm('atler');
          "
          >取 消</el-button
        >
        <el-button class="r2" type="primary" @click="atlerDate('atler')"
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
      dialogatler: false,
      atler: {
        name: "",
        price: "",
        price2: "",
        num: "",
        class1: "",
        class2: "",
        ad: "",
        introduce: "",
        state: "",
        time: "",
        views: "",
        code: "",
        name2: "",
        stock: "",
        bookNum: "",
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
    //确定修改
    atlerDate(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.dialogatler = false;

          let newFormData = Object.assign({}, this.atler);
          this.$emit("searchAtler", newFormData);
        } else {
          console.log("error submit");
          return false;
        }
      });
    },

    dialogVisible() {},
    resetForm(forName) {
      this.$refs[forName].resetFields();
    },
    openDialog(falg, val) {
      this.dialogatler = falg;
      this.$nextTick(() => {
        this.$refs.atler.resetFields();
        console.log("wdnmd" + JSON.stringify(val));
        this.atler.name = val[0].name;
        this.atler.price = val[0].price;
        this.atler.price2 = val[0].price2;
        this.atler.num = val[0].num;
        this.atler.class1 = val[0].class1;
        this.atler.class2 = val[0].class2;
        this.atler.ad = val[0].ad;
        this.atler.introduce = val[0].introduce;
        this.atler.state = val[0].state;
        this.atler.time = val[0].time;
        this.atler.views = val[0].views;
        this.atler.code = val[0].code;
        this.atler.name2 = val[0].name2;
        this.atler.bookNum = val[0].bookNum;
        this.atler.stock = val[0].stock;
        // name: "",
        // price: "",
        // price2: "",
        // num: "",
        // class1: "",
        // class2: "",
        // ad: "",
        // introduce: "",
        // state: "",
        // time: "",
        // views: "",
        // code: "",
        // name2: "",
        // stock: "",
        // bookNum: "",
      });
    },
  },
};
</script>

<style lang="css" scoped>
.demo-ruleform {
  position: relative;
  height: 480px;
  width: 600px;
}
.r1 {
  position: absolute;
  right: 100px;
  bottom: -20px;
}
.r2 {
  position: absolute;
  right: -10px;
  bottom: -20px;
}
.one {
  width: 200px;
}
.x2 {
  position: absolute;
  margin: 10px 0 0 0;
  left: 320px;
}
.x3 {
  position: absolute;
  left: 320px;
  top: 0;
}
</style>