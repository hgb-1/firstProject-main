<template>
  <div id="userManage">
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
        <el-form-item label="职位" prop="region" class="h">
          <el-select v-model="formInline.region" placeholder="职位" class="w2">
            <el-option label="老板" value="LaoBan"></el-option>
            <el-option label="店长" value="DianZhang"></el-option>
            <el-option label="保洁" value="BaoJie"></el-option>
            <el-option label="服务员" value="FuWuYuan"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" class="en1">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('formInline')" class="en"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="divTable">
      <el-table
        ref="multipleTable"
        :data="table"
        tooltip-effect="dark"
        border
        class="userTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="zhangHao" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column
          prop="role"
          label="职位"
          width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60"> </el-table-column>
        <el-table-column prop="phone" label="手机" width="120">
        </el-table-column>
        <el-table-column prop="mailbox" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="myID" label="身份证" width="200" class="sfz">
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
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
      page: {
        //定义页数
        pageNum: 1, //当前的第几页
        total: 10, //一共有多少条
        pageSize: 100, //每页显示条数
        currentPage4: 6,
      },
      table: [],
      tableData: [
        {
          zhangHao: "22222",
          name: "王小虎",
          role: "店长",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "33333",
          name: "王大虎",
          role: "副店长",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "444444",
          name: "王中虎",
          role: "管理员",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "555555",
          name: "王上虎",
          role: "管理员",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "66666666",
          name: "王下虎",
          role: "前台",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "7777",
          name: "王左虎",
          role: "保洁",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
        {
          zhangHao: "88888",
          name: "王右虎",
          role: "老板",
          sex: "男",
          phone: "12312312345",
          mailbox: "2725241432@qq.com",
          myID: "123456789123456789",
        },
      ],
      multipleSelection: [],
    };
  },

  mounted() {
    this.search();
  },

  methods: {
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.search();
    },
    // 第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.search();
    },
    //查询
    search() {
      console.log("submit!");
      this.table = this.tableData
        .filter((item) => {
          return (
            item.zhangHao.includes(this.formInline.zhangHao) &&
            item.name.includes(this.formInline.name)
          );
        })
        .slice(
          (this.page.pageNum - 1) * this.page.pageSize,
          this.page.pageNum * this.page.pageSize
        );
      this.page.total = this.tableData.length;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    newlyAddedSelection() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="css" scoped>
.query {
  position: relative;
  top: -20px;
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
#userManage {
  position: relative;
  left: 300px;
  top: -540px;
}
.userTable {
  width: 915px;
}
</style>