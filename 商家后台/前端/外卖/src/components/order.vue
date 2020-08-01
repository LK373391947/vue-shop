<template>
  <div class="container">
    <el-card class="header">
      <el-button type="primary" round>查询订单</el-button>
    </el-card>
    <el-card class="main">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="user.username" label="客户名"></el-table-column>
        <el-table-column prop="user.telephone" label="客户电话">
        </el-table-column>
        <el-table-column prop="user.address" label="派送地址">
        </el-table-column>
        <el-table-column prop="cart" label="订单内容">
          <template slot-scope="scope">
            <div v-for="item in scope.row.cart" :key="item.id">
              <div>{{item.name}} ￥{{item.price}} x{{item.num}}</div>
            </div>
            <div style="width:100%;text-align:right;">总价:￥{{scope.row.total}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteOrder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      let shopname = window.sessionStorage.getItem("shopname");
      const { data: result } = await this.$http.get("/getOrder", {
        params: { shopname: shopname },
      });
      if (result.length == 0) return this.$message.error("暂无数据");
      this.tableData = result[0].orderArray;
    },
    deleteOrder(value) {
      //由于商家和客户共用一个订单表所以暂不支持删除订单功能，实际开发应该把商家的表和客户的表分离
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .header {
    width: 95%;
    margin: 20px;
  }
  .main {
    width: 95%;
    margin: 20px;
  }
}
</style>