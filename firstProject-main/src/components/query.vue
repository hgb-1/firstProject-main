<template>
  <div class="query">
    <el-form
      :inline="true"
      :model="formInline"
      ref="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="账号查询" prop="zhangHao" class="h">
        <el-input
          v-model="formInline.zhangHao"
          class="w"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名查询" prop="name" class="h">
        <el-input
          v-model="formInline.name"
          class="w"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region" class="h">
        <el-select v-model="formInline.region" placeholder="职位" class="w2">
          <el-option label="老板" value="LaoBan"></el-option>
          <el-option label="店长" value="DianZhang"></el-option>
          <el-option label="保洁" value="BaoJie"></el-option>
          <el-option label="服务员" value="FuWuYuan"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery" class="en1">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetForm('formInline')" class="en"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        zhangHao: "",
        name: "",
        region: "",
        manage: "",
      },
    };
  },
  methods: {
    onQuery() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="css" scoped>
.query {
  position: relative;
  left: 300px;
  top: -560px;
}
.w {
  width: 160px;
}
.w2 {
  width: 100px;
}
.h {
  line-height: 40px;
}
.en1 {
  margin-left: 36px;
}
</style>