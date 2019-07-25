<template >
  <div class="debug-container" >
    <div >
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
          <span >API调试</span>
          <el-button type="text" >JSON格式化</el-button>
        </div>
        <div >
          <el-input
            v-model="debugForm.url"
            placeholder="请输入请求地址"
            class="input-with-select"
          >
            <el-select
              slot="prepend"
              v-model="debugForm.methods"
              placeholder="请选择"
            >
              <el-option label="GET" value="GET" />
              <el-option label="POST" value="POST" />
            </el-select>
            <el-button slot="append" icon="el-icon-position" >发送</el-button>
          </el-input>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Debug',
  data() {
    return {
      debugForm: {
        methods: 'POST',
        url: '',
        data: ''
      }
    }
  },
  created() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.debug-container {
  /deep/.el-select .el-input {
    width: 130px;
  }
  /deep/.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
