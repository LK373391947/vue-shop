<template>
  <el-container class="el-container">
    <!--头部-->
    <el-header class="el-header">
        <h3>商家管理系统</h3>
        <el-button size="mini" type="danger" @click="loginOut">退出</el-button></el-header>
    <el-container>
      <!--侧边导航栏-->
      <el-aside width="240px" class="el-side">
        <el-menu
          default-active="1"
          background-color="#39c5bb"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="myInformation">
            <i class="el-icon-location"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="myItem">
            <i class="el-icon-menu"></i>
            <span slot="title">菜品目录</span>
          </el-menu-item>
          <el-menu-item index="3" @click="myOrder">
            <i class="el-icon-document" ></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="myComment">
            <i class="el-icon-setting" ></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--主体页面-->
      <el-main class="el-main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created(){

    },
    methods:{
        //跳转到基本信息页面
        myInformation(){this.$router.push("/myInformation");},
        //跳转到菜品目录页面
        myItem(){this.$router.push("/myItem");},
        //跳转到订单管理页面
        myOrder(){this.$router.push("/myOrder");},
        //跳转到评论管理页面
        myComment(){this.$router.push("/myComment");},
        //退出
        loginOut(){
            window.sessionStorage.clear();
            this.$router.push("/login");
        }
    }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  margin: 0;
  padding: 0;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #39c5bb;
    margin: 0;
    padding: 20px;
    h3 {
        display: inline-block;
        margin-left: 30px;
        color: white;
    }
  }
  .el-side {
    height: 100%;
    background-color: #39c5bb;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 30px !important;
  }
  .el-main {
    height: 100%;
    margin: 0;
    padding: 0;

  }
}
</style>