<template>
  <div class="container">
    <el-card class="header">
      <el-button type="primary" round @click="addDialogVisible=true">添加商品</el-button>
    </el-card>
    <el-card class="main">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="describe" label="商品描述"></el-table-column>
        <el-table-column prop="category" label="类别"></el-table-column>
        <el-table-column prop="number" label="销量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="preupdateItem(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加商品 -->
    <el-dialog title="添加" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addformRef" :model="addForm" :rules="addFormRules">
        <!-- 名称 -->
        <el-form-item prop="name">
          <el-input v-model="addForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item prop="price">
          <el-input v-model="addForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item prop="describe">
          <el-input
            v-model="addForm.describe"
            placeholder="请输入描述"
            type="textarea"
            :autosize="{ minRows: 3}"
            maxlength="100"
            show-word-limit
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 类别 -->
        <el-form-item prop="category">
          <el-select v-model="addForm.category" placeholder="请选择商品的种类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addQuit">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更新商品商品 -->
    <el-dialog title="修改" :visible.sync="updateDialogVisible" width="30%">
      <el-form ref="updateformRef" :model="updateForm" :rules="addFormRules">
        <!-- 名称 注意更新的时候不改变名称，只能改价格，描述和类别，如果要改名称则和添加新商品一样（多余的操作）-->
        <el-form-item prop="name">
          <el-input v-model="updateForm.name" placeholder="请输入名称" disabled></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item prop="price">
          <el-input v-model="updateForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item prop="describe">
          <el-input
            v-model="updateForm.describe"
            placeholder="请输入描述"
            type="textarea"
            :autosize="{ minRows: 3}"
            maxlength="100"
            show-word-limit
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 类别 -->
        <el-form-item prop="category">
          <el-select v-model="updateForm.category" placeholder="请选择商品的种类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="updateQuit">取 消</el-button>
        <el-button type="primary" @click="updateItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.addForm.username = window.sessionStorage.getItem("username");
    this.addForm.shopname = window.sessionStorage.getItem("shopname");
    this.getItem();
  },
  data() {
    return {
      //商品的列表
      //基本属性：名称和单价
      tableData: [],
      //添加商品的可视参数
      addDialogVisible: false,
      //提交表单对象
      addForm: {
        username: "",
        shopname:"",
        name: "",
        price: 0,
        describe: "",
        category: "",
        number: 0
      },
      //修改表单对象
      updateForm:{
        username: "",
        name: "",
        price: 0,
        describe: "",
        category: "",
      },
      //修改商品的可视参数
      updateDialogVisible:false,
      //种类
      options: [
        {
          value: 1,
          label: "主食"
        },
        {
          value: 2,
          label: "小吃"
        },
        {
          value: 3,
          label: "饮品"
        }
      ],
      //添加规则
      addFormRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        describe: [{ required: true, message: "请输入描述", trigger: "blur" }],
        category: [
          { required: true, message: "请选择商品种类", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取商品列表
    async getItem(){
      let username=window.sessionStorage.getItem("username")
      const {data:result}=await this.$http.get('/getItem',{params:{username:username}});
      if(result.length==0)return this.$message.error("暂无数据");      
      this.tableData=result;
    },
    //更新商品-------------------------------------------------------------------------------
    updateItem(){
      this.$refs.updateformRef.validate(async valid => {
        if (!valid) return;
      const {data:result}=await this.$http.post("/updateItem",this.updateForm);
      if (result == "error") return this.$message.error("修改失败");
        this.$message.success("修改成功");
        this.updateDialogVisible = false;
        this.$refs.updateformRef.resetFields();
        await this.getItem();})
    },
    //更新商品预处理
    preupdateItem(value) {
      this.updateForm.username=window.sessionStorage.getItem("username");
      this.updateForm.name=value.name;
      this.updateForm.describe=value.describe;
      this.updateForm.price=value.price;
      this.updateForm.category=value.category;
      this.updateDialogVisible=true;
    },
    //退出更新商品并重置对话框
    updateQuit(){
      this.updateDialogVisible = false;
      this.$refs.updateformRef.resetFields();
    },

    //删除商品-------------------------------------------------------------------------------
    async deleteItem(value){
      let username=window.sessionStorage.getItem("username");
      const {data:result}=await this.$http.post('/deleteItem',{name:value.name,username:username});
      if (result == "error") return this.$message.error("删除失败");
        this.$message.success("删除成功");
        await this.getItem();
    },
    //添加商品-------------------------------------------------------------------------------
    addItem() {
      this.$refs.addformRef.validate(async valid => {
        if (!valid) return;
        const { data: result } = await this.$http.post(
          "/addItem",
          this.addForm
        );
        if (result == "error") return this.$message.error("添加失败");
        this.$message.success("添加成功");
        this.addDialogVisible = false;
        this.$refs.addformRef.resetFields();
        await this.getItem();
      });
    },
    //退出添加商品对话框
    addQuit() {
      this.addDialogVisible = false;
      this.$refs.addformRef.resetFields();
    }
  }
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