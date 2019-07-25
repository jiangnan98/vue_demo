<template >
  <div class="role-container" >
    <div class="top-search mb10" >
      <el-form ref="orderQuery" :inline="true" :model="dataparams.params" />
      <el-row >
        <el-button plain @click="roletitle = '添加角色',operaType = '1',roleVisible = true" >添加</el-button>
        <el-button type="info" plain icon="el-icon-refresh" @click="getData()" >刷新</el-button>
      </el-row>
    </div>
    <div class="role-list" >
      <el-table v-loading="listLoading" border :data="roleData" :header-cell-style="headeStyle" >
        <el-table-column prop="roleId" label="角色ID" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column prop="roleCode" label="角色代码" />
        <el-table-column label="操作" width="185" >
          <template slot-scope="scope" >
            <el-button type="success" size="mini" icon="el-icon-edit" @click="editRole(scope.row)" />
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteRole(scope.row.roleId)"
            />
            <el-button
              type="info"
              size="mini"
              icon="el-icon-setting"
              @click="roleMenuList(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-wrap" >
      <el-dialog :title="roletitle" :visible.sync="roleVisible" width="550px" >
        <el-form
          ref="roleFrom"
          :model="roleFrom"
          status-icon
          :rules="addRoleRules"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="roleName" >
            <el-input v-model="roleFrom.roleName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="描述" prop="roleDesc" >
            <el-input v-model="roleFrom.roleDesc" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色代码" prop="roleCode" >
            <el-input v-model.number="roleFrom.roleCode" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="roleVisible = false, resetForm('roleFrom')" >取 消</el-button>
          <el-button v-if="operaType == '1'" type="primary" @click="operaRole('roleFrom')" >确 定</el-button>
          <el-button v-if="operaType == '2'" type="primary" @click="operaRole('roleFrom')" >修 改</el-button>
        </span>
      </el-dialog>
      <el-dialog title="角色菜单绑定" :visible.sync="roleMenuVisible" width="550px" >
        <!-- <el-card shadow="hover" >
          <span >{{ operaData.roleName }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" >{{ operaData.roleDesc }}</el-button>
        </el-card>-->
        <el-tree
          ref="menuTree"
          :data="menumList"
          show-checkbox
          default-expand-all
          highlight-current
          node-key="menuId"
          :props="menuProps"
          :default-checked-keys="checkNodeArr"
        />

        <span slot="footer" class="dialog-footer" >
          <el-button @click="roleMenuVisible = false" >取 消</el-button>
          <el-button type="primary" @click="updateRoleMenu()" >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils/index'
export default {
  name: 'Menu',

  components: {},

  data() {
    return {
      roleData: [],
      roletitle: '',
      operaType: '',
      menumList: [],
      listLoading: false,
      roleVisible: false,
      operaData: {},
      roleMenuVisible: false,
      checkNodeArr: [],
      menuProps: {
        children: 'children',
        label: 'title'
      },
      dataparams: {
        params: {

        },
        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      roleFrom: {
        roleName: '',
        roleDesc: '',
        roleCode: ''
      },
      headeStyle: {
        background: '#f0f2f5'
      },
      centerDialogVisible: false,
      addRoleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请输入角色代码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},

  watch: {},
  created() {
    this.getData()
  },

  filter: {},

  methods: {
    async getData() {
      this.$store
        .dispatch('system/roleList')
        .then((res) => {
          this.roleData = res.result
        })
        .catch(() => {
        })
    },
    operaRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const dataparams = {
            params: this.roleFrom
          }
          let operaRoleStr = ''
          this.operaType === '1' ? operaRoleStr = 'system/createRole' : operaRoleStr = 'system/updateRole'
          this.$store
            .dispatch(operaRoleStr, dataparams)
            .then((res) => {
              res.success ? (this.getData(), this.roleVisible = false) : ''
            })
            .catch(() => {
            })
        } else {
          return false
        }
      })
    },
    deleteRole(id) {
      const dataparams = {
        params: id
      }
      this.$store
        .dispatch('system/deleteRole', dataparams)
        .then((res) => {
          res.success ? this.getData() : ''
        })
        .catch(() => {
        })
    },
    roleMenuList(data) {
      this.operaData = data
      const dataparams = {
        params: data.roleId
      }
      this.$store
        .dispatch('system/roleMenuList', dataparams)
        .then((res) => {
          this.menumList = res.result
          this.checkNodeArr = []
          this.buildTree(this.menumList)
          res.success ? this.roleMenuVisible = true : ''
        })
        .catch(() => {
        })
    },
    buildTree(treeNode) {
      treeNode.forEach(element => {
        // console.log(element)
        // if (element.hasSelect) {
        //   this.checkNodeArr.push(element.menuId)
        //   if (element.children.length > 0) {
        //     this.buildTree(element.children)
        //   }
        // } else {
        //   if (element.children.length > 0) {
        //     this.buildTree(element.children)
        //   }
        // }
        element.children.forEach(child => {
          if (child.hasSelect) {
            this.checkNodeArr.push(child.menuId)
          }
        })
      })
    },
    updateRoleMenu() {
      const newArr = deepClone(this.$refs.menuTree.getCheckedKeys())
      this.menumList.forEach(element => {
        console.log(element)
        element.children.forEach(child => {
          if (child.hasSelect) {
            newArr.push(element.menuId)
          }
        })
      })
      console.log(newArr)
      const dataparams = {
        params: {
          roleId: this.operaData.roleId,
          menuIdArr: [...new Set(newArr)].toString()
        }
      }
      this.$store
        .dispatch('system/updateRoleMenu', dataparams)
        .then((res) => {
          res.success ? (this.getData(), this.checkNodeArr = [], this.roleMenuVisible = false) : ''
        })
        .catch(() => {
        })
    },
    editRole(row) {
      this.roleFrom = deepClone(row)
      this.roletitle = '修改角色'
      this.operaType = '2'
      this.roleVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    selectChangeEvent({ selection }) {

    }
  }

}

</script>

<style  scoped>
.mb10 {
  margin-bottom: 10px;
}
</style>

