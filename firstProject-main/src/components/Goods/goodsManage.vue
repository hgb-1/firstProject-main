<template>
  <div id="userManage">
    <div class="query">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="商品名称" prop="name" class="h">
          <el-input
            v-model="formInline.name"
            class="w"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="state" class="h">
          <el-select v-model="formInline.state" placeholder="状态" class="w2">
            <el-option
              v-for="(item, index) in orderStatusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告词" prop="ad" class="h">
          <el-input
            v-model="formInline.ad"
            class="w"
            placeholder="广告词"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家编码" prop="code" class="h">
          <el-input
            v-model="formInline.code"
            class="w"
            placeholder="编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="书号" prop="bookNum" class="h">
          <el-input
            v-model="formInline.bookNum"
            class="w"
            placeholder="书号"
          ></el-input>
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

    <div style="margin-top: 200px" class="divSelection">
      <el-button type="primary" @click="addSelection()">新增</el-button>
      <el-button @click="alterSelection()">修改</el-button>
      <el-button @click="Delete()">删除</el-button>
      <el-button type="primary" @click="fl('1')">上架</el-button>
      <el-button type="primary" @click="fl('2')">下架</el-button>
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
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="name" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="price" label="定价" width="80">
        </el-table-column>
        <el-table-column
          prop="price2"
          label="售价"
          width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="num" label="销售量" width="80">
        </el-table-column>
        <el-table-column prop="class1" label="一级分类" width="120">
        </el-table-column>
        <el-table-column prop="class2" label="二级分类" width="120">
        </el-table-column>
        <el-table-column prop="ad" label="广告词" width="290" class="sfz">
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="商品介绍"
          width="120"
          class="sfz"
        >
        </el-table-column>
        <el-table-column prop="state" label="商品状态" width="120">
          <template slot-scope="scope">
            <span>{{ getOrderStatus(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="上架时间" width="120" class="sfz">
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="100" class="sfz">
        </el-table-column>
        <el-table-column prop="code" label="商家编码" width="150" class="sfz">
        </el-table-column>
        <el-table-column prop="name2" label="商家名称" width="100" class="sfz">
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" class="sfz">
        </el-table-column>
        <el-table-column prop="bookNum" label="书号" width="100" class="sfz">
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

    <user-add ref="addSelection" v-on:searchAdd="searchAdd"></user-add>
    <user-atler
      ref="alterSelection"
      v-on:searchAtler="searchAtler"
    ></user-atler>
  </div>
</template>

<script>
import userAdd from "./userAdd.vue";
import userAtler from "./userAtler.vue";
export default {
  components: {
    userAdd,
    userAtler,
  },
  data() {
    return {
      page: {
        //定义页数
        pageNum: 1, //当前的第几页
        total: 10, //一共有多少条
        pageSize: 100, //每页显示条数
        currentPage4: 6,
      },
      formInline: {
        name: "",
        state: "",
        ad: "",
        code: "",
        bookNum: "",
        region: "",
        manage: "",
      },
      orderStatusList: [
        { label: "商品正常", value: "0" },
        { label: "商品已上架", value: "1" },
        { label: "商品已下架", value: "2" },
      ],
      table: [],
      tableData: [
        {
          name: "《三体》",
          price: "30元",
          price2: "24元",
          num: "71本",
          class1: "科幻",
          class2: "中国科幻小说",
          ad: "看过了都说真不戳",
          introduce: "讲述黑暗丛林法则",
          state: "0",
          time: "2020-2-2",
          views: "233次",
          code: "aaa111",
          name2: "当当网",
          stock: "100",
          bookNum: "10086",
        },
        {
          name: "《猫武士》",
          price: "23元",
          price2: "19元",
          num: "70本",
          class1: "儿童读物",
          class2: "科幻小说",
          ad: "买不了吃亏买不了上当，大家走过路过不要错过，都来看一看啊",
          introduce: "讲述猫咪的故事",
          state: "0",
          time: "2020-2-2",
          views: "2688次",
          code: "bbb22222",
          name2: "当当网",
          stock: "300",
          bookNum: "12315",
        },
        {
          name: "《三体》",
          price: "30元",
          price2: "24元",
          num: "71本",
          class1: "科幻",
          class2: "中国科幻小说",
          ad: "看过了都说真不戳",
          introduce: "讲述黑暗丛林法则",
          state: "0",
          time: "2020-2-2",
          views: "233次",
          code: "ccc333",
          name2: "当当网",
          stock: "100",
          bookNum: "10086",
        },
        {
          name: "《猫武士》",
          price: "23元",
          price2: "19元",
          num: "70本",
          class1: "儿童读物",
          class2: "科幻小说",
          ad: "买不了吃亏买不了上当，大家走过路过不要错过，都来看一看啊",
          introduce: "讲述猫咪的故事",
          state: "0",
          time: "2020-2-2",
          views: "2688次",
          code: "dd4",
          name2: "当当网",
          stock: "300",
          bookNum: "12315",
        },
        {
          name: "《三体》",
          price: "30元",
          price2: "24元",
          num: "71本",
          class1: "科幻",
          class2: "中国科幻小说",
          ad: "看过了都说真不戳",
          introduce: "讲述黑暗丛林法则",
          state: "0",
          time: "2020-2-2",
          views: "233次",
          code: "ee2",
          name2: "当当网",
          stock: "100",
          bookNum: "10086",
        },
        {
          name: "《猫武士》",
          price: "23元",
          price2: "19元",
          num: "70本",
          class1: "儿童读物",
          class2: "科幻小说",
          ad: "买不了吃亏买不了上当，大家走过路过不要错过，都来看一看啊",
          introduce: "讲述猫咪的故事",
          state: "0",
          time: "2020-2-2",
          views: "2688次",
          code: "ffoo",
          name2: "当当网",
          stock: "300",
          bookNum: "12315",
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
    // 查询
    search() {
      console.log("TableData", this.tableData);
      this.table = this.tableData
        .filter((item) => {
          return (
            item.name.includes(this.formInline.name) &&
            item.ad.includes(this.formInline.ad) &&
            item.code.includes(this.formInline.code) &&
            item.bookNum.includes(this.formInline.bookNum) &&
            item.state.includes(this.formInline.state)
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

    //接受子页面传过来的值(新增)
    searchAdd(val) {
      val;
      console.log(val);
      //val源数据
      this.tableData.push(val);
      this.search();
    },
    //新增
    addSelection() {
      this.$refs.addSelection.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },

    //接受子页面传来的值(修改)
    searchAtler(value) {
      console.log("修改", JSON.stringify(value));
      let index = this.tableData.findIndex((item) => {
        return item.userId === value.userId;
      });

      let newFormData = Object.assign({}, value);
      this.tableData.splice(index, 1, newFormData);
      console.log(this.tableData);
      this.search();
    },
    //修改
    alterSelection() {
      if (1 == this.multipleSelection.length) {
        this.$refs.alterSelection.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection))
        );
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: "info",
          message: "请选择一条数据进行操作",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      }
    },

    //删除
    Delete() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "error",
          message: "请勾选数据",
        });
        return;
      }

      //确定删除
      this.$confirm("确定要删除选中数据吗？")
        .then(() => {
          let indexList = this.multipleSelection.map((item) => {
            return item.userId;
          });

          indexList.forEach((indexItem) => {
            //当数组中的元素在测试条件时返回true时，findIndex()返回符合条件的元素的索引位置
            //如果没有符合条件的元素返回-1
            let currentIndex = this.tableData.findIndex((item) => {
              return item.userId === indexItem;
            });

            console.log("currentIndex", currentIndex);
            this.tableData.splice(currentIndex, 1);
          });

          this.search();
        })
        //取消删除
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //修改订单状态内容
    getOrderStatus(value) {
      console.log("修改订单状态内容" + value);
      return this.orderStatusList.filter((item) => {
        return item.value === value;
      })[0].label;
    },

    //点击订单按钮
    fl(value) {
      if (!this.multipleSelection.length) {
        this.$message.error("请选择需要修改的数据");

        return;
      }

      this.multipleSelection.forEach((item) => {
        let index = this.tableData.findIndex((tableItem) => {
          return tableItem.state === item.state;
        });

        this.tableData[index] = Object.assign({}, this.tableData[index], {
          state: value,
        });
      });
      this.search();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="css" scoped>
.query {
  position: relative;
  top: 220px;
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
  left: 280px;
  top: -800px;
}
.userTable {
  width: 900px;
}
.divTable {
  width: 900px;
}
</style>