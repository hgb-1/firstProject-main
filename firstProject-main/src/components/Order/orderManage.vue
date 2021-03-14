<template>
  <div id="userManage">
    <div class="query">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="订单编码" prop="code" class="h">
          <el-input
            v-model="formInline.code"
            class="w"
            placeholder="单号"
          ></el-input>
        </el-form-item>

        <el-form-item label="订单时间" prop="time" class="h">
          <el-date-picker v-model="formInline.time" type="date" class="timeW">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="订单状态" prop="state" class="h">
          <el-select v-model="formInline.state" placeholder="状态" class="w2">
            <el-option
              v-for="(item, index) in orderStatusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="付款时间" prop="time2" class="h">
          <el-date-picker v-model="formInline.time2" type="date" class="timeW">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下单人" prop="name" class="h">
          <el-input
            v-model="formInline.name"
            class="w"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="顾客手机号" prop="phone" class="h">
          <el-input
            v-model="formInline.phone"
            class="w"
            placeholder="号码"
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
      <el-button type="primary" @click="xhj">查看详情</el-button>
      <el-button type="primary" @click="fl('1')">取消订单</el-button>
      <el-button type="primary" @click="fl('2')">订单到货</el-button>
      <el-button type="primary" @click="fl('3')">取消到货</el-button>
      <el-button type="primary" @click="fl('4')">订单已取货</el-button>
      <el-button type="primary" @click="fl('5')">订单已到货</el-button>
    </div>
    <div class="divTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        class="userTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="订单编码" width="80">
        </el-table-column>
        <el-table-column
          prop="num"
          label="订单总价"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="state" label="订单状态" width="140">
          <template slot-scope="scope">
            <span>{{ getOrderStatus(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pay" label="支付状态" width="100" class="sfz">
        </el-table-column>
        <el-table-column prop="code2" label="门店编码" width="110" class="sfz">
        </el-table-column>
        <el-table-column prop="name" label="下单人姓名" width="110" class="sfz">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="下单人手机号"
          width="110"
          class="sfz"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="确认付款开始时间"
          width="140"
          class="sfz"
        >
        </el-table-column>
        <el-table-column
          prop="time2"
          label="确认付款结束时间"
          width="140"
          class="sfz"
        >
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
      page: {
        //定义页数
        pageNum: 1, //当前的第几页
        total: 10, //一共有多少条
        pageSize: 100, //每页显示条数
        currentPage4: 6,
      },
      formInline: {
        code: "",
        time: "",
        time2: "",
        name: "",
        phone: "",
        state: "",
        // region: "",
        // manage: "",
      },
      orderStatusList: [
        { label: "订单正常", value: "0" },
        { label: "订单已取消", value: "1" },
        { label: "订单已到货", value: "2" },
        { label: "订单已取消到货", value: "3" },
        { label: "订单已取货", value: "4" },
        { label: "订单已取消取货", value: "5" },
      ],
      tableData: [],
      alltableData: [
        {
          code: "001",
          num: "100元",
          state: "0",
          pay: "正常",
          code2: "001",
          name: "小花",
          phone: "12315",
          time: "2020-1-1",
          time2: "2020-1-2",
        },
        {
          code: "002",
          num: "200元",
          state: "0",
          pay: "正常",
          code2: "002",
          name: "小华",
          phone: "10086",
          time: "2020-10-11",
          time2: "2020-10-12",
        },
        {
          code: "003",
          num: "300元",
          state: "0",
          pay: "正常",
          code2: "003",
          name: "小军",
          phone: "12345",
          time: "2020-3-1",
          time2: "2020-3-2",
        },
        {
          code: "004",
          num: "400元",
          state: "0",
          pay: "正常",
          code2: "004",
          name: "小铃",
          phone: "54321",
          time: "2020-6-1",
          time2: "2020-6-2",
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
      console.log("allTableData", this.alltableData);
      this.tableData = this.alltableData
        .filter((item) => {
          return (
            item.code.includes(this.formInline.code) &&
            item.phone.includes(this.formInline.phone) &&
            item.name.includes(this.formInline.name) &&
            item.state.includes(this.formInline.state)
          );
        })
        .slice(
          (this.page.pageNum - 1) * this.page.pageSize,
          this.page.pageNum * this.page.pageSize
        );
      this.page.total = this.alltableData.length;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //详情
    xhj() {},

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
        let index = this.alltableData.findIndex((alltableItem) => {
          return alltableItem.state === item.state;
        });

        this.alltableData[index] = Object.assign({}, this.alltableData[index], {
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
  top: 180px;
}
.w {
  width: 160px;
}
.timeW {
  width: 160px;
}
.w2 {
  width: 150px;
}
.h {
  line-height: 40px;
}
.en1 {
  margin-left: 5px;
}
#userManage {
  position: relative;
  left: 300px;
  top: -750px;
}
.divTable {
  width: 1200px;
}
.userTable {
  width: 1200px;
}
.block {
  margin: 50px 0 0 300px;
}
</style>