<template >
  <div class="menu-container" >
    <div class="top-search mb10" >
      <el-row >
        <el-button plain @click="menuVisible = true,getData()" >添加</el-button>
        <el-button type="info" plain icon="el-icon-refresh" @click="getData()" >刷新</el-button>
      </el-row>
    </div>
    <div class="menu-list" >
      <vxe-table
        highlight-current-row
        border
        resizable
        row-id="menuId"
        :tree-config="{ children: 'children' }"
        :data.sync="menuData"
        @select-change="selectChangeEvent"
      >
        <vxe-table-column type="selection" tree-node width="90" />
        <vxe-table-column field="title" title="菜单名称" />
        <vxe-table-column field="menuId" title="菜单ID" />
        <vxe-table-column field="type" title="类型" >
          <template v-slot="{ row }" >
            <span v-if="row.type == 1" >按钮</span>
            <span v-if="row.type == 0" >菜单</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="path" title="资源链接" />
        <vxe-table-column field="component" title="组件路径" />
        <vxe-table-column field="icon" title="资源图标" width="90" >
          <template v-slot="{ row }" >
            <span >
              <svg-icon :icon-class="row.icon" />
              <span v-if="row.icon == '' || row.icon == null" >-</span>
            </span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="noCache" title="是否缓存" >
          <template v-slot="{ row }" >
            <span v-if="!row.noCache" >关闭</span>
            <span v-if="row.noCache" >开启</span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="dialog-wrap" >
      <el-dialog title="功能菜单编辑" :visible.sync="menuVisible" width="900px" >
        <div class="opera-menu" >
          <div class="tree-node" >
            <el-tree
              ref="menuTree"
              :data="menumList"
              node-key="menuId"
              default-expand-all
              highlight-current
              show-checkbox
              :props="menuProps"
              :default-checked-keys="checkNodeArr"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node" >
                <span >{{ node.label }}</span>
                <span >
                  <el-button
                    v-if="data.type == 0 || data.menuId == 0"
                    type="text"
                    size="mini"
                    @click.stop="() => append(data)"
                  >添加</el-button>
                  <el-button
                    v-if="data.menuId !== 0"
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
                  >删除</el-button>
                </span>
              </span>
            </el-tree>
          </div>
          <div v-if="operaShow" class="menu-from-wrap" >
            <el-form
              ref="menuFrom"
              :model="menuFrom"
              status-icon
              :rules="menuRules"
              size="mini"
              label-width="100px"
            >
              <el-form-item label="类型" prop="roleName" >
                <el-select v-model="menuFrom.type" placeholder="请选择添加类型" >
                  <el-option label="菜单" value="0" />
                  <el-option label="按钮" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="菜单标题" prop="title" >
                <el-input v-model="menuFrom.title" autocomplete="off" />
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="访问路径" prop="path" >
                <el-input v-model="menuFrom.path" autocomplete="off" />
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="菜单名称" prop="path" >
                <el-input v-model="menuFrom.path" autocomplete="off" placeholder="菜单名称与访问路径相同" />
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="引入路径" prop="component" >
                <el-input v-model="menuFrom.component" autocomplete="off" placeholder="本地文件路径" />
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="是否展示" prop="alwaysShow" >
                <el-switch v-model="menuFrom.alwaysShow" />
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="菜单图标" prop="icon" >
                <el-autocomplete
                  v-model="menuFrom.icon"
                  popper-class="my-autocomplete"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect"
                >
                  <span slot="suffix" class="suffix-icon" >
                    <svg-icon v-if="menuFrom.icon" :icon-class="menuFrom.icon" />
                  </span>
                  <template slot-scope="{ item }" >
                    <span class="suffix-icon" >
                      <svg-icon :icon-class="item" />
                    </span>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="重定向地址" prop="redirect" >
                <el-input v-model="menuFrom.redirect" autocomplete="off" placeholder />
              </el-form-item>
              <el-form-item v-if="menuFrom.type == 0" label="是否开启缓存" prop="noCache" >
                <el-switch v-model="menuFrom.noCache" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <span v-if="operaShow" slot="footer" class="dialog-footer" >
          <el-button @click="menuVisible = false" >取 消</el-button>
          <el-button type="primary" @click="operaMenuControl('menuFrom')" >
            <span v-if="operaType == '1'" >添 加</span>
            <span v-if="operaType == '2'" >修 改</span>
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils/index'
import restaurants from './js/svg-icons'
export default {
  name: 'Menu',

  components: {},

  data() {
    return {
      restaurants,
      menutitle: '',
      menuFrom: {
        type: '0'
      },
      menuProps: {
        children: 'children',
        label: 'title'
      },
      currentData: null,
      menumList: [],
      menuVisible: false,
      operaShow: false,
      operaType: '1',
      checkNodeArr: [],
      menuData: [],
      menuRules: {

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
        .dispatch('system/menuList')
        .then((res) => {
          console.log(res)
          this.menuData = res.result
          const menuList = deepClone(res.result)
          this.menumList = [{
            title: '迪确云付功能架构',
            menuId: 0,
            children: menuList
          }]
        })
        .catch(() => {
        })
    },
    append(data) {
      console.log(data)
      this.operaType = '1'
      this.operaShow = true
      this.menuFrom = {}
      this.menuFrom = {
        type: '0',
        parentId: data.menuId
      }
      this.currentData = data
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    operaMenuControl(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = deepClone(this.menuFrom)
          data.noCache ? data.noCache = '0' : data.noCache = '1'
          data.alwaysShow ? data.alwaysShow = '0' : data.alwaysShow = '1'
          this.operaType === '1' ? data.name = data.path : ''
          const dataparams = {
            params: data
          }
          let operaRoleStr = ''
          this.operaType === '1' ? operaRoleStr = 'system/createMenu' : operaRoleStr = 'system/updateMenu'

          this.$store
            .dispatch(operaRoleStr, dataparams)
            .then((res) => {
              res.success ? (this.getData(), this.menuFrom = {}, this.menuFrom.type = '0') : ''
            })
            .catch(() => {
            })
        } else {
          return false
        }
      })
    },
    handleNodeClick(data) {
      if (data.menuId !== 0) {
        this.operaType = '2'
        this.operaShow = true
        this.menuFrom = deepClone(data)
      }

      console.log(data)
    },
    handleSelect(item) {
      this.menuFrom.icon = item
    },
    querySearch(queryString, cb) {
      var restaurants = [...new Set(this.restaurants)]
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      console.log(queryString)
      return (restaurant) => {
        console.log(restaurant)
        return (restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    selectChangeEvent({ selection }) {
      console.info(`勾选${selection.length}个树形节点`, selection)
    }
  }

}

</script>

<style lang="scss" scoped>
.menu-container {
  .mb10 {
    margin-bottom: 10px;
  }
  .opera-menu {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .tree-node {
      min-width: 300px;
      margin: 0 auto;
    }
    .menu-from-wrap {
      width: 50%;
      min-width: 500px;
    }
  }
  .suffix-icon {
    color: #000;
  }
  /deep/ .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  /deep/ .el-dialog__body {
    min-height: 300px;
  }
  /deep/ .el-autocomplete {
    width: 100%;
  }
}
</style>
<style lang ="scss">
.my-autocomplete {
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

